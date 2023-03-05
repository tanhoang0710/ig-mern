const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');
const Follow = require('../models/followModel');
const multer = require('multer');
const sharp = require('sharp');
const sendEmail = require('../utils/email');

exports.getAllUsers = async (req, res) => {
    console.log(
        '🚀 ~ file: userController.js:4 ~ exports.getAllUsers= ~ req',
        req.user
    );
    try {
        const users = await Users.find({});
        res.status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAUser = async (req, res) => {
    const { username } = req.params;
    const user = await Users.findOne({ username });
    if (user) {
        const countFollowers = await Follow.find({ followee: user._id })
            .populate('follower')
            .select('-followee -__v')
            .count();
        const countFollowing = await Follow.find({ follower: user._id })
            .populate('followee')
            .select('-follower -__v')
            .count();
        return res.status(200).json({
            status: 'success',
            user: {
                ...user.toObject(),
                countFollowers,
                countFollowing,
            },
        });
    }
    return res.status(404).json({
        status: 'fail',
        message: "Can't find a user with that username!",
    });
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only image.'), false);
    }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.multerConfig = upload.fields([{ name: 'avatar', maxCount: 1 }]);

exports.resizeImages = async (req, res, next) => {
    const { user } = req;
    if (!user)
        return res.status(404).json({
            status: 'fail',
            message: 'No user found with that ID!',
        });
    if (Object.keys(req.files).length === 0) return next();
    req.body.avatar = `user-${req.user._id}-${Date.now()}-${
        req.files?.avatar[0]?.originalname.split('.')[0]
    }.jpeg`;
    await sharp(req?.files?.avatar[0]?.buffer)
        .resize(900, 676)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.body.avatar}`);
    next();
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });

    return newObj;
};

exports.updateProfile = async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    if (body.password || body.passwordConfirm) {
        return res.status(400).json({
            status: 'fail',
            message:
                'This route is not for password update. Please use /update-password',
        });
    }

    const filteredBody = filterObj(
        body,
        'username',
        'email',
        'fullname',
        'bio',
        'phoneNumber',
        'avatar'
    );
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.user._id,
            filteredBody,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            status: 'success',
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'success',
            message: error.message,
        });
    }
};

exports.updatePassword = async (req, res) => {
    const { _id } = req.user;
    const { newPassword, passwordConfirm, currentPassword } = req.body;
    const user = await Users.findById(_id);
    if (!user)
        return res.status(404).json({
            status: 'fail',
            message: 'User with that ID has been deleted',
        });

    const checkCurrentPassword = await bcrypt.compare(
        currentPassword,
        user.password
    );
    if (!checkCurrentPassword) {
        return res.status(401).json({
            status: 'fail',
            message: 'Your current password is wrong!',
        });
    }
    if (newPassword !== passwordConfirm)
        return res.status(401).json({
            status: 'fail',
            message: 'New password and confirm password must be the same!',
        });
    user.password = newPassword;
    // user.passwordConfirm = passwordConfirm;
    await user.save();
    // ko dùng User.findByIdAndUpdate vì:
    // validator ở User schema sẽ ko chạy lại
    // các pre save middlerware cũng sẽ ko chạy lại
    res.status(200).json({
        status: 'success',
        user,
    });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'No users found with that email!',
        });
    }

    const resetPasswordToken = user.createPasswordResetToken();

    await user.save({
        validateBeforeSave: false,
    });

    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/reset-password/${resetPasswordToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 mins)',
            message,
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            status: 'fail',
            message: 'There was an error sending email. Try again later!',
        });
    }

    return res.status(200).json({
        status: 'success',
        message: 'Token sent to your email!',
    });
};

exports.resetPassword = async (req, res) => {
    const { resetPasswordToken } = req.params;
    const { newPassword, newPasswordConfirm } = req.body;

    const hashedToken = crypto
        .createHash('sha256')
        .update(resetPasswordToken)
        .digest('hex');

    // Tìm user có token reset và chưa hết hạn
    const user = await Users.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {
            $gt: Date.now(),
        },
    });

    if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'Token is invalid or has expired!',
        });
    }

    if (newPassword !== newPasswordConfirm) {
        return res.status(400).json({
            status: 'fail',
            message: 'New password and new password confirm must be equal!',
        });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // Cập nhật passwordChangedAt

    res.status(200).json({
        status: 'success',
        message: 'Your password is updated successfully!',
    });
};

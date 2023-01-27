import React, { useRef, useState } from "react";
import { LogoFacebook } from "react-ionicons";
import { Link } from "react-router-dom";
import "./styles.css";

export const SignUpForm: React.FC = () => {
  const [isPasswordInputChange, setIsPasswordInputChange] = useState<boolean>(false);
  const [isShowTextPassword, setIsShowTextPassword] = useState<boolean>(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) {
      setIsPasswordInputChange(true);
    } else {
      setIsPasswordInputChange(false);
    }
  };

  const handleChangeTypePasswordInput = (): void => {
    if (!isShowTextPassword) {
      passwordInputRef.current?.setAttribute("type", "text");
    } else passwordInputRef.current?.setAttribute("type", "password");
    setIsShowTextPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center relative top-[-50px]">
      <div className="border border-1 border-solid border-[rgb(219, 219, 219)] w-[350px] p-10 pb-4">
        <div className="bg-no-repeat bg-auto bg-img bg-[url('../../public/logo.png')] h-[51px] bg-[50%_-52px] mb-5"></div>

        <div className="text-center text-[17px] text-[#8e8e8e] font-bold">
          Sign up to see photos and videos from your friends.
        </div>

        <button className="text-white bg-blue-500 w-full focus:outline-none focus:ring-4font-medium rounded-[8px] text-sm text-center mr-2 mb-2 mt-4">
          <div className="flex justify-center py-2 gap-1 cursor-pointer">
            <LogoFacebook color={"#fff"} height="20px" width="20px" />
            <span className="text-[#fff] relative font-medium text-[14px]">Log in with Facebook</span>
          </div>
        </button>

        <div className="flex justify-center items-center my-2 mb-5">
          <div className="bar"></div>
          <span className="mx-[18px] relative top-[2px] text-[#7a7a7a]">OR</span>
          <div className="bar"></div>
        </div>

        <form className="pb-0">
          <div className="mt-1 border border-1 border-solid border-[rgb(219, 219, 219)] rounded-[2px] p-[9px] text-[12px]">
            <input
              type="text"
              placeholder="Mobile number or email"
              autoCapitalize="off"
              autoCorrect="off"
              name="mobileNumberEmail"
              required
              className="text-ellipsis block mr-0 w-full"
            />
          </div>
          <div className="mt-1 border border-1 border-solid border-[rgb(219, 219, 219)] rounded-[2px] p-[9px] text-[12px]">
            <input
              type="text"
              placeholder="Fullname"
              autoCapitalize="off"
              autoCorrect="off"
              name="fullname"
              required
              className="text-ellipsis block mr-0 w-full"
            />
          </div>
          <div className="mt-1 border border-1 border-solid border-[rgb(219, 219, 219)] rounded-[2px] p-[9px] text-[12px]">
            <input
              type="text"
              placeholder="Username"
              autoCapitalize="off"
              autoCorrect="off"
              name="username"
              required
              className="text-ellipsis block mr-0 w-full"
            />
          </div>
          <div className="flex border border-1 border-solid border-[rgb(219, 219, 219)] rounded-[2px] p-[9px] text-[12px] mt-1">
            <input
              type="password"
              placeholder="Password"
              autoCapitalize="off"
              autoCorrect="off"
              name="username"
              required
              ref={passwordInputRef}
              className="text-ellipsis block mr-0 w-full"
              onChange={handleChangePasswordInput}
            />
            {isPasswordInputChange && (
              <span className="cursor-pointer" onClick={handleChangeTypePasswordInput}>
                {!isShowTextPassword ? "Show" : "Hide"}
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#8e8e8e] text-center my-3">
            People who use our service may have uploaded your contact information to Instagram.{" "}
            <span className="text-[#00376b]">Learn More</span>
          </p>
          <p className="text-[11px] text-[#8e8e8e] text-center mt-3">
            By signing up, you agree to our <span className="text-[#00376b]">Terms , Privacy Policy</span> and{" "}
            <span className="text-[#00376b]">Cookies Policy</span> .
          </p>
          <button
            type="submit"
            className="text-white bg-blue-500 w-full focus:outline-none focus:ring-4font-medium rounded-[8px] text-sm px-5 py-1.5 text-center mr-2 mb-2 mt-4"
          >
            Sign up
          </button>
        </form>
      </div>

      <div className="border border-1 border-solid border-[rgb(219, 219, 219)] w-[350px] p-10 py-4 mt-2">
        <div className="flex justify-center items-center gap-[3px]">
          <span>Have an account? </span>
          <Link to={"/"} className={"text-center block font-bold text-blue-500 leading-3"}>
            Log in
          </Link>
        </div>
      </div>
      <div>
        <p className="text-center mt-5 font-light mb-4">Get the app.</p>
        <div className="flex justify-center gap-3">
          <img src="../../public/app-store.png" className="h-10" alt="" />
          <img src="../../public/google-play.png" className="h-10" alt="" />
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploading, { ImageListType } from "react-images-uploading";
import ButtonLink from "../../components/ButtonLink";
import IconArrowLeft from "../../components/Icon/IconArrowLeft";
import IconArrowRight from "../../components/Icon/IconArrowRight";
import IconClose from "../../components/Icon/IconClose";
import IconUpload from "../../components/Icon/IconUpload";
import EmojiTextArea from "../../components/EmojiTextArea";

import IconCloseToast from "../../components/Icon/IconCloseToast";
import IconCloseToastGray from "../../components/Icon/IconCloseToastGray";

const CreatePage = () => {
  const [images, setImages] = useState<ImageListType>([]);
  const [text, setText] = useState("");
  const [showToast, setShowToast] = useState<boolean>(true);
  const maxNumber = 2;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList);
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("caption", text);
    images.forEach((image: any) => form.append("images", image.file, image.file?.name));

    const res = await axios.post("http://localhost:3000/api/v1/post", form, {
      withCredentials: true,
    });

    if (res.data.status === "success") {
      setImages([]);
      toast.success("Post success!");
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div>
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
        {({ imageList, onImageUpload, errors }) => (
          // write your building UI

          <div className="h-screen overflow-y-hidden">
            {errors && errors.maxNumber && (
              <div
                className={`${
                  showToast ? "" : "hidden"
                } flex items-center fixed top-3 right-3 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                  <IconCloseToast />
                </div>
                <div className="ml-3 text-sm font-normal">You can only upload up to 10 photos.</div>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  data-dismiss-target="#toast-danger"
                  aria-label="Close"
                  onClick={handleCloseToast}
                >
                  <span className="sr-only">Close</span>
                  <IconCloseToastGray />
                </button>
              </div>
            )}
            <h3 className="font-medium text-[18px] mt-5 text-center">Create new post</h3>
            <div className="h-full flex flex-col items-center justify-center">
              <IconUpload className="mb-[12px]" />
              <h4 className="mb-[15px] text-[20px]">Upload images here</h4>
              <ButtonLink onClick={onImageUpload} textBtn="Select from computer" />
            </div>
            <div className="">
              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}

              {imageList.length > 0 && (
                <div className="fixed inset-0 overflow-y-auto">
                  <div
                    className="fixed inset-0 h-full bg-black opacity-40 cursor-pointer"
                    onClick={() => setImages([])}
                  >
                    <IconClose className="absolute top-[10px] right-[10px]" />
                  </div>
                  <div className="relative">
                    <div className="mx-auto snap-x snap-mandatory">
                      {imageList.map((image, index) => (
                        <div className="">
                          <input
                            className="sr-only peer"
                            type="radio"
                            name="carousel"
                            id={`carousel-${index}`}
                            defaultChecked
                          />
                          <div className="absolute top-[50vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
                            <div className="text-[16px] relative font-medium p-[10px]">
                              <p className="text-center">Create new post</p>
                              <div className="absolute right-3 top-3">
                                <ButtonLink onClick={handleSubmit} textBtn="Share" outline textMedium />
                              </div>
                            </div>
                            <img src={image["data_url"]} alt="" />

                            {imageList.length > 1 && (
                              <div className="absolute top-1/2 flex w-full justify-between z-20">
                                <label
                                  htmlFor={index === 0 ? `carousel-${imageList.length - 1}` : `carousel-${index - 1}`}
                                  className="inline-block text-red-600 cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5"
                                >
                                  <IconArrowLeft />
                                </label>
                                <label
                                  htmlFor={index === imageList.length - 1 ? `carousel-0` : `carousel-${index + 1}`}
                                  className="inline-block text-red-600 cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5"
                                >
                                  <IconArrowRight />
                                </label>
                              </div>
                            )}
                            <EmojiTextArea rows={5} setText={setText} text={text} />

                            {/* <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageUpdate(index)}>Update</button>
                              <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
      <ToastContainer />
    </div>
  );
};

export default CreatePage;

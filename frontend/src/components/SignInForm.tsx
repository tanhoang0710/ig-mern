import axios from "axios";
import React, { useRef, useState } from "react";
import { LogoGithub, LogoGoogle } from "react-ionicons";
import { Link, useNavigate } from "react-router-dom";
import { setIsAuthenticated, setAuthUser } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";
import "./styles.css";

export const SignInForm: React.FC = () => {
  const [isPasswordInputChange, setIsPasswordInputChange] = useState<boolean>(false);
  const [isShowTextPassword, setIsShowTextPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > 0) {
      setPassword(e.target.value);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:3000/api/v1/users/signin",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (data.data?.status === "success" && data.data?.user) {
        dispatch(setIsAuthenticated(true));
        dispatch(setAuthUser(data.data?.user));
        navigate("/home");
      }
    } catch (error) {
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
      navigate("/home");
    }
  };

  const handleFetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users/login/success", {
        withCredentials: true,
      });
      console.log("🚀 ~ file: SignInForm.tsx:56 ~ handleFetchUser ~ res", res.data?.user);
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(res.data?.user));
      navigate("/home");
      // setUser(res.data.user);
    } catch (error) {
      dispatch(setIsAuthenticated(false));
      dispatch(setAuthUser(null));
      navigate("/home");
    }
  };

  const handleLoginSocial = (social: string) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const newWindow = window.open(
      `http://localhost:3000/api/v1/users/${social}/callback`,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("We are authenticated");
          handleFetchUser();
          if (timer) clearInterval(timer);
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="border border-1 border-solid border-[rgb(219, 219, 219)] w-[350px] p-10 pb-4">
        <div className="bg-no-repeat bg-auto bg-img bg-[url('../../public/logo.png')] h-[51px] bg-[50%_-52px] mb-5"></div>
        <form className="pb-0" onSubmit={handleSubmit}>
          <div className="border border-1 border-solid border-[rgb(219, 219, 219)] rounded-[2px] p-[9px] text-[12px]">
            <input
              type="text"
              placeholder="Username"
              autoCapitalize="off"
              autoCorrect="off"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-ellipsis block mr-0 w-full"
            />
          </div>
          <div className="flex border border-1 border-solid border-[rgb(219, 219, 219)] rounded-[2px] p-[9px] text-[12px] mt-1">
            <input
              type="password"
              placeholder="Password"
              autoCapitalize="off"
              autoCorrect="off"
              name="password"
              required
              ref={passwordInputRef}
              value={passwordInputRef.current?.value}
              className="text-ellipsis block mr-0 w-full"
              onChange={handleChangePasswordInput}
            />
            {isPasswordInputChange && (
              <span className="cursor-pointer" onClick={handleChangeTypePasswordInput}>
                {!isShowTextPassword ? "Show" : "Hide"}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 w-full focus:outline-none focus:ring-4font-medium rounded-[8px] text-sm px-5 py-1.5 text-center mr-2 mb-2 mt-4"
          >
            Log in
          </button>
        </form>
        <div className="flex justify-center items-center">
          <div className="bar"></div>
          <span className="mx-[18px] relative top-[2px] text-[#7a7a7a]">OR</span>
          <div className="bar"></div>
        </div>
        <div className="flex justify-center my-5 gap-1 cursor-pointer" onClick={() => handleLoginSocial("github")}>
          <LogoGithub color={"#010001"} height="20px" width="20px" />
          <span className="text-[#010001] relative font-medium text-[14px]">Log in with Github</span>
        </div>
        <div className="flex justify-center my-5 gap-1 cursor-pointer" onClick={() => handleLoginSocial("google")}>
          <LogoGoogle color={"#e34832"} height="20px" width="20px" />
          <span className="text-[#e34832] relative font-medium text-[14px]">Log in with Google</span>
        </div>
        <Link to={"/"} className={"text-center block text-[12px] text-[#00376b]"}>
          Forgot password?
        </Link>
      </div>
      <div className="border border-1 border-solid border-[rgb(219, 219, 219)] w-[350px] p-10 py-4 mt-2">
        <div className="flex justify-center items-center gap-[3px]">
          <span>Don't have an account? </span>
          <Link to={"/sign-up"} className={"text-center block font-bold text-blue-500 leading-3"}>
            Sign up
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

import React, { useEffect } from "react";

const LoginSuccess: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return <div>Login successfully!</div>;
};

export default LoginSuccess;

import axios from "axios";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const fetch = async () => {
    try {
      const data = await axios.get("http://localhost:3000/api/v1/users", {
        withCredentials: true,
      });
      console.log("🚀 ~ file: SignInForm.tsx:37 ~ handleSubmit ~ data", data);
    } catch (error) {}
  };

  useEffect(() => {
    fetch();
  });
  return <div>Home</div>;
};

export default Home;

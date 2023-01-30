import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  const [user, setUser] = useState(null);
  console.log("🚀 ~ file: App.tsx:11 ~ App ~ user", user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/users/login/success", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to={"/"} />}>
          {/* nested route */}
          {/* <Route path="user" element={<User />} />
          <Route path="system" element={<System />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customer/:id" element={<CustomerDetail />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginSuccess from "./pages/LoginSuccess/LoginSuccess";
import NotFound from "./pages/NotFound/NotFound";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { useAppSelector } from "./store/hooks";

function App() {
  const userAuth = useAppSelector((state) => state.auth.authUser);
  console.log("🚀 ~ file: App.tsx:16 ~ App ~ userAuth", userAuth);

  return (
    <div>
      <Routes>
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/" element={!userAuth ? <SignIn /> : <Navigate to={"/home"} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={userAuth ? <Home /> : <Navigate to={"/"} />}>
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

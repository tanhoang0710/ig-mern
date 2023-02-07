import { Navigate, Route, Routes } from "react-router-dom";
import ExplorePage from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import LoginSuccess from "./pages/LoginSuccess/LoginSuccess";
import NotFound from "./pages/NotFound/NotFound";
import ProfilePage from "./pages/Profile/ProfilePage";
import RootPage from "./pages/Root/RootPage";
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
        <Route
          path="/home"
          element={
            userAuth ? (
              <RootPage>
                <Home />
              </RootPage>
            ) : (
              <Navigate to={"/"} />
            )
          }
        >
          {/* nested route */}
        </Route>
        <Route
          path="/explore"
          element={
            <RootPage>
              <ExplorePage />
            </RootPage>
          }
        />
        <Route
          path="/profile"
          element={
            <RootPage>
              <ProfilePage />
            </RootPage>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

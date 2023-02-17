import { Navigate, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/Create/CreatePage";
import ExplorePage from "./pages/Explore/Explore";
import Home from "./pages/Home/Home";
import LoginSuccess from "./pages/LoginSuccess/LoginSuccess";
import MessagesPage from "./pages/Messages/MessagesPage";
import NotFound from "./pages/NotFound/NotFound";
import NotificationsPage from "./pages/Notifications/NotificationsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ReelsPage from "./pages/Reels/ReelsPage";
import RootPage from "./pages/Root/RootPage";
import SearchPage from "./pages/Search/SearchPage";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import UserPage from "./pages/User/UserPage";
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
          path="/search"
          element={
            <RootPage>
              <SearchPage />
            </RootPage>
          }
        />
        <Route
          path="/explore"
          element={
            <RootPage>
              <ExplorePage />
            </RootPage>
          }
        />
        <Route
          path="/reels/video"
          element={
            <RootPage>
              <ReelsPage />
            </RootPage>
          }
        />
        <Route
          path="/direct/inbox"
          element={
            <RootPage>
              <MessagesPage />
            </RootPage>
          }
        />
        <Route
          path="/notifications"
          element={
            <RootPage>
              <NotificationsPage />
            </RootPage>
          }
        />
        <Route
          path="/create"
          element={
            <RootPage>
              <CreatePage />
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
        <Route
          path="/:username"
          element={
            <RootPage>
              <UserPage />
            </RootPage>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

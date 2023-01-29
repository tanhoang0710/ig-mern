import { Route, Routes } from "react-router-dom";
import PrivatedRoute from "./components/PrivatedRoute";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <PrivatedRoute>
              <Home />
            </PrivatedRoute>
          }
        >
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

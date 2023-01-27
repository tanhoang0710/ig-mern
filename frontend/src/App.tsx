import { useRoutes } from "react-router-dom";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    // {
    //   path: "/staff/*",
    //   element: <Staff />,
    // },
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
  ]);

  return <div>{elements}</div>;
}

export default App;

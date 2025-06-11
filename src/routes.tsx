import Home from "./pages/Home";

type Route = {
  path: string;
  element: React.ReactElement;
};
export const routes: Route[] = [
  {
    path: "/",
    element: <Home />,
  },
];

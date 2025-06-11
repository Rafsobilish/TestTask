import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { AnimatePresence } from "framer-motion";
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element }, index) => (
          <Route path={path} key={index} element={element} />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

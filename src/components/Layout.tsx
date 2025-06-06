import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: var(--background, linear-gradient(180deg, #cddffc 0%, #fff 100%));
  display: flex;
  flex-direction: column;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
`;

const Layout = () => {
  const location = useLocation();

  return (
    <LayoutWrapper>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </LayoutWrapper>
  );
};

export default Layout;

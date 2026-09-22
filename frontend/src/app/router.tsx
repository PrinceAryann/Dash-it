import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import React, { Suspense } from "react";
const Home = React.lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const About = React.lazy(() => import("@/pages/About").then(m => ({ default: m.About })));
const Work = React.lazy(() => import("@/pages/Work").then(m => ({ default: m.Work })));
const Services = React.lazy(() => import("@/pages/Services").then(m => ({ default: m.Services })));
const Contact = React.lazy(() => import("@/pages/Contact").then(m => ({ default: m.Contact })));
const Privacy = React.lazy(() => import("@/pages/Privacy").then(m => ({ default: m.Privacy })));
const Terms = React.lazy(() => import("@/pages/Terms").then(m => ({ default: m.Terms })));
const NotFound = React.lazy(() => import("@/pages/NotFound").then(m => ({ default: m.NotFound })));
const ProjectDetails = React.lazy(() => import("@/pages/ProjectDetails").then(m => ({ default: m.ProjectDetails })));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.4
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
const Login = React.lazy(() => import("@/pages/Auth/Login").then(m => ({ default: m.default })));
const Dashboard = React.lazy(() => import("@/pages/Admin/Dashboard").then(m => ({ default: m.default })));
const ServerError = React.lazy(() => import("@/pages/ServerError").then(m => ({ default: m.ServerError })));

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen bg-bg-base flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin" /></div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
          <Route path="/projects/:slug" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
          <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
          
          {/* Error Routes */}
          <Route path="/offline" element={<PageWrapper><ServerError /></PageWrapper>} />
          
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, SmoothScrollProvider } from "@/context";
import { AuthProvider } from "@/context/AuthContext";
import { CustomCursor } from "@/components/animations";
import { LoadingScreen } from "@/components/loaders";
import { ScrollToTop } from "@/components/shared";

import { AnimatedRoutes } from "./router";

export default function App() {
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
      try {
        const response = await originalFetch.apply(this, args);
        if ([502, 503, 504].includes(response.status)) {
          if (!window.location.pathname.includes('/offline') && !sessionStorage.getItem('offlineBypass')) {
            window.location.pathname = '/offline';
          }
        }
        return response;
      } catch (error) {
        // Network errors
        if (!window.location.pathname.includes('/offline') && !sessionStorage.getItem('offlineBypass')) {
          window.location.pathname = '/offline';
        }
        throw error;
      }
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="dashit-theme">
        <AuthProvider>
          <SmoothScrollProvider>
            <LoadingScreen />
            <CustomCursor />
            <Router>
              <ScrollToTop />
              <AnimatedRoutes />
            </Router>
          </SmoothScrollProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

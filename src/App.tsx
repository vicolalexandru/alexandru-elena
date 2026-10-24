import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./i18n/LanguageContext";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";

// Photo sharing stays in the repo. Leave this off so guests cannot open it yet.
const PHOTO_UPLOAD_ENABLED = false;

const queryClient = new QueryClient();

// Vite's BASE_URL always ends with "/". React Router wants no trailing slash.
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <ErrorBoundary>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
          >
            Skip to content
          </a>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={routerBasename}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              {PHOTO_UPLOAD_ENABLED && <Route path="/upload" element={<Upload />} />}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </ErrorBoundary>
);

export default App;

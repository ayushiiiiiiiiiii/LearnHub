import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import CoursePage from "./pages/CoursePage";
import NotFound from "./pages/NotFound";
import DSASheet from './pages/DSASheet';
import CSFundamentals from '@/pages/CSFundamentals';
import LearningAnalytics from "@/components/LearningAnalytics";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/dsa-sheet" element={<DSASheet />} />
          <Route path="/cs-fundamentals" element={<CSFundamentals />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/analytics" element={<LearningAnalytics />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

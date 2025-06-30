
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToolsProvider } from "./components/tools/ToolRenderer";

// Pages
import Index from "./pages/Index";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import AllToolsPage from "./pages/AllToolsPage";
import ToolPage from "./pages/ToolPage";
import ToolCategoryPage from "./pages/ToolCategoryPage";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

// Import CSS
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToolsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:categoryId" element={<CategoryPage />} />
              <Route path="/all-tools" element={<AllToolsPage />} />
              <Route path="/tools/:toolId" element={<ToolPage />} />
              <Route path="/tool-category/:categoryId" element={<ToolCategoryPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ToolsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

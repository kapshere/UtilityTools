
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import AllToolsPage from "./pages/AllToolsPage";
import ToolPage from "./pages/ToolPage";
import FavoritesPage from "./pages/FavoritesPage";
import ToolCategoryPage from "./pages/ToolCategoryPage";
import SuggestTool from "./pages/SuggestTool";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/all-tools" element={<AllToolsPage />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/tool-category/:categoryId" element={<ToolCategoryPage />} />
          <Route path="/suggest-tool" element={<SuggestTool />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "@/contexts/CartContext"
import Navbar from "@/components/Navbar"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import NotFound from "./pages/NotFound"
import "bootstrap/dist/css/bootstrap.min.css"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className='w-full bg-background'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Products />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App

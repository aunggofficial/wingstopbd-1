import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";

/**
 * Wing Stop BD - Premium Restaurant Website
 * Design: Cosmic Minimalism with 3D Parallax Scrolling
 * 
 * Color Palette:
 * - Deep Space Black: #0a0e27 (background)
 * - Electric Cyan: #00d9ff (primary accent)
 * - Deep Violet: #7c3aed (secondary accent)
 * - Neon Red/Orange: #ff6b35 (food highlights)
 * - Light Lavender: #e0e7ff (text)
 */

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/menu"} component={Menu} />
      <Route path={"/reservations"} component={Reservations} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

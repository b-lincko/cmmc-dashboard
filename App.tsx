import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DifficultyView from "./pages/DifficultyView";
import CategoryView from "./pages/CategoryView";
import ImplementationGuide from "./pages/ImplementationGuide";
import CommandReference from "./pages/CommandReference";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Login} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/difficulty"} component={DifficultyView} />
      <Route path={"/category"} component={CategoryView} />
      <Route path={"/implementation"} component={ImplementationGuide} />
      <Route path={"/commands"} component={CommandReference} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

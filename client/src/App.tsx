import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Machines from "@/pages/Machines";
import MachineDetail from "@/pages/MachineDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Finansiering from "@/pages/Finansiering";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/maskiner/:kategori?" component={Machines} />
      <Route path="/maskine/:id" component={MachineDetail} />
      <Route path="/om-os" component={About} />
      <Route path="/kontakt" component={Contact} />
      <Route path="/finansiering" component={Finansiering} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

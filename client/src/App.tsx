import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import TestPage from "./test-page";
import SimpleHome from "@/pages/simple-home";
import Home from "@/pages/home";
import VisitSchedulePage from "@/pages/visit-schedule";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/test" component={TestPage} />
      <Route path="/" component={SimpleHome} />
      <Route path="/full" component={Home} />
      <Route path="/agendar-visita" component={VisitSchedulePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;

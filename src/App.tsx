import "./App.css";
import AnimatedRoutes from "./AnimatedRoutes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-[#222222]">
      <QueryClientProvider client={queryClient}>
        <div className="">
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;

import React from "react";
import Header from "./components/header";
import { QueryClient, QueryClientProvider } from "react-query";
import "animate.css";
import Routes from "./router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mt-20">
        <ToastContainer />
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;

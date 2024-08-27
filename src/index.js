import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import Loader from "components/loader/Loader";
import './assets/css/global-style.scss';

const App = lazy(() => import("./App"));

const container = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <Suspense fallback={
    <div className="whole-page-loader-container">
      <Loader dotsColor={'black'} />
    </div>
  }
  >
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ArgonControllerProvider>
          <PerfectScrollbar>
            <App />
          </PerfectScrollbar>
        </ArgonControllerProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
    </QueryClientProvider>
  </Suspense>
);

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Authenticator } from "@aws-amplify/ui-react";
import ErrorBoundary from "./app/components/error/ErrorBoundary";
import Routes from "./app/routes";
import { overrideConsole } from "./app/utils/utils";
import "./styles/index.scss";
import "@aws-amplify/ui-react/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { cacheTime: 0, staleTime: 0 },
  },
});

const Body = () => {
  return <Routes />;
};

const App = () => {
  const { REACT_APP_ENV: env } = process.env;
  if (env === "prod") {
    overrideConsole();
  }
  return (
    <div className="museo">
      <ErrorBoundary>
        <Authenticator.Provider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <ChakraProvider value={defaultSystem}>
                <Body />
              </ChakraProvider>
            </QueryClientProvider>
          </BrowserRouter>
        </Authenticator.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default App;

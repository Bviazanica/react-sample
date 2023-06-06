import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { TodoContextProvider } from "./contexts/todo-context.tsx";
import { SnackbarProvider, DURATION } from "baseui/snackbar";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const engine = new Styletron();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <QueryClientProvider client={queryClient}>
          <TodoContextProvider>
            <SnackbarProvider defaultDuration={DURATION.short}>
              <Router basename="/">
                <App />
              </Router>
            </SnackbarProvider>
          </TodoContextProvider>
        </QueryClientProvider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);

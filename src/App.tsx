import React from "react";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { AppRoutes } from "./app/routes/routes";
import { mainTheme } from "./shared/ui/themes";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <div className="app">
          <AppRoutes />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

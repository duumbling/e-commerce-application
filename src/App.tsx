import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./shared/ui/Layout";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFoundPage from "./pages/notFound";
import { Paths } from "./shared/constants/paths";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={Paths.Main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={Paths.Login} element={<LoginPage />} />
          <Route path={Paths.Register} element={<RegisterPage />} />
          <Route path={Paths.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { isExpired } from "react-jwt";
import { token } from "./Components/Tools/Token";
import Home from "./Components/Home/Home";
import RegisterForm from "./Components/Register/RegisterForm";
import Layout from "./Components/Dashboard/Layout";
import RequireAuth from "./RequireAuth";
import Dashboard from "./Components/Dashboard/Dashboard";
import SettingPage from "./Components/Settings/SettingPage";
import ServerPage from "./Components/Servers/ServerPage";
import DocumentationPage from "./Components/Documentation/DocumentationPage";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<RegisterForm />} />
      {/* <Route element={<PersistLogin />}></Route> */}
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<ProtectedRoute />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/servers" element={<ServerPage />} />
            <Route path="/documenation" element={<DocumentationPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isExpired(token)) {
      navigate("/login");
    }
  }, [navigate]);

  return <Home />;
}

export default App;

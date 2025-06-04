import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./pages/Main";
import Feature from "./pages/Feature";
import CreateFeature from "./pages/CreateFeature";
import Config from "./pages/config";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
       <Route path="/:handle" element={<Feature />} />
       <Route path="/config" element={<Config />} />

        {/* <Route path="/createFeature" element={<CreateFeature />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

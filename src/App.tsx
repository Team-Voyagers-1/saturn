import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./pages/Main";
import Feature from "./pages/Feature";
import CreateFeature from "./pages/CreateFeature";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/main" element={<Main />} />
        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
       <Route path="/:handle" element={<Feature />} />
        {/* <Route path="/createFeature" element={<CreateFeature />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

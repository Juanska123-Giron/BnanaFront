import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Home } from "./components/Home.jsx";
import { Login } from './components/Login.jsx'; 
import { Register } from "./components/Register.jsx";
import { ConfirmAccount } from "./components/ConfirmAccount.jsx";
import { OlvidePassword } from "./components/OlvidePassword.jsx";
import { NuevoPassword } from './components/NuevoPassword.jsx';
import { UsuarioInfo } from './components/UsuarioInfo.jsx';
import { EvaluacionSoftware } from './components/EvaluacionSoftware.jsx';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [mostrarEvaluacion, setMostrarEvaluacion] = useState(false); 

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              mostrarEvaluacion ? (
                <EvaluacionSoftware /> // Muestra el componente de evaluación
              ) : (
                <Home // Componente original con una prop adicional
                  isPopoverOpen={isPopoverOpen}
                  handlePopoverOpen={() => setIsPopoverOpen(true)}
                  handlePopoverClose={() => setIsPopoverOpen(false)}
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                  setMostrarEvaluacion={setMostrarEvaluacion} // Pasamos la función para cambiar el estado
                />
              )
            }
          />
          <Route path="/login" element={<Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/confirm-account" element={<ConfirmAccount />} />
          <Route path="/olvide-password" element={<OlvidePassword />} />
          <Route path="/nuevoPassword" element={<NuevoPassword />} />
          <Route path="/usuarioInfo" element={<UsuarioInfo loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
          {/* Agrega aquí el resto de tus rutas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
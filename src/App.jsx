import { Login } from './components/Login.jsx'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./components/Home.jsx";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Register } from "./components/Register.jsx";
import { ConfirmAccount } from "./components/ConfirmAccount.jsx";
import { OlvidePassword } from "./components/OlvidePassword.jsx";
import { NuevoPassword } from './components/NuevoPassword.jsx';
import { UsuarioInfo } from './components/UsuarioInfo.jsx';
import { Navbar } from '@material-tailwind/react';
import { Productos } from './components/Productos.jsx';
import { AgregarProductos } from './components/AgregarProductos.jsx';
import { ProductoDetalle } from './components/ProductoDetalle.jsx';
import { AdministrarProductos } from './components/AdministrarProductos.jsx';
import { EditarProducto } from './components/EditarProducto.jsx';
import { AdministrarOpiniones } from './components/AdministrarOpiniones.jsx';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  }

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  }

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
              <Home
                isPopoverOpen={isPopoverOpen}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
          <Route path="/login" element={<Login loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/create-account" element={<Register/>} />
          <Route path="/confirm-account" element={<ConfirmAccount/>} />
          <Route path="/olvide-password" element={<OlvidePassword/>} />
          <Route path="/nuevoPassword" element={<NuevoPassword/>} />
          <Route path="/usuarioInfo" element={<UsuarioInfo isPopoverOpen={isPopoverOpen} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/productos" element={<Productos isPopoverOpen={isPopoverOpen} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/agregarProductos" element={<AgregarProductos isPopoverOpen={isPopoverOpen} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/productoDetalle/:id" element={<ProductoDetalle isPopoverOpen={isPopoverOpen} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/administrarProductos" element={<AdministrarProductos isPopoverOpen={isPopoverOpen} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/editarProductos/:id" element={<EditarProducto isPopoverOpen={isPopoverOpen} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/administrarOpiniones" element={<AdministrarOpiniones isPopoverOpen={isPopoverOpen} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;


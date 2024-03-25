import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

export const Login = ({ loggedInUser, setLoggedInUser }) => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  useEffect(() => {
    let errorTimeout; // Variable para almacenar el identificador del timeout

    if (error) {
      // Si hay un mensaje de error, configura el timeout para ocultarlo después de 5 segundos
      errorTimeout = setTimeout(() => {
        setError('');
      }, 3000);
    }

    // Limpia el timeout si el componente se desmonta o si cambia el mensaje de error
    return () => clearTimeout(errorTimeout);
  }, [error]);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', { email, password });
      console.log(response.data); // Puedes manejar la respuesta del backend aquí
      const { data } = response;

      localStorage.setItem('token', data.token);
      setLoggedInUser(data);
      setUsername(data.username);
      navigate('/');
      console.log('Usuario logueado:', loggedInUser);
  
      // Realiza las acciones necesarias después de iniciar sesión exitosamente
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error); // Puedes manejar el error aquí
      
    }
    setEmail('');
    setPassword('');
    passwordRef.current.value = '';
  };

  return (
      <>
        <div data-aos="zoom-out" className="flex min-h-full flex-1 flex-col justify-center items-center px-6 pt-20 lg:px-8 mt-14">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to={"/"}>
              <img
                className="mx-auto h-10 w-auto"
                src="/img/banana.svg"
                alt="Your Company"
              />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Entra usando tu cuenta!
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && (
              <div className="mb-4 text-rose-600 text-center text-sm">{error}</div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address*
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password*
                  </label>
                  <div className="text-sm">
                    <Link to="/olvide-password" className="font-semibold text-amber-800 hover:text-amber-700">
                      Olvidó la contraseña?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    ref={passwordRef}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600/[.9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600/[.9]"
                >
                  Ingresar
                </button>
              </div>
            </form>
            {!username && (
              <>
                <p className="mt-10 text-center text-sm text-gray-500">
                  No tienes cuenta?{' '}
                  <Link to="/create-account" className="font-semibold leading-6 text-amber-800 hover:text-amber-600">
                    Regístrate
                  </Link>
                </p>
                <p className="mt-2 text-center text-sm text-gray-500">
                  
                  <Link to="/confirm-account" className="font-semibold leading-6 text-amber-800 hover:text-amber-600">
                    ¡Hey! Confirma tu cuenta aquí
                  </Link>
                </p>
              </>
            )}

          </div>
        </div>
      </>
  )
}

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';

export const OlvidePassword = () => {

    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [showTokenForm, setShowTokenForm] = useState(false);
    const [token, setToken] = useState('');

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

    useEffect(() => {
        let successTimeout; // Variable para almacenar el identificador del timeout
        if (msg) {
          // Si hay un mensaje de éxito, configura el timeout para ocultarlo después de 3 segundos
          setShowSuccess(true);
          successTimeout = setTimeout(() => {
            setMsg('');
            setShowSuccess(false);
          }, 3000);
        }
    
        // Limpia el timeout si el componente se desmonta o si cambia el mensaje de éxito
        return () => clearTimeout(successTimeout);
    }, [msg]);
    
      
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const response = await axios.post('http://localhost:3000/api/usuarios/olvide-password', { email });
        console.log(response);
        setMsg(response.data.msg);
        //navigate('/login');
      } catch (error) {
        setError(error.response.data.msg);
        console.log(error);
      }
      setEmail('');
    };

    const handleTokenSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3000/api/usuarios/olvide-password/${token}`);
            console.log(response);
            setMsg(response.data.msg);
            navigate('/nuevoPassword', { state: { token: token } });
          } catch (error) {
            setError(error.response.data.msg);
            console.log(error);
          }
          setEmail('');
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
                  Solicita tu token!
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && !setShowSuccess && (
                <div className="mb-4 text-rose-600 text-center text-sm">{error}</div>
            )}
            {setShowSuccess && (
                <div className="mb-4 text-green-600 text-center text-sm">{msg}</div>
            )}
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email*
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600/[.9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600/[.9]"
                  >
                    Solicitar
                  </button>
                </div>
              </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                Ya tienes un el token?{' '}
                <a onClick={() => setShowTokenForm(true)} className="font-semibold leading-6 text-amber-800 hover:text-amber-600">
                    Validar
                </a>
                </p>
                {showTokenForm && (
                    <form data-aos="zoom-in" className="space-y-6 mt-6" onSubmit={handleTokenSubmit}>
                        <div>
                        <label htmlFor="token" className="block text-sm font-medium leading-6 text-gray-900">
                            Token*
                        </label>
                        <div className="mt-2">
                            <input
                            id="token"
                            name="token"
                            type="text"
                            required
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <button
                            type="submit"
                            className="my-8 flex ml-auto w-1/2 justify-center rounded-md bg-stone-600/[.9] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                        >
                            Validar
                        </button>
                        </div>
                    </form>
                )}
            </div>
          </div>
        </>
    )
}

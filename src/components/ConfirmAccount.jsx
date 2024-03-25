import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const ConfirmAccount = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState('');
      
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const response = await axios.get(`http://localhost:3000/api/usuarios/confirmar/${token}`);
        console.log(response.data);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }

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
                  Confirma usando tu JWT!
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Token de usuario
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
                    className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600/[.9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600/[.9]"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
                  <p className="mt-10 text-center text-sm text-gray-500">
                    Ya estás confirmado?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-amber-800 hover:text-amber-600">
                        Login
                    </Link>
                  </p>
            </div>
          </div>
        </>
    )
}

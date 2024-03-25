import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import axios from 'axios';

export const Register = ( ) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let errorTimeout; // Variable para almacenar el identificador del timeout

        if (error) {
            // Si hay un mensaje de error, configura el timeout para ocultarlo después de t seg
            errorTimeout = setTimeout(() => {
            setError('');
            }, 3000);
        }

        // Limpiar el timeout si el componente se desmonta o si cambia el mensaje de error
        return () => clearTimeout(errorTimeout);
    }, [error]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        const response = await axios.post('http://localhost:3000/api/usuarios', {
            email,
            password,
            nombre,
            username,
            telefono,
        });

        console.log(response.data); // Puedes manejar la respuesta del backend aquí

        // Realiza las acciones necesarias después de registrar exitosamente al usuario

        navigate('/'); // Redirige al usuario a la página de inicio de sesión
        } catch (error) {
        setError(error.response.data.msg);
        console.log(error); // Puedes manejar el error aquí
        }

        // Reinicia los campos del formulario después de enviarlo
        setEmail('');
        setPassword('');
        setNombre('');
        setUsername('');
        setTelefono('');
    };


    return (
        <>
          <div data-aos="zoom-out" className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-9 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Link to={"/"}>
                <img
                  className="mx-auto h-10 w-auto"
                  src="/img/banana.svg"
                  alt="Your Company"
                />
              </Link>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Crea aquí tu nueva cuenta!
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               {error && (
                  <div className="mb-4 text-rose-600 text-center text-sm">{error}</div>
               )}
              <form className="space-y-6"  onSubmit={handleSubmit} method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email*
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nombre*
                        </label>
                        <div className="mt-2">
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                autoComplete="nombre"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={nombre}
                                onChange={(event) => setNombre(event.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Usuario*
                        </label>
                        <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                            Teléfono*
                        </label>
                        <div className="mt-2">
                        <input
                            id="telefono"
                            name="telefono"
                            type="text"
                            autoComplete="telefono"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={telefono}
                            onChange={(event) => setTelefono(event.target.value)}
                            />
                        </div>
                    </div>
        
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password*
                            </label>
                        </div>
                        <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600/[.9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600/[.9]"
                        >
                            Crear
                        </button>
                    </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Ya tienes una cuenta?{' '}
                <Link to="/Login" className="font-semibold leading-6 text-amber-800 hover:text-amber-600">
                  Ingresa
                </Link>
              </p>
            </div>
          </div>
        </>
    )
}

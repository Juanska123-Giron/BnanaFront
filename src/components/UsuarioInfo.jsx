import React from 'react';
import { useEffect } from 'react';
import { Navbar } from './Navbar.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Footer } from './Footer';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export const UsuarioInfo = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose }) => {
        
        const location = useLocation();
        const loggedInUser = location.state.loggedInUser;
        const navigate = useNavigate();
      
      
        return (
        <div>
          <div>
                <div data-aos="zoom-out">
                        <Navbar
                            isPopoverOpen={isPopoverOpen}
                            handlePopoverOpen={handlePopoverOpen}
                            handlePopoverClose={handlePopoverClose}
                            loggedInUser={loggedInUser}
                        />
                </div>
          </div>
           
          <div data-aos="zoom-in">

          <div className={`my-20 mb-38 max-w-6xl mx-auto relative overflow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
                <div className={`px-4 md:px-0 sm:mx-0 relative overfxlow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                        <h3 className="mr-0 text-base font-medium text-gray-900">Información de usuario</h3>
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">Datos personales e información privada.</p>
                </div>
                <div className="mt-6 ml-0 w-5/5 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Identificación</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{loggedInUser._id}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{loggedInUser.nombre}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{loggedInUser.username}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Teléfono</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{loggedInUser.telefono}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{loggedInUser.email}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Contraseña</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <Link to="/olvide-password" className="font-normal text-amber-800 hover:text-amber-700">
                                                Cambia tu contraseña
                                        </Link>
                                </dd>
                            </div>
                            {loggedInUser._id === "646016258b16b2d008319f05" && (
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Opciones de administrador</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <Link to='/agregarProductos'
                                        state={{ loggedInUser }}
                                        className="inline-block bg-amber-500 hover:bg-stone-600/[.9] text-white px-5 py-1.5 text-sm rounded cursor-pointer"
                                        >
                                           Agregar productos
                                        </Link>
                                        <Link
                                        to={{
                                        pathname: '/administrarProductos',
                                        state: loggedInUser // Pasa loggedInUser directamente, sin envolverlo en un objeto
                                        }}
                                        className="ml-3 inline-block bg-red-600 hover:bg-stone-600/[.9] text-white px-5 py-1.5 text-sm rounded cursor-pointer"
                                        >
                                        Administrar productos
                                        </Link>
                                        </dd>
                                </div>
                              )}
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Opiniones</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <Link to="/administrarOpiniones" className="font-normal text-amber-800 hover:text-amber-700">
                                                Ver mis opiniones
                                        </Link>
                                </dd>
                            </div>
                            
                        </dl>
                </div>
          </div>
          </div>
          <Footer/>
        </div>
    )
}

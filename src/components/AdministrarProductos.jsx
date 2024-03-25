import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { EliminarProductoModal } from './EliminarProductoModal.jsx';

export const AdministrarProductos = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose, loggedInUser }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [productos, setProductos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);
    

    useEffect(() => {
        obtenerProductos();
    }, []);
    
    const obtenerProductos = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/productos/');
          setProductos(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const handleEliminarClick = (id) => {
        setProductoAEliminar(id);
        setModalOpen(true);
    };
    
    const handleCancelarEliminar = () => {
        setProductoAEliminar(null);
        setModalOpen(false);
    };
    
    return (
        <div>
            <div data-aos="zoom-out">
                <Navbar
                    isPopoverOpen={isPopoverOpen}
                    handlePopoverOpen={handlePopoverOpen}
                    handlePopoverClose={handlePopoverClose}
                    loggedInUser={loggedInUser}
                />
            </div>
            <div data-aos="zoom-in">

                <div className={`my-20 mb-38 max-w-6xl mx-auto relative overflow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
                    <div className={`px-4 md:px-0 sm:mx-0 relative overfxlow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                            <h3 className="mr-0 text-base font-medium text-gray-900">Módulo de administración de artículos</h3>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">Aquí podrás editar y eliminar productos, o alterar atributos determinados</p>
                    </div>
                    <div className="mt-6 ml-0 w-5/5">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dd className="text-sm font-medium leading-6 text-gray-900">Id</dd>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">Nombre</dd>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">Acciones</dd>

                            </div>
                            {productos.map((producto) => (
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t" key={producto._id}>
                                    <dd className="text-sm font-medium leading-6 text-gray-900">{producto._id}</dd>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{producto.nombre_producto}</dd>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 flex justify-between">
                                        <Link
                                            to={{
                                                pathname: `/editarProductos/${producto._id}`,
                                                state: { loggedInUser, isPopoverOpen, handlePopoverOpen, handlePopoverClose } // Puedes pasar otros props adicionales aquí
                                            }}
                                            className="inline-block bg-amber-500 hover:bg-stone-600/[.9] text-white px-10 py-1.5 text-sm rounded cursor-pointer"
                                        >
                                        Editar
                                        </Link>
                                        <Link
                                        className="ml-3 inline-block bg-red-600 hover:bg-stone-600/[.9] text-white px-10 py-1.5 text-sm rounded cursor-pointer"
                                        onClick={() => handleEliminarClick(producto._id)}
                                        >
                                        Eliminar
                                        </Link>
                                        <Link
                                            to={{
                                                pathname: `/productoDetalle/${producto._id}`,
                                                state: { loggedInUser, isPopoverOpen, handlePopoverOpen, handlePopoverClose } // Puedes pasar otros props adicionales aquí
                                            }}
                                            className="ml-3 inline-block bg-amber-900 hover:bg-stone-600/[.9] text-white px-10 py-1.5 text-sm rounded cursor-pointer"
                                        >
                                        Ver
                                        </Link>
                                    </dd>
                                </div>
                            ))}
                            
                        </dl>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <EliminarProductoModal
                    productoAEliminar={productoAEliminar}
                    handleCancelarEliminar={handleCancelarEliminar}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                    obtenerProductos={obtenerProductos}
                />
            )}
            <Footer/>
        </div>
    )
}

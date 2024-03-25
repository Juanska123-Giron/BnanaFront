import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const AgregarProductos = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const loggedInUser = location.state.loggedInUser;
    const [producto, setProducto] = useState({
        nombre_producto: '',
        descripcion: '',
        imagenPath: '',
        precio: '',
        stock: '',
        creadores: [loggedInUser._id]
    });

    const [respuestaBackend, setRespuestaBackend] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevProducto) => ({
            ...prevProducto,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/api/productos/', producto, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Agrega el encabezado de autorización con el token almacenado en localStorage
                }
            });
    
            // Manejar la respuesta exitosa
            console.log(response.data);
            setRespuestaBackend({ tipo: 'success', mensaje: response.data.mensaje });
            // Limpiar el mensaje después de 3 segundos
            setTimeout(() => {
                setProducto({
                    nombre_producto: '',
                    descripcion: '',
                    imagenPath: '',
                    precio: '',
                    stock: '',
                    creadores: [loggedInUser._id]
                });
                setRespuestaBackend(null);
            }, 3000);

            setTimeout(() => {
                navigate('/productos');
            }, 3000);

        } catch (error) {
            // Manejar el error
            console.error(error);
            setRespuestaBackend({ tipo: 'error', mensaje: response.data.mensaje });

        }
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
                
                <div className={`my-20 mb-44 max-w-6xl mx-auto relative overflow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
                    <div className={`px-4 sm:px-0 relative overfxlow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                        <h3 className="mr-0 text-base font-medium text-gray-900">Crear nuevo producto</h3>
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">Añade la información y agregar un producto a la tienda.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-6 ml-0 w-5/5">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-5">
                            <div className="sm:col-span-2">
                                <label htmlFor="nombre_producto" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre del producto
                                </label>
                                <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="nombre_producto"
                                    id="nombre_producto"
                                    autoComplete="nombre_producto"
                                    className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={producto.nombre_producto} // Asigna el valor del estado
                                    onChange={handleChange} // Maneja el evento onChange
                                />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="number"
                                        name="stock"
                                        id="stock"
                                        autoComplete="stock"
                                        className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={producto.stock} // Asigna el valor del estado
                                        onChange={handleChange} // Maneja el evento onChange
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="imagenPath" className="block text-sm font-medium leading-6 text-gray-900">
                                    Imagen URL
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="imagenPath"
                                        id="imagenPath"
                                        autoComplete="imagenPath"
                                        className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={producto.imagenPath} // Asigna el valor del estado
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900">
                                    Precio
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="number"
                                        name="precio"
                                        id="precio"
                                        autoComplete="precio"
                                        className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={producto.precio} // Asigna el valor del estado
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="creadores" className="block text-sm font-medium leading-6 text-gray-900">
                                    Creador
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="creadores"
                                        id="creadores"
                                        autoComplete="creadores"
                                        className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={loggedInUser._id}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-5">
                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Descripción
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="descripcion"
                                        id="descripcion"
                                        rows={4}
                                        className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={producto.descripcion} // Asigna el valor del estado
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end">
                        <div className="flex items-center ml-auto">
                            {respuestaBackend && (
                            <div className={`mr-4 text-center text-sm ${respuestaBackend.tipo === 'error' ? 'text-rose-600' : 'text-green-600'}`}>
                                {respuestaBackend.mensaje}
                            </div>
                            )}
                            <button
                            type="submit"
                            className="block ml-auto rounded-md bg-stone-600/[.9] px-14 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 flex items-center justify-center"
                            >
                            Crear
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar.jsx';
import 'aos/dist/aos.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Footer } from './Footer.jsx';
import axios from 'axios';

export const Productos = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose, loggedInUser }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/productos/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Agrega el encabezado de autorización con el token almacenado en localStorage
            }
        })
        .then(response => {
            setProducts(response.data);
            console.log('Usuario logeado en Productos.jsx:', loggedInUser);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
      
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
          <div className={`my-20 mb-32 max-w-6xl mx-auto relative overflow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
                <div className={`px-4 sm:px-0 relative overfxlow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                        <h3 className="mr-0 text-sm font-medium text-gray-900">Productos disponibles</h3>
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">Accedes a miles de artículos ahora.</p>
                </div>
                <div className="-mt-4">
                    <div className="bg-white">
                        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                                {products.map((product) => (
                                   <Link
                                        key={product._id}
                                        to={{
                                            pathname: `/productoDetalle/${product._id}`,
                                            state: { loggedInUser, isPopoverOpen, handlePopoverOpen, handlePopoverClose } // Puedes pasar otros props adicionales aquí
                                        }}
                                        className="group"
                                    >
                                        <div data-aos="slide-up" className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={product.imagenPath}
                                                alt={product.nombre_producto}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 data-aos="fade-up-left-big" className="mt-4 text-sm text-gray-700">{product.nombre_producto}</h3>
                                        <p data-aos="flip-up" className="mt-1 text-lg font-medium text-gray-900">${parseFloat(product.precio).toLocaleString()}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
          </div>
          </div>
          <Footer/>
        </div>
    )
}

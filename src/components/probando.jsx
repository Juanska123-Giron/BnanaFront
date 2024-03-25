import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar.jsx';
import 'aos/dist/aos.css';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Footer } from './Footer.jsx';
import axios from 'axios';

export const Productos = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose, loggedInUser}) => {
    cconst [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/productos/')
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    const products = [
        {
          id: 1,
          name: 'Earthen Bottle',
          href: '#',
          price: '$48',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
          imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
          id: 2,
          name: 'Nomad Tumbler',
          href: '#',
          price: '$35',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
          imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
          id: 3,
          name: 'Focus Paper Refill',
          href: '#',
          price: '$89',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
          imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
          id: 4,
          name: 'Machined Mechanical Pencil',
          href: '#',
          price: '$35',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
          imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Machined Mechanical Pencil',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 6,
            name: 'Machined Mechanical Pencil',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 7,
            name: 'Nomad Tumbler',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 8,
            name: 'Nomad Tumbler',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 9,
            name: 'Nomad Tumbler',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 10,
            name: 'Nomad Tumbler',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
          },
        // More products...
      ]
      
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
          <div className={`my-20 mb-32 max-w-7xl mx-auto relative overflow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
                <div className={`px-4 sm:px-0 relative overfxlow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                        <h3 className="text-xl font-semibold leading-7 text-amber-600">Productos disponibles</h3>
                        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">Accedes a miles de artículos ahora.</p>
                </div>
                <div className="-mt-4">
                    <div className="bg-white">
                        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {products.map((product) => (
                                    <a key={product.id} href={product.href} className="group">
                                        <div data-aos="slide-up" className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                    </a>
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

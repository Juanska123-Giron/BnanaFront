import React, { useEffect } from 'react';
import { Navbar } from './Navbar'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Footer } from './Footer.jsx';
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import axios from 'axios';

const product = {
    name: 'Basic Tee 6-Pack',   
    price: '$192',
    href: '/productos',
    breadcrumbs: [
      { id: 1, name: 'Papeleria', href: '/productos' },
      { id: 2, name: 'Disponibles', href: '/productos' },
    ],
    images: [
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
    ],
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'Producto realizado a partir de ejemplares similares. Medídas estándar hechas por Bnana.',
  }
const reviews = { href: '#', average: 4, totalCount: 117 }
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  


export const ProductoDetalle = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose, loggedInUser, setLoggedInUser  }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const navigate = useNavigate();
    const location = useLocation();
    const [productData, setProductData] = useState(product);
    const [opinions, setOpinions] = useState([]);
    const [creators, setCreators] = useState([]);
    const [reviewContent, setReviewContent] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    

    
    


    const handleEnviarClick = async (e) => {
        e.preventDefault();
        if (!loggedInUser) {
          // Si no hay usuario logueado, mostrar un mensaje o redirigir al inicio de sesión
          setResponseMessage('Debes logearte para opininar');
          setIsSuccess(false);
        
          return;
          
        }
      
        const opinionData = {
          usuario: loggedInUser._id,
          producto: productData._id,
          contenidoOpinion: reviewContent,
        };
      
        try {
            const token = localStorage.getItem('token');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axios.post('http://localhost:3000/api/opiniones', opinionData);

            console.log('Opinión enviada:', response.data);
          
            // Agregar la nueva opinión a la lista existente
            fetchOpinions();
            setReviewContent('');
            
            setResponseMessage(response.data.mensaje);
            setIsSuccess(true);
          } catch (error) {
            console.log(error.response.data.mensaje);
            setResponseMessage(error.response.data.mensaje);
            setIsSuccess(false);
          }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          const fetchUserData = async () => {
            try {
              const response = await axios.get('http://localhost:3000/api/usuarios/perfil', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              const { data } = response;
              setLoggedInUser(data);
              console.log('Usuario logueado v2:', loggedInUser);

            } catch (error) {
              console.log(error);
            }
          };
    
          fetchUserData();
        }
    }, []);

    useEffect(() => {
        let timer;
      
        if (responseMessage) {
          // Si hay un mensaje de respuesta, establece un temporizador para ocultarlo después de 2 segundos
          timer = setTimeout(() => {
            setResponseMessage('');
            setIsSuccess(false);
            //navigate('/login');
          }, 2000);
        }
      
        // Al limpiar el efecto, asegúrate de cancelar el temporizador
        return () => clearTimeout(timer);
    }, [responseMessage]);


    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
          const fetchUserData = async () => {
            try {
              const response = await axios.get('http://localhost:3000/api/usuarios/perfil', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              const { data } = response;
              setLoggedInUser(data);
              console.log('Usuario loggeado:', loggedInUser);
            } catch (error) {
              console.log('No hay usuario logueado aún');
              setLoggedInUser([]);
            }
          };
    
          fetchUserData();
        }
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0); //Para empezar arriba siuuu
    }, []);
    
  
    useEffect(() => {
      const productId = location.pathname.split('/').pop();
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/productos/${productId}`);
          setProductData(response.data);
          console.log(response.data);
          
        } catch (error) {
          console.error('Error obteniendo data:', error);
        }
      };
  
      fetchData();
    }, [location.pathname]);
  
    useEffect(() => {
      if (productData) {
        // Aquí puedes realizar cualquier acción necesaria con los datos del producto cargado
        console.log('Producto cargado:', productData);
      }
    }, [productData]);

    useEffect(() => {
    
        fetchOpinions();
    }, [location.pathname]);

    useEffect(() => {
        const fetchCreators = async () => {
          try {
            const creatorData = await Promise.all(
              productData.creadores.map(async (creatorId) => {
                const response = await axios.get(`http://localhost:3000/api/usuarios/perfil/${creatorId}`);
                const creator = response.data;
                return creator;
              })
            );
    
            setCreators(creatorData);
            console.log(creatorData);
          } catch (error) {
            console.error('Error obteniendo data de creadores:', error);
            setCreators([]);
          }
        };
    
        if (productData.creadores) {
          fetchCreators();
        }
    }, [productData.creadores]);

    const productId = location.pathname.split('/').pop();
    const fetchOpinions = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/opiniones/${productId}`);
          const opinionData = response.data;
      
          const updatedOpinions = await Promise.all(
            opinionData.map(async (opinion) => {
              const userResponse = await axios.get(`http://localhost:3000/api/usuarios/perfil/${opinion.usuario}`);
              const user = userResponse.data;
              return { ...opinion, usuario: user.username };
            })
          );
      
          setOpinions(updatedOpinions);
          console.log(updatedOpinions);
        } catch (error) {
          console.error('Error obteniendo data de opiniones:', error);
          setOpinions([]);
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
            <div className={`my-20 mb-32 max-w-6xl mx-auto px-0 relative overflow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
                <div className={`px-19 md:px-0 relative overfxlow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-0 flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-0">
                            {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                    {breadcrumb.name}
                                </a>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                                </div>
                            </li>
                            ))}
                            <li className="text-sm">
                            <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {productData.nombre_producto}
                            </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-10 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:gap-x-5 lg:px-0">

                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg rounded-tl-lg rounded-tr-lg lg:block col-span-2">
                        <img
                            src={productData.imagenPath}
                            alt={productData.imagenPath}
                            className="w-full object-cover object-center rounded-b-lg"
                            style={{ height: "87%" }}
                        />
                        </div>

                        {/* Product info */}
                        <div className="mx-auto max-w-2xl px-4 pb-16 mr-0 pt-10 sm:px-6 lg:grid lg:max-w-8xl lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-8 col-span-2">
                            <div className="lg:col-span-2 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productData.nombre_producto}</h1>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900 mt-8">${parseFloat(productData.precio).toLocaleString()}</p>

                                {/* Reviews */}
                                <div className="mt-6">
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                        <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            {reviews.totalCount} reviews
                                        </a>
                                    </div>
                                </div>

                                <form className="mt-10">
                                    {/* Colors */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {product.colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                    classNames(
                                                        color.selectedClass,
                                                        active && checked ? 'ring ring-offset-1' : '',
                                                        !active && checked ? 'ring-2' : '',
                                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                    )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                    {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        color.class,
                                                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                    )}
                                                    />
                                                </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add to bag
                                    </button>

                                </form>
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-4 lg:pt-6">
                                {/* Description and details */}
                                <div>
                                    <h3 className="sr-only">Description</h3>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{productData.descripcion}</p>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Detalles</h2>
                                    <div className="mt-4 space-y-6">
                                        <p className="text-sm text-gray-600">{product.details}</p>
                                    </div>
                                </div>
                                <div className="mt-10 flex items-center">
                                    {creators.length > 0 ? (
                                        <>
                                        <h2 className="text-sm font-medium text-gray-900 mr-2">Creadores:</h2>
                                        <div className="flex flex-wrap">
                                            <p className="text-sm text-gray-600">
                                            {creators.map((creator) => creator.username).join(", ")}
                                            </p>
                                        </div>
                                        </>
                                    ) : (
                                        <dl className="divide-y divide-gray-100">
                                        <dt className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3">
                                            No hay opiniones sobre este artículo
                                        </dt>
                                        </dl>
                                    )}
                                </div>
                            </div>

                         
                        </div>

                        <div className="-mt-16 mb-40 lg:px-00 relative overflow-hidden col-span-4">               
                            <div className="px-0 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Opiniones del producto</h3>
                            
                            <form className="mt-6">
                            <div>
                                <label htmlFor="reviewContent" className="block text-sm font-medium text-gray-700">
                                Tu opinión
                                </label>
                                <div className="mt-1">
                                <textarea
                                    id="reviewContent"
                                    name="reviewContent"
                                    rows={4}
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                    className="ml-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-97 sm:text-sm border-gray-300 rounded-md"
                                />
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap">
                                <button
                                onClick={handleEnviarClick}
                                type="submit"
                                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-stone-600 hover:bg-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                                >
                                Enviar opinión
                                </button>
                                {responseMessage && (
                                <p className={`mt-4 ml-4 text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'} self-center`}>
                                    {responseMessage}
                                </p>
                                )}
                            </div>
                            </form>
                            

                            {opinions.length > 0 ? (
                                opinions.map((opinion) => (
                                <div key={opinion._id} className="mt-8 pb-10 border-b border-gray-200">
                                    <div className="flex items-center">
                                    
                                      <p className="text-sm font-medium text-gray-900">{opinion.usuario}</p>
                                      <div className="flex items-center ml-2">
                                          {[0, 1, 2, 3, 4].map((rating) => (
                                          <StarIcon
                                          key={rating}
                                          className={classNames(
                                            rating < 4 ? 'text-gray-900' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                          )}
                                          aria-hidden="true"
                                          />
                                          ))}
                                          {opinion.usuario === loggedInUser?.username && (
                                            <>
                                              <Link to={`/administrarOpiniones`}>{/*<img className="h-4 w-auto mb-0 mr-2" src="/img/editar.svg"></img>*/}
                                                <img
                                                  className="h-5 w-auto mb-1 ml-1"
                                                  src="/img/editar2-2.svg" 
                                                  alt="banana"
                                                  onMouseOver={(e) => {
                                                  e.currentTarget.src = '/img/editar2.svg';
                                                  }}
                                                  onMouseOut={(e) => {
                                                  e.currentTarget.src = '/img/editar2-2.svg';
                                                  }}
                                                />
                                              </Link>
                                            </>
                                          )}
                                          
                                      </div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">{opinion.contenidoOpinion}</p>
                                </div>
                                ))
                            ) : (
                                <p className="mt-8 text-sm font-medium text-gray-900">No hay opiniones sobre este producto.</p>
                            )}
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

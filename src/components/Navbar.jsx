import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const navigation = {
    categories: [
      {
        id: 'explora', 
        name: 'Explora',
        featured: [
          {
            name: 'Recién llegados',
            href: '/',
            imageSrc: 'https://d1o785do8fyxgx.cloudfront.net/stock_item/stock_item_images/images/000/000/559/original/EMP_PEN_ROLLERBALL_GROOVE_TEAL_1_ECOMM_RESIZED.png?1676473644',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Escolar',
            href: '/',
            imageSrc: 'https://papier.imgix.net/https%3A%2F%2Fwww.papier.com%2Fproduct_image%2F145981%2F36%2Fjoy-39575_front_1680778170.png?ixlib=rb-3.2.1&auto=format%2Ccompress&s=45e95fdfb40ca8ed6b25ddc3f0d231e3',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'colecciones',
            name: 'Colecciones',
            items: [
              { name: 'Cumpleaños', href: '#' },
              { name: 'Dia de la madre', href: '#' },
              { name: 'San Valentín', href: '#' },
              { name: 'Útiles escolares', href: '#' },
              { name: 'Lectura', href: '#' },
              { name: 'Babies', href: '#' },
              { name: 'Tarjetas de regalo', href: '#' },
              { name: 'Bolsos para escuela', href: '#' },
              { name: 'Ver todo', href: '/productos' }
            ],
          },
          {
            id: 'accesorios',
            name: 'Accesorios',
            items: [
              { name: 'Relojes', href: '#' },
              { name: 'Carteras', href: '#' },
              { name: 'Bolsos', href: '#' },
              { name: 'Lentes', href: '#' },
              { name: 'Sombreros', href: '#' },
              { name: 'Jewelry', href: '#' },
            ],
          },
          {
            id: 'marcas',
            name: 'Algunas Marcas',
            items: [
              { name: 'Faber-Castell', href: '#' },
              { name: 'Totto', href: '#' },
              { name: 'Norma', href: '#' },
              { name: 'Magic Color', href: '#' },
              { name: 'Winsor', href: '#' },
            ],
          },
        ],
      },

    ],
    pages: [
      { name: 'Sobre Nosotros', href: '#' },
      // { name: 'Sucursales', href: '#' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose }) => {

    const [loggedInUser, setLoggedInUser] = useState(null);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
      // Realiza las acciones necesarias para cerrar sesión, como eliminar el token de localStorage, limpiar el estado, etc.
      localStorage.removeItem('token');
      setLoggedInUser(null);
      resetAOS();

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
          } catch (error) {
            console.log(error);
          }
        };
  
        fetchUserData();
      }
    }, []);
  
    return (
      <div className="bg-amber-500">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected ? 'border-transparent text-gray-600' : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                </div>
                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.name}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>


                  {loggedInUser ? (
                    <>
                      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div className="flow-root">
                          <Link to="/usuarioInfo" state={{ loggedInUser }} className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-600">
                            {loggedInUser.nombre}
                          </Link>
                        </div>
                        <div className="flow-root">
                          <Link to="/" onClick={handleLogout} className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-600">
                            Logout1
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <div className="flow-root">
                        <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-600">
                          Login
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link to="/create-account" className="-m-2 block p-2 font-medium text-gray-900 hover:text-gray-600">
                          Create account
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 px-4 py-6">
                    <a href="#iiii" className="-m-2 flex items-center p-2">
                      <img
                        src="/img/col.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-base font-medium text-gray-900">COL</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">

        <nav aria-label="Top" className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 mt-2">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-9 w-auto mb-4"
                    src="/img/banana.svg" 
                    alt="banana"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8 overflow-hidden">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div
                            className={classNames(
                              open
                                ? 'border-stone-400 text-stone-400'
                                : 'border-transparent text-gray-700 hover:text-gray-800',
                              'relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out'
                            )}
                            onMouseEnter={() => handlePopoverOpen()}
                            onMouseLeave={() => handlePopoverClose()}
                          >
                            {category.name}
                          </div>

                          <Transition
                            show={isPopoverOpen}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel
                              className="absolute inset-x-0 top-full text-sm text-gray-500 z-[9999]"
                              onMouseEnter={() => handlePopoverOpen()}
                              onMouseLeave={() => handlePopoverClose()}
                            >
                              {/*Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow*/}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                            </div>
                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                              <span className="absolute inset-0 z-10" aria-hidden="true" />
                                              {item.name}
                                            </a>
                                            <p aria-hidden="true" className="mt-1">
                                              Echar un vistazo
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
          
                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </Popover.Group>
          
                <div className="ml-auto flex items-center">
                {loggedInUser ? (
                    <>
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link to="/usuarioInfo" state={{ loggedInUser }} className="text-sm font-medium text-gray-700 hover:text-gray-600">
                          {loggedInUser.nombre}
                        </Link>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                        <Link to="/" onClick={handleLogout} className="text-sm font-medium text-gray-700 hover:text-gray-500">
                          Logout
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-600">
                        Login
                      </Link>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <Link to="/create-account" className="text-sm font-medium text-gray-700 hover:text-gray-500">
                        Create account
                      </Link>
                    </div>
                  )}
          
                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center text-gray-700 hover:text-gray-500">
                      <img
                        src="/img/col.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-sm font-medium">COL</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>
          
                  {/* Search */}
                  <div className="flex lg:ml-6">
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
  )
}

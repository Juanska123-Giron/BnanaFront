import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AfterNav = ({ isPopoverOpen }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);
  return (
    <div className={`relative overflow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'mt-0'}`}>
      <div className={`relative overfxlow-hidden bg-white transition-all duration-500 ease-in-out pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 data-aos='fade-right' className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Muéstrale que la quieres mucho!
            </h1>
            <p className="mt-4 text-xl text-gray-500">
            Este mes, nuestra última colección está disponible para que puedas demostrarle a tu madre cuánto la valoras. ¡Echa un vistazo y encuentra el regalo perfecto para ella!
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="./img/af7.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="./img/af4.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="./img/af9.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="./img/af11.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="./img/af13.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="./img/af15.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="./img/af6.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/productos"
                className="inline-block rounded-md border border-transparent bg-amber-500/[.85] px-8 py-3 text-center font-medium text-white hover:bg-stone-600/[.9]"
              >
                Ver Colección
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 mt-1'><div className="border-b border-gray-200"></div></div>
    </div>
  )
}

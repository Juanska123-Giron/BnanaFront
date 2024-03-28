import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
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

  const softwareItems = [
    {
      codigo: 1,
      item: 'Software A',
      descripcion: 'Descripción del Software A',
      preguntas: 10,
      porcentajeTotal: '90%'
    },
    {
      codigo: 2,
      item: 'Software B',
      descripcion: 'Descripción del Software B',
      preguntas: 8,
      porcentajeTotal: '85%'
    },
  ];

  return (
    <div className={`relative overflow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'mt-0'}`}>
      <div className={`relative overfxlow-hidden bg-white transition-all duration-500 ease-in-out pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-4">Calificación de Software</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-4 text-left">Código</th>
                <th className="border border-gray-300 p-4 text-left">Item</th>
                <th className="border border-gray-300 p-4 text-left">Descripción</th>
                <th className="border border-gray-300 p-4 text-left">Preguntas</th>
                <th className="border border-gray-300 p-4 text-left">% Total</th>
              </tr>
            </thead>
            <tbody>
              {softwareItems.map((item) => (
                <tr key={item.codigo}>
                  <td className="border border-gray-300 p-4">{item.codigo}</td>
                  <td className="border border-gray-300 p-4">{item.item}</td>
                  <td className="border border-gray-300 p-4">{item.descripcion}</td>
                  <td className="border border-gray-300 p-4">{item.preguntas}</td>
                  <td className="border border-gray-300 p-4">{item.porcentajeTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>          
        </div>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const FuncionalItems = [
    {
      codigo: 1,
      item: 'FUNCIONALIDAD',
      descripcion: 'La capacidad del software de cumplir con las funciones para satisfacer las necesidades explícitas e implícitas cuando es utilizado en condiciones específicas.',
      preguntas: 5,
      porcentajeTotal: '14%'
    },
    {
      codigo: 2,
      item: 'FIABILIDAD',
      descripcion: 'La capacidad del software  para  asegurar  un  nivel   de funcionamiento adecuado cuando es  utilizando en condiciones especificas.',
      preguntas: 4,
      porcentajeTotal: '14%'
    },
    {
      codigo: 3,
      item: 'USABILIDAD',
      descripcion: 'La capacidad del software de ser entendido, aprendido, y usado en forma fácil y atractiva',
      preguntas: 5,
      porcentajeTotal: '15%'
    },
    {
      codigo: 4,
      item: 'EFICIENCIA',
      descripcion: 'La forma del desempeño adecuado, de acuerdo a al número  recursos utilizados según las condiciones planteadas',
      preguntas: 3,
      porcentajeTotal: '15%'
    },
    {
      codigo: 5,
      item: 'CAPACIDAD DE MANTENIMIENTO',
      descripcion: 'La cualidad que tiene el software para ser modificado. Incluyendo correcciones o mejoras del  software, a cambios en el entorno, y especificaciones de requerimientos funcionales.',
      preguntas: 5,
      porcentajeTotal: '14%'
    },
    {
      codigo: 6,
      item: 'PORTABILIDAD',
      descripcion: 'La capacidad que tiene el software para ser trasladado de un entorno a otro. cubriendo entornos organizacionales, de hardware o de software',
      preguntas: 5,
      porcentajeTotal: '14%'
    },
    {
      codigo: 7,
      item: 'CALIDAD EN USO',
      descripcion: 'Capacidad del software para permitirles a usuarios lograr las  metas  propuestas  con  eficacia,  productividad,  seguridad  y  satisfacción,  en contextos especificados de uso',
      preguntas: 6,
      porcentajeTotal: '14%'
    },
  ];

  const handleEvaluateClick = () => {
    navigate('/evaluacion-software'); 
  };

  return (
    <div className={`relative overflow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'mt-0'}`}>
      <div className={`relative overfxlow-hidden bg-white transition-all duration-500 ease-in-out pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-4">PARÁMETROS</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preguntas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">% Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {FuncionalItems.map((item) => (
                <tr key={item.codigo}>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">{item.codigo}</td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">{item.item}</td>
                  <td className="px-6 py-4 text-sm whitespace">{item.descripcion}</td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">{item.preguntas}</td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">{item.porcentajeTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">
            <button onClick={handleEvaluateClick} className="mx-auto rounded-md bg-green-600/[.9] px-14 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
              EVALUAR SOFTWARE
            </button>
        </div>      
        </div>
      </div>
    </div>
  )
}

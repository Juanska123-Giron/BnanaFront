import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const EvaluacionSoftware = ({ isPopoverOpen, setMostrarEvaluacion }) => {
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
    setMostrarEvaluacion(true); 
  };

  return (
    <div className={`relative overflow-hidden bg-white transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'mt-0'}`}>
      <div className={`relative overfxlow-hidden bg-white transition-all duration-500 ease-in-out pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold mb-4">FUNCIONALIDAD</h2>
        <p>La capacidad del software para proveer las funciones que satisfacen las necesidades explícitas e implícitas cuando el software se utiliza bajo condiciones específicas.</p>
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
        <div className="flex justify-center mt-8">
            <button onClick={handleEvaluateClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              EVALUAR SOFTWARE
            </button>
          </div>         
        </div>
      </div>
    </div>
  )
}

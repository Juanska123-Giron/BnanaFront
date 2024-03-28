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
      codigo: 1.1,
      item: 'Adecuación',
      descripcion: 'La capacidad del  software para proveer un adecuado conjunto de funciones para las tareas y objetivos especificados por el usuario. Ejemplos de adecuación son la composición orientada a tareas de funciones a partir de sub funciones que las constituyen, y las capacidades de las tablas.',
      preguntas: 5,
      porcentajeTotal: '14%'
    },
    {
      codigo: 1.2,
      item: 'Exactitud',
      descripcion: 'La capacidad del  software para proveer los resultados o efectos acordados con un grado necesario de precisión. ',
      preguntas: 4,
      porcentajeTotal: '14%'
    },
    {
      codigo: 1.3,
      item: 'Interoperabilidad',
      descripcion: 'La capacidad del software de interactuar con uno o más sistemas especificados. La interoperabilidad  se utiliza en lugar de compatibilidad para evitar una posible ambigüedad con la reemplazabilidad.',
      preguntas: 5,
      porcentajeTotal: '15%'
    },
    {
      codigo: 1.4,
      item: 'Seguridad',
      descripcion: 'La capacidad del software para proteger la información y los datos de modo que las personas o los sistemas no autorizados no puedan leerlos o modificarlos, y a las personas o  sistemas autorizados  no se les niegue el acceso a ellos. La seguridad en un sentido amplio se define como característica de la calidad en uso, pues no se relaciona con el software solamente, sino con todo un sistema.',
      preguntas: 3,
      porcentajeTotal: '15%'
    },
    {
      codigo: 1.5,
      item: 'Conformidad de la funcionalidad',
      descripcion: 'La  capacidad  del software  de  adherirse  a  los  estándares, convenciones o regulaciones legales y  prescripciones similares referentes a la funcionalidad.',
      preguntas: 5,
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
                <th className="border border-gray-300 p-4 text-left">Valor</th>
                <th className="border border-gray-300 p-4 text-left">Obervaciones</th>
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
              EVALUAR FUNCIONALIDAD
            </button>
          </div>         
        </div>
      </div>
    </div>
  )
}

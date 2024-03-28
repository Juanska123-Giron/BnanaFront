import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComponenteTabla from './ComponenteTabla';

import { datosFuncionalidad, datosFiabilidad, datosUsabilidad, datosEficiencia, datosCapacidadDeMantenimiento, datosPortabilidad, datosCalidadDeUso} from './datosSecciones';

const EvaluacionSoftware = () => {
  const navigate = useNavigate();

  const volver = () => {
    navigate('/');
  };

  const finalizarEvaluacion = () => {
    navigate('/resultados-totales'); 
  };

  const [seccionActual, setSeccionActual] = useState('funcionalidad');

  const cambiarSeccion = (seccion) => {
    setSeccionActual(seccion);
  };

  const datosActuales = {
    funcionalidad: datosFuncionalidad,
    fiabilidad: datosFiabilidad,
    usabilidad: datosUsabilidad,
    eficiencia: datosEficiencia,
    capacidadDeMantenimiento: datosCapacidadDeMantenimiento,
    portabilidad: datosPortabilidad,
    calidadDeUso: datosCalidadDeUso,
  }[seccionActual];

  return (
    <>
      <div className="flex justify-around mb-10 mt-10">
        <button onClick={() => cambiarSeccion('funcionalidad')} className="block w-full rounded-md ml-2 mr-2 border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          Funcionalidad
        </button>
        <button onClick={() => cambiarSeccion('fiabilidad')} className="block w-full rounded-md ml-2 mr-2 border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          Fiabilidad
        </button>
        <button onClick={() => cambiarSeccion('usabilidad')} className="block w-full rounded-md ml-2 mr-2 border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          Usabilidad
        </button>
        <button onClick={() => cambiarSeccion('eficiencia')} className="block w-full rounded-md ml-2 mr-2 border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          Eficiencia
        </button>
        <button onClick={() => cambiarSeccion('capacidadDeMantenimiento')} className="block w-full rounded-md ml-2 mr-2 border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          Capacidad De Mantenimiento
        </button>
        <button onClick={() => cambiarSeccion('portabilidad')} className="block w-full rounded-md ml-2 mr-2 border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          Portabilidad
        </button>
        <button onClick={() => cambiarSeccion('calidadDeUso')} className="block w-full rounded-md ml-2 mr-2 border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
         Calidad De Uso
        </button>
      </div>
      <ComponenteTabla datos={datosActuales} />
      <div className="flex items-center mt-10">
        <button onClick={volver} className="block ml-20 rounded-md bg-gray-600/[.9] px-14 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 flex items-center justify-center">Volver</button>
        <button onClick={finalizarEvaluacion} className="block ml-auto mr-20 rounded-md bg-green-600/[.9] px-14 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 flex items-center justify-center">Finalizar Evaluación</button>
      </div>
    </>
  );
};

export default EvaluacionSoftware;

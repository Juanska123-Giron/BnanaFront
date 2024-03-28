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
        <button onClick={() => cambiarSeccion('funcionalidad')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
          Funcionalidad
        </button>
        <button onClick={() => cambiarSeccion('fiabilidad')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
          Fiabilidad
        </button>
        <button onClick={() => cambiarSeccion('usabilidad')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
          Usabilidad
        </button>
        <button onClick={() => cambiarSeccion('eficiencia')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
          Eficiencia
        </button>
        <button onClick={() => cambiarSeccion('capacidadDeMantenimiento')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
          Capacidad De Mantenimiento
        </button>
        <button onClick={() => cambiarSeccion('portabilidad')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
          Portabilidad
        </button>
        <button onClick={() => cambiarSeccion('calidadDeUso')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">
         Calidad De Uso
        </button>
      </div>
      <ComponenteTabla datos={datosActuales} />
      <div className="flex justify-around mt-10">
        <button onClick={volver} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Volver</button>
        <button onClick={finalizarEvaluacion} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Finalizar Evaluación</button>
      </div>
    </>
  );
};

export default EvaluacionSoftware;

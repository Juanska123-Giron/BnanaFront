import React from 'react';

const ComponenteTabla = ({ datos }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observaciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {datos.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.codigo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
              <td className="px-6 py-4">{item.descripcion}</td>
              <td className="px-6 py-4">
                <input type="number" className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={item.valor} />
              </td>
              <td className="px-6 py-4">
                <input type="text" className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={item.observaciones} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponenteTabla;

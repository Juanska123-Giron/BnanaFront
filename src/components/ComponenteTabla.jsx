import React from 'react';

const ComponenteTabla = ({ datos }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-4 text-left">Código</th>
            <th className="border border-gray-300 p-4 text-left">Item</th>
            <th className="border border-gray-300 p-4 text-left">Descripción</th>
            <th className="border border-gray-300 p-4 text-left">Valor</th>
            <th className="border border-gray-300 p-4 text-left">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-4">{item.codigo}</td>
              <td className="border border-gray-300 p-4">{item.item}</td>
              <td className="border border-gray-300 p-4">{item.descripcion}</td>
              <td className="border border-gray-300 p-4">
                <input type="number" className="border border-gray-300 p-2" defaultValue={item.valor} />
              </td>
              <td className="border border-gray-300 p-4">
                <input type="text" className="border border-gray-300 p-2" defaultValue={item.observaciones} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponenteTabla;

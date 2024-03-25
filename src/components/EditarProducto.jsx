import React, { useEffect } from 'react';
import { Navbar } from './Navbar'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Footer } from './Footer.jsx';
import { useState } from 'react';
import { EliminarOpinionModal } from './EliminarOpinionModal';
import axios from 'axios';

export const EditarProducto = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose, loggedInUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [producto, setProducto] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const [respuestaBackend, setRespuestaBackend] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal
  const [selectedOpinionId, setSelectedOpinionId] = useState(null);


  const handleOpenModal = (opinionId) => {
    console.log('Opinión cargada en modal:',opinionId);
    setModalOpen(true);
    setSelectedOpinionId(opinionId);

  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/productos/${location.pathname.split('/')[2]}`);
        setProducto(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProducto();
  }, [location]);

  const handleActualizarProducto = async (e) => {
    e.preventDefault();

    const id = producto._id;
    const nombre_producto = e.target.nombre_producto.value;
    const stock = parseInt(e.target.stock.value);
    const imagenPath = e.target.imagenPath.value;
    const precio = parseFloat(e.target.precio.value);
    const descripcion = e.target.descripcion.value;
    const creadores = e.target.creadores.value.split(',').map((creador) => creador.trim());

    const datosProducto = {
      nombre_producto,
      descripcion,
      stock,
      imagenPath,
      precio,
      creadores,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:3000/api/productos/${id}`, datosProducto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRespuestaBackend({ tipo: 'success', mensaje: 'Producto actualizado exitosamente.' });

      setTimeout(() => {
        setRespuestaBackend(null);
        navigate('/administrarProductos', { state: { loggedInUser } });

      }, 1500);
    } catch (error) {
      console.error(error);
      setRespuestaBackend({ tipo: 'error', mensaje: 'Error al actualizar el producto.' });
    }
  };

  useEffect(() => {
    const obtenerOpiniones = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/opiniones/${producto._id}`);
        setOpinions(response.data);
        console.log(response.data);
        
        // Obtener los nombres de usuario para cada opinión
        const opinionesConUsuario = await Promise.all(response.data.map(async (opinion) => {
          const usuarioResponse = await axios.get(`http://localhost:3000/api/usuarios/perfil/${opinion.usuario}`);
          const usuario = usuarioResponse.data;
          return {
            ...opinion,
            usuario: usuario.username
          };
        }));
        
        setOpinions(opinionesConUsuario);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (producto) {
      obtenerOpiniones();
    }
}, [producto]);

const actualizarOpiniones = async () => {
    
    try {
        const response = await axios.get(`http://localhost:3000/api/opiniones/${producto._id}`);
        const nuevasOpiniones = response.data;
        setOpinions(response.data);
        console.log(response.data);
        
        // Obtener los nombres de usuario para cada opinión
        const opinionesConUsuario = await Promise.all(response.data.map(async (opinion) => {
          const usuarioResponse = await axios.get(`http://localhost:3000/api/usuarios/perfil/${opinion.usuario}`);
          const usuario = usuarioResponse.data;
          return {
            ...opinion,
            usuario: usuario.username
          };
        }));
        
        setOpinions(opinionesConUsuario);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
        <div data-aos="zoom-out">
            <Navbar
                isPopoverOpen={isPopoverOpen}
                handlePopoverOpen={handlePopoverOpen}
                handlePopoverClose={handlePopoverClose}
                loggedInUser={loggedInUser}
            />
        </div>
        
        <div data-aos="zoom-in">
            
            <div className={`my-20 mb-44 max-w-6xl mx-auto relative overflow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
                <div className={`px-4 sm:px-0 relative overfxlow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                    <h3 className="mr-0 text-base font-medium text-gray-900">Editar producto existente</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">Cambia o actualiza los atributos de un artículo.</p>
                </div>
                {producto && (
                <form className="mt-6 ml-0 w-5/5" onSubmit={handleActualizarProducto}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-5">
                        <div className="sm:col-span-2">
                        <label htmlFor="_id" className="block text-sm font-medium leading-6 text-gray-900">
                            Id
                        </label>
                        <div className="mt-2.5">
                        <input
                            type="text"
                            name="_id"
                            id="_id"
                            autoComplete="_id"
                            className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={producto._id}
                            readOnly
                        />
                        </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="nombre_producto" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre del producto
                            </label>
                            <div className="mt-2.5">
                            <input
                                type="text"
                                name="nombre_producto"
                                id="nombre_producto"
                                autoComplete="nombre_producto"
                                className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={producto.nombre_producto}
                                
                            />
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    autoComplete="stock"
                                    className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={producto.stock}
                                   
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="imagenPath" className="block text-sm font-medium leading-6 text-gray-900">
                                Imagen URL
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="imagenPath"
                                    id="imagenPath"
                                    autoComplete="imagenPath"
                                    className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={producto.imagenPath}
                                    
                                />
                            </div>
                        </div>
                       
                        <div className="sm:col-span-2">
                            <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900">
                                Precio
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="number"
                                    name="precio"
                                    id="precio"
                                    autoComplete="precio"
                                    className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={producto.precio}
                                    
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-5">
                            <label htmlFor="creadores" className="block text-sm font-medium leading-6 text-gray-900">
                                Creador(es)
                                <span className='font-normal text-gray-500'> Separados por comas</span>
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="creadores"
                                    id="creadores"
                                    autoComplete="creadores"
                                    className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={producto.creadores.join(', ')}
                                    
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-5">
                            <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                Descripción
                            </label>
                            <div className="mt-2.5">
                            <textarea
                              name="descripcion"
                              id="descripcion"
                              rows={4}
                              className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={producto ? producto.descripcion : ''}
                              onChange={(e) => setProducto({...producto, descripcion: e.target.value})}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-end">
                    <div className="flex items-center ml-auto">
                        {respuestaBackend && (
                        <div className={`mr-4 text-center text-sm ${respuestaBackend.tipo === 'error' ? 'text-rose-600' : 'text-green-600'}`}>
                            {respuestaBackend.mensaje}
                        </div>
                        )}
                        <button
                        type="submit"
                        className="block ml-auto rounded-md bg-stone-600/[.9] px-14 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 flex items-center justify-center"
                        >
                        Actualizar
                        </button>
                    </div>
                    </div>
                </form>
                )}
                <div className={`px-4 sm:px-0 relative overfxlow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
                    <h3 className="mt-8 mr-0 text-base font-medium text-gray-900">Apartado de opiniones</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">En esta sección podrás eliminar opiniones sobre el producto</p>
                    <div className="mt-6 ml-0 w-5/5 grid grid-cols-1 gap-x-8 gap-y-6">
                    <dl className="w-auto divide-y divide-gray-100">
                            <div className="px-4 py-4 sm:grid sm:grid-cols-8 sm:gap-4 sm:px-0">
                                <dd className="text-sm font-medium leading-6 text-gray-900 col-span-2 block">Id Opinión</dd>
                                <dd className="text-sm font-medium leading-6 text-gray-900 col-span-2 block">Usuario</dd>
                                <dd className="text-sm font-medium leading-6 text-gray-900 col-span-3 block">Contenido</dd>
                                <dd className="text-sm font-medium leading-6 text-gray-900 col-span-1 block">Acciones</dd>

                            </div>
                            {opinions.map((opinion) => (
                                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 border-t" key={opinion._id}>
                                    <dd className="text-sm font-medium leading-6 text-gray-700">{opinion._id}</dd>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{opinion.usuario}</dd>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{opinion.contenidoOpinion}</dd>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 flex justify-center">
                                    <a onClick={() => handleOpenModal(opinion._id)} className="text-gray-400 hover:text-gray-500">
                                        <div className="ml-20 flex items-center">
                                        <img
                                            
                                            className="h-7 w-auto mb-4"
                                            src="/img/newTrash.svg" 
                                            alt="banana"
                                            onMouseOver={(e) => {
                                            e.currentTarget.src = '/img/newTrash1.svg';
                                            }}
                                            onMouseOut={(e) => {
                                            e.currentTarget.src = '/img/newTrash.svg';
                                            }}
                                        />
                                        </div>
                                    </a>
                                    </dd>
                                </div>
                            ))}
                            {/* Renderiza el modal si modalOpen es verdadero */}
                            {modalOpen && (
                               <EliminarOpinionModal onClose={handleCloseModal} opinionId={selectedOpinionId} actualizarOpiniones={actualizarOpiniones}/>
                                
                            )}

                            
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
)
}

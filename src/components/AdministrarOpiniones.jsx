import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { EliminarOpinionModal } from './EliminarOpinionModal';
import { useRef } from 'react';

export const AdministrarOpiniones = ({ isPopoverOpen, handlePopoverOpen, handlePopoverClose, loggedInUser, setLoggedInUser }) => {
  const [opinions, setOpinions] = useState([]);
  const [selectedOpinionId, setSelectedOpinionId] = useState(null);
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [editableContent, setEditableContent] = useState('');
  const [editingOpinionId, setEditingOpinionId] = useState(null);
  const opinionId = new URLSearchParams(location.search).get('opinionId');
  const opinionIndex = opinions.findIndex((opinion) => opinion._id === opinionId);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const handleKeyDown = async (e, opinionId) => {
    if (e.key === 'Enter') {
      try {
        const response = await axios.put(`http://localhost:3000/api/opiniones/${opinionId}`, {
          contenidoOpinion: editableContent
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        actualizarOpiniones();
        console.log('Opinión actualizada:', response.data);
  
        setEditingOpinionId(null); // Finaliza la edición cuando se presiona "Enter"
      } catch (error) {
        console.error(error);
      }
    }
  };  

  const handleClickEditar = (opinionId, opinionContent) => {
    setSelectedOpinionId(opinionId);
    setEditableContent(opinionContent);
    setEditingOpinionId(opinionId);
    setIsTextareaFocused(true); 
  };

  const actualizarOpiniones = async () => {
    obtenerOpiniones();
  }

  const handleOpenModal = (opinionId) => {
    console.log('Opinión cargada en modal:', opinionId);
    setModalOpen(true);
    setSelectedOpinionId(opinionId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const obtenerNombreProducto = async (productoId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/productos/${productoId}`);
      return response.data.nombre_producto;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      obtenerOpiniones();
    }
  }, [loggedInUser]);

  useEffect(() => {
    window.scrollTo(0, 0); //Para empezar arriba siuuu
}, []);

  const obtenerUsuario = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response;
        setLoggedInUser(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const obtenerOpiniones = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/opiniones/usuarioOpiniones/${loggedInUser._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const opiniones = response.data;

      for (const opinion of opiniones) {
        const nombreProducto = await obtenerNombreProducto(opinion.producto);
        opinion.producto = nombreProducto;
      }

      setOpinions(opiniones);
      console.log(opiniones);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    if (opinionId && opinionIndex !== -1 && textareaRef.current && isTextareaFocused) { // Agregar isTextareaFocused
      textareaRef.current.focus();
      setIsTextareaFocused(false); // Reiniciar el valor a false después de enfocar
    }
  }, [opinionId, opinionIndex, isTextareaFocused]);

  return (
    <div>
      <div data-aos="zoom-out">
        <Navbar
          isPopoverOpen={isPopoverOpen}
          handlePopoverOpen={handlePopoverOpen}
          handlePopoverClose={handlePopoverClose}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        />
      </div>

      <div data-aos="zoom-in">
        <div className={`my-20 mb-96 max-w-6xl mx-auto relative overflow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-128' : 'my-22'}`}>
          <div className={`px-4 sm:px-0 relative overflow-hidden transition-all duration-500 ease-in-out ${isPopoverOpen ? 'mt-0' : 'mt-0'}`}>
            <h3 className="mt-8 mr-0 text-base font-medium text-gray-900">Apartado de opiniones</h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">En esta sección podrás ver todas las opinions que has hecho.</p>
            <div className="mt-6 ml-0 w-5/5 grid grid-cols-1 gap-x-8 gap-y-6">
              <dl className="w-auto divide-y divide-gray-100">
                <div className="px-4 py-4 sm:grid sm:grid-cols-8 sm:gap-4 sm:px-0">
                  <dd className="text-sm font-medium leading-6 text-gray-900 col-span-2 block">Id Opinión</dd>
                  <dd className="text-sm font-medium leading-6 text-gray-900 col-span-2 block">Producto</dd>
                  <dd className="text-sm font-medium leading-6 text-gray-900 col-span-3 block">Contenido</dd>
                  <dd className="text-sm font-medium leading-6 text-gray-900 col-span-1 block">Acciones</dd>
                </div>
                {opinions.map((opinion) => (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0 border-t" key={opinion._id}>
                    <dd className="text-sm font-medium leading-6 text-gray-700">{opinion._id}</dd>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{opinion.producto}</dd>
                    {editingOpinionId === opinion._id ? (
                      <textarea
                        value={editableContent}
                        onChange={(e) => setEditableContent(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, opinion._id)}
                        className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 rounded-md"
                        style={{ minHeight: '100px' }}
                      ></textarea>
                    ) : (
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{opinion.contenidoOpinion}</dd>
                    )}
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
                      <a onClick={() => handleClickEditar(opinion._id, opinion.contenidoOpinion)} className="text-gray-400 hover:text-gray-500">
                        <div className="ml-0 flex items-center">
                          <img
                            className="h-6 w-auto"
                            src="/img/editar2-2.svg"
                            alt="banana"
                            onMouseOver={(e) => {
                              e.currentTarget.src = '/img/editar2.svg';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.src = '/img/editar2-2.svg';
                            }}
                          />
                        </div>
                      </a>
                    </dd>
                  </div>
                ))}
                
                {modalOpen && <EliminarOpinionModal onClose={handleCloseModal} opinionId={selectedOpinionId} actualizarOpiniones={actualizarOpiniones} />}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};



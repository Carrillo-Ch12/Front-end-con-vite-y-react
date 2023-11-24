import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Juego.css';

const Juego = () => {
  const [Juego, setJuego] = useState({});
  const [Generos, setGeneros] = useState([]);
  const [Plataformas, setPlataformas] = useState([]);
  const [Nombre_perfil, setNombrePerfil] = useState(sessionStorage.getItem('Nombre'));
  const [Nombre_juego,serNombreJuego] = useState(sessionStorage.getItem('Juego'));
  useEffect(() => {

    const fetchJuego = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/Juego/Juego/${Nombre_juego}`);
        console.log('API response:', response.data);
        setJuego(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchPlataformas = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/Juego/Plataforma/${Nombre_juego}`);
        console.log('API response:', response.data);
        setPlataformas(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchGeneros = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/Juego/Genero/${Nombre_juego}`);
        console.log('API response:', response.data);
        setGeneros(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchJuego();
    fetchPlataformas();
    fetchGeneros();
  }, []);

  const formatearFecha = (fecha) => {
    const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opcionesFecha);
  };
  const handleAgregarJuego = async () => {
    try {
      const res =await axios.post(`http://localhost:4001/Lista_juegos/agregar/${Nombre_perfil}/${Nombre_juego}`);
      if (res.status === 200) {
        window.location.href = "/Biblioteca";
      } else {
        console.log("Credenciales incorrectas");
      }
    } catch (err) {
      console.error('Error al agregar el juego:', err);
    }
  };
  const handleEliminarJuego = async () => {
    try {
      const res =await axios.post(`http://localhost:4001/Lista_juegos/Eliminar/${Nombre_perfil}/${Nombre_juego}`);
      if (res.status === 200) {
        window.location.href = "/Biblioteca";
      } else {
        console.log("Credenciales incorrectas");
      }
    } catch (err) {
      console.error('Error al agregar el juego:', err);
    }
  };

  return (
    <div className='main-juego-page'>
      <div className='left-side'>
        <div className='contenedor-banner'>
          <div className='asides'>
            <aside className='banner-Foto'><img src={Juego.Portada} alt="Foto de perfil" /></aside>
            <aside className='banner-info'>
              <aside className='show-info'>
                <h2>{Juego.Titulo}</h2>
                <div className='generos'>
                  <label htmlFor="generos">Generos:</label>
                  <ul>
                    {Generos.map((genero, Nombre_genero) => (
                      <li key={Nombre_genero}>{genero.Nombre_genero}</li>
                    ))}
                  </ul>
                </div>
                <div className='plataforma'>
                  <label htmlFor="plataforma">Plataformas:</label>
                  <ul>
                    {Plataformas.map((plataforma, Nombre_plataforma) => (
                      <li key={Nombre_plataforma}>{plataforma.Nombre_plataforma}</li>
                    ))}
                  </ul>
                </div>
                <div className='Likes'>
                  <label htmlFor="Likes">Likes:</label>
                  <p>{Juego.Likes}</p>
                </div>
                <div className='buttons'>
                  <p>
                    <button className='button-heart' onClick={handleAgregarJuego}>
                      Agregar a la lista
                    </button>
                    <button className='button-heart' onClick={handleEliminarJuego}>
                      Eliminar de la lista
                    </button>
                  </p>
                </div>
                <p>Fecha de lanzamiento: {formatearFecha(Juego.Año_de_lanzamiento)}</p>
              </aside>
            </aside>
          </div>
          <div className='info-abajo'>
            <label htmlFor="descripción">
              <strong>Descripción:</strong>
              <p>{Juego.Descripcion}</p>
            </label>
          </div>
        </div>
        <div className='Comentarios-section'>
          <div className='Titulo'>
            <h2>Comentarios</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Juego;

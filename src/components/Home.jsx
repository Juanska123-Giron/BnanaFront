import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { AfterNav } from './AfterNav';
import { Footer } from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { EvaluacionSoftware } from './EvaluacionSoftware';

export const Home = ({ 
  isPopoverOpen, 
  handlePopoverOpen, 
  handlePopoverClose, 
  loggedInUser, 
  setLoggedInUser,
  mostrarEvaluacion, 
  setMostrarEvaluacion 
}) => {
    
    useEffect(() => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
      });
    }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
       <div data-aos="zoom-out">
          <Navbar
            isPopoverOpen={isPopoverOpen}
            handlePopoverOpen={handlePopoverOpen}
            handlePopoverClose={handlePopoverClose}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
      </div>
      {mostrarEvaluacion ? (
        <EvaluacionSoftware />
      ) : (
        <div data-aos='zoom-in'>
          <AfterNav 
            isPopoverOpen={isPopoverOpen}
            setMostrarEvaluacion={setMostrarEvaluacion}
          />
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}
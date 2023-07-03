import React from 'react'
import img_MartoSW from './assets_AboutUs/img/MartoSW.jpg'
import img_toribio from './assets_AboutUs/img/toribio.jpg'
import './about-us.css'
import Navbar from '../../components/Navbar'
import img_github from './assets_AboutUs/img/github.png'
import img_instagram from './assets_AboutUs/img/instagram-png.png'
function AboutUs() {
  return (
    <>
    <Navbar className="navbar"/>
    
      <h2>¿Quienes somos?</h2>
              <p>Somos dos jóvenes entusiastas de la programación, apasionados por crear soluciones innovadoras a través del código. Nos encanta el deporte, especialmente el fútbol y el baloncesto, y creemos que la dedicación y el trabajo en equipo que se requieren para ser buenos deportistas también son valores fundamentales en el mundo de la programación.
                Nos desafiamos a nosotros mismos constantemente y siempre buscamos nuevas formas de mejorar nuestras habilidades y conocimientos. Nos emociona enfrentar desafíos y resolver problemas complejos con creatividad y perseverancia.
                Creemos que la tecnología puede marcar una diferencia positiva en el mundo y estamos comprometidos en utilizar nuestros conocimientos y habilidades para hacer nuestra contribución. Estamos entusiasmados de compartir nuestra pasión por la programación contigo y ayudarte a alcanzar tus objetivos en línea. ¡Gracias por visitar nuestra página web!
                  <div className='Autores'>
                    <div className='MartoSW'>
                      <img src={img_MartoSW} alt="" />
                      <p>Foto de Martín Sánchez en las torres del paine con todo su equipo de maniobras cruzando un puente aparentemente peligroso.</p>
                      <h3>Mi nombre es Martin Sanchez, soy del major de software y minor data science tengo 21 años, soy delegado del major de ingenieria en college, soy geminis asi que cuidado 
                        y me encanta la música
                      </h3>
                      <div className='marto_images'>
                        <a className='github_marto' href="https://www.instagram.com/martin_sanchez_w/"> <img src={img_instagram} alt="Descripción de la imagen" /> </a> <br />
                        <a className='insta_marto' href="https://github.com/MartinSanchezW"><img src={img_github} alt="" /></a>

                      </div>
                      
                      
                    
                    </div>
                      
                    <div className='Hellonston'>
                      <img src={img_toribio} alt="" />
                      <p>Foto de Daniel Toribio luego de dormir toda una semana a las 3 am porque no sabe controlar su hora de sueño.</p>
                      <h3>Mi nombre es Daniel Toribio, Fui del major: IO, minor: TI, pero me termine cambiando hace un semestre al major de software y minor: data science,
                        tengo 21 años y mi comida favorita es la lasaña
                      </h3>
                      <div className='hellonston_images'>
                        <a  href="https://www.instagram.com/presion.y.vida/"><img src={img_instagram} alt="Descripción de la imagen" /> </a> <br />
                        <a  href="https://github.com/Hellonston"><img src={img_github} alt="" /> </a>

                      </div>
                      

                    </div>
                    


                  </div>
                  
              </p>
          
    </>
    
    
  )
}

export default AboutUs;


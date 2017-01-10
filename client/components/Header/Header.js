import React from 'react';
import Nav from './Navbar';

const image_src = Math.floor( Math.random() * 3 )
const gradient = [
  'linear-gradient(to right, #282828, #4d4d4d, #655c5e, #987e73)',
  'linear-gradient(to right, #151515, #382b25, #806b54, #746d59)',
  'linear-gradient(to right, #151515, #1a1a1a, #38221e, #664139)',
]

const Header = () => (
  <header 
    className='page-head'
    style={{
    backgroundColor: gradient[image_src]}} >
    <picture>
      <source
        media="(max-width: 481px)"
        srcSet={ `/images/header/${image_src}/site-header-480.png` } />
      <source
        media="(max-width: 781px)"
        srcSet={ `/images/header/${image_src}/site-header.png` } />
      <source
        media="(min-width: 1700px)"
        srcSet={ `/images/header/${image_src}/site-header.png` } />
      <img
        className='page-head__img'
        src={ `/images/header/${image_src}/site-header-1440.png` } />
    </picture>
    <Nav title='Home' />
  </header>
)

export default Header

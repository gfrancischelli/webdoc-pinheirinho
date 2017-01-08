import React from 'react';
import { Link } from 'react-router';
import breakpoints from '../../media-query';
import measure from 'remeasure';

const links = {
  always_visible: [
    { name: "home", path: "/" },
    { name: "galerias", path: "/galerias" },
    { name: "linha do tempo", path: "/timeline" },
    { name: "notícias", path: "/noticias" },
  ],
  mobile_hidden: [
    { name: "ficha técnica", path: "/ficha-tecnica" },
    { name: "fale conosco", path: "#fale-conosco" },
  ],
}


@measure
class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      initialY: null,
      open: false,
    }
  }

  componentDidMount() {
    console.log(this.props.position.offsetTop)
    this.setState({
      initialY: this.props.position.offsetTop,
    })
  }

  // isOnHeader = () => {
  //   if ( distance_scrolled > initial_height) {
  //       nav.classList.remove('is-on-header')
  //   } else {
  //       nav.classList.add('is-on-header') 
  //   }
  //   this.setState({
  //     isOnHeader
  //   })
  // }

  renderLink = (link) => (
    <li 
      key={link.name}
      className='c-site-nav__item'>
      <Link 
        to={link.path}
        className='c-site-nav__link' >
        {link.name}
      </Link>
    </li>
  )

  toggle = () => { 
    console.log(this.refs.nav.offsetTop);
    const open = !this.state.open;
    this.setState({
      open: open
    })
  }

  render() {
    return (
      <nav
        ref='nav'
        className='c-site-nav is-on-header'>
        <ul className='c-site-nav__list'>
          { links.always_visible.map( this.renderLink )}
          <li className='c-site-nav__item'>
            <button onClick={ this.toggle }>
              <span className='fa fa-bars' />
            </button>
          </li>
          { !this.state.open ? null :
            links.mobile_hidden.map( this.renderLink )
          }
        </ul>
      </nav>
    )
  }
}

export default Nav;

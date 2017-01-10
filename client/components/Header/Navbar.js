import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import breakpoints from '../../media-query';
import measure from 'remeasure';

const links = {
  always_visible: [
    { name: <span className='fa fa-home' />, path: "/" },
    { name: "galerias", path: "/galerias" },
    { name: "linha do tempo", path: "/timeline" },
    { name: "notícias", path: "/noticias" },
  ],
  mobile_hidden: [
    { name: "ficha técnica", path: "/ficha-tecnica" },
    { name: "fale conosco", path: "#fale-conosco" },
  ],
}

class Nav extends React.Component {
  constructor() {
    super()
    this.initialY = false;
    this.state = {
      isOnHeader: true
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.updatePosition)
  }

  updatePosition = () => {
    // initialY is a hack to correctly set position
    // don't know why the position is wrong when
    // calculating on mount
    const top = this.Nav.offsetTop
    if (this.initialY > -1 && top > 0) this.initialY = top;

    const scrolled = document.body.scrollTop;
    if (scrolled < this.initialY) {
        this.setState({
          isOnHeader: true
        })
      } else {
        this.setState({
          isOnHeader: false
        })
      }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.updatePosition)
  }

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
    this.setState( (prevState, props) => {
      return {open: !prevState.open}
    });
  }
  render() {
    const onHeaderClass = this.state.isOnHeader ? 'is-on-header' : '';
    return (
      <nav
        ref={ c => this.Nav = c }
        className={`c-site-nav ${onHeaderClass}`}>
        <ul className='c-site-nav__list'>
          { links.always_visible.map( this.renderLink )}
          <li className='c-site-nav__item'>
            <button 
              onClick={ this.toggle }>
              <span className='fa fa-bars' />
            </button>
          </li>
          { !this.state.open ? null :
            <div className='dropdown'>
              {links.mobile_hidden.map( this.renderLink )}
            </div>
          }
        </ul>
        <style jsx>{`
          .dropdown {
            margin-top: 8px;
          }
          button {
            color: currentColor;
            background-color: transparent;
          } 
          `}</style>
      </nav>
    )
  }
}

export default Nav;

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import breakpoints from '../../media-query';
import measure from 'remeasure';

const links = [
    { name: <span className='fa fa-home' />, path: "/#home" },
    { name: "galerias", path: "/galerias" },
    { name: "linha do tempo", path: "/timeline" },
    { name: "notícias", path: "/noticias" },
    { name: "ficha técnica", path: "/ficha-tecnica" },
    { name: "fale conosco", path: "#fale-conosco" },
]

class Nav extends React.Component {
  constructor() {
    super()
    this.initialY = false;
    this.state = {
      isOnHeader: true
    }
  }

  componentDidMount() {
    const { Nav, Menu } = this;
    const dragHandler = this.dragHandler;
    const viewportWidth = document.body.clientWidth;
    const menuWidth = this.Menu.scrollWidth;

    document.addEventListener('scroll', this.updatePosition)

    if (viewportWidth < menuWidth) {

      Nav.addEventListener('touchstart', (e) => {
        this.mouseX = e.targetTouches[0].clientX;
        this.menuOffsetX = this.Menu.getBoundingClientRect().left;
        Nav.addEventListener('touchmove', dragHandler, true);
      });

      Nav.addEventListener('touchend', (e) => {
        Nav.removeEventListener('touchmove', dragHandler, true);
      })

      Nav.addEventListener('mousedown', (e) => {
        this.mouseX = e.x;
        this.menuOffsetX = this.Menu.getBoundingClientRect().left;
        Nav.addEventListener('mousemove', dragHandler, true);
      });

      Nav.addEventListener('mouseup', (e) => {
        Nav.removeEventListener('mousemove', dragHandler, true)
      });

      Nav.addEventListener('mouseout', () => {
        Nav.removeEventListener('mousemove', dragHandler, true)
      });

      Nav.addEventListener('mouseleave', () => {
        Nav.removeEventListener('mousemove', dragHandler, true)
      });

    }
  }

  dragHandler = (e) => {
    let translation;
    const viewportWidth = document.body.clientWidth;
    const { left } = this.Menu.getBoundingClientRect();
    const right = this.Menu.scrollWidth - Math.abs(left);

    const newMouseX = e.x || e.targetTouches[0].clientX;
    const deltaX = newMouseX - this.mouseX + this.menuOffsetX;

    if ( left < 0 && right < viewportWidth && newMouseX < this.mouseX ) return 0;
    if ( left > 0 && right > viewportWidth && newMouseX > this.mouseX ) return 0;
    
    if (deltaX > 0) {
      translation = 0;
    } else if (Math.abs(deltaX) > this.Menu.scrollWidth - viewportWidth) {
      translation = -1 * (this.Menu.scrollWidth - viewportWidth + 12);
    } else {
      translation = deltaX;
    }

    this.Menu.style.transform = `translateX(${ translation }px)`;
  }

  updatePosition = () => {
    // initialy is a hack to correctly set position
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

  render() {
    const onHeaderClass = this.state.isOnHeader ? 'is-on-header' : '';
    return (
      <nav
        ref={ c => this.Nav = c }
        className={`c-site-nav ${onHeaderClass}`}>
        <ul
          ref={ c => this.Menu = c }
          className='c-site-nav__list'>
          { links.map( this.renderLink )}
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

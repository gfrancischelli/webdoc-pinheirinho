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
    const dragHandler = this.dragHandler;
    const viewportWidth = document.body.clientWidth;
    const menuWidth = this.Menu.scrollWidth;

    document.addEventListener('scroll', this.updatePosition)

    if (viewportWidth < menuWidth) {

      this.Nav.addEventListener('mousedown', (e) => {
        this.mouseX = e.x;
        this.menuOffsetX = this.Menu.getBoundingClientRect().left;

        this.Nav.addEventListener('mousemove', dragHandler, true);
      });

      this.Nav.addEventListener('mouseup', (e) => {
        this.Nav.removeEventListener('mousemove', dragHandler, true)
      });

      this.Nav.addEventListener('mouseout', () => {
        this.Nav.removeEventListener('mousemove', dragHandler, true)
      });

      this.Nav.addEventListener('mouseleave', () => {
        this.Nav.removeEventListener('mousemove', dragHandler, true)
      });

    }
  }

  dragHandler = (e) => {
    const viewportWidth = document.body.clientWidth;
    const { left } = this.Menu.getBoundingClientRect();
    const right = this.Menu.scrollWidth - Math.abs(left);

    const newMouseX = e.x;
    const deltaX = newMouseX - this.mouseX + this.menuOffsetX;

    if ( left < 0 && right < viewportWidth && newMouseX < this.mouseX ) return 0;
    if ( left > 0 && right > viewportWidth && newMouseX > this.mouseX ) return 0;

    this.Menu.style.transform = `translateX(${ deltaX }px)`;
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

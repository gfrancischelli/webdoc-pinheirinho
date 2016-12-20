<navbar>
    
    <nav ref="nav" class="c-site-nav is-on-header">
        <ul class="c-site-nav__list">
            <li each={ links.always_visible } class="c-site-nav__item">
                <a class="c-site-nav__link { title }" href={ url }>
                    { link }
                </a>
            </li>
            
            <li each={ links.mobile_hidden } class="c-site-nav__item mobile-hidden">
                <a class="c-site-nav__link { title }" href={ url }>
                    { link }
                </a>
            </li>
         
            <li ref='btn_action' id='dropdown-btn' onclick={ collapse } class="c-site-nav__item">
                <button><span class="fa fa-bars"></span></button>
            </li>
        </ul>
        
        <ul ref='dropdown' id='dropdown' class="c-site-nav__list">
            <li each={ links.mobile_hidden } class="c-site-nav__item">
                <a class='c-site-nav__link' href={ url }>
                    { link  }
                </a>
            </li>
        </ul>
    </nav>

    let initial_height;

    this.on('mount', () => initial_height = this.refs.nav.offsetTop)

    this.links = {
        always_visible: [
            { link: "home", url: "/" },
            { link: "galerias", url: "/galerias" },
            { link: "notícias", url: "/noticias" },
        ],
        mobile_hidden: [
            { link: "ficha técnica", url: "/ficha-tecnica" },
            { link: "fale conosco", url: "#fale-conosco" },
            { link: "linha do tempo", url: "/timeline" },
        ],
    }
    
    this.collapse = (e) => {
        console.log('click')
        this.refs.dropdown
            .classList
            .toggle('active')
    }
    
    this.offsetY = () => {
        const nav = this.refs.nav;
        const distance_scrolled  = document.body.scrollTop;
        if ( distance_scrolled > initial_height) {
           nav.classList.remove('is-on-header')
        } else {
           nav.classList.add('is-on-header') 
        }
    }

    window.addEventListener('scroll', this.offsetY)

    <style scoped>
        .mobile-hidden { 
            display: none;
        }
        #dropdown { 
            opacity: 0;
            height: 0;
            transition: all 0.5s ease;
        }
        #dropdown.active {
            padding-top: 12px;
            opacity: 1;
            height: auto;
        }
        #dropdown-btn button {
            color: currentColor;
            background-color: transparent;
        }
        
        /* see _include-media.scss */ 
        @media screen and (min-width: 600px) {
            .mobile-hidden { 
                display: inline;
            }
            #dropdown,
            #dropdown-btn { 
                display: none;
            }
        }
    </style>

</navbar>


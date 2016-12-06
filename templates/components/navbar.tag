<navbar>
    
    <nav class="c-site-nav">
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

    this.hey = opts.title

    this.links = {
        always_visible: [
            { link: "home", url: "/" },
            { link: "galerias", url: "/galerias" },
            { link: "notícias", url: "/noticias" },
        ],
        mobile_hidden: [
            { link: "ficha técnica", url: "/ficha-tecnica" },
            { link: "fale conosco", url: "#fale-conosco" },
            { link: "jurídico", url: "#juridico" },
        ],
    }
    

    this.collapse = (e) => {
        console.log('click')
        this.refs.dropdown
            .classList
            .toggle('active')
    }


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
            background-color: transparent;
        }
        
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


<gallery>
    <ul ref="list" class="o-mosaic" id="gallery-list">
        <yield />
    </ul>

    <div ref="modal" onclick={ closeModal } class="modal">
        <img ref"modal_img" src={ current_image_src }>
    </div>
    
    const self = this;
    this.current_image_src = '';
    this.current_image = 0;
    let images;
    let modal;

    function handleClick(item, index) {
        item.addEventListener('click', function() {
            modal.classList.add('active')
            changeImage(index)
        })
    }

    function changeImage(id) {
        self.current_image = id;
        self.update({ current_image_src: images[id].getAttribute('src') })
    }
    
    this.on('mount', () => {
        modal = this.refs.modal;
        images = Array.from(document.querySelectorAll('#gallery-list img'));
        images.forEach(handleClick);
    })

    this.next = () => {
        const next = self.curret_image + 1;
        changeImage(next);
    }

    this.previous = () => {
        const previous = self.current_image ? self.current_image - 1 : 0;
        changeImage(previous);
    }

    this.closeModal = () => {
        modal.classList.remove('active');
    }

    <style scoped>
    .fa {
        position: absolute;
        top: 50%;
        font-size: 36px;
        color: white;
        transform: translateY(-50%);
    }
    #right {
        right: 24px;
    }
    #left {
        left: 24px;
    }
    .modal {
        pointer-events: none;
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        top: 0;
        left:  0;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    .modal.active{
        pointer-events: auto;
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.4)
    }
    .modal img {
        width: 100%;
        display: block;
        margin: 0 auto;
    }
    </style>
</gallery>

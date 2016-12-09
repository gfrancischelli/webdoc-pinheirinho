<contact-form>

    <form ref="contactForm" onsubmit={ post } class="c-form" method="post">
        
        <div class="c-form__field">
            <input ref="name" name="FullName" class="c-form__input"
                type="text" placeholder=" " required>
            <span class="c-form__status-icon"></span>
            <label class="c-form__label" for="FullName">nome</label>
        </div>
        
        <div class="c-form__field">
            <input ref="email" name="Email" class="c-form__input"
                type="email" placeholder=" " required>
            <span class="c-form__status-icon"></span>
            <label class="c-form__label" for="Email">email</label>
        </div>
        
        <div class="c-form__field">
            <input ref="subject" name="Subject" class="c-form__input"
                type="text" placeholder=" " required>
            <span class="c-form__status-icon"></span>
            <label class="c-form__label" for="Subject">assunto</label>
        </div>

        <div class="c-form__field">
            <textarea ref="content" name="Content" class="c-form__input"
                type="text" placeholder=" " required></textarea>
            <label class="c-form__label" for="Subject">mensagem</label>
        </div>

        <load-button message={ "Enviar" } state={ status }>
            <yield to="completed">Mensagem Enviada</yield>
        </load-button>
    </form>

    <script>
        
        let form;
        this.status = 'initial';
        this.on('mount', () => form = this.refs.contactForm);

        this.post = (e) => {
            e.preventDefault();
            const self = this;
         
            if ( !form.checkValidity() ) {
                self.tags['load-button'].message = "Verifique a validade dos campos";
                self.update();
                return
            }
         
            this.status = 'pending';
            this.tags['load-button'].state = this.status;
            this.update();
            
            const body =  JSON.stringify({
                    name: this.refs.name.value,
                    address: this.refs.email.value,
                    subject: this.refs.subject.value,
                    content: this.refs.content.value,
            });
            
           fetch('/mail', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/json',
                },
                body: body,
            })
            .then( function(response) {
                return response.json();
            })
            .then(function(data) {
                self.status = data.status;
                self.tags['load-button'].state = self.status;
                form.reset();
                self.update();
            })
        };

    </script>

</contact-form>

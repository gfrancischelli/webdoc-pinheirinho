<load-button>

    <button disabled={ state == 'success' }
            class="c-btn c-btn--fluid {c-btn--disabled: state == 'success' }">

        <span show={ state == 'initial' }>{ message }</span>

        <span show={ state == 'pending' } class="fa fa-spinner fa-pulse"></span>

        <span show={ state == 'success' }>
            <yield from="completed" /> <span class="fa fa-check"></span>
        </span>

        <span show={ state == 'error' }>
            Tente novamente mais tarde <span class="fa fa-exclamation"></span>
        </span>

    </button>

    this.state = opts.state;
    this.message = opts.message;

</load-button>

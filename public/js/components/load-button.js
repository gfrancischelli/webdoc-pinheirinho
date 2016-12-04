riot.tag2('load-button', '<button disabled="{state == \'success\'}" class="c-btn c-btn--fluid {c-btn--disabled: state == \'success\'}"> <span show="{state == \'initial\'}"><yield from="initial"></yield></span> <span show="{state == \'pending\'}" class="fa fa-spinner fa-pulse"></span> <span show="{state == \'success\'}"> <yield from="completed"></yield> <span class="fa fa-check"></span> </span> </button>', '', '', function(opts) {


    this.state = opts.state

});

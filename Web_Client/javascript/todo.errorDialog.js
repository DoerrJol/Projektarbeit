$.widget("todo.errorDialog", $.ui.dialog, {
    options: {
        autoOpen: false,
        modal: true,
        buttons: [
            {
                text:"Schliessen"
            }
        ],

    },

    _create: function() {
        var that = this;
        var close = this.options.buttons[0];
        close.click = function(){
            that.close();
        };
        this._super();
    },

    open: function(message) {
        this.element.find(".message").text(message);
        this._super();
    }
});
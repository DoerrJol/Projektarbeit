$.widget("ekliste.addDialog", $.ui.dialog, {
    options: {
        autoOpen: false,
        modal: true,
        buttons: [
            {
                text:"Abbrechen"
            },
            {
                text:"OK"
            }
        ],
        width: 550

    },

    _create: function() {
        var that = this;
        var cancel = this.options.buttons[0];
        cancel.click = function(){
            that.close();
        }

        this._super();
    },

    open: function(ekliste) {
        this._super();
        this._ekliste = ekliste;
        this.element.find("#add_title_field").val();
        this.element.find("#add_notes_field").val(); 
        this.element.find(".validation_message").empty();
        this.element.find("#add_title_field").removeClass("ui-state-error");
    }
});
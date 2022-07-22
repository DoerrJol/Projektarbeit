$.widget("ekliste.deleteDialog", $.ui.dialog, {
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

    },

    _create: function() {
        var that = this;
        var cancel = this.options.buttons[0];
        cancel.click = function(){
            that.close();
        }

        var ok = this.options.buttons[1];
        ok.click = function(){
            that.close();
            $.ajax({
                url: that._ekListeUrl,
                type: "DELETE",
                success: function() {
                    that._trigger("onListDeleted");
                },
                context: this
              });
        }
        this._super();
    },

    open: function(ekListeUrl) {
        this._super();
        this._ekListeUrl = ekListeUrl;
    }
});
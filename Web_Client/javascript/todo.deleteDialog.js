$.widget("todo.deleteDialog", $.ui.dialog, {
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
                url: that._todoUrl,
                type: "DELETE",
                success: function() {
                    that._trigger("onTodoDeleted");
                },
                context: this
              });
        }
        this._super();
    },

    open: function(todoUrl) {
        this._super();
        this._todoUrl = todoUrl;
    }
});
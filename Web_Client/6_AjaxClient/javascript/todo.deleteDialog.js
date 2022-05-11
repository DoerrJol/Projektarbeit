$.widget("todo.deleteDialog", $.ui.dialog, {
    options: {
        autoOpen: false,
        modal: true,
        buttons: [
            {
                text: "Löschen"
            },
            {
                text: "Abbrechen"
            }

        ]
    },

    open: function(todoUrl) {
        this._super();
        this._todoUrl = todoUrl;
    },

    _create: function(){
        var that = this;
        var cancel = this.options.buttons[1];
        cancel.click = function(){
            that.close();
        }

        var ok= this.options.buttons[0];
        ok.click = function(){
            that.close();
            $.ajax({
                url: that._todoUrl,
                type: "DELETE",
                success: function(){
                    that._trigger("onTodoDeleted");
                },
                context: this
            });
        }
        this._super();
    }
})
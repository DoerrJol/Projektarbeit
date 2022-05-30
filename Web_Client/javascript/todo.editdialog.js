$.widget("todo.editDialog", $.ui.dialog, {
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

        var ok = this.options.buttons[1];
        ok.click = function(){
            var todo ={
                due_date: that.element.find("#due_date_field").val(),
                title: that.element.find("#title_field").val(),
                notes: that.element.find("#notes_field").val(),
            };
            $.ajax({
                url: that._todo.url,
                type: "PUT",
                data: todo,
                headers: {
                    "If-Match": that._todo.version
                },
                success: function(){
                    that.close();
                    that._trigger("onTodoEdited");
                },
                error: function(response) {
                    that.element.find(".validation_message").empty();
                    that.element.find("#title_field").removeClass("ui-state-error");
                    if (response.status == 400){
                    var validationMessages = $.parseJSON(response.responseText);
                    that.element.find(".validation_message").text(validationMessages.title);
                    that.element.find("#title_field").addClass("ui-state-error").focus();
                }}
              });
        }
        this.element.find("#due_date_field").datepicker({dateFormat: "yy-mm-dd"});
        this._super();
    },

    open: function(todo) {
        this._super();
        this._todo = todo;
        this.element.find("#due_date_field").val(todo.due_date); 
        this.element.find("#title_field").val(todo.title); 
        this.element.find("#notes_field").val(todo.notes); 
        this.element.find(".validation_message").empty();
        this.element.find("#title_field").removeClass("ui-state-error");
    }
});
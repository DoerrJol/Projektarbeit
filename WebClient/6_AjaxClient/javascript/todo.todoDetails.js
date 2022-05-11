$.widget("todo.todoDetails",{
    load: function(todoUrl){
        $.ajax({
            url: todoUrl,
            dataType: "json",
            success: function(todo){
                this.element.find(".author").text(todo.author);
                this.element.find(".due_date").text(todo.due_date);
                this.element.find(".title").text(todo.title);
                this.element.find(".notes").text(todo.notes);
            },
            context: this
          });
    }
})
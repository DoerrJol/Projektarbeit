$.widget("todo.todoList", {
  _create: function () {
    $.ajax({
      url: "/DoerrJol/5_WebService/todos",
      dataType: "json",
      success: this._appendTodos,
      context: this
    });
  },
  _appendTodos: function (todos) {
    var that = this;
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];
      var todoElement = this.element.find(".template").clone().removeClass("template");

      todoElement.find(".author").text(todo.author);
      todoElement.find(".due_date").text(todo.due_date);
      todoElement.find(".title").text(todo.title);
      todoElement.click(todo.url, function(event){
       that._trigger("onTodoClicked", null, event.data);
      });
      todoElement.find(".delete_todo").click(todo.url, function(event){   
        that._trigger("onDeleteTodoClicked", null, event.data);
        return false;
      });
      todoElement.find(".edit_todo").click(todo, function(event){   
        that._trigger("onEditTodoClicked", null, event.data);
        return false;
      });
      this.element.append(todoElement);
    }
  },

  reload: function(){
    this.element.find(".todo:not(.template)").remove();
    $.ajax({
      url: "/DoerrJol/5_WebService/todos",
      dataType: "json",
      success: this._appendTodos,
      context: this
    });
  }
});

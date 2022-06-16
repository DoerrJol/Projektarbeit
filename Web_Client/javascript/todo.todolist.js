$.widget("todo.todoList", {  
  _create: function() { 
    $.ajax({
      url: "http://localhost/Projektarbeit/Web_Service/listen",
      dataType: "json",
      success: this._appendTodos,
      context: this
    });
  },

  _appendTodos: function(listen) {
    var that = this;
    for (var i = 0; i < todos.length; i++){
      var todo = todos[i];
      var todoElement = this.element.find(".template").clone().removeClass("template");

      todoElement.find(".ekstatus").text(todo.status);
      todoElement.find(".title").text(todo.titel);
      todoElement.click(todo.url, function(event){
        that._trigger("onEKLClicked", null, event.data);
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

  reload: function() {
    this.element.find(".ekliste:not(.template)").remove();
    $.ajax({
      url: "http://localhost/Projektarbeit/Web_Service/listen",
      dataType: "json",
      success: this._appendTodos,
      context: this
    });
  }
});
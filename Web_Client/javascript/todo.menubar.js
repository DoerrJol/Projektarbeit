$.widget("todo.menuBar", {
    _create: function(){
        var that = this;
        this.element.find(".show_todos").click(function(){
            that._trigger("onShowTodosClicked");
            return false;
        })
    }
});
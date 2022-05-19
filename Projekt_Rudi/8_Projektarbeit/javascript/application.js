$(function() {
    $(document).ajaxError(function(event, response) {
        alert(response.statusText);
        if (response.status == 400)
            return;

        $("#todo_list").show();

        if(response.status == 404){
            $("#todo_list").todoList("reload"); 
        }
        
    });
});
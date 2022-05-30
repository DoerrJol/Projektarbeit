$(function() {
    $(document).ajaxError(function(event, response){
        if (response.status == 400) {
             return; 
        }

        $("#error_dialog").errorDialog("open", response.statusText);
        $("#ek_liste").show();
        $("#ekl_details").hide();
        if (response.status == 404){
        $("#ek_liste").EKList("reload");
        }
    });

    $(document).ajaxStart(function(){
        $.blockUI({message: null})
    })

    $(document).ajaxStop(function(){
        $.unblockUI();
    })


    $("#error_dialog").errorDialog();
    $("#ek_liste").EKList({
        onEKLClicked: function(event, eklisteUrl) {
            $("#ek_liste").hide();
            $("#ekl_details").show();
            $("#ekl_details").todoDetails("load", eklisteUrl);
        },

        onDeleteTodoClicked: function(event, todoUrl) {
            $("#delete_dialog").deleteDialog("open", todoUrl);
        
        },
        onEditTodoClicked: function(event, todo) {
            $("#edit_dialog").editDialog("open", todo);
        
        }
    });
    $("#ekl_details").todoDetails();
    $("#delete_dialog").deleteDialog({
        onTodoDeleted: function() {
            $("#ek_liste").EKList("reload");
        }
    });

    $("#edit_dialog").editDialog({
        onTodoEdited: function() {
            $("#ek_liste").EKList("reload");
        }
    });

    $("#menu_bar").menuBar({
        onShowTodosClicked: function() {
            $("#ek_liste").show();
            $("#ekl_details").hide();
            $("#ek_liste").EKList("reload");
        }
    });

});
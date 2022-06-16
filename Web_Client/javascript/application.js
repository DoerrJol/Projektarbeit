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

        onDeleteTodoClicked: function(event, eklisteUrl) {
            $("#delete_dialog").deleteDialog("open", eklisteUrl);
        
        },
        onEditTodoClicked: function(event, eklisteUrl) {
            $("#edit_dialog").editDialog("open", todo);
        
        }
    });
    $("#ekl_details").todoDetails();
    $("#delete_dialog").deleteDialog({
        onListDeleted: function() {
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
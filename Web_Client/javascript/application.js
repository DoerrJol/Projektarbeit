$(function() {
    $(document).ajaxError(function(event, response){
        if (response.status == 400) {
             return; 
        }

        $("#error_dialog").errorDialog("open", response.statusText);
        $("#ek_liste").show();
        $("#ek_details").hide();
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
            $("#ek_details").show();
            $("#ek_details").listenDetails("load", eklisteUrl);
        },

        onDeleteEKLClicked: function(event, eklisteUrl) {
            $("#delete_dialog").deleteDialog("open", eklisteUrl);
        
        },
        onEditEKLClicked: function(event, eklisteUrl) {
            $("#edit_dialog").editDialog("open", eklisteUrl);
        
        },
        onAddEKLClicked: function(event, eklisteUrl) {
            $("#add_dialog").addDialog("open");
        
        }
    });
    $("#ek_details").listenDetails();
    $("#delete_dialog").deleteDialog({
        onListDeleted: function() {
            $("#ek_liste").EKList("reload");
        }
    });

    $("#edit_dialog").editDialog({
        onEKLEdited: function() {
            $("#ek_liste").EKList("reload");
        }
    });

    $("#menu_bar").menuBar({
        onShowListenClicked: function() {
            $("#ek_liste").show();
            $("#ek_details").hide();
            $("#ek_liste").EKList("reload");
        }
    });

});
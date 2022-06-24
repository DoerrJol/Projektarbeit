$.widget("ekliste.listenDetails", {
    load: function(eklistUrl) {
        $.ajax({
            url: eklistUrl,
            dataType: "json",
            //context: this,
            success: function(ekliste) {
                for (var i = 0; i < ekliste.length; i++){
                    var that = this;
                  var eklist = ekliste[i];
                  var eklistenElement = this.element.find(".details").clone().removeClass("details");
               eklistenElement.find(".produkt").text(eklist.bezeichnung);
               eklistenElement.find(".menge").text(eklist.menge);
               this.element.append(eklistenElement);
                }
            },
            context: this
    });
    },

});
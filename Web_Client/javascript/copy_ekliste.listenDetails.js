$.widget("ekliste.listenDetails", {
    load: function(eklistUrl) {
        $.ajax({
            url: eklistUrl,
            dataType: "json",
            success: function(ekliste) {

               this.element.find(".produkt").text(ekliste.bezeichnung);
               this.element.find(".menge").text(ekliste.menge);
            
            
            },
            context: this
    });
    }
});
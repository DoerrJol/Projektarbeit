$.widget("ekliste.EKList", {  
  _create: function() { 
    $.ajax({
      url: "http://localhost/Projektarbeit/Web_Service/listen",
      dataType: "json",
      success: this._appendEKLists,
      context: this
    });
  },

  _appendEKLists: function(eklisten) {
    var that = this;
    for (var i = 0; i < eklisten.length; i++){
      var ekliste = eklisten[i];
      var eklElement = this.element.find(".template").clone().removeClass("template");

      eklElement.find(".ekstatus").text(ekliste.status);
      eklElement.find(".title").text(ekliste.titel);
      eklElement.click(ekliste.url, function(event){
        that._trigger("onEKLClicked", null, event.data);
      });
      eklElement.find(".delete_ekl").click(ekliste.url, function(event){
        that._trigger("onDeleteEKLClicked", null, event.data);
        return false;
      });
      eklElement.find(".edit_ekl").click(ekliste, function(event){
        that._trigger("onEditEKLClicked", null, event.data);
        return false;
      });
      this.element.append(eklElement);
    }
  },

  reload: function() {
    this.element.find(".ekliste:not(.template)").remove();
    $.ajax({
      url: "http://localhost/Projektarbeit/Web_Service/listen",
      dataType: "json",
      success: this._appendEKLists,
      context: this
    });
  }
});
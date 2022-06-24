$.widget("ekliste.menuBar", {
    
        _create: function() {
            var that = this;
            this.element.find(".show_eklisten").click(function() {
                that._trigger("onShowListenClicked");
                return false;
            });
        }
    });
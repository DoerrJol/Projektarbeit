$.widget("ekliste.menuBar", {
    
        _create: function() {
            var that = this;
            this.element.find(".show_eklisten").click(function() {
                that._trigger("onShowListenClicked");
                return false;
            });
            var that = this;
            this.element.find(".add_ekliste").click(function() {
                that._trigger("onAddEKLClicked");
                return false;
            });
        }
    });
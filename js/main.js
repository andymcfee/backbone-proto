var AppRouter = Backbone.Router.extend({
    appView: {
      contentHolder: 1,
      showView: function(view) {
        if(v = this.currentHolder) {
          this.currentHolder.addClass('inactive');
          if(z = this.currentView) {
            _.delay(function() { z.close(); v.remove(); }, 2000);
          }
        }


        this.currentHolder = $('#content'+this.contentHolder);
        this.currentView = view;

        $("<div id='content"+(this.contentHolder+1)+"' class='content inactive span12>'></div>").insertAfter(this.currentHolder);

        this.currentHolder.html(this.currentView.render().el).removeClass("inactive").addClass("active");

        this.contentHolder ++;
      }
    },

    routes: {
        ""                  : "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

  	list: function(page) {
        var self = this;
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            self.appView.showView(new WineListView({model: wineList, page: p})); 
            //$("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var self = this;
        var wine = new Wine({id: id});
        wine.fetch({success: function(){
            self.appView.showView(new WineView({model: wine})); 
        }});
        this.headerView.selectMenuItem();
    },

    addWine: function() {
        var wine = new Wine();
        this.appView.showView(new WineView({model: wine})); 
        this.headerView.selectMenuItem('add-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
  if(this.onClose) {
    this.onClose();
  }
}

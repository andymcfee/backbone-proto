window.Wine = Backbone.Model.extend({
  urlRoot: "http://localhost:3030/api/wines",

  defaults: {
    id: null,
    name: "",
    grapes: "",
    country: "USA",
    region: "California",
    year: "",
    description: "",
    picture: null
  },

  validate: function(attr) {
    console.log("in validate method",attr);
    if(!attr.name) return {name: "name", message: "You must enter a name"}; 
  }

});

window.WineCollection = Backbone.Collection.extend({
  model: Wine,
  url:"http://localhost:3030/api/wines"
});

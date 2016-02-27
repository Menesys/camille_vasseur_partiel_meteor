var commercesCollection = new Mongo.Collection("commerces");
var menusCollection = new Mongo.Collection("menus");

Router.configure({
  layoutTemplate: 'layout'
});

//Home : liste des commerces
Router.route('/', {name: 'commerceList', template: 'commerceList', data: function(){
  return ({commerces :commercesCollection.find()});
}
});

//Commande
Router.route('/commander/:_id/:restant', {name: 'commander', template: 'commander', data:
  function(){

    var men = menusCollection.findOne(this.params._id);

    men.restant = this.params.restant - 1;
    menusCollection.update({_id :''+this.params._id},men);

    return{menu: men};
  }
});

//Détails : détails d'un commerce
Router.route('/details/:_id', {name: 'details', template: 'details', data:
function(){
  var util;
  if (Meteor.user()) {
    util= Meteor.user();
  }
  var com = commercesCollection.findOne(this.params._id);
  var men = [];
  for (var i = 0; i < com.menus.length; i++) {
    var m = menusCollection.findOne(''+com.menus[i]);
    men[i] = m;
  }
  return{commerce: com,
    menus : men,
    user : util
  };
}
});

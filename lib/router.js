var commercesCollection = new Mongo.Collection("commerces");
var menusCollection = new Mongo.Collection("menus");

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'commerceList', template: 'commerceList', data: function(){
  return ({commerces :commercesCollection.find()});
}
});

Router.route('/commander/:_id/:restant', {name: 'commander', template: 'commander', data:
  function(){

    var men = menusCollection.findOne(this.params._id);

    men.restant = this.params.restant - 1;
    menusCollection.update({_id :''+this.params._id},men);

    return{menu: men};
  }
});


Router.route('/details/:_id', {name: 'details', template: 'details', data:
function(){
  var com = commercesCollection.findOne(this.params._id);
  var men = [];
  for (var i = 0; i < com.menus.length; i++) {
    console.log(com.menus[i]);
    var m = menusCollection.findOne(''+com.menus[i]);
    console.log(m);
    men[i] = m;
  }
  return{commerce: com,
    menus : men
  };
}
});

sc_require('core');

Portfolio.routes = SC.Object.create({
  register: function(){
    var routes = {
      'portfolio': function(){
          console.log('showing portfolio');
          Portfolio.getPath('mainPage.mainPane').append();      
      },
      'products': function(){
          console.log('showing products');
          Portfolio.getPath('productPage.mainPane').append();      
      }      
    };
    
    for(route in routes){
      SC.routes.add(route, Portfolio.routes, routes[route]);
    }
  },
});
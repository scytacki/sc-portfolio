// ==========================================================================
// Project:   Sc-portfolio
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sc-portfolio */
sc_require('routes');

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Portfolio.main = function main() {
  
  Portfolio.routes.register();

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Portfolio.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!
  var devWeeks = Portfolio.store.find(Portfolio.DevWeek);
  Portfolio.devWeeksController.set('content', devWeeks);  

  Portfolio.productsController.set('content', 
    Portfolio.store.find(Portfolio.Product));

  Portfolio.projectsController.set('content', 
    Portfolio.store.find(Portfolio.Project));

  //Portfolio.setPath('mainPage.mainPane.editor.projectSelection.objects',
  // objectsBinding: 'Portfolio.projectsController.arrangedObjects',
  // Portfolio.projectsController.set('content', Portfolio.store.findAll(Portfolio.Project));
} ;

function main() { Portfolio.main(); }

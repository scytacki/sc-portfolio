// ==========================================================================
// Project:   Portfolio.productPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

// This page describes a part of the interface for your application.
Portfolio.productPage = SC.Page.design({

  // Add your views here.  Ex:
  
  mainPane: SC.MainPane.design({
     
     didIsMainPane: function(){
       if(this.get('isMainPane')){

       } else {
         this.remove();        
       }
     }.observes('isMainPane'),
     
     childViews: 'tabView'.w(),
     
     tabView: SC.TabView.design({
       itemTitleKey: 'title',
       itemValueKey: 'value',

       nowShowing: 'productsView',
       items: [{
         title: "Products",
         value: 'productsView'
       },
       {
         title: "Projects",
         value: 'projectsView'
       }],
       
     })
  }),
  
  productsView: SC.View.design({
    childViews: 'sourceView detailsView'.w(),
    
    sourceView: SC.SourceListView.design({
      layout: {left: 0, width: 300},
      contentValueKey: 'name',
      contentBinding: 'Portfolio.productsController.arrangedObjects',
      selectionBinding: 'Portfolio.productsController.selection'
    }),
    
    detailsView: Portfolio.ProductView.design({
      layout: {left: 300},
      productBinding: 'Portfolio.productsController.selection'
    })
  }),
  
  projectsView: SC.View.design({
    childViews: 'sourceView detailsView'.w(),

    sourceView: SC.SourceListView.design({
      layout: {left: 0, width: 300},
      contentValueKey: 'name',
      contentBinding: 'Portfolio.projectsController.arrangedObjects',
      selectionBinding: 'Portfolio.projectsController.selection'
    }),

    detailsView: Portfolio.ProjectView.design({
      layout: {left: 300},
      projectBinding: 'Portfolio.projectsController.selection'
    })    
  }),
  
  
});

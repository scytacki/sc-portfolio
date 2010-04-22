// ==========================================================================
// Project:   Sc-portfolio - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

// This page describes the main user interface for your application.  
Portfolio.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'matrixView list editor'.w(),
    
    matrixView: Portfolio.Matrix.design({
      layout: { top: 0, left: 0, right: 0},
      selectionBinding: 'Portfolio.devWeeksController.currentSelection'
      // textAlign: SC.ALIGN_CENTER,
      // tagName: "h1", 
	  // escapeHTML: NO,	
    }),

    list: SC.View.design({
	    layout: { bottom:0, left: 0, right: 300, height: 224},
	    childViews: 'tabView bottomView'.w(),

        tabView: SC.TabView.design({
		  layout: { bottom: 24, left: 0, height: 200, right: 0},
		  itemTitleKey: 'title',
	      itemValueKey: 'value',
	    
	      nowShowing: 'tableLikeView',
	      items: [
	        { title: "Table Like View", value: 'tableLikeView'},
		    { title: "Grouped View", value: 'groupedView'}
	      ], 
	
	}),
			
		bottomView: SC.ToolbarView.design({
			layout: { bottom: 0, left: 0, right: 0, height: 24 },
			
			childViews: 'addButton'.w(),
			
			addButton: SC.ButtonView.design({
			   layout: { centerY: 0, height: 24, right: 12, width: 110 },
			   title:  "Add Dev Week",
			   target: 'Portfolio.devWeeksController',
			   action: 'addDevWeek'
			}),
		}),	
    }),

    editor: SC.View.design({
        layout: {bottom: 25, width: 200, right: 20, height: 72},
	    childViews: 'projectSelection developerSelection iterationSelection'.w(),
		
	    projectSelection: SC.SelectButtonView.design({
            layout: {bottom: 0, width: 200, right: 20, height: 24},

	        title: 'Project',
	        objects: Portfolio.store.find(Portfolio.Project),
	
	        nameKey: 'name',
	        theme: 'square',
	        valueBinding: 'Portfolio.devWeeksController*currentSelection.project',
	        checkboxEnabled: YES
	      }),

	    developerSelection: SC.SelectButtonView.design({
            layout: {bottom: 24, width: 200, right: 20, height: 24},

	        title: 'Project',
	        objects: Portfolio.store.find(Portfolio.Developer),

	        nameKey: 'name',
	        theme: 'square',
	        valueBinding: 'Portfolio.devWeeksController*currentSelection.developer',
	        checkboxEnabled: YES
	      }),
	
	    iterationSelection: SC.SelectButtonView.design({
            layout: {bottom: 48, width: 200, right: 20, height: 24},

	        title: 'Project',
	        objects: Portfolio.store.find(Portfolio.Iteration),

	        nameKey: 'name',
	        theme: 'square',
	        valueBinding: 'Portfolio.devWeeksController*currentSelection.iteration',
	        checkboxEnabled: YES
	      }),
    }), 

  }),

  tableLikeView: SC.ScrollView.design({
	  layout: { bottom: 0, left: 0, top: 0, right: 0},
      hasHorizontalScroller: NO,
      contentView: SC.StackedView.design({
	      childViews: [  
	        SC.ListView.design({
		      layout: {width: 100},
	          contentValueKey: 'iterationName',
	          contentBinding: 'Portfolio.devWeeksController.arrangedObjects',
	          canEditContent: YES,
	          selectionBinding: 'Portfolio.devWeeksController.selection'
	        }),
		    SC.ListView.design({
		      layout: {left: 105, width: 100},
	          contentValueKey: 'developerName',
	          contentBinding: 'Portfolio.devWeeksController.arrangedObjects',
	          canEditContent: YES,
	          selectionBinding: 'Portfolio.devWeeksController.selection'
	        }),
		    SC.ListView.design({
		      layout: {left: 210, width: 100},
	          contentValueKey: 'projectName',
	          contentBinding: 'Portfolio.devWeeksController.arrangedObjects',
	          canEditContent: YES,
	          selectionBinding: 'Portfolio.devWeeksController.selection'
	        }),
		  ],
		})			  
	}),
	
	groupedView: SC.ScrollView.design({
	    layout: { bottom: 0, left: 0, top: 0, right: 0},
	    hasHorizontalScroller: NO,
	    contentView: SC.ListView.design({
	          contentValueKey: 'summary',
	          contentBinding: 'Portfolio.devWeeksController.groupedContent',
	          contentGroupIndexes: function(){
	                return Portfolio.devWeeksController.get('groupIndices');
	          },
	          contentIndexIsGroup: function(idx){
	                return Portfolio.devWeeksController.get('groupIndices').contains(idx, 1);
	          },
	          canEditContent: YES,
	          selectionBinding: 'Portfolio.devWeeksController.selection'
	     }),
	}),
	

});

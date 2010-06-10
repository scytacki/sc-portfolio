// ==========================================================================
// Project:   Sc-portfolio - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

// This page describes the main user interface for your application.  
Portfolio.mainPage = {
  scViewType: SC.Page,

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: {
    scViewType: SC.MainPane,
    childViews: 'matrixView list editor'.w(),

    didIsMainPane: function(){
      if(this.get('isMainPane')){
        
      } else {
        this.remove();        
      }
    }.observes('isMainPane'),

    matrixView: {
      scViewType: Portfolio.Matrix,
      layout: {
        top: 0,
        left: 0,
        right: 0
      },
      selectionBinding: 'Portfolio.devWeeksController.currentSelection'
      // textAlign: SC.ALIGN_CENTER,
      // tagName: "h1", 
      // escapeHTML: NO,	
    },

    list: {
      scViewType: SC.View,
      layout: {
        bottom: 0,
        left: 0,
        right: 300,
        height: 224
      },
      childViews: 'tabView bottomView'.w(),

      tabView: {
        scViewType: SC.TabView,
        layout: {
          bottom: 24,
          left: 0,
          height: 200,
          right: 0
        },
        itemTitleKey: 'title',
        itemValueKey: 'value',

        nowShowing: 'tableLikeView',
        items: [{
          title: "Table Like View",
          value: 'tableLikeView'
        },
        {
          title: "Grouped View",
          value: 'groupedView'
        }],

      },

      bottomView: {
        scViewType: SC.ToolbarView,
        layout: {
          bottom: 0,
          left: 0,
          right: 0,
          height: 24
        },

        childViews: 'addButton'.w(),

        addButton: {
          scViewType: SC.ButtonView,
          layout: {
            centerY: 0,
            height: 24,
            right: 12,
            width: 110
          },
          title: "Add Dev Week",
          target: 'Portfolio.devWeeksController',
          action: 'addDevWeek'
        },
      },
    },

    editor: {
      scViewType: SC.View,
      layout: {
        bottom: 25,
        width: 200,
        right: 20,
        height: 72
      },
      childViews: 'projectSelection developerSelection iterationSelection'.w(),

      projectSelection: {
        scViewType: SC.SelectButtonView,
        layout: {
          bottom: 0,
          width: 200,
          right: 20,
          height: 24
        },

        title: 'Project',
        objects: Portfolio.store.find(Portfolio.Project),

        nameKey: 'name',
        theme: 'square',
        valueBinding: 'Portfolio.devWeeksController*currentSelection.project',
        checkboxEnabled: YES
      },

      developerSelection: {
        scViewType: SC.SelectButtonView,
        layout: {
          bottom: 24,
          width: 200,
          right: 20,
          height: 24
        },

        title: 'Project',
        objects: Portfolio.store.find(Portfolio.Developer),

        nameKey: 'name',
        theme: 'square',
        valueBinding: 'Portfolio.devWeeksController*currentSelection.developer',
        checkboxEnabled: YES
      },

      iterationSelection: {
        scViewType: SC.SelectButtonView,
        layout: {
          bottom: 48,
          width: 200,
          right: 20,
          height: 24
        },

        title: 'Project',
        objects: Portfolio.store.find(Portfolio.Iteration),

        nameKey: 'name',
        theme: 'square',
        valueBinding: 'Portfolio.devWeeksController*currentSelection.iteration',
        checkboxEnabled: YES
      },
    },

  },

  tableLikeView: {
    scViewType: SC.ScrollView,
    layout: {
      bottom: 0,
      left: 0,
      top: 0,
      right: 0
    },
    hasHorizontalScroller: NO,
    contentView: {
      scViewType: SC.StackedView,
      childViews: [{
        scViewType: SC.ListView,
        layout: {
          width: 100
        },
        contentValueKey: 'iterationName',
        contentBinding: 'Portfolio.devWeeksController.arrangedObjects',
        canEditContent: YES,
        selectionBinding: 'Portfolio.devWeeksController.selection'
      },
      {
        scViewType: SC.ListView,
        layout: {
          left: 105,
          width: 100
        },
        contentValueKey: 'developerName',
        contentBinding: 'Portfolio.devWeeksController.arrangedObjects',
        canEditContent: YES,
        selectionBinding: 'Portfolio.devWeeksController.selection'
      },
      {
        scViewType: SC.ListView,
        layout: {
          left: 210,
          width: 100
        },
        contentValueKey: 'projectName',
        contentBinding: 'Portfolio.devWeeksController.arrangedObjects',
        canEditContent: YES,
        selectionBinding: 'Portfolio.devWeeksController.selection'
      },
      ],
    }
  },

  groupedView: SC.ScrollView.design({
    layout: {
      bottom: 0,
      left: 0,
      top: 0,
      right: 0
    },
    hasHorizontalScroller: NO,
    contentView: SC.ListView.design({
      contentValueKey: 'summary',
      contentBinding: 'Portfolio.devWeeksController.groupedContent',
      contentGroupIndexes: function() {
        return Portfolio.devWeeksController.get('groupIndices');
      },
      contentIndexIsGroup: function(idx) {
        return Portfolio.devWeeksController.get('groupIndices').contains(idx, 1);
      },
      canEditContent: YES,
      selectionBinding: 'Portfolio.devWeeksController.selection'
    }),
  }),

};

(function() {
  function processDesign(obj) {
    var val, key;

    if (obj && obj.scViewType) {
      // need to recurse through all properties and "design them" before "designing this one."
      for (key in obj) {
        val = obj[key];
        if (val.scViewType) {
          obj[key] = processDesign(val);
        } else if (val.isSCArray) {
          for (var idx = 0; idx < val.get('length'); idx++) {
            val[idx] = processDesign(val[idx]);
          }
        }
      }
      return obj.scViewType.design(obj);
    }
    return obj;
  }

  if (Portfolio.mainPage.scViewType) {
    Portfolio.mainPage = processDesign(Portfolio.mainPage);
  }
})();

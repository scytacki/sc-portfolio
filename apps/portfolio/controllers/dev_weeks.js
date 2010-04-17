// ==========================================================================
// Project:   Portfolio.devWeeksController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Portfolio.devWeeksController = SC.ArrayController.create(
/** @scope Portfolio.devWeeksController.prototype */ {

  // TODO: Add your own code here.
  addDevWeek: function() {
    var devWeek;

	// I needed to add an empty hash so the createRecord method would generate an id correctly
    devWeek = Portfolio.store.createRecord(Portfolio.DevWeek, {});

    // select new task in UI
    this.selectObject(devWeek);

    // activate inline editor once UI can repaint
    this.invokeLater(function() {
      var contentIndex = this.indexOf(devWeek);
      var list = Portfolio.mainPage.getPath('mainPane.list.listView');
      var listItem = list.itemViewForContentIndex(contentIndex);
      listItem.beginEditing();
    });

    return YES;
  },

  currentSelection: function() {
	return this.get('selection').firstObject(); 
  }.property('selection'),
}) ;

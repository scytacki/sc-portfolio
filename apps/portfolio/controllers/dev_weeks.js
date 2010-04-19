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

  addDevWeek: function() {
    var devWeek;

	// I needed to add an empty hash so the createRecord method would generate an id correctly
    devWeek = Portfolio.store.createRecord(Portfolio.DevWeek, {});

    // select new task in UI
    this.selectObject(devWeek);

    return YES;
  },

  currentSelection: function() {
	return this.get('selection').firstObject(); 
  }.property('selection'),

  /**
    This was taken from the new version of Enumerable in the sproutcore master branch

    Converts an enumerable into a matrix, with inner arrays grouped based 
    on a particular property of the elements of the enumerable.

    @params key {String} the property to test
    @returns {Array} matrix of arrays
  */        
  doGroupBy: function(key){
    var len = this.get ? this.get('length') : this.length,
        ret = [],
        last = null,
        context = SC.Enumerator._popContext(),
        grouped = [], 
        keyValues = [];          
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      var cur = next ? (next.get ? next.get(key) : next[key]) : null;
      if(SC.none(grouped[cur])){ grouped[cur] = []; keyValues.push(cur); }
      grouped[cur].push(next);
      last = next;
    }
    last = null;
    context = SC.Enumerator._pushContext(context);
    
    for(var idx=0,len2=keyValues.length; idx < len2; idx++){
      ret.push(grouped[keyValues[idx]]);        
    }
    return ret ;
  },

  /**
    A property to hold the key to be used for the groupedContent property
  */
  groupBy: 'iteration',

  /**
    collection views can be bound to this property so it returns an array with
    group items
  */
  groupedContent: function(){
	var groups = this.doGroupBy(this.get('groupBy'));
	
	// concat the returned arrays together separated with group headers
	// and create the group indices set
	var result = [];
	var currGroup;	
	var groupObject;
	var groupIndices = SC.IndexSet.create();
	
	
	for(var idx=0; idx < groups.length; idx++){
		currGroup = groups[idx];

		// this pattern causes the observers to fire
		// it would probably be better to call the correct notify method directly
		groupIndices.add(result.length, 1);
		
		groupObject = currGroup[0].get(this.get('groupBy'));
		result.push(SC.Object.create({summary: groupObject?groupObject.get('name'):'undefined'}));
		result.pushObjects(currGroup);
	}
	this.set('groupIndices', groupIndices);
	return result;
  }.property('groupBy', '[]').cacheable(),

  /**
    grouping collection views need a set of indices that are the group headers
  */
  groupIndices: SC.IndexSet.create(),
}) ;

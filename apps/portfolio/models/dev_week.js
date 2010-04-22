// ==========================================================================
// Project:   Portfolio.DevWeek
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Portfolio.DevWeek = SC.Record.extend(
/** @scope Portfolio.DevWeek.prototype */ {

	developer: SC.Record.toOne('Portfolio.Developer'),
	
	iteration: SC.Record.toOne('Portfolio.Iteration'),
	
	project: SC.Record.toOne('Portfolio.Project'),
	
	summary: function() {
      return this.getPath('developer.name') + ' ' + this.getPath('project.name') + ' ' + this.getPath('iteration.name');
	}.property('project', 'developer', 'iteration'),

	developerNameBinding: '*developer.name',
	
	iterationNameBinding: '*iteration.name',
	
	projectNameBinding: '*project.name'

}) ;

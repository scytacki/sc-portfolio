// ==========================================================================
// Project:   Portfolio.Project
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Portfolio.Project = SC.Record.extend(
/** @scope Portfolio.Project.prototype */ {

  name: SC.Record.attr(String),
  products: SC.Record.toMany('Portfolio.Product')
}) ;

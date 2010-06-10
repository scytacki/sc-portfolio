// ==========================================================================
// Project:   Portfolio.Product
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Portfolio.Product = SC.Record.extend(
/** @scope Portfolio.Product.prototype */ {

  name: SC.Record.attr(String),
  projects: function() {
    // I tried to use the query below but it didn't work
    // var query = SC.Query.local(Portfolio.Project, 'products CONTAINS {product}', 
    //   {product: this});
    // return this.get('store').find(query);
    var projects = this.get('store').find(Portfolio.Project);
    return projects.filter(function(proj){return proj.get('products').indexOf(this) != -1}, this);
  }.property()
}) ;

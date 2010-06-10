// ==========================================================================
// Project:   Portfolio.ProductView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Portfolio.ProductView = SC.View.extend(
/** @scope Portfolio.ProductView.prototype */ {

  // This a reference to the Portfolio.Product object that the view is displaying
  product: null,
  productBindingDefault: SC.Binding.single(),
  
  displayProperties: 'product'.w(),
  
  render: function(context, firstTime) {
    var ret = [];
    var product = this.get('product');
    if(product && product !== null){
      ret.push('<h2>');
      ret.push(product.get('name'));
      ret.push('</h2>\n');
      ret.push('<h4>Projects</h4>');
      ret.push('<ul>');
      product.get('projects').forEach(function (proj){
        ret.push('<li>');
        ret.push(proj.get('name'));
        ret.push('</li>');
      });
      ret.push('</ul>');
      context.push(ret.join(''));      
    } else {
      context.push("No product selected");
    }
  }
});

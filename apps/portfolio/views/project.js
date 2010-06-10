// ==========================================================================
// Project:   Portfolio.ProjectView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Portfolio.ProjectView = SC.View.extend(
/** @scope Portfolio.ProjectView.prototype */ {

  // This a reference to the Portfolio.Product object that the view is displaying
  project: null,
  projectBindingDefault: SC.Binding.single(),
  
  displayProperties: 'project'.w(),
  
  render: function(context, firstTime) {
    var ret = [];
    var project = this.get('project');
    if(project && project !== null){
      ret.push('<h2>');
      ret.push(project.get('name'));
      ret.push('</h2>\n');
      ret.push('<h4>Products</h4>');
      ret.push('<ul>');
      project.get('products').forEach(function (prod){
        ret.push('<li>');
        ret.push(prod.get('name'));
        ret.push('</li>');
      });
      ret.push('</ul>');
      context.push(ret.join(''));      
    } else {
      context.push("No project selected");
    }
  }
});

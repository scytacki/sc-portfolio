// ==========================================================================
// Project:   Portfolio.Matrix
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Portfolio.Matrix = SC.View.extend(
/** @scope Portfolio.Matrix.prototype */
{

  cellContents: Portfolio.store.find(Portfolio.DevWeek),
  columnKeyProperty: 'iteration',
  rowKeyProperty: 'developer',
  cellLabelPath: 'project.name',

  contentsDidChange: function() {
    this.set('layerNeedsUpdate', YES);
  },

  selection: null,

  displayProperties: 'selection'.w(),

  /**
    This is the root method you usually implement to draw into a view.  The
    basic idea here is to just push HTML strings into the context which will
    be converted to DOM elements by the browser.  This is usually much faster
    than manipulating the DOM yourself.

    In this code, we just push strings in to create a canvas tag.

    Note that firstTime is YES only if render is being called on a new layer.
    This is the only time you want to render the HTML unless the HTML has 
    changed.
  */
  render: function(context, firstTime) {
    var ret = ['<table><tr><td></td>'];
    var cellContents = this.get('cellContents');
    var columnKeyProperty = this.get('columnKeyProperty');
    var rowKeyProperty = this.get('rowKeyProperty');
    var cellLabelPath = this.get('cellLabelPath');

    // This isn't very efficient
    // It would be better to create a 2d hash 
    // then iterate over the whole list and fill up the hash
    var rowHeadings = [];
    var contents = {};
    cellContents.forEach(function(item) {
      item.addObserver(rowKeyProperty, this, 'contentsDidChange');
      item.addObserver(columnKeyProperty, this, 'contentsDidChange');
      item.addObserver(cellLabelPath, this, 'contentsDidChange');

      var rowKey = item.get(rowKeyProperty);
      var row = contents[rowKey];
      if (row == null) {
        rowHeadings.push(rowKey);
        row = contents[rowKey] = {};
      }
      var columnKey = item.get(columnKeyProperty);
      var cell = row[columnKey];
      if (cell == null) {
        cell = row[columnKey] = [];
      }
      cell.push(item);
    },
    this);

    var columnHeadings = cellContents.getEach(columnKeyProperty).uniq();
    columnHeadings.forEach(function(item) {
      this.push('<td>' + (item ? item.get('name') : 'undefined') + '</td>');
    },
    ret);
    ret.push('</tr>');

    var selection = this.get('selection');

    rowHeadings.forEach(function(rowKey) {
      ret.push('<tr><td>' + (rowKey ? rowKey.get('name') : 'undefined') + '</td>');
      var row = contents[rowKey];
      columnHeadings.forEach(function(columnKey) {
        var cell = row[columnKey];
        if (cell) {
          ret.push('<td>' + cell.map(function(item) {
            var name = item.getPath(cellLabelPath);
            name = name ? name: 'undefined';
            if (item === selection) {
              return '<font color="red">' + name + '</font>';
            } else {
              return name;
            }
          }).join('/') + '</td>');
        } else {
          ret.push('<td></td>');
        }
      },
      this);
      ret.push('</tr>');

    });

    ret.push('</table>');

    context.push(ret.join(''));
  },
});

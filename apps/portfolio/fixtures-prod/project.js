// ==========================================================================
// Project:   Portfolio.Project Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Portfolio */

sc_require('models/project');

Portfolio.Project.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { guid: 1,
    name: "RITES",
    products: ['ot-framework',
               'java-graph',
               'rails-portal']},

  { guid: 2,
    name: "SmartGraphs"},

  { guid: 3,
    name: "Geniverse"},
  
  { guid: 4,
    name: "Evolution",
    products: [ 'ot-framework']},
  
  { guid: 5,
    name: "LOOPS",
    products: ['ot-framework',
               'java-graph']}

];

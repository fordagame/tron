(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['GamesModule.html'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<h1>"
    + alias3((helpers.translate || (depth0 && depth0.translate) || alias2).call(alias1,"application","Welcome",{"name":"translate","hash":{},"data":data}))
    + " <span id=\"playerName\"></span></h1>\r\n<div>\r\n    <label>"
    + alias3((helpers.translate || (depth0 && depth0.translate) || alias2).call(alias1,"games","NumberOfPlayers",{"name":"translate","hash":{},"data":data}))
    + "</label>\r\n    <select id=\"numberOfPlayers\">\r\n        <option val=\"2\">\r\n            2\r\n        </option>\r\n        <option val=\"3\">\r\n            3\r\n        </option>\r\n        <option val=\"4\">\r\n            4\r\n        </option>\r\n    </select>\r\n</div>\r\n<div><button id=\"create_tron_game\">"
    + alias3((helpers.translate || (depth0 && depth0.translate) || alias2).call(alias1,"games","CreateNewTronGame",{"name":"translate","hash":{},"data":data}))
    + "</button></div>\r\n";
},"useData":true});
})();
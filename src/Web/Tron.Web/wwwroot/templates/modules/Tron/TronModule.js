(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['TronModule.html'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<canvas id=\"tron_game\" class=\"tron_game\">\r\n\r\n</canvas>\r\n<div >\r\n    "
    + container.escapeExpression((helpers.translate || (depth0 && depth0.translate) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"tron","PlayersInTheGame",{"name":"translate","hash":{},"data":data}))
    + "\r\n    <div id=\"activePlayers\"></div>\r\n</div>";
},"useData":true});
})();
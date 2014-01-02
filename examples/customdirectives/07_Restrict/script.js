angular.module("mainModule", [])
  .controller("mainController", function ()
  {
  })
  .directive("elementDir", function ()
  {
    return {
      scope: true,
      restrict: "E",
      template: "<strong>elementDir</strong>"
    };
  })
  .directive("attributeDir", function ()
  {
    return {
      scope: true,
      restrict: "A",
      template: "<strong>attributeDir:</strong> {{value}}",
      link: function (scope, element, attrs)
      {
        scope.value = attrs.attributeDir;
      }
    };
  })
  .directive("classDir", function ()
  {
    return {
      scope: true,
      restrict: "C",
      template: "<strong>classDir:</strong> {{value}}",
      link: function (scope, element, attrs)
      {
        scope.value = attrs.classDir;
      }
    };
  })
  .directive("commentDir", function ($compile)
  {
    return {
      scope: true,
      restrict: "M",
      link: function (scope, element, attrs)
      {
        // Add a new DOM node after the comment just to show the output
        element.after($compile("<span><strong>commentDir:</strong> {{value}}</span>")(scope));
        scope.value = attrs.commentDir;
      }
    };
  });
angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.myScopeVar = "the scope variable value";
    $scope.nghReplaceDirLog = "";
  })
  // 1. Directive that replaces only the inner HTML of the DOM node
  .directive("nghNoReplaceDir", function ()
  {
    return {
      replace: false,
      template: 'This is <strong>nghNoReplaceDir</strong> directive printing <em>{{myScopeVar}}</em>'
    };
  })
  // 2. Directive that replaces the element of the DOM node
  //    and merges the attributes of the original element
  //    with those of the template.
  .directive("nghReplaceDir", function ()
  {
    return {
      replace: true,
      template:
        '<div my-div-attribute my-common-attribute="div value" style="font-size: 18px;" class="divFrame">\n\n' +
          'This is <strong>nghReplaceDir</strong> directive printing <em>{{myScopeVar}}</em>\n\n' +
        '</div>',
      link: function (scope, element, attrs)
      {
        // Log the compiled HTML element
        scope.nghReplaceDirLog = element[0].outerHTML;
      }
    };
  });
angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.myScopeVar = "the scope variable value";
  })
  // 1. Directive with a template specified inline
  .directive("nghTemplateDir", function ()
  {
    return {
      template: 'This is <strong>nghTemplateDir</strong> directive printing <em>{{myScopeVar}}</em>'
    };
  })
  // 2. Directive with a template loaded from a URL
  .directive("nghTemplateUrlDir", function ()
  {
    return {
      templateUrl: 'nghTemplateUrlDirBody.html'
    };
  });
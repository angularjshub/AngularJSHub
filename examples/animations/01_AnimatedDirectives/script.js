angular.module("mainModule", ["ngAnimate"])
  .controller("mainController", function ($scope)
  {
    $scope.customArray = ["First", "Second", "Third", "Fourth"];

    $scope.onReverseArrayClick = function ()
    {
      $scope.customArray.reverse();
    };
  });
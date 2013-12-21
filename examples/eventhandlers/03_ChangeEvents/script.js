angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    // Initialization
    $scope.onEditChangeResult = "";
    $scope.onCheckBoxChangeResult = "";
    $scope.onEditNoModelChangeResult = "";

    // Event handlers
    $scope.onEditChange = function () {
      $scope.onEditChangeResult = "the value is '" + $scope.editValue + "'";
    };

    $scope.onCheckBoxChange = function () {
      $scope.onCheckBoxChangeResult = "Check1 is " + ($scope.check1Selected ? "SELECTED" : "NOT SELECTED") +
        ", " + "Check2 is " + ($scope.check2Selected ? "SELECTED" : "NOT SELECTED");
    };

    $scope.onEditNoModelChange = function () {
      $scope.onEditNoModelChangeResult = "CHANGED";
    };
  });
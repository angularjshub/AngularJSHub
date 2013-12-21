angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.person = {
      firstName: "John",
      lastName: "Doe"
    };

    var oriPerson = angular.copy($scope.person);

    $scope.resetForm = function ()
    {
      $scope.person = angular.copy(oriPerson);
      $scope.personForm.$setPristine();
    };

    $scope.isPersonChanged = function ()
    {
      return !angular.equals($scope.person, oriPerson);
    };
  });
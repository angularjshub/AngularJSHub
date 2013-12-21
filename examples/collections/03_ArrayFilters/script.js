angular.module("mainModule", [])
  .controller("mainController", function ($scope, $filter, dateFilter)
  {
    // Initialization
    $scope.people = [
      {firstName: "John", lastName: "Doe", age: 30},
      {firstName: "Bob", lastName: "Smith", age: 26},
      {firstName: "Jack", lastName: "White", age: 47},
      {firstName: "Michael", lastName: "Green", age: 41}
    ];

    // Utility functions
    $scope.customArrayFilter = function (item) {
      return (item.lastName.indexOf('it') != -1 && item.age >= 40);
    };

    $scope.customArrayComparator = function (expected, actual) {
      return true;
    };
  });
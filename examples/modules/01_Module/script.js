// A simple module with no dependencies
angular.module("mainModule", [])
  .controller("simpleController", function ($scope)
  {
    // Initialize the model
    $scope.person = {
      firstName: "John",
      lastName: "Doe",

      // Define utility functions on the model object
      getFullName: function ()
      {
        return this.firstName + " " + this.lastName;
      }
    };
  });
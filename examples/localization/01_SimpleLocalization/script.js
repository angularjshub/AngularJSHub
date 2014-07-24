angular.module("mainModule", ["ngLocale"])
  .controller("mainController", function ($scope, $locale)
  {
    // Store the current locale ID in a variable
    $scope.localeId = $locale.id;

    // Store the current date/time in a variable
    $scope.currentDate = new Date();
  });
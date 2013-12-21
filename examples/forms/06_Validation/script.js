angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.person = {
      firstName: null,
      lastName: null
    };

    $scope.getItemState = function (item)
    {
      if (item.$valid)
      {
        return "valid";
      }
      else if (item.$invalid)
      {
        return "invalid";
      }
      else
      {
        return "";
      }
    };

    $scope.getItemError = function (item)
    {
      if (item.$invalid)
      {
        return item.$error;
      }
      else
      {
        return null;
      }
    };

    $scope.getValidationCSSClass = function (item)
    {
      // We show an error only if the item has been modified
      // at least once to avoid displaying errors as soon as
      // the form is loaded (we wait for the user to interact
      // with the controls before declaring them invalid).
      return {
        invalidItem: item.$invalid && item.$dirty
      };
    };

    $scope.getValidationError = function (item)
    {
      // We show an error only if the item has been modified
      // at least once to avoid displaying errors as soon as
      // the form is loaded (we wait for the user to interact
      // with the controls before declaring them invalid).
      if (item.$dirty && item.$error.required)
      {
        return "Required field";
      }
      else
      {
        return "";
      }
    };
  });
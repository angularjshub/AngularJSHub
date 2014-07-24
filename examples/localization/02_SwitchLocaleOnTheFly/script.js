angular.module("mainModule", ["ngLocale"])
  .provider("viewStateManager", function ()
  {
    return {
      $get: function ($http, $location, $window, $timeout)
      {
        return {
          saveState: function (stateObj)
          {
            // Save the current view state by storing it in the web session
            // (or any other persistence media) on the server side.

            var params = {
              method: "saveState"
            };

            var config = {
              params: params
            };

            return $http.post("server.php", stateObj, config);
          },
          restoreState: function ()
          {
            var params = {
              method: "restoreState"
            };

            var config = {
              params: params
            };

            return $http.get("server.php", config);
          },
          changeLanguage: function (localeId)
          {
            // Set the localeId in the URL parameters
            $location.search("localeId", localeId);

            // I need to make the page reload asynchronous otherwise
            // the browser's window location will not be updated until
            // the "changeLanguage" function ends (thus reloading the
            // same URL we had before the "$location.search()" call).
            $timeout(function()
              {
                // Reload the page
                $window.location.reload();
              },
              10);
          }
        };
      }
    };
  })
  .config(function ($locationProvider)
  {
    // Use HTML5 mode (in compatible browsers)
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .controller("mainController", function ($scope, viewStateManager)
  {
    // Load the saved view state if it exists
    viewStateManager.restoreState().then(
      function (result)
      {
        // "result.data" contains the JSON object with the session's view state data
        // returned by the server or "" if the view state has not been saved
        // in the web session.

        if (result.data != "")
        {
          $scope.viewState = result.data;
        }
      });

    // Set the current date/time in a variable
    $scope.currentDate = new Date();

    $scope.changeLanguage = function (localeId)
    {
      // Save the current view state
      viewStateManager.saveState($scope.viewState)
        .then(function ()
        {
          // Change the language by reloading the page with a different localeId
          viewStateManager.changeLanguage(localeId);
        });
    };
  });
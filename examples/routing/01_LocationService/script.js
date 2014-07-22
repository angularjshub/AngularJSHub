angular.module("mainModule", [])
  .controller("mainController", function ($scope, $location)
  {
    function refreshValues()
    {
      $scope.locationAbsUrl = $location.absUrl();
      $scope.locationUrl = $location.url();
      $scope.locationProtocol = $location.protocol();
      $scope.locationHost = $location.host();
      $scope.locationPort = $location.port();
      $scope.locationPath = $location.path();
      $scope.locationSearch = $location.search();
      $scope.locationHash = $location.hash();
    }

    var urlValueCounter = 0;
    var pathValueCounter = 0;
    var hashValueCounter = 0;

    $scope.locationChangeStartCounter = 0;
    $scope.locationChangeSuccessCounter = 0;

    refreshValues();

    $scope.$on("$locationChangeStart", function (event)
    {
      $scope.locationChangeStartCounter++;
    });

    $scope.$on("$locationChangeSuccess", function (event)
    {
      $scope.locationChangeSuccessCounter++;

      refreshValues();
    });

    $scope.setUrl = function ()
    {
      $location.url("newurl" + (++urlValueCounter));

      if ($scope.replaceUrl === true)
      {
        $location.replace();
      }
    };

    $scope.setPath = function ()
    {
      $location.path("newpathvalue" + (++pathValueCounter));
    };

    $scope.setSearch = function (setMode)
    {
      switch (setMode)
      {
        case 1:
          // Single parameter and single value
          $location.search("param3", "value3");
          break;
        case 2:
          // Single parameter and multiple values
          $location.search("param3", ["value3-1", "value3-2", "value3-3"]);
          break;
        case 3:
          // Remove parameter
          $location.search("param3", null);
          break;
        case 4:
          // Hash object (multiple parameters)
          $location.search({
            param1New: "value1New",
            param2New: "value2New",
            param3New: ["value3-1New", "value3-2New", "value3-3New"]
          });
          break;
        case 5:
          // Clear search parameters
          var currParams = $location.search();

          for (var paramName in currParams)
          {
            $location.search(paramName, null);
          }

          break;
      }
    };

    $scope.setHash = function ()
    {
      $location.hash("newhashvalue" + (++hashValueCounter));
    };
  });
angular.module("mainModule", ["ngRoute"])
  .provider("startupInfo", function ()
  {
    // Private variables
    var isHtml5Mode = false;
    var hashPrefix = "";
    var baseURL = "/angularjshubprogs/examples/routing/02_RouteService/example";

    return {
      $get: function ()
      {
        return {
          getBaseURL: function ()
          {
            return baseURL;
          },
          getIsHtml5Mode: function ()
          {
            return isHtml5Mode;
          },
          getHashPrefix: function ()
          {
            return hashPrefix;
          }
        };
      },
      setURLsConfig: function (isHtml5ModeValue, hashPrefixValue)
      {
        isHtml5Mode = isHtml5ModeValue;
        hashPrefix = hashPrefixValue;
      }
    };
  })
  .provider("routesManager", function ($routeProvider, startupInfoProvider)
  {
    // Private variables
    var routesOutputScope;

    return {
      $get: function ()
      {
        return {
          setOutputScope: function (outputScope)
          {
            routesOutputScope = outputScope;
          }
        };
      },
      configRoutes: function (baseRouteURL)
      {
        $routeProvider
          // 1. Simple route with a template URL
          .when(baseRouteURL + "/theviews/viewone",
          {
            templateUrl: startupInfoProvider.$get().getBaseURL() + "/views/view1.html"
          })
          // 2. Simple route with a template URL returned by a function
          .when(baseRouteURL + "/theviews/viewtwo",
          {
            templateUrl: function ()
            {
              return startupInfoProvider.$get().getBaseURL() + "/views/view2.html";
            }
          })
          // 3. Route with multiple parameters
          .when(baseRouteURL + "/theviews/viewthree/:param1/subview1/:param2*\/subview2/",
          {
            templateUrl: function (params)
            {
              routesOutputScope.view3 = {
                param1: params.param1,
                param2: params.param2
              };

              return startupInfoProvider.$get().getBaseURL() + "/views/view3.html";
            }
          })
          // 4. Route with optional parameters
          .when(baseRouteURL + "/theviews/viewfour/:param1?/:param2?",
          {
            templateUrl: function (params)
            {
              routesOutputScope.view4 = {
                param1: params.param1,
                param2: params.param2
              };

              return startupInfoProvider.$get().getBaseURL() + "/views/view4.html";
            }
          })
          // 5. Simple route with an inline template
          .when(baseRouteURL + "/theviews/viewfive",
          {
            template: "<div style=\"background-color: #fcfcfc; border: 1px solid #e1e1e1; text-align: center; width: 200px;\">View 5</div>"
          })
          // 6. Route with parameters and with an inline template returned by a function
          .when(baseRouteURL + "/theviews/viewsix/:param1/:param2?",
          {
            template: function (params)
            {
              routesOutputScope.view6 = {
                param1: params.param1,
                param2: params.param2
              };

              return "<div style=\"background-color: #fcfcfc; border: 1px solid #e1e1e1; padding: 6px; width: 250px;\">" +
                  "View 6<br />" +
                  "- param1: {{view6.param1}}<br />" +
                  "- param2: {{view6.param2}}" +
                "</div>";
            }
          })
          // 7. Redirect to another route (and add two parameters)
          .when(baseRouteURL + "/theviews/viewseven/:param1",
          {
            redirectTo: function (params, path, searchParams)
            {
              return baseRouteURL + "/theviews/viewfour/" + params.param1 + "/" + searchParams.searchParam1;
            }
          })
          // 8. Use a different controller for the view
          .when(baseRouteURL + "/theviews/vieweight/:param1/:param2",
          {
            templateUrl: startupInfoProvider.$get().getBaseURL() + "/views/view8.html",
            controller: "additionalController1"
          })
          // 9. Use a different controller for the view (controller defined inline)
          .when(baseRouteURL + "/theviews/viewnine/:param1/:param2",
          {
            templateUrl: startupInfoProvider.$get().getBaseURL() + "/views/view9.html",
            controller: function ($scope, $routeParams)
            {
              // Store the name of the controller in a variable of the scope
              $scope.controllerName = "additionalController2";

              $scope.param1Value = $routeParams.param1;
              $scope.param2Value = $routeParams.param2;
            }
          })
          // 10. Use a different controller for the view and define an alias for it
          .when(baseRouteURL + "/theviews/viewten/:param1/:param2",
          {
            templateUrl: startupInfoProvider.$get().getBaseURL() + "/views/view10.html",
            controller: "additionalController3",
            controllerAs: "ctrlAlias"
          })
          // 11. Resolve (wait for all the promises to be resolved)
          .when(baseRouteURL + "/theviews/vieweleven/:delayTime",
          {
            templateUrl: startupInfoProvider.$get().getBaseURL() + "/views/view11.html",
            controller: "additionalController4",
            resolve: {
              // Parametric delay (function that returns a promise)
              routingDelay: function($route, $q, $timeout)
              {
                // Get the delay time from the "delayTime" parameter of the route.
                //
                // NOTE: $routeParams cannot be used here because it
                //       still refers to the previous route and will
                //       change only when all the dependencies of the
                //       current route will be resolved; $route.current.params
                //       can be used instead.
                var delayTime = $route.current.params.delayTime;

                var deferred = $q.defer();

                // Generate a delay
                $timeout(
                  function ()
                  {
                    deferred.resolve("routingDelay function waited for " + delayTime + " milliseconds");
                  },
                  delayTime);

                // Return the promise and the new controller "additionalController4"
                // will be instantiated only when all the promises defined
                // inside "resolve" will be resolved (in this example, the promise
                // returned by the "routingDelay" function is the only one, so
                // the new controller "additionalController4" will be
                // instantiated as soon as this promise is resolved).
                return deferred.promise;
              },
              // "routeParamsAlias" is just an alias for the "$routeParams" service and
              // will be injected in the controller of this route ("additionalController4").
              routeParamsAlias: "$routeParams",
              // "customFunction"'s result will be injected in the controller
              // of this route ("additionalController4").
              customFunction: function ()
              {
                return "result from customFunction";
              }
            }
          })
          // 12. Default route (used by the "otherwise" method)
          .when(baseRouteURL + "/theviews/defaultview",
          {
            templateUrl: function ()
            {
              return startupInfoProvider.$get().getBaseURL() + "/views/defaultview.html";
            }
          })
          // 12. Return the route to use in case there are no matches with the previously
          // defined routes (the default route).
          .otherwise(
          {
            redirectTo: baseRouteURL + "/theviews/defaultview"
          });
      }
    };
  })
  .controller("mainController", function ($scope, startupInfo, routesManager)
  {
    // Store the name of the controller in a variable of the scope
    $scope.controllerName = "mainController";

    // Set the prefix used with the local links (i.e. links that
    // point to a path which is relative to the current page).
    // In HTML5 mode the prefix will be the base URL of the page,
    // while in hashbang mode the prefix will be "#!".
    //
    // The local links in the index HTML page will look like this:
    // - HTML5 mode: "{{baseURL}}/theviews/firstview"
    // - hashbang mode: "#!/theviews/firstview"

    if (startupInfo.getIsHtml5Mode())
    {
      $scope.localLinksPrefix = startupInfo.getBaseURL() + "/html5";
    }
    else
    {
      $scope.localLinksPrefix = "#" + startupInfo.getHashPrefix();
    }

    // Set the output scope in routesManager (so we can see some output
    // to test particular cases).
    routesManager.setOutputScope($scope);
  })
  .controller("additionalController1", function ($scope, $routeParams)
  {
    // Store the name of the controller in a variable of the scope
    $scope.controllerName = "additionalController1";

    // Store the values of the parameters in variables of the scope
    $scope.param1Value = $routeParams.param1;
    $scope.param2Value = $routeParams.param2;
  })
  .controller("additionalController3", function ($routeParams)
  {
    // Store the name of the controller in a variable of the scope
    this.controllerName = "additionalController3";

    // Store the values of the parameters in variables of the scope
    this.param1Value = $routeParams.param1;
    this.param2Value = $routeParams.param2;
  })
  .controller("additionalController4", function ($scope, routingDelay, routeParamsAlias, customFunction)
  {
    // Store the name of the controller in a variable of the scope
    $scope.controllerName = "additionalController4";

    // Store in variables of the scope the values
    // that have to be displayed inside the view.
    $scope.delayTime = routeParamsAlias.delayTime;
    $scope.routingDelayResult = routingDelay;
    $scope.customFunctionResult = customFunction;
  });
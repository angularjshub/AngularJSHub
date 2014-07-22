angular.module("html5Module", ["mainModule"])
  .config(function ($locationProvider, startupInfoProvider, routesManagerProvider)
  {
    $locationProvider.html5Mode(true).hashPrefix("!");

    // Set the current URLs configuration in the startupInfoProvider
    // so we can have it also outside the configuration phase.
    startupInfoProvider.setURLsConfig($locationProvider.html5Mode(),
      $locationProvider.hashPrefix());

    var baseRouteURL = startupInfoProvider.$get().getBaseURL() + "/html5";

    // Configure the routes
    routesManagerProvider.configRoutes(baseRouteURL);
  });
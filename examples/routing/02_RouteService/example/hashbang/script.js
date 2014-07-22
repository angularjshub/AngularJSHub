angular.module("hashbangModule", ["mainModule"])
  .config(function ($locationProvider, startupInfoProvider, routesManagerProvider)
  {
    $locationProvider.html5Mode(false).hashPrefix("!");

    // Set the current URLs configuration in the startupInfoProvider
    // so we can have it also outside the configuration phase.
    startupInfoProvider.setURLsConfig($locationProvider.html5Mode(),
      $locationProvider.hashPrefix());

    // Configure the routes
    routesManagerProvider.configRoutes("");
  });
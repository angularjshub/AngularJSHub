angular.module("html5Module", ["mainModule"])
  .config(function ($locationProvider)
  {
    $locationProvider.html5Mode(true).hashPrefix("!");
  });
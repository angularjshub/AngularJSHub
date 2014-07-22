angular.module("hashbangModule", ["mainModule"])
  .config(function ($locationProvider)
  {
    $locationProvider.html5Mode(false).hashPrefix("!");
  });
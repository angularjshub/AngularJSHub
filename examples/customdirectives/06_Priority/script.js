// *** LOGGING - START ***
// Elements defined outside the module just for logging
var logScope = null;
var compilationResult1 = "";
var compilationResult2 = "";
var compilationResult3 = "";
var compilationResult4 = "";

var logLine = function (logNumber, directiveName)
{
  if (logScope)
  {
    logScope["compilationResult" + logNumber] += "[" + directiveName + "]\n";
  }
  else
  {
    this["compilationResult" + logNumber] += "[" + directiveName + "]\n";
  }
};
// *** LOGGING - END ***

angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.compilationResult1 = compilationResult1;
    $scope.compilationResult2 = compilationResult2;
    $scope.compilationResult3 = compilationResult3;
    $scope.compilationResult4 = compilationResult4;

    logScope = $scope;
  })
  .directive("lowPriority", function ()
  {
    return {
      priority: 10,
      compile: function (element, attrs)
      {
        logLine(attrs.lowPriority, "lowPriority");
      }
    };
  })
  .directive("lowPriorityTerminal", function ()
  {
    return {
      priority: 10,
      terminal: true,
      compile: function (element, attrs)
      {
        logLine(attrs.lowPriorityTerminal, "lowPriorityTerminal");
      }
    };
  })
  .directive("mediumPriority", function ()
  {
    return {
      priority: 20,
      compile: function (element, attrs)
      {
        logLine(attrs.mediumPriority, "mediumPriority");
      }
    };
  })
  .directive("mediumPriorityTerminal", function ()
  {
    return {
      priority: 20,
      terminal: true,
      compile: function (element, attrs)
      {
        logLine(attrs.mediumPriorityTerminal, "mediumPriorityTerminal");
      }
    };
  })
  .directive("highPriority", function ()
  {
    return {
      priority: 30,
      compile: function (element, attrs)
      {
        logLine(attrs.highPriority, "highPriority");
      }
    };
  })
  .directive("highPriorityTerminal", function ()
  {
    return {
      priority: 30,
      terminal: true,
      compile: function (element, attrs)
      {
        logLine(attrs.highPriorityTerminal, "highPriorityTerminal");
      }
    };
  });
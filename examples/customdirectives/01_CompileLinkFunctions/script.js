// *** LOGGING - START ***
// Elements defined outside the module just for logging
var logScope = null;
var noDefObjLog = "";
var postlinkFunctionLog = "";
var prePostlinkFunctionLog = "";
var compileFunctionLog = "";
var compilePostlinkFunctionsLog = "";
var compilePrePostlinkFunctionsLog = "";
var nestedDirectivesLog = "";
var multiDirectivesLog = "";
var completeExampleLog = "";

var logLine = function (logVariable, directiveName, logString)
{
  if (logScope)
  {
    logScope[logVariable] += "[" + directiveName + "] " + logString + "\n";
  }
  else
  {
    this[logVariable] += "[" + directiveName + "] " + logString + "\n";
  }
};
// *** LOGGING - END ***

angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.noDefObjLog = noDefObjLog;
    $scope.postlinkFunctionLog = postlinkFunctionLog;
    $scope.prePostlinkFunctionLog = prePostlinkFunctionLog;
    $scope.compileFunctionLog = compileFunctionLog;
    $scope.compilePostlinkFunctionsLog = compilePostlinkFunctionsLog;
    $scope.compilePrePostlinkFunctionsLog = compilePrePostlinkFunctionsLog;
    $scope.nestedDirectivesLog = nestedDirectivesLog;
    $scope.multiDirectivesLog = multiDirectivesLog;
    $scope.completeExampleLog = completeExampleLog;

    logScope = $scope;
  })
  // 1. Directive without a definition object
  .directive("nghNoDefinitionObject", function ()
  {
    // Initialization
    logLine("noDefObjLog", "nghNoDefinitionObject", "Initialization");

    // Post-link function
    return function (scope, element, attrs)
    {
      logLine("noDefObjLog", "nghNoDefinitionObject", "Post-link " + attrs.nghNoDefinitionObject);
    };
  })
  // 2. Directive with a definition object and just the post-link function
  .directive("nghPostlinkFunction", function ()
  {
    // Initialization
    logLine("postlinkFunctionLog", "nghPostlinkFunction", "Initialization");

    // Definition object
    return {
      // Post-link function
      link: function (scope, element, attrs)
        {
          logLine("postlinkFunctionLog", "nghPostlinkFunction", "Post-link " + attrs.nghPostlinkFunction);
        }
    };
  })
  // 3. Directive with a definition object and the pre-link and post-link functions
  .directive("nghPrePostlinkFunction", function ()
  {
    // Initialization
    logLine("prePostlinkFunctionLog", "nghPrePostlinkFunction", "Initialization");

    // Definition object
    return {
      link: {
        // Pre-link function
        pre: function (scope, element, attrs)
        {
          logLine("prePostlinkFunctionLog", "nghPrePostlinkFunction", "Pre-link " + attrs.nghPrePostlinkFunction);
        },
        // Post-link function
        post: function (scope, element, attrs)
        {
          logLine("prePostlinkFunctionLog", "nghPrePostlinkFunction", "Post-link " + attrs.nghPrePostlinkFunction);
        }
      }
    };
  })
  // 4. Directive with a definition object and just the compile function
  .directive("nghCompileFunction", function ()
  {
    // Initialization
    logLine("compileFunctionLog", "nghCompileFunction", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("compileFunctionLog", "nghCompileFunction", "Compile " + attrs.nghCompileFunction);
      }
    };
  })
  // 5. Directive with a definition object and the compile and post-link functions
  .directive("nghCompilePostlinkFunctions", function ()
  {
    // Initialization
    logLine("compilePostlinkFunctionsLog", "nghCompilePostlinkFunctions", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("compilePostlinkFunctionsLog", "nghCompilePostlinkFunctions", "Compile " + attrs.nghCompilePostlinkFunctions);

        // Post-link function
        return function (scope, element, attrs)
        {
          logLine("compilePostlinkFunctionsLog", "nghCompilePostlinkFunctions", "Post-link " + attrs.nghCompilePostlinkFunctions);
        };
      }
    };
  })
  // 6. Directive with a definition object and the compile, pre-link and post-link functions
  .directive("nghCompilePrePostlinkFunctions", function ()
  {
    // Initialization
    logLine("compilePrePostlinkFunctionsLog", "nghCompilePrePostlinkFunctions", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("compilePrePostlinkFunctionsLog", "nghCompilePrePostlinkFunctions", "Compile " + attrs.nghCompilePrePostlinkFunctions);

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("compilePrePostlinkFunctionsLog", "nghCompilePrePostlinkFunctions", "Pre-link " + attrs.nghCompilePrePostlinkFunctions);
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("compilePrePostlinkFunctionsLog", "nghCompilePrePostlinkFunctions", "Post-link " + attrs.nghCompilePrePostlinkFunctions);
          }
        };
      }
    };
  })
  // 7. Nested directives
  .directive("nghNestedDir1", function ()
  {
    // Initialization
    logLine("nestedDirectivesLog", "nghNestedDir1", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("nestedDirectivesLog", "nghNestedDir1", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("nestedDirectivesLog", "nghNestedDir1", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("nestedDirectivesLog", "nghNestedDir1", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghNestedDir2", function ()
  {
    // Initialization
    logLine("nestedDirectivesLog", "nghNestedDir2", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("nestedDirectivesLog", "nghNestedDir2", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("nestedDirectivesLog", "nghNestedDir2", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("nestedDirectivesLog", "nghNestedDir2", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghNestedDir3", function ()
  {
    // Initialization
    logLine("nestedDirectivesLog", "nghNestedDir3", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("nestedDirectivesLog", "nghNestedDir3", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("nestedDirectivesLog", "nghNestedDir3", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("nestedDirectivesLog", "nghNestedDir3", "Post-link");
          }
        };
      }
    };
  })
  // 8. Multiple directives on a DOM node
  .directive("nghMultiDir1", function ()
  {
    // Initialization
    logLine("multiDirectivesLog", "nghMultiDir1", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("multiDirectivesLog", "nghMultiDir1", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("multiDirectivesLog", "nghMultiDir1", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("multiDirectivesLog", "nghMultiDir1", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghMultiDir2", function ()
  {
    // Initialization
    logLine("multiDirectivesLog", "nghMultiDir2", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("multiDirectivesLog", "nghMultiDir2", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("multiDirectivesLog", "nghMultiDir2", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("multiDirectivesLog", "nghMultiDir2", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghMultiDir3", function ()
  {
    // Initialization
    logLine("multiDirectivesLog", "nghMultiDir3", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("multiDirectivesLog", "nghMultiDir3", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("multiDirectivesLog", "nghMultiDir3", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("multiDirectivesLog", "nghMultiDir3", "Post-link");
          }
        };
      }
    };
  })
  // 9. Complete example (nested directives and multiple directives on a DOM node)
  .directive("nghDir1", function ()
  {
    // Initialization
    logLine("completeExampleLog", "nghDir1", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("completeExampleLog", "nghDir1", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir1", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir1", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghDir2", function ()
  {
    // Initialization
    logLine("completeExampleLog", "nghDir2", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("completeExampleLog", "nghDir2", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir2", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir2", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghDir3", function ()
  {
    // Initialization
    logLine("completeExampleLog", "nghDir3", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("completeExampleLog", "nghDir3", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir3", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir3", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghDir4", function ()
  {
    // Initialization
    logLine("completeExampleLog", "nghDir4", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("completeExampleLog", "nghDir4", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir4", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir4", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghDir5", function ()
  {
    // Initialization
    logLine("completeExampleLog", "nghDir5", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("completeExampleLog", "nghDir5", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir5", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir5", "Post-link");
          }
        };
      }
    };
  })
  .directive("nghDir6", function ()
  {
    // Initialization
    logLine("completeExampleLog", "nghDir6", "Initialization");

    // Definition object
    return {
      // Compile function
      compile: function (element, attrs)
      {
        logLine("completeExampleLog", "nghDir6", "Compile");

        return {
          // Pre-link function
          pre: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir6", "Pre-link");
          },
          // Post-link function
          post: function (scope, element, attrs)
          {
            logLine("completeExampleLog", "nghDir6", "Post-link");
          }
        };
      }
    };
  });
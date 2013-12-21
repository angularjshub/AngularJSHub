angular.module("mainModule", [])
  .controller("mainController", function ($scope, $q, $http)
  {
    var customAsyncFunc = function (callerId, withSuccess, duration)
    {
      // Default values for the optional arguments
      duration = (typeof duration === "undefined") ? 3000 : duration;

      // Duration must be at least 3 seconds
      if (duration < 3000) duration = 3000;

      var deferred = $q.defer();

      var computingStep = 1;

      var computationFunc = window.setInterval(function ()
      {
        deferred.notify("computing step " + (computingStep++) + "...");
      }, 1000);

      window.setTimeout(function() {
        if (withSuccess)
        {
          clearInterval(computationFunc);
          deferred.resolve(callerId + " said: successful execution!");
        }
        else
        {
          clearInterval(computationFunc);
          deferred.reject(callerId + " said: function failure!");
        }
      }, duration);

      return deferred.promise;
    };

    $scope.basicAsyncFunc = function (withSuccess) {
      var promise = customAsyncFunc("The basicAsyncFunc", withSuccess);

      $scope.basicAsyncFuncResult = "Waiting for the result...";

      promise.then(
        // Success handler
        function (successMessage)
        {
          $scope.basicAsyncFuncResult = successMessage;
        },
        // Failure handler
        function (failureMessage)
        {
          $scope.basicAsyncFuncResult = failureMessage;
        },
        // Update handler
        function (updateMessage)
        {
          $scope.basicAsyncFuncResult = updateMessage;
        }
      );
    };

    $scope.multiCb = function () {
      var HandlerObject = function (handlerId, updatedVarName)
      {
        this.successHandler = function (successMessage)
        {
          $scope[updatedVarName] = "[" + handlerId + "] " + successMessage;
        };

        this.failureHandler = function (failureMessage)
        {
          $scope[updatedVarName] = "[" + handlerId + "] " + failureMessage;
        };

        this.updateHandler = function (updateMessage)
        {
          $scope[updatedVarName] = "[" + handlerId + "] " + updateMessage;
        };
      };

      var handler1 = new HandlerObject(1, "multiCbResult1");
      var handler2 = new HandlerObject(2, "multiCbResult2");

      var promise = customAsyncFunc("multiCb", true);
      promise.then(handler1.successHandler, handler1.failureHandler, handler1.updateHandler);
      promise.then(handler2.successHandler, handler2.failureHandler, handler2.updateHandler);
    };

    $scope.altBasicAsyncFunc = function (withSuccess) {
      var promise = customAsyncFunc("The altBasicAsyncFunc", withSuccess);

      $scope.altBasicAsyncFuncResult = "Waiting for the result...";

      promise.then(
        // Success handler
        function (successMessage)
        {
          $scope.altBasicAsyncFuncResult = successMessage;
        },
        null,
        // Update handler
        function (updateMessage)
        {
          $scope.altBasicAsyncFuncResult = updateMessage;
        }
      );

      promise.catch(
        // Failure handler
        function (failureMessage)
        {
          $scope.altBasicAsyncFuncResult = failureMessage;
        }
      );

      promise.finally(
        // Finalization handler
        function ()
        {
          $scope.altBasicAsyncFuncResult += " (end of execution)";
        }
      );
    };

    $scope.chainedAsyncFunc = function (executionPath) {
      var asyncFunc1 = function (executionPath)
      {
        var deferred = $q.defer();

        if (executionPath[0])
        {
          executionPath[0] = "SUCCESS";
          deferred.resolve(executionPath);
        }
        else
        {
          deferred.reject("asyncFunc1 failure [" + executionPath + "]");
        }

        return deferred.promise;
      };

      var asyncFunc2 = function (executionPath)
      {
        var deferred = $q.defer();

        if (executionPath[1])
        {
          executionPath[1] = "SUCCESS";
          deferred.resolve(executionPath);
        }
        else
        {
          deferred.reject("asyncFunc2 failure [" + executionPath + "]");
        }

        return deferred.promise;
      };

      var logExecutionResult = function (message)
      {
        $scope.chainedAsyncFuncResult = message;

        return message;
      };

      $scope.chainedAsyncFuncInput = angular.copy(executionPath);

      asyncFunc1(executionPath)
        .then(asyncFunc2, logExecutionResult)
        .then(logExecutionResult, logExecutionResult);
    };

    $scope.aggregatedAsyncFunc = function (call1Success, call2Success, call3Success) {
      $scope.aggregatedAsyncFuncInput = "[" + call1Success + ", " + call2Success + ", " + call3Success + "]";

      var promise = $q.all([
        customAsyncFunc("Call 1", call1Success, 5000),
        customAsyncFunc("Call 2", call2Success, 4000),
        customAsyncFunc("Call 3", call3Success, 3000)
      ]);

      $scope.aggregatedAsyncFuncResult = "Waiting for all the results...";

      promise.then(
        // Success handler
        function (successMessage)
        {
          $scope.aggregatedAsyncFuncResult = successMessage;
        },
        // Failure handler
        function (failureMessage)
        {
          $scope.aggregatedAsyncFuncResult = failureMessage;
        }
      );
    };

    $scope.whenAsyncFunc = function (call1Success, call2Success) {
      $scope.whenAsyncFuncInput = "[" + call1Success + ", " + call2Success + "]";

      var promise = $q.all([
        $q.when("Already resolved promise"),
        customAsyncFunc("Call 1", call1Success, 3000),
        customAsyncFunc("Call 2", call2Success, 4000)
      ]);

      $scope.whenAsyncFuncResult = "Waiting for all the results...";

      promise.then(
        // Success handler
        function (successMessage)
        {
          $scope.whenAsyncFuncResult = successMessage;
        },
        // Failure handler
        function (failureMessage)
        {
          $scope.whenAsyncFuncResult = failureMessage;
        }
      );
    };

    $scope.aggregatedHTTPAsyncFunc = function (call1Success, call2Success, call3Success) {
      var getCallParams = function (callID, duration) {
        var params = {
          callID: callID,
          sleep: duration
        };

        var config = {
          params: params
        };

        return config;
      };

      $scope.aggregatedHTTPAsyncFuncInput = "[" + call1Success + ", " + call2Success + ", " + call3Success + "]";

      var promise = $q.all([
        $http.get((call1Success ? "server.php" : "invalid-url.php"), getCallParams("Call1", 5)),
        $http.get((call2Success ? "server.php" : "invalid-url.php"), getCallParams("Call2", 4)),
        $http.get((call3Success ? "server.php" : "invalid-url.php"), getCallParams("Call3", 3))
      ]);

      $scope.aggregatedHTTPAsyncFuncResult = "Waiting for all the results...";

      promise.then(
        // Success handler
        function (httpResultArray)
        {
          $scope.aggregatedHTTPAsyncFuncResult = "[" +
            httpResultArray[0].data + ", " +
            httpResultArray[1].data + ", " +
            httpResultArray[2].data + "]";
        },
        // Failure handler
        function (httpResult)
        {
          $scope.aggregatedHTTPAsyncFuncResult = httpResult.status;
        }
      );
    };
  });
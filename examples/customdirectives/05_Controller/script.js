angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.whatWeHave = "nothing";
  })
  .directive("pearFruit", function ()
  {
    return {
      controller: function ()
      {
        this.getFruitName = function ()
        {
          return "pear";
        };
      }
    };
  })
  .directive("apricotFruit", function ()
  {
    return {
      controller: function ()
      {
        this.getFruitName = function ()
        {
          return "apricot";
        };
      }
    };
  })
  .directive("orangeFruit", function ()
  {
    return {
      controller: function ()
      {
        this.getFruitName = function ()
        {
          return "orange";
        };
      }
    };
  })
  .directive("basketContainer", function ()
  {
    return {
      controller: function ()
      {
        this.getBasketSize = function ()
        {
          return "medium";
        };
      }
    };
  })
  .directive("fruitsChecker", function ()
  {
    return {
      require: ['pearFruit', '?apricotFruit', '^basketContainer', '^?orangeFruit', 'fruitsChecker'],
      controller: function ($scope)
      {
        this.setWhatWeHave = function (value)
        {
          $scope.whatWeHave = value;
          $scope.$root.$digest();
        };
      },
      link: function (scope, element, attrs, requiredControllers)
      {
        element.on("click", function ()
        {
          var pearFruitController = requiredControllers[0];
          var apricotFruitController = requiredControllers[1];
          var basketContainerController = requiredControllers[2];
          var orangeFruitController = requiredControllers[3];
          var fruitsCheckerController = requiredControllers[4];

          var result = "";

          // The controller of pearFruit is required
          // and must be available.
          result += "a " + pearFruitController.getFruitName();

          // The controller of apricotFruit is optional
          // and might not be available.
          if (apricotFruitController)
          {
            result += ", an " + apricotFruitController.getFruitName();
          }

          // The controller of basketContainer is required
          // and must be available, while the controller of
          // orangeFruit is optional.
          if (orangeFruitController)
          {
            result += " and a basket of " +
              basketContainerController.getBasketSize() +
              " size with an " + orangeFruitController.getFruitName() + " inside";
          }
          else
          {
            result += " and an empty basket of " +
              basketContainerController.getBasketSize() + " size";
          }

          fruitsCheckerController.setWhatWeHave(result);
        });
      }
    };
  });
angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.updateName = function (firstName, lastName)
    {
      $scope.firstName = firstName;
      $scope.lastName = lastName;
    };
  })
  // 1. Shared scope (scope: false)
  .directive("nghSharedScopeDir", function ()
  {
    return {
      scope: false,
      template:
        '<label>First name: <input type="text" ng-model="firstName"/></label><br />' +
        '<label>Last name: <input type="text" ng-model="lastName"/></label><br />' +
        '<br />' +
        '<strong>First name:</strong> {{firstName}}<br />' +
        '<strong>Last name:</strong> {{lastName}}'
    };
  })
  // 2. Inherited scope (scope: true)
  .directive("nghInheritedScopeDir", function ()
  {
    return {
      scope: true,
      template:
        '<label>First name: <input type="text" ng-model="firstName"/></label><br />' +
        '<label>Last name: <input type="text" ng-model="lastName"/></label><br />' +
        '<br />' +
        '<strong>First name:</strong> {{firstName}}<br />' +
        '<strong>Last name:</strong> {{lastName}}'
    };
  })
  // 3. Isolated scope (scope: {})
  .directive("nghIsolatedScopeDir", function ()
  {
    return {
      scope:
        {
          firstName: '@dirFirstName',
          lastName: '=dirLastName',
          setNameMethod: '&dirUpdateNameMethod'
        },
      template:
        '<label>First name: <input type="text" ng-model="firstName"/></label><br />' +
        '<label>Last name: <input type="text" ng-model="lastName"/></label><br />' +
        '<button ng-click="execSetNameMethod()">Set name on external scope</button><br />' +
        '<br />' +
        '<strong>First name:</strong> {{firstName}}<br />' +
        '<strong>Last name:</strong> {{lastName}}',
      link: function (scope, element, attrs)
      {
        scope.execSetNameMethod = function ()
        {
          scope.setNameMethod(
            {
              newFirstName: scope.firstName,
              newLastName: scope.lastName
            });
        };
      }
    };
  })
  // 4. Scope tester: shared scope
  .directive("nghSharedScopeTester", function ()
  {
    return {
      scope: false,
      link: function (scope, element, attrs)
      {
        element.on("click", function ()
        {
          scope.$root.$$childHead["sharedDirScopeId" + attrs.nghSharedScopeTester] = scope.$id;
          scope.$root.$digest();
        });
      }
    };
  })
  .directive("nghSharedScopeTesterCopy", function ()
  {
    return {
      scope: false,
      link: function (scope, element, attrs)
      {
        element.on("click", function ()
        {
          scope.$root.$$childHead["sharedDirScopeId" + attrs.nghSharedScopeTesterCopy] = scope.$id;
          scope.$root.$digest();
        });
      }
    };
  })
  // 4. Scope tester: inherited scope
  .directive("nghInheritedScopeTester", function ()
  {
    return {
      scope: true,
      link: function (scope, element, attrs)
      {
        element.on("click", function ()
        {
          scope.$root.$$childHead["inheritedDirScopeId" + attrs.nghInheritedScopeTester] = scope.$id;
          scope.$root.$digest();
        });
      }
    };
  })
  .directive("nghInheritedScopeTesterCopy", function ()
  {
    return {
      scope: true,
      link: function (scope, element, attrs)
      {
        element.on("click", function ()
        {
          scope.$root.$$childHead["inheritedDirScopeId" + attrs.nghInheritedScopeTesterCopy] = scope.$id;
          scope.$root.$digest();
        });
      }
    };
  })
  // 4. Scope tester: isolated scope
  .directive("nghIsolatedScopeTester", function ()
  {
    return {
      scope:
        {
        },
      link: function (scope, element, attrs)
      {
        element.on("click", function ()
        {
          scope.$root.$$childHead["isolatedDirScopeId" + attrs.nghIsolatedScopeTester] = scope.$id;
          scope.$root.$digest();
        });
      }
    };
  })
  .directive("nghIsolatedScopeTesterCopy", function ()
  {
    return {
      scope:
      {
      },
      link: function (scope, element, attrs)
      {
        element.on("click", function ()
        {
          scope.$root.$$childHead["isolatedDirScopeId" + attrs.nghIsolatedScopeTesterCopy] = scope.$id;
          scope.$root.$digest();
        });
      }
    };
  });
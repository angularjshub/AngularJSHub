angular.module("mainModule", ["ngResource"])
  .factory("PeopleService", function ($resource)
  {
    // Construct a resource object that can
    // interact with the RESTful API of the server.
    var resource = $resource("people/:operation/:id",
      {
        id: 0
      },
      {
        // A custom method to update the picture of the person
        updatePicture: {
          method: "PUT",
          isArray: false
        }
      }
    );

    // Custom function to retrieve a person by ID
    resource.retrievePerson = function (personId) {
      return this.get(
        {
          operation: "retrieve",
          id: personId
        });
    };

    // Custom function to retrieve some people by IDs
    resource.retrievePeople = function (peopleIdsArray) {
      return this.query(
        {
          operation: "retrievearray",
          "idsArray[]": peopleIdsArray
        });
    };

    // Custom function to save a person object
    resource.storePerson = function (person, picture) {
      return this.save(
        {
          operation: "store",
          firstName: person.firstName,
          lastName: person.lastName
        },
        picture
      );
    };

    // Custom function to delete a person object by ID
    resource.erasePerson = function (personId) {
      return this.delete(
        {
          operation: "erase",
          id: personId
        });
    };

    // Custom function to update the picture of a person
    resource.updatePersonPicture = function (personId, picture) {
      return this.updatePicture(
        {
          operation: "updatepicture",
          id: personId
        },
        picture
      );
    };

    return resource;
  })
  .factory("PersonResource", function ($resource)
  {
    // Construct a resource object that can
    // interact with the RESTful API of the server.
    var resource = $resource("people/:operation/:id",
      {
        id: "@id",
        firstName: "@firstName",
        lastName: "@lastName"
      },
      {
        // A custom method to update the picture of the person
        updatePicture: {
          method: "PUT",
          isArray: false
        }
      }
    );

    // Custom function to retrieve a person
    resource.prototype.retrieve = function () {
      return this.$get(
        {
          operation: "retrieve"
        });
    };

    // Custom function to save a person
    resource.prototype.store = function () {
      // Store the current resource instance
      // to use it later in the handler function.
      var thisInst = this;

      // Fallback to the constructor-level "save" method
      // because the instance-level "$store" method
      // doesn't let me pass the picture as raw POST data
      // (it always passes the whole Resource instance as
      // a JSON object). Return the promise object like the
      // instance-level methods of a resource object do.
      return resource.save(
        {
          operation: "store",
          firstName: this.firstName,
          lastName: this.lastName
        },
        this.picture,
        function (value)
        {
          // Copy to the resource instance
          // all the properties of the object
          // returned by the server.
          angular.copy(value, thisInst);
        }
      ).$promise;
    };

    // Custom function to delete a person
    resource.prototype.erase = function () {
      return this.$delete(
        {
          operation: "erase"
        });
    };

    // Custom function to update the picture of a person
    resource.prototype.updatePicture = function () {
      // Store the current resource instance
      // to use it later in the handler function.
      var thisInst = this;

      // Fallback to the constructor-level "updatePicture" method
      // because the instance-level "$updatePicture" method
      // doesn't let me pass the picture as raw PUT data
      // (it always passes the whole Resource instance as
      // a JSON object). Return the promise object like the
      // instance-level methods of a resource object do.
      return resource.updatePicture(
        {
          operation: "updatepicture",
          id: this.id
        },
        this.picture,
        function (value)
        {
          // Copy to the resource instance
          // all the properties of the object
          // returned by the server.
          angular.copy(value, thisInst);
        }
      ).$promise;
    };

    return resource;
  })
  .controller("mainController", function ($scope, $resource, PeopleService, PersonResource, jsonFilter)
  {
    $scope.getWithParams = function (withSuccess) {
      var callURL = (withSuccess ? "server.php" : "invalid-url.php");

      var serverResource = $resource(callURL,
        {
          param1: "param1 default",
          param2: "param2 default"
        });

      var getConfig = {};

      if ($scope.getParam1 !== undefined && $scope.getParam1 != "")
      {
        getConfig.param1 = $scope.getParam1;
      }

      if ($scope.getParam2 !== undefined && $scope.getParam2 != "")
      {
        getConfig.param2 = $scope.getParam2;
      }

      serverResource.get(getConfig,
        // Success handler
        function (value, responseHeaders)
        {
          $scope.getWithParamsResult = "GET SUCCESS\n\n" +
            "value: " + jsonFilter(value) + "\n\n" +
            "responseHeaders: " + jsonFilter(responseHeaders());
        },
        // Failure handler
        function (httpResponse)
        {
          $scope.getWithParamsResult = "GET ERROR\n\n" +
            "httpResponse: " + jsonFilter(httpResponse);
        }
      );
    };

    // Person object constructor
    var Person = function (id, firstName, lastName)
    {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
    };

    $scope.getCall = function () {
      $scope.callName = "getCall";
      $scope.callResult = PeopleService.retrievePerson(1);
    };

    $scope.queryCall = function () {
      $scope.callName = "queryCall";
      $scope.callResult = PeopleService.retrievePeople([1, 2, 3]);
    };

    $scope.saveCall = function () {
      $scope.callName = "saveCall";

      var person = new Person(0, "John", "Doe");

      $scope.callResult = PeopleService.storePerson(person, "PICTURE_DATA");
    };

    $scope.deleteCall = function () {
      $scope.callName = "deleteCall";
      $scope.callResult = PeopleService.erasePerson(2);
    };

    $scope.putCall = function () {
      $scope.callName = "putCall";
      $scope.callResult = PeopleService.updatePersonPicture(3, "NEW_PICTURE_DATA");
    };

    $scope.instGetCall = function () {
      $scope.instCallName = "instGetCall";

      var person = new PersonResource();
      person.id = 1;
      person.retrieve();

      $scope.instCallResult = person;
    };

    $scope.instSaveCall = function () {
      $scope.instCallName = "instSaveCall";

      var person = new PersonResource();
      person.firstName = "John";
      person.lastName = "Doe";
      person.picture = "PICTURE_DATA";
      person.store();

      $scope.instCallResult = person;
    };

    $scope.instDeleteCall = function () {
      $scope.instCallName = "instDeleteCall";

      var person = new PersonResource();
      person.id = 2;
      person.erase();

      $scope.instCallResult = person;
    };

    $scope.instPutCall = function () {
      $scope.instCallName = "instPutCall";

      var person = new PersonResource();
      person.id = 3;
      person.picture = "NEW_PICTURE_DATA";
      person.updatePicture();

      $scope.instCallResult = person;
    };
  });
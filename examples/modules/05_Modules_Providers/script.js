// Definition of a PersonManager object
var PersonManager = function ()
{
  return {
    $get: function (person)
    {
      return {
        getPersonFirstName: function ()
        {
          return person.firstName;
        },
        getPersonLastName: function ()
        {
          return person.lastName;
        },
        getPersonFullName: function (separator)
        {
          return person.firstName + separator + person.lastName;
        }
      };
    }
  };
};

// Initialization of the "mainModule"
angular.module("mainModule", [])
  // Register an object instance as a value and name it "person"
  .value("person", {
    firstName: "",
    lastName: ""
  })
  // Register a provider with person management functions and name it "personManager".
  // This provider requires the "person" object instance registered as a value in the
  // "mainModule" and that instance is passed to the constructor through Dependency Injection
  // simply writing "person" (the name of the registered value) as parameter name.
  .provider("personManager", PersonManager)
  // Get the "person" registered object instance and the "personManager" service
  // instance (created by the "PersonManager" provider) through Dependency Injection.
  .controller("mainController", function ($scope, person, personManager)
  {
    // Initialize the values of the "person" instance registered
    // as an object in the "mainModule". This is the same instance
    // that the "personManager" service gets through Dependency Injection
    // because there's only a single instance registered with a given name.
    person.firstName = "John";
    person.lastName = "Doe";

    // Set variables on the scope to reference the "person" object instance
    // and the "personManager" service from the HTML template.
    $scope.personInstance = person;
    $scope.personManagerInstance = personManager;
  });
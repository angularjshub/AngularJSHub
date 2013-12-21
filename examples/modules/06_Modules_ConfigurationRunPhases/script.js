// Definition of a PersonManager object
var PersonManager = function ()
{
  var fullNameSeparator = " ";

  return {
    setFullNameSeparator: function (separator)
    {
      fullNameSeparator = separator;
    },
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
        getPersonFullName: function ()
        {
          return person.firstName + fullNameSeparator + person.lastName;
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
  // Initial configuration of "mainModule". To get an instance of the "personManager" provider
  // we simply add a parameter to the configuration function with the "Provider" suffix after
  // the name of the registered provider (for the registered "personManager" provider instance
  // we must write "personManagerProvider").
  .config(function (personManagerProvider)
  {
    personManagerProvider.setFullNameSeparator("*");
  })
  // The run phase of the "mainModule" could be useful for any initialization procedure.
  // We get a reference to the "person" object simply specifying it as a parameter in the
  // "run" function.
  .run(function (person)
  {
    person.firstName = "John";
    person.lastName = "Doe";
  })
  // Get the "person" registered object instance and the "personManager" service
  // instance (created by the "PersonManager" provider) through Dependency Injection.
  .controller("mainController", function ($scope, person, personManager)
  {
    // Set variables on the scope to reference the "person" object instance
    // and the "personManager" service from the HTML template.
    $scope.personInstance = person;
    $scope.personManagerInstance = personManager;
  });
angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {
    $scope.scopeVar = "Base scope value";
  })
  .directive("nghTranscludeTrue", function ()
  {
    return {
      scope: {},
      transclude: true,
      restrict: 'E',
      replace: true,
      template:
        '<div>' +
          '<h4>[Blue is the template content]</h4>' +
          '<label>Scope variable: <input type="text" ng-model="scopeVar"/></label><br />' +
          '<br />' +
          '<strong>Scope ID:</strong> {{$id}}<br />' +
          '<strong>Parent scope ID:</strong> {{$parent.$id}}<br />' +
          '<strong>Scope variable:</strong> {{scopeVar}}<br />' +
          '<div ng-transclude style="background-color: lightgreen;"></div>' +
        '</div>',
      link: function (scope, element, attrs)
      {
        scope.scopeVar = "Directive's scope value";
      }
    };
  })
  .directive("nghTranscludeElement", function ()
  {
    return {
      scope: {},
      transclude: 'element',
      link: function (scope, element, attrs, controller, transcludeFn)
      {
        scope.scopeVar = "Directive's scope value";

        var useDirectivesScope = false;
        var cloneTranscludedElement = false;
        var transcludedElement = null;
        var clonedElement = null;

        if (attrs.nghTranscludeElement == "3")
        {
          useDirectivesScope = true;
        }

        if (attrs.nghTranscludeElement == "2" ||
          attrs.nghTranscludeElement == "3")
        {
          cloneTranscludedElement = true;
        }

        transcludedElement = transcludeFn();

        if (cloneTranscludedElement)
        {
          if (useDirectivesScope)
          {
            transcludeFn(scope, function (clone)
            {
              clonedElement = clone;
            });
          }
          else
          {
            transcludeFn(function (clone)
            {
              clonedElement = clone;
            });
          }
        }

        if (clonedElement)
        {
          // Replace the background color and the title in the
          // clone to see it clearly.
          clonedElement.attr("style", "background-color: lightcoral;");
          clonedElement.find("h4").text("[Red is the cloned content]");

          // Append the clone after the original transcluded content
          element.after(clonedElement);
        }

        // We need to add the transcluded content because
        // we cannot use a template and it's up to us
        // to decide what to do with it.
        // AngularJS automatically adds a comment with
        // the directive's name (nghTranscludeElement) to
        // replace the transcluded element in its original
        // position inside the DOM, so we can just append
        // the transcluded content to the comment (element).
        element.after(transcludedElement);
      }
    };
  });
angular.module("mainModule", ["ngAnimate"])
  .directive("elementGlow", function ($animate)
  {
    // Initialization
    var unwatchProperty = null;

    // Definition object
    return {
      // Post-link function
      link: function (scope, element, attrs)
      {
        var watchedProperty = attrs.elementGlow;

        if (watchedProperty !== undefined &&
          watchedProperty !== "")
        {
          unwatchProperty = scope.$watch(watchedProperty,
            function (newVal, oldVal, scope)
            {
              if (newVal !== oldVal)
              {
                if (newVal)
                {
                  $animate.animate(element,
                    {
                      "box-shadow": "none"
                    },
                    {
                      "box-shadow": "0px 0px 15px 5px rgba(135, 206, 250, 0.75)"
                    },
                    "element-glow-animation"
                  );
                }
                else
                {
                  $animate.animate(element,
                    {
                      "box-shadow": "0px 0px 15px 5px rgba(135, 206, 250, 0.75)"
                    },
                    {
                      "box-shadow": "none"
                    },
                    "element-glow-animation"
                  );
                }
              }
            });

          element.one("$destroy",
            function ()
            {
              // Directive cleanup
              if (unwatchProperty !== null)
              {
                unwatchProperty();

                unwatchProperty = null;
              }
            });
        }
      }
    };
  })
  .controller("mainController", function ($scope, $animate, $q)
  {
    $scope.enterAnimationStateBox1 = "OFF";
    $scope.leaveAnimationStateBox1 = "OFF";
    $scope.moveAnimationState = "OFF";
    $scope.addClassAnimationStateBox2 = "OFF";
    $scope.removeClassAnimationStateBox2 = "OFF";
    $scope.setClassAnimationStateBox3 = "OFF";
    $scope.longAnimationStateBox4 = "OFF";
    $scope.areAnimationsEnabled = true;

    var moveSequence = 1;
    var setClassFlag = false;
    var currLongAnimationPromise = null;

    $scope.onAddSquareClick = function (addAsSibling)
    {
      var box1Parent = document.querySelector("#box1Parent");

      if (box1Parent !== null)
      {
        box1Parent = angular.element(box1Parent);

        var box1 = angular.element("<div id=\"box1\" class=\"inner-box animated-element\"></div>");

        if (addAsSibling)
        {
          box1.css({position: "relative"});
        }
        else
        {
          box1.css({position: "absolute"});
        }

        $scope.enterAnimationStateBox1 = "In progress...";

        $animate.enter(box1,
          (addAsSibling ? null : box1Parent),
          (addAsSibling ? box1Parent : null)).then(function ()
        {
          // NOTE: I must use $scope.$apply() inside this callback
          $scope.$apply(function ()
          {
            $scope.enterAnimationStateBox1 = "ENDED";
          });
        });
      }
    };

    $scope.onRemoveSquareClick = function ()
    {
      var box1 = document.querySelector("#box1");

      if (box1 !== null)
      {
        box1 = angular.element(box1);

        $scope.leaveAnimationStateBox1 = "In progress...";

        $animate.leave(box1).then(function ()
        {
          // NOTE: I must use $scope.$apply() inside this callback
          $scope.$apply(function ()
          {
            $scope.leaveAnimationStateBox1 = "ENDED";
          });
        });
      }
    };

    $scope.onMoveSquaresClick = function ()
    {
      var moveLeftmostElement = document.querySelector("#moveLeftmostElement");
      var blueBox = document.querySelector("#blueBox");
      var redBox = document.querySelector("#redBox");
      var greenBox = document.querySelector("#greenBox");

      if (moveLeftmostElement !== null &&
        blueBox !== null && redBox !== null && greenBox !== null)
      {
        moveLeftmostElement = angular.element(moveLeftmostElement);
        blueBox = angular.element(blueBox);
        redBox = angular.element(redBox);
        greenBox = angular.element(greenBox);

        $scope.moveAnimationState = "In progress...";

        var promise;

        switch (moveSequence)
        {
          // From BLUE RED GREEN to GREEN BLUE RED
          case 1:
            promise = $q.all([
              $animate.move(greenBox, null, moveLeftmostElement),
              $animate.move(blueBox, null, greenBox),
              $animate.move(redBox, null, blueBox)
            ]);
            break;
          // From GREEN BLUE RED to RED GREEN BLUE
          case 2:
            promise = $q.all([
              $animate.move(redBox, null, moveLeftmostElement),
              $animate.move(greenBox, null, redBox),
              $animate.move(blueBox, null, greenBox)
            ]);
            break;
          // From RED GREEN BLUE to BLUE RED GREEN
          case 3:
            promise = $q.all([
              $animate.move(blueBox, null, moveLeftmostElement),
              $animate.move(redBox, null, blueBox),
              $animate.move(greenBox, null, redBox)
            ]);
            break;
        }

        moveSequence++;

        if (moveSequence > 3)
        {
          moveSequence = 1;
        }

        promise.then(function ()
        {
          $scope.moveAnimationState = "ENDED";
        });
      }
    };

    $scope.onAddClassClick = function ()
    {
      var box2 = document.querySelector("#box2");

      if (box2 !== null)
      {
        box2 = angular.element(box2);

        $scope.addClassAnimationStateBox2 = "In progress...";

        $animate.addClass(box2, "custom-class").then(function ()
        {
          // NOTE: I must use $scope.$apply() inside this callback
          $scope.$apply(function ()
          {
            $scope.addClassAnimationStateBox2 = "ENDED";
          });
        });
      }
    };

    $scope.onRemoveClassClick = function ()
    {
      var box2 = document.querySelector("#box2");

      if (box2 !== null)
      {
        box2 = angular.element(box2);

        $scope.removeClassAnimationStateBox2 = "In progress...";

        $animate.removeClass(box2, "custom-class").then(function ()
        {
          // NOTE: I must use $scope.$apply() inside this callback
          $scope.$apply(function ()
          {
            $scope.removeClassAnimationStateBox2 = "ENDED";
          });
        });
      }
    };

    $scope.onSetClassClick = function ()
    {
      var box3 = document.querySelector("#box3");

      if (box3 !== null)
      {
        box3 = angular.element(box3);

        $scope.setClassAnimationStateBox3 = "In progress...";

        setClassFlag = !setClassFlag;

        $animate.setClass(box3,
          (setClassFlag ? "box-border" : "box-fill"),
          (setClassFlag ? "box-fill" : "box-border")).then(function ()
        {
          // NOTE: I must use $scope.$apply() inside this callback
          $scope.$apply(function ()
          {
            $scope.setClassAnimationStateBox3 = "ENDED";
          });
        });
      }
    };

    $scope.onStartLongAnimationClick = function ()
    {
      var box4 = document.querySelector("#box4");

      if (box4 !== null)
      {
        box4 = angular.element(box4);

        var animationStep1 = function ()
        {
          $scope.longAnimationStateBox4 = "In progress (step 1)...";

          currLongAnimationPromise = $animate.animate(box4,
            {
              opacity: 0
            },
            {
              opacity: 1
            },
            "custom-inline-animation-1",
            {
              // Add these classes to the element during the animation
              tempClasses: ["box-border"]
            }
          );

          currLongAnimationPromise.then(function ()
            {
              // NOTE: I must use $scope.$apply() inside this callback
              $scope.$apply(function ()
              {
                animationStep2();
              });
            });
        };

        var animationStep2 = function ()
        {
          $scope.longAnimationStateBox4 = "In progress (step 2)...";

          currLongAnimationPromise = $animate.animate(box4, null, null);

          currLongAnimationPromise.then(function ()
          {
            // NOTE: I must use $scope.$apply() inside this callback
            $scope.$apply(function ()
            {
              animationStep3();
            });
          });
        };

        var animationStep3 = function ()
        {
          $scope.longAnimationStateBox4 = "In progress (step 3)...";

          currLongAnimationPromise = $animate.animate(box4,
            {
              opacity: 1
            },
            {
              opacity: 0
            },
            "custom-inline-animation-2"
          );

          currLongAnimationPromise.then(function ()
          {
            // NOTE: I must use $scope.$apply() inside this callback
            $scope.$apply(function ()
            {
              currLongAnimationPromise = null;

              // Remove the inline styles set by animationStep1 and animationStep3
              box4.removeAttr("style");

              $scope.longAnimationStateBox4 = "ENDED";
            });
          });
        };

        // Start the animation
        animationStep1();
      }
    };

    $scope.onCancelLongAnimationStepClick = function ()
    {
      if (currLongAnimationPromise !== null)
      {
        $animate.cancel(currLongAnimationPromise);

        currLongAnimationPromise = null;
      }
    };

    $scope.enableDisableAnimations = function (enableAnimations)
    {
      $animate.enabled(enableAnimations);
    };
  });
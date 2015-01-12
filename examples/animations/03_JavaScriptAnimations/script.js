angular.module("mainModule", ["ngAnimate"])
  .animation(".custom-js-animation", function ($timeout)
  {
    return {
      animate: function(element, className, from, to, done)
      {
        // NO ANIMATION

        // I don't want to animate this event so I call the "done()" function immediately
        done();
      },
      enter: function (element, done)
      {
        // FADE IN

        var i = 0;

        var animateFunc = function ()
        {
          element.css({opacity: (i / 100)});
          i++;

          if (i <= 100)
          {
            $timeout(animateFunc, 10);
          }
          else
          {
            done();
          }
        };

        // Start the animation
        animateFunc();

        return function (cancelled)
        {
          // Animation complete or cancelled

          if (cancelled)
          {
            // Make the "animateFunc" set the opacity to "1" and then end immediately
            i = 100;
          }
        };
      },
      leave: function (element, done)
      {
        // SHRINK AND FADE OUT

        var targetScale = 0.1;
        var animationSteps = 100;
        var i = animationSteps;

        var currScale = 1.0;
        var scaleDecPerStep = (currScale - targetScale) / animationSteps;

        var animateFunc = function ()
        {
          element.css(
            {
              opacity: (i / animationSteps),
              transform: "scale(" + currScale + ")"
            }
          );

          currScale -= scaleDecPerStep;
          i--;

          if (i >= 0)
          {
            $timeout(animateFunc, 10);
          }
          else
          {
            done();
          }
        };

        // Start the animation
        animateFunc();

        return function (cancelled)
        {
          // Animation complete or cancelled

          if (cancelled)
          {
            // NOTE: there's a "short-circuit" in the current version of AngularJS (1.3.8)
            //       that makes this handler function be called always with cancelled == true
            //       so there's no way for me to know if a leave animation completes normally
            //       or has been cancelled (it always looks cancelled).

            // Make the "animateFunc" end immediately
            i = 0;
          }
        };
      },
      move: function (element, done)
      {
        // NO ANIMATION

        // I don't want to animate this event so I call the "done()" function immediately
        done();
      },
      // Animation that can be triggered before the class is added
      beforeAddClass: function (element, className, done)
      {
        if (className == "box-border")
        {
          // GROW

          var i = 0;
          var targetScale = 1.1;
          var animationSteps = 100;

          var currScale = 1.0;
          var scaleIncPerStep = (targetScale - currScale) / animationSteps;

          var animateFunc = function ()
          {
            element.css({transform: "scale(" + currScale + ")"});
            currScale += scaleIncPerStep;
            i++;

            if (i <= animationSteps)
            {
              $timeout(animateFunc, 10);
            }
            else
            {
              // Make sure the target scale is set correctly to avoid
              // possible rounding errors.
              element.css({transform: "scale(" + targetScale + ")"});

              done();
            }
          };

          // Start the animation
          animateFunc();
        }
        else
        {
          done();
        }

        return function (cancelled)
        {
          // Animation complete or cancelled

          if (cancelled)
          {
            // Make the "animateFunc" set the scale to targetScale and then end immediately
            i = animationSteps;
          }
        };
      },
      // Animation that can be triggered after the class is added
      addClass: function (element, className, done)
      {
        if (className == "box-border")
        {
          // SHRINK

          var i = 0;
          var targetScale = 1.0;
          var animationSteps = 100;

          var currScale = 1.1;
          var scaleDecPerStep = (currScale - targetScale) / animationSteps;

          var animateFunc = function ()
          {
            element.css({transform: "scale(" + currScale + ")"});
            currScale -= scaleDecPerStep;
            i++;

            if (i <= animationSteps)
            {
              $timeout(animateFunc, 10);
            }
            else
            {
              // Make sure the target scale is set correctly to avoid
              // possible rounding errors.
              element.css({transform: "scale(" + targetScale + ")"});

              done();
            }
          };

          // Start the animation
          animateFunc();
        }
        else
        {
          done();
        }

        return function (cancelled)
        {
          // Animation complete or cancelled

          if (cancelled)
          {
            // Make the "animateFunc" set the scale to targetScale and then end immediately
            i = animationSteps;
          }
        };
      },
      // Animation that can be triggered before the class is removed
      beforeRemoveClass: function (element, className, done)
      {
        if (className == "box-border")
        {
          // ADD GLOW

          var i = 0;
          var targetMultiplier = 1.0;
          var animationSteps = 100;

          var currMultiplier = 0.0;
          var multIncPerStep = (targetMultiplier - currMultiplier) / animationSteps;

          var animateFunc = function ()
          {
            element.css(
              {
                "box-shadow": "0px 0px " +
                  Math.round(15 * currMultiplier) + "px " +
                  Math.round(5 * currMultiplier) + "px rgba(135, 206, 250, 0.75)"
              }
            );

            currMultiplier += multIncPerStep;
            i++;

            if (i <= animationSteps)
            {
              $timeout(animateFunc, 10);
            }
            else
            {
              // Make sure the target box-shadow is set correctly to avoid
              // possible rounding errors.
              element.css({"box-shadow": "0px 0px 15px 5px rgba(135, 206, 250, 0.75)"});

              done();
            }
          };

          // Start the animation
          animateFunc();
        }
        else
        {
          done();
        }

        return function (cancelled)
        {
          // Animation complete or cancelled

          if (cancelled)
          {
            // Make the "animateFunc" set the final box-shadow and then end immediately
            i = animationSteps;
          }
        };
      },
      // Animation that can be triggered after the class is removed
      removeClass: function (element, className, done)
      {
        if (className == "box-border")
        {
          // REMOVE GLOW

          var i = 0;
          var targetMultiplier = 0.0;
          var animationSteps = 100;

          var currMultiplier = 1.0;
          var multDecPerStep = (currMultiplier - targetMultiplier) / animationSteps;

          var animateFunc = function ()
          {
            element.css(
              {
                "box-shadow": "0px 0px " +
                  Math.round(15 * currMultiplier) + "px " +
                  Math.round(5 * currMultiplier) + "px rgba(135, 206, 250, 0.75)"
              }
            );

            currMultiplier -= multDecPerStep;
            i++;

            if (i <= animationSteps)
            {
              $timeout(animateFunc, 10);
            }
            else
            {
              // Completely remove the box-shadow
              element.css({"box-shadow": "none"});

              done();
            }
          };

          // Start the animation
          animateFunc();
        }
        else
        {
          done();
        }

        return function (cancelled)
        {
          // Animation complete or cancelled

          if (cancelled)
          {
            // Make the "animateFunc" set the final box-shadow and then end immediately
            i = animationSteps;
          }
        };
      }
    };
  })
  .controller("mainController", function ($scope, $animate, $timeout)
  {
    $scope.animationState = "OFF";

    var currAnimationPromise = null;

    $scope.onStartAnimationClick = function ()
    {
      var animatedBoxParent = document.querySelector("#animatedBoxParent");

      if (animatedBoxParent !== null)
      {
        animatedBoxParent = angular.element(animatedBoxParent);

        var animatedBox = angular.element("<div id=\"animatedBox\" class=\"box custom-js-animation\"></div>");

        // Enter
        var animationStep1 = function ()
        {
          $scope.animationState = "In progress (step 1 - ENTER)...";

          currAnimationPromise = $animate.enter(animatedBox, animatedBoxParent);

          currAnimationPromise.then(
            function ()
            {
              // NOTE: I must use $scope.$apply() inside this callback
              $scope.$apply(function ()
              {
                // NOTE: the timeout here is important to make the ENTER animation
                //       cleanup completely. This is not a problem with class-based
                //       animations (ADD CLASS and REMOVE CLASS).
                $timeout(animationStep2, 20);
              });
            }
          );
        };

        // Add Class ("box-border")
        var animationStep2 = function ()
        {
          $scope.animationState = "In progress (step 2 - ADD CLASS)...";

          currAnimationPromise = $animate.addClass(animatedBox, "box-border");

          currAnimationPromise.then(
            function ()
            {
              // NOTE: I must use $scope.$apply() inside this callback
              $scope.$apply(function ()
              {
                $timeout(animationStep3, 20);
              });
            }
          );
        };

        // Remove Class ("box-border")
        var animationStep3 = function ()
        {
          $scope.animationState = "In progress (step 3 - REMOVE CLASS)...";

          currAnimationPromise = $animate.removeClass(animatedBox, "box-border");

          currAnimationPromise.then(
            function ()
            {
              // NOTE: I must use $scope.$apply() inside this callback
              $scope.$apply(function ()
              {
                $timeout(animationStep4, 20);
              });
            }
          );
        };

        // Leave
        var animationStep4 = function ()
        {
          $scope.animationState = "In progress (step 4 - LEAVE)...";

          currAnimationPromise = $animate.leave(animatedBox);

          currAnimationPromise.then(
            function ()
            {
              // NOTE: I must use $scope.$apply() inside this callback
              $scope.$apply(function ()
              {
                currAnimationPromise = null;

                $scope.animationState = "ENDED";
              });
            }
          );
        };

        // Start the animation
        animationStep1();
      }
    };

    $scope.onCancelAnimationStepClick = function ()
    {
      if (currAnimationPromise !== null)
      {
        $animate.cancel(currAnimationPromise);

        currAnimationPromise = null;
      }
    };
  });
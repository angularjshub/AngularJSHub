<?php
  if (!isset($useHtml5Mode))
  {
    $useHtml5Mode = true;
  }

  $baseExamplesURL = "/angularjshubprogs/examples";
?>
<!DOCTYPE html>
<html>
<head>
  <script src="<?php echo $baseExamplesURL ?>/angularjs/angular.js"></script>
  <script src="<?php echo $baseExamplesURL ?>/angularjs/angular-route.js"></script>
  <script src="<?php echo $baseExamplesURL ?>/routing/02_RouteService/example/script.js"></script>
  <script src="<?php echo $baseExamplesURL ?>/routing/02_RouteService/example/<?php echo ($useHtml5Mode ? 'html5' : 'hashbang') ?>/script.js"></script>
</head>

<body ng-app="<?php echo ($useHtml5Mode ? 'html5Module' : 'hashbangModule') ?>">
  <div ng-controller="mainController">
    <h3><?php echo ($useHtml5Mode ? "2. HTML5" : "1. Hashbang") ?> mode</h3>

    <h3>This is the selected view</h3>

    <div ng-view></div>

    <h3>Select a view</h3>

    <strong>1. Simple route with a template URL</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewone">View 1 - URL: /theviews/viewone</a><br />
    <br />
    <strong>2. Simple route with a template URL returned by a function</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewtwo">View 2 - URL: /theviews/viewtwo</a><br />
    <br />
    <strong>3. Route with multiple parameters</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewthree/value1/subview1/value2/with/multiple/slashes/subview2/">View 3 - URL: /theviews/viewthree/value1/subview1/value2/with/multiple/slashes/subview2/</a><br />
    <br />
    <strong>4. Route with optional parameters</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewfour/value1">View 4 - URL: /theviews/viewfour/value1</a><br />
    <br />
    <strong>5. Simple route with an inline template</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewfive">View 5 - URL: /theviews/viewfive</a><br />
    <br />
    <strong>6. Route with parameters and with an inline template returned by a function</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewsix/value1/optionalValue2">View 6 - URL: /theviews/viewsix/value1/optionalValue2</a><br />
    <br />
    <strong>7. Redirect to another route (and add two parameters)</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewseven/value1FromView7?searchParam1=value2FromView7">View 7 - URL: /theviews/viewseven/value1FromView7?searchParam1=value2FromView7</a> (redirects to /theviews/viewfour/value1FromView7/value2FromView7)<br />
    <br />
    <strong>8. Use a different controller for the view</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/vieweight/value1/value2">View 8 - URL: /theviews/vieweight/value1/value2</a><br />
    <br />
    <strong>9. Use a different controller for the view (controller defined inline)</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewnine/value1/value2">View 9 - URL: /theviews/viewnine/value1/value2</a><br />
    <br />
    <strong>10. Use a different controller for the view and define an alias for it</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/viewten/value1/value2">View 10 - URL: /theviews/viewten/value1/value2</a><br />
    <br />
    <strong>11. Resolve (wait for all the promises to be resolved)</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/vieweleven/2000">View 11 - URL: /theviews/vieweleven/2000</a> (wait 2 seconds before the view appears)<br />
    <br />
    <strong>12. Invalid view (redirect to the default route and display the default view)</strong><br />
    <a ng-href="{{localLinksPrefix}}/theviews/invalidview">Invalid view - URL: /theviews/invalidview</a><br />
    <br />
  </div>
</body>
</html>
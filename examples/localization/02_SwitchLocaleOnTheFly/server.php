<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "GET")
{
  $result = "";

  if (isset($_GET["method"]))
  {
    if ($_GET["method"] === "restoreState" &&
      isset($_SESSION["clientViewState"]))
    {
      // Return the state saved in the session
      // and remove it from the session (otherwise
      // a page reload invoked by the user on the browser
      // will reload an old state instead of loading a
      // clean page).
      $result = $_SESSION["clientViewState"];
      unset($_SESSION["clientViewState"]);
    }
  }

  echo $result;
}
else if ($_SERVER["REQUEST_METHOD"] === "POST")
{
  if (isset($_GET["method"]))
  {
    if ($_GET["method"] === "saveState")
    {
      // Store the view state of the client in the web session
      if (isset($HTTP_RAW_POST_DATA))
      {
        $_SESSION["clientViewState"] = $HTTP_RAW_POST_DATA;
      }
    }
  }

  // Nothing to return
  echo "";
}
?>
<?php
if ($_SERVER["REQUEST_METHOD"] === "GET")
{
  if (isset($_GET["sleep"]))
  {
    sleep($_GET["sleep"]);
  }

  $result = "";

  if (isset($_GET["callID"]))
  {
    $result = $_GET["callID"] . " ";
  }

  $result .= "GET request successful";

  echo $result;
}
?>
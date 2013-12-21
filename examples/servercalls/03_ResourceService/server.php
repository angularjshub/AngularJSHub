<?php
if ($_SERVER["REQUEST_METHOD"] === "GET")
{
  if (isset($_GET["param1"]))
  {
    $param1 = $_GET["param1"];
  }
  else
  {
    $param1 = "";
  }

  if (isset($_GET["param2"]))
  {
    $param2 = $_GET["param2"];
  }
  else
  {
    $param2 = "";
  }

  $result = json_encode(array(
    "receivedParam1" => $param1,
    "receivedParam2" => $param2));

  echo $result;
}
?>
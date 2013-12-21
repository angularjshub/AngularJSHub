<?php
if ($_SERVER["REQUEST_METHOD"] === "GET")
{
  if (isset($_GET["sleep"]))
  {
    sleep($_GET["sleep"]);
  }

  if (isset($_GET["jsonObjParam"]))
  {
    $jsonObjParam = json_decode($_GET["jsonObjParam"]);

    echo json_encode(array(
      "receivedJSONParam1" => $jsonObjParam->param1,
      "receivedJSONParam2" => $jsonObjParam->param2));
  }
  else
  {
    $result = "GET request received!";

    if (isset($_GET["param1"]))
    {
      $result .= "\nparam1 = " . $_GET["param1"];
    }

    if (isset($_GET["param2"]))
    {
      $result .= "\nparam2 = " . $_GET["param2"];
    }

    if (isset($_SERVER["HTTP_CUSTOM_HEADER_1"]))
    {
      $result .= "\nCustom-Header-1 = " . $_SERVER["HTTP_CUSTOM_HEADER_1"];
    }

    if (isset($_SERVER["HTTP_MY_HEADER_2"]))
    {
      $result .= "\nMy-Header-2 = " . $_SERVER["HTTP_MY_HEADER_2"];
    }

    echo $result;
  }
}
else if ($_SERVER["REQUEST_METHOD"] === "POST")
{
  $result = "POST request received!";

  if (isset($_GET["param1"]))
  {
    $result .= "\nparam1 = " . $_GET["param1"];
  }

  if (isset($_GET["param2"]))
  {
    $result .= "\nparam2 = " . $_GET["param2"];
  }

  if (isset($HTTP_RAW_POST_DATA))
  {
    $result .= "\nPOST DATA: " . $HTTP_RAW_POST_DATA;
  }

  echo $result;
}
else if ($_SERVER["REQUEST_METHOD"] === "PUT")
{
  $result = "PUT request received!";

  if (isset($_GET["param1"]))
  {
    $result .= "\nparam1 = " . $_GET["param1"];
  }

  if (isset($_GET["param2"]))
  {
    $result .= "\nparam2 = " . $_GET["param2"];
  }

  $putData = file_get_contents('php://input');

  if (isset($putData))
  {
    $result .= "\nPUT DATA: " . $putData;
  }

  echo $result;
}
else if ($_SERVER["REQUEST_METHOD"] === "DELETE")
{
  $result = "DELETE request received!";

  if (isset($_GET["param1"]))
  {
    $result .= "\nparam1 = " . $_GET["param1"];
  }

  if (isset($_GET["param2"]))
  {
    $result .= "\nparam2 = " . $_GET["param2"];
  }

  echo $result;
}
else if ($_SERVER["REQUEST_METHOD"] === "HEAD")
{
  $result = "HEAD request received!";

  if (isset($_GET["param1"]))
  {
    $result .= "\nparam1 = " . $_GET["param1"];
  }

  if (isset($_GET["param2"]))
  {
    $result .= "\nparam2 = " . $_GET["param2"];
  }

  // Do something with $result.
  // NOTE: the HEAD method is not expected to return data,
  //       but only the headers.
}
?>
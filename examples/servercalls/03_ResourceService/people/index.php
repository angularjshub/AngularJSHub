<?php
$requestPart = explode("people/", $_SERVER['REQUEST_URI']);

if (count($requestPart) === 2)
{
  // Remove the URL parameters if any
  // (from "?" to the end of the string).
  $qMarkPos = strpos($requestPart[1], "?");

  if ($qMarkPos !== false)
  {
    $requestPart[1] = substr_replace($requestPart[1], "", $qMarkPos);
  }

  $requestPart = explode("/", $requestPart[1]);

  if (count($requestPart) > 0)
  {
    // Operation
    if (isset($requestPart[0]))
    {
      $operation = $requestPart[0];

      // Id
      if (isset($requestPart[1]))
      {
        $id = $requestPart[1];
      }
    }
  }
}

if ($_SERVER["REQUEST_METHOD"] === "GET")
{
  if ($operation === "retrieve" && isset($id))
  {
    // ...retrieve the person with the requested ID...

    echo json_encode(array(
      "id" => $id,
      "firstName" => "John",
      "lastName" => "Doe"));
  }
  else if ($operation === "retrievearray" && isset($_GET["idsArray"]))
  {
    $idsArray = $_GET["idsArray"];

    // ...retrieve the people with the requested IDs in $idsArray...

    $result = array(
      array(
        "id" => $idsArray[0],
        "firstName" => "John",
        "lastName" => "Doe"),
      array(
        "id" => $idsArray[1],
        "firstName" => "Alice",
        "lastName" => "White"),
      array(
        "id" => $idsArray[2],
        "firstName" => "James",
        "lastName" => "Green")
    );

    echo json_encode(array_values($result));
  }
}
else if ($_SERVER["REQUEST_METHOD"] === "POST")
{
  if ($operation === "store")
  {
    if (isset($_GET["firstName"]))
    {
      $firstName = $_GET["firstName"];
    }
    else
    {
      $firstName = "";
    }

    if (isset($_GET["lastName"]))
    {
      $lastName = $_GET["lastName"];
    }
    else
    {
      $lastName = "";
    }

    if (isset($HTTP_RAW_POST_DATA))
    {
      $picture = $HTTP_RAW_POST_DATA;
    }
    else
    {
      $picture = "";
    }

    // ...store the person and its picture in the DB assigning it a new ID...

    $id = 123;

    echo json_encode(array(
      "id" => $id,
      "firstName" => $firstName,
      "lastName" => $lastName));
  }
}
else if ($_SERVER["REQUEST_METHOD"] === "DELETE")
{
  if ($operation === "erase" && isset($id))
  {
    // ...delete the person with the requested ID from the DB...

    // Return an object that just confirms the success of the operation
    echo json_encode(array(
      "result" => "OK",
      "message" => "Person " . $id . " deleted"));
  }
}
else if ($_SERVER["REQUEST_METHOD"] === "PUT")
{
  if ($operation === "updatepicture" && isset($id))
  {
    $pictureData = file_get_contents('php://input');

    if (isset($pictureData))
    {
      // ...update the picture of the person with the requested ID...

      // Return an object that just confirms the success of the operation
      echo json_encode(array(
        "result" => "OK",
        "message" => "Picture of person " . $id . " updated"));
    }
    else
    {
      // Return an object that informs of the failure of the operation
      echo json_encode(array(
        "result" => "ERROR"));
    }
  }
}
?>
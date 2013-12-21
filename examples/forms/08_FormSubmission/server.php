<?php
if ($_SERVER["REQUEST_METHOD"] === "POST")
{
  if (isset($_POST["firstName"]) && isset($_POST["lastName"]))
  {
    // Standard form submission
    $result = "RECEIVED PERSON DATA:" .
      "<br />firstName = " . $_POST["firstName"] .
      "<br />lastName = " . $_POST["lastName"];
  }
  else if (isset($_GET["person"]))
  {
    // AJAX form submission
    $person = json_decode($_GET["person"]);

    $result = json_encode(array(
      "receivedFirstName" => $person->firstName,
      "receivedLastName" => $person->lastName));
  }
  else
  {
    $result = "INVALID REQUEST DATA";
  }

  echo $result;
}
?>
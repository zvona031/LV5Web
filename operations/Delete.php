<?php

 require "../DbHandler.php";

 use Db\DbHandler;


 $id = $_POST['catsID'];

 $db = new DbHandler();
 $db->delete("$id");
 header("Location: ../index.php");
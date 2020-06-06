<?php

 require "../DbHandler.php";

 use Db\DbHandler;

 if($_SERVER['REQUEST_METHOD'] == 'POST') {
     $name = $_POST['name'];
     $age = $_POST['age'];
     $info = $_POST['info'];
     $wins = $_POST['wins'];
     $loss = $_POST['loss'];

     $file = $_FILES['image'];

     $fileName = $file['name'];
     $fileTmpName = $file['tmp_name'];
     $fileSize = $file['size'];
     $fileError = $file['error'];

     $fileExt = explode('.', $fileName); 
     $fileActualExt = strtolower(end($fileExt));

     $allowed = array('jpg', 'jpeg', 'png');

     $fileDestination = '../uploads/'.$fileName; 
     $fileDestinationSql = 'uploads/'.$fileName;
     if(in_array($fileActualExt, $allowed)){ 
         if(($fileError === 0) && ($fileSize < 1000000)){ 
             move_uploaded_file($fileTmpName, $fileDestination);

             $db = new DbHandler();

             $db->insert("INSERT INTO Fighters(name, age, info, wins, loss, imagePath) 
                 VALUES ('{$name}', '{$age}', '{$info}', '{$wins}', '{$loss}', '{$fileDestinationSql}')");

             header("Location: ../index.php");
         } else {
             header("Location: ../addFighter.html");
         }
     } else {
         header("Location: ../addFighter.html?=wrongImageQuery");
     }
 }

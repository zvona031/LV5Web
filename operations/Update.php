<?php

 require "../DbHandler.php";

 use Db\DbHandler;



 if($_SERVER['REQUEST_METHOD'] == 'POST') {
     $id = $_POST['catsID'];
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

     if($fileSize == 0) {
         $db = new DbHandler();
         $db->update("UPDATE Fighters SET name='{$name}', age = '{$age}', info = '{$info}', 
                             wins = '{$wins}', loss = '{$loss}' 
                     WHERE id = $id");
         header("Location: ../index.php");
     } else {
         $fileExt = explode('.', $fileName); 
         $fileActualExt = strtolower(end($fileExt)); 

         $allowed = array('jpg', 'jpeg', 'png'); 

         $fileDestination = '../uploads/'.$fileName; 
         $fileDestinationSql = 'uploads/'.$fileName; 
         if(in_array($fileActualExt, $allowed)){ 
             if(($fileError === 0) && ($fileSize < 1000000)){ 
                 move_uploaded_file($fileTmpName, $fileDestination); 
                 $db = new DbHandler();
                 $db->update("UPDATE Fighters SET name='{$name}', age = '{$age}', info = '{$info}', 
                                     wins = '{$wins}', loss = '{$loss}', imagePath = '{$fileDestinationSql}' 
                             WHERE id = $id");
                 header("Location: ../index.php");
             } else {
                 header("Location: ../editFighter.php");
             }
         }    
     } 
 }
<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Ažuriraj podatke</title>
     <link
     rel="stylesheet"
     href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
     integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
     crossorigin="anonymous"
   />
   <script
     src="https://code.jquery.com/jquery-3.5.1.min.js"
     integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
     crossorigin="anonymous">
   </script>

 </head>
 <body>
     <div class="jumbotron">
     <a href="index.php" style="float: left;">BACK</a>
         <h1 style="float: left;">CFC 3 - UPDATE FIGHTER</h1>
         
     </div>
     <div class="container">
         <?php 
             require "DbHandler.php";

             use Db\DbHandler;
             $id = $_GET['id'];

             $db = new DbHandler();
             $result = $db->select("SELECT * FROM Fighters WHERE id = '{$id}'");
         ?>

         <?php if($result->num_rows > 0): ?>
             <?php while($row = $result->fetch_assoc()): ?>

         <form id="form" action="operations/Update.php" method="POST" enctype="multipart/form-data" style="width: 40%;">

             <input type="hidden" name="catsID" value="<?= $row['id']?>">

             <div>
                 <label>Name </label>
                 <input type="text" name="name" id="name" value="<?= $row["name"];?>">
             </div>

             <div>
                 <label >Age </label>
                 <input name="age" type="number" min="0" id="age" value="<?= $row["age"];?>">
             </div>

             <div>
                 <label >Cat Info </label>
                 <input type="text" name="info" id="info" value="<?= $row["info"];?>">
             </div>

             <div>
                 <div >
                     <div>
                         <label>Wins</label>
                         <input type="number" min="0" name="wins" id="wins" value="<?= $row["wins"];?>">
                     </div>
                 </div>

                 <div>
                     <div>
                         <label >Loss</label>
                         <input type="number" min="0" name="loss" id="loss" value="<?= $row["loss"];?>">
                     </div>
                 </div>
             </div>

             <div>
                 <label >New Cat Image</label>
                 <input type="file" name="image" id="catImagePath">
             </div>

             <div >
             <input type="submit" name="submit" id="btnUpdate" value="UPDATE">
             </div>

             <button type="submit" formmethod="POST" formaction="operations/Delete.php" style="float: right;" id="btnDelete">DELETE FIGHTER</button>
         </form>

         <?php endwhile;?>
         <?php endif;?>
     </div>
 </body>

 <script>
     $(document).ready(function() {
         $("#btnUpdate").on("click", function(event) {
             event.preventDefault();
             var name = $("#name").val();
             var age = $("#age").val();
             var info = $("#info").val();
             var wins = $("#wins").val();
             var loss = $("#loss").val();
             var imagePath = $("#catImagePath").val();
             if(name =='' || age == '' || info == '' || wins == '' || loss == '') {
                 alert("Inesrt all parameters!");
             } else {
                 $("#btnUpdate").unbind('click').click();
             }
         })
         $("#btnDelete").on("click", function() {
             alert("Cat deleted!");
         })
     })
 </script>
 </html>
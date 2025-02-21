<?php
   $conn = mysqli_connect('xxx.amazonaws.com', 'xxx', 'xxx', 'assignment1');
   if (mysqli_connect_errno()) {
       echo "Failed to connect to MySQL: " . mysqli_connect_error();
       exit;
   }

   // initial get data from database
 
   if(isset($_POST['key'])) {
        $product_search = $_POST['key'];

        $query_string = "SELECT * FROM products WHERE product_id ='$product_search' ";
        
        $result = mysqli_query($conn, $query_string);
        if ($result && mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_assoc($result);
            echo "{$row['in_stock']}";
        } 
        else {
            echo "No items found.";
        }
   } 


   mysqli_close($conn);
?>
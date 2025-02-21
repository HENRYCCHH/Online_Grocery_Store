<?php
   $conn = mysqli_connect('xxx.amazonaws.com', 'xxx', 'xxx', 'assignment1');
   if (mysqli_connect_errno()) {
       echo "Failed to connect to MySQL: " . mysqli_connect_error();
       exit;
   }

   // initial get data from database

   if(isset($_POST['key'])) {
        $product_search = $_POST['key'];

        $query_string = "SELECT * FROM products WHERE (category LIKE '%$product_search%' OR sub_category LIKE '%$product_search%') ";
        
        $result = mysqli_query($conn, $query_string);
        if ($result && mysqli_num_rows($result) > 0) {
            // Display the results as an HTML list

            while ($row = mysqli_fetch_assoc($result)) {
                echo "<div class='item'>"
                        . "<img id='{$row['product_id']}' src='{$row['image_directory']}' alt=''>"
                        . "<h2 class='product_name'>{$row['product_name']}</h2>"
                        . "<h3 class='quantity'>{$row['unit_quantity']}</h3>" 
                        . "<h3 class='price'>$ {$row['unit_price']}</h3>"
                        . "<h4 class='category' style='display: none;'>{$row['category']}</h4>"
                        . "<h5 class='sub_category' style='display: none;'>{$row['sub_category']}</h5>"
                        . "<h6 class='in_stock' style='display: none;'>{$row['in_stock']}</h6>"
                        . "<button class='addCart'>Add To Cart</button>"  
                    ."</div>";
            }

        } 
        else {
            echo "No items found.";
        }
   } 


   mysqli_close($conn);
?>
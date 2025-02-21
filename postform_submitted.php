<?php
   $conn = mysqli_connect('xxx.amazonaws.com', 'xxx', 'xxx', 'assignment1');
   if (mysqli_connect_errno()) {
       echo "Failed to connect to MySQL: " . mysqli_connect_error();
       exit;
   }

   // initial get data from database
   if(!isset($_POST['key'])) {
        $inital_query_string = "SELECT * FROM products ";
        $inital_result = mysqli_query($conn, $inital_query_string);

        if ($inital_result && mysqli_num_rows($inital_result) > 0) {
            while ($row = mysqli_fetch_assoc($inital_result)) {
                    echo "<div class='item'>"
                            ."<img id='{$row['product_id']}' src='{$row['image_directory']}' alt=''>"
                            . "<h2 class='product_name'>{$row['product_name']}</h2>"
                            . "<h3 class='quantity'>{$row['unit_quantity']}</h3>" 
                            . "<h3 class='price'>$ {$row['unit_price']}</h3>"
                            . "<h4 class='category' style='display: none;'>{$row['category']}</h4>"
                            . "<h5 class='sub_category' style='display: none;'>{$row['sub_category']}</h5>"
                            . "<h6 class='in_stock' style='display: none;'>{$row['in_stock']}</h6>"
                            . "<button class='addCart'>Add To Cart</button>" 
                            . "<span class='warning'></span>"
                        ."</div>";
            }
        }
        else {
            echo "No items found.";
        }
   }    


   if(isset($_POST['key'])) {
        $product_search = $_POST['key'];

        $query_string = "SELECT * FROM products WHERE (product_name LIKE '%$product_search%' OR category LIKE '%$product_search%' OR sub_category LIKE '%$product_search%' OR unit_quantity LIKE '%$product_search%') ";
        
        $result = mysqli_query($conn, $query_string);
        if ($result && mysqli_num_rows($result) > 0) {

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
            echo "<h1 class='noItemTag'>No items found.</h1>";
        }
   } 


   mysqli_close($conn);
?>
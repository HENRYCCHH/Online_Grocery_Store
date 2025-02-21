<?php
   $conn = mysqli_connect('xxx.amazonaws.com', 'xxx', 'xxx', 'assignment1');
   if (mysqli_connect_errno()) {
       echo "Failed to connect to MySQL: " . mysqli_connect_error();
       exit;
   }

   if(isset($_POST['product'])) {
   $product_id = mysqli_real_escape_string($conn, $_POST['product']);
   }

   if(isset($_POST['cart'])) {
   $cartQuantity = intval($_POST['cart']);
   }


    $query = "SELECT * FROM products WHERE product_id = $product_id";

    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) == 1) {
        $product = mysqli_fetch_assoc($result);

        if ($product) {
            $current_stock = intval($product['in_stock']);
            if ($current_stock >= $cartQuantity) {
                $new_stock = $current_stock - $cartQuantity;

                $update_query = "UPDATE products SET in_stock = $new_stock WHERE product_id = $product_id";
                $update_result = mysqli_query($conn, $update_query);

                if ($update_result) {
                    echo json_encode(['status' => 'success', 'message' => 'Stock updated successfully', 'new_stock' => $new_stock]);
                }    


            // out of stock
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Product is out of stock']);
            }
        } else {
            // Product not found
            echo json_encode(['status' => 'error', 'message' => 'Product not found']);
        }
    } else {
        // Query failed
        echo json_encode(['status' => 'error', 'message' => 'Query failed']);
    }
    mysqli_close($conn);
?>

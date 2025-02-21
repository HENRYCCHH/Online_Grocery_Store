$(document).ready(function(){
    let receivedData = '';
    let retreiveCartHTML = document.querySelector('.list');
    let deliveryItem = document.querySelector('.deliveryItem');
    let carts= [];


    $.get('postform_submitted.php', function(response, status, xhr) {
        if (status == "success") {
        // Store the data in the receivedData object
        receivedData = response;
        retreiveCart();
        }
    }).fail(function(xhr, status, error) {
        console.error("Error loading data:", error);
    });



    // submit order, validation ,in stock checking and update
    $('.buttonSubmit').click(function() {
        var isValid = true;
        var email = $('#emailAddress').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        $('.group input').each(function() {
            var inputValue = $(this).val().trim();
            var $inputCheck = $(this).siblings('.inputCheck');
            
            if (inputValue === '') {
                $inputCheck.text('*This field is required');
                isValid = false;
            } else {
                $inputCheck.text('');
            }
        });
        if (!emailRegex.test(email) && !(email === '')) {
            $('.emailCheck').text('*Invalid email address');
            isValid = false;
        }

        var phone = $('#phone').val();
        var regex = /^(0)[23478]\d{8}$/;
        if (!regex.test(phone) && !(phone === '')) {
            $('.phoneCheck').text('*Invalid phone number');
            isValid = false;
        }

        if ($('#country').val()=="Choose.."){
            $('.optionCheck').text('*please select a State');
            isValid = false;
        }
        else {
            $('.optionCheck').text('');
        }

        if (isValid) {
            carts = JSON.parse(localStorage.getItem('cart'));
            if (carts.length > 0){
                carts.forEach(cart =>{
                finalStockSearchAndUpdate(cart.product_id, parseInt(cart.quantity));
                })
            }            
        }  

    });



    $('.right').mouseover(function() {
        var isValidGreen = true;
        var email = $('#emailAddress').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || (email === '')) {
            isValidGreen = false;
        }
        var phone = $('#phone').val();
        var regex = /^(0)[23478]\d{8}$/;
        if (!regex.test(phone) || (phone === '')) {
            isValidGreen = false;
        }
        $('.group input').each(function() {
            var inputValue = $(this).val().trim();
            if (inputValue === '') {
                isValidGreen = false;
            }
        }); 
        if ($('#country').val()=="Choose.."){
            isValidGreen = false;
        } 
        if (isValidGreen) {
            $('.buttonSubmit').css('background-color', 'rgb(0, 255, 128)');
            $('.buttonSubmit').hover(
                function(){
                    $(this).css('background-color', 'rgb(0, 255, 128)');
                    $(this).css('color', '#cd71ff');
                },
                function(){
                    $(this).css('background-color', 'rgb(0, 255, 128)');
                    $(this).css('color', 'black');
                }    
            );
        } 
        else {
            $('.buttonSubmit').hover(
                function(){
                    $(this).css('background-color', 'grey');
                },
                function(){
                    $(this).css('background-color', '#E8BC0E');
                }    
            );
        }    

    });


    



    // Close the modal when the close button is clicked
    $(".close").click(function(){
        $("#myDelivery").css("display", "none");
        localStorage.clear();
        carts= [];
        retreiveCart();
        window.location.href = 'index.html';
    });

    // Close the modal when clicking outside of it
    $(window).click(function(event){
        if (event.target == $("#myDelivery")[0]) {
            $("#myDelivery").css("display", "none");
            localStorage.clear();
            carts= [];
            retreiveCart();
            window.location.href = 'index.html';
        }
    });

//----------function----------//



    // Function to search for an object by product_id
    const getObjectByProductId = (productId) => {
        let tempElement = $('<div></div>').html(receivedData);
        let foundElement = tempElement.find(`#${productId}`);
        let parentItem = foundElement.closest('.item');
        if (parentItem.length > 0) {
            return {
                product_id: parentItem.find('img').attr('id'),
                product_name: parentItem.find('.product_name').text(),
                image_directory: parentItem.find('img').attr('src'),
                unit_quantity: parentItem.find('.quantity').text().trim(),
                unit_price: parentItem.find('.price').text().replace('$', '').trim(),
                category: parentItem.find('.category').text(),
                sub_category: parentItem.find('.sub_category').text(),
                in_stock: parentItem.find('.in_stock').text().trim()
            };
        } else {
            return null;
        }
    }


    const retreiveCart = () =>{
        localStorage.getItem('cart');
        carts = JSON.parse(localStorage.getItem('cart'));
        retreiveCartHTML.innerHTML = '';
        let totalQuantity = 0;
        let totalSummingPrice = 0;
        if (carts && carts.length > 0){
            carts.forEach(cart =>{
                totalQuantity = totalQuantity + cart.quantity;
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.dataset.id = cart.product_id;

                let foundItem = getObjectByProductId(cart.product_id);
                let totalPrice = foundItem.unit_price * cart.quantity; 
                totalSummingPrice = totalSummingPrice + totalPrice;
                newCart.innerHTML = `
                <div class="image">
                    <img id='${cart.product_id}' src='${foundItem.image_directory || ''}'>
                </div> 
                <div class="name">
                    ${foundItem.product_name || ''} 
                </div> 
                <div class="unit_class_quantity">
                    ${foundItem.unit_quantity || ''} 
                </div> 

                <div class="totalPrice">
                    $${totalPrice.toFixed(2)}
                </div> 
                <div class="quantity">
                    <span>${cart.quantity}</span>
                </div> 
                `;
                retreiveCartHTML.appendChild(newCart);    
            })
        }

    $('#totalPriceCheckout').text('$ ' + totalSummingPrice.toFixed(2));
    }




    const deliveryDetails = () =>{
        localStorage.getItem('cart');
        carts = JSON.parse(localStorage.getItem('cart'));
        deliveryItem.innerHTML = '';


        if (carts.length > 0){
            carts.forEach(cart =>{
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.dataset.id = cart.product_id;

                let foundItem = getObjectByProductId(cart.product_id);
                newCart.innerHTML = `
                <div class="deliveryName">
                    ${foundItem.product_name || ''} 
                </div> 
                <div class="unit_quantity">
                    ${foundItem.unit_quantity || ''} 
                </div> 
                <div class="deliverQuantity">
                    <span>${cart.quantity}</span>
                </div> 
                `;
                deliveryItem.appendChild(newCart);    
            })
        }
    }





    const finalStockSearchAndUpdate = (product_id, cartQuantity) =>{
            $.ajax({
                url: 'postform_in_stock.php',
                method: 'POST',
                data: { key: product_id },
                success: function(response){
                    let inStockQuantity = parseInt(response);
                    let foundItem = getObjectByProductId(product_id);
                    let productItemName = foundItem.product_name;
                    let productItemDescription = foundItem.unit_quantity;
                    if (inStockQuantity >= cartQuantity){
                        updateStock(product_id, cartQuantity);
                        $("#myDelivery").css("display", "block");
                        deliveryDetails();
                    } 
                    else{
                        denySubmit(product_id,productItemName,productItemDescription);
                    }     
                },
                error: function(xhr, status, error){
                    // Handle errors
                    console.error(error);
                    callback(false);
                }
            });    
    }


    const updateStock = (product_id, cartQuantity)=>{
        $.ajax({
            url: 'search_product.php', 
            method: 'POST',
            data: {
                product: product_id,
                cart: cartQuantity
            },
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }


    const denySubmit = (product_id, productItemName,productItemDescription) =>{
        alert("Sorry, " + productItemName + " : " + productItemDescription +  " is currently out of stock!\nThis item has been removed from your cart.\nYou will now be redirected to the main page.");
        removeItemFromCart(product_id);
        window.location.href = 'index.html?showCart=true';
    }


    const removeItemFromCart = (product_id) => {
        // Find the index of the item in the carts array
        const indexToRemove = carts.findIndex(item => item.product_id === product_id);
        // If the item is found in the carts array, remove it
        if (indexToRemove !== -1) {
            carts.splice(indexToRemove, 1); // Remove 1 item from the array at the found index
            localStorage.setItem('cart', JSON.stringify(carts));
        }
    }



}) 
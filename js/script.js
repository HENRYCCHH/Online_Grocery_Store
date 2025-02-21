$(document).ready(function(){
    let iconCart = document.querySelector('.icons');
    let body = document.querySelector('body');
    let closeCart = document.querySelector('.close');
    let listCartHTML = document.querySelector('.listCart');
    let carts= [];
    let receivedData = '';
    let iconsSpan = document.querySelector('.cart-container span');
    let totalCartPrice = document.querySelector('#priceSum');



    // ----- event handling ----- //


    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    })

    closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    })


    listCartHTML.addEventListener('click', () => {
        clickPlusMinus();
    })

    

    // category bar
    $('.dropdown').hover(function(){
        $(this).find('.megamenu').css('visibility', 'visible');
        $(this).find('.megamenu').css('opacity', '1');
        $(this).find('.megamenu').css('transition', 'all 0.3s ease');
    },
    function(){
        $(this).find('.megamenu').css('visibility', 'hidden');
        $(this).find('.megamenu').css('opacity', '0');
        $(this).find('.megamenu').css('transition', 'all 0.5s ease');
    });

    $('.megamenu').hover(function(){
        $(this).css('visibility', 'visible');
        $(this).css('opacity', '1');
        $(this).css('transition', 'all 0.3s ease');  
    },   
    function(){
        $(this).css('visibility', 'hidden');
        $(this).css('opacity', '0');
        $(this).css('transition', 'all 0.5s ease');
    });


    // clicking home  or navbar Category
    $('.navbar a').click(function(){
        if ($(this).hasClass('home_link')){
            $('#contentList').load('postform_submitted.php');
            $('#productlistTitle').text("PRODUCT LIST");
        }
        else {
            var textContent = $(this).text();
            $.ajax({
                url: 'postform_category_search.php',
                method: 'POST',
                data: { key: textContent },
                success: function(response){
                    $('#productlistTitle').text(textContent);
                    $('#contentList').empty();
                    $('#contentList').html(response);
                },
                error: function(xhr, status, error){
                    // Handle errors
                    console.error(error);
                }
            });
        }    

    });
    


    // inital load data to the web page
    $('#contentList').load('postform_submitted.php', function(response, status, xhr){
        if (status == "success") {
            //  load content to receivedData for later use
            receivedData = response;
            initApp();
        }
        else {
            console.error("Error loading content: " + status);
        }    
    });

    
    // when search is performed
    $('#search_form').submit(function(event){
        event.preventDefault();
        // Get the search keyword from the input field
        var keyword = $('#search_keyword').val();
        
        // Send the keyword to getform_submitted.php using AJAX
        $.ajax({
            url: 'postform_submitted.php',
            method: 'POST',
            data: { key: keyword },
            success: function(response){

                if (keyword ==""){
                    $('#productlistTitle').text("PRODUCT LIST");
                }
                else {
                    $('#productlistTitle').text('Search result for "' + keyword + '"');
                }    
                $('#contentList').empty();
                $('#contentList').html(response);
            },
            error: function(xhr, status, error){
                // Handle errors
                console.error(error);
            }
        });
    });


    // handle add to cart clicking
    $('.listProduct').on('click', '.addCart', function(event){
        let thisProduct = $(this);
        let product_id = $(this).closest('.item').find('img').attr('id');
        let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
        inStockSearch(product_id, positionThisProductInCart, function(canAdd){
            if (!canAdd){
                thisProduct.siblings('.warning').text("*Out of Stock");
                $('#' + product_id).siblings('.addCart').css('color', '#eee');
                $('#' + product_id).siblings('.addCart').css('background-color','lightgrey');
                $('#' + product_id).siblings('.addCart').hover(function() {
                    $(this).css('color', '#eee');
                    $(this).css('background-color','lightgrey');
                }, function() {
                    $(this).css('color', '#eee'); 
                    $(this).css('background-color','lightgrey');
                });
            }
            else{
                thisProduct.siblings('.warning').text("");
            }    
        });    
    });


    //clicking on main logo
    $('#mainLogo').click(function(){
        $('#contentList').load('postform_submitted.php');
        $('#productlistTitle').text("PRODUCT LIST");
    })

    // clear cart when clicked
    $('.clearCart').click(function(){
        localStorage.clear();
        carts= [];
        addCartToHTML();
    });


    $('.checkOut').click(function(){
        if (carts.length>0){
            window.location.href = 'checkout.html';
        }    
    })

    $('#home_tag').hover(
        function() {
          $(this).css('transform', 'scale(1.2)');
        },
        function() {
          $(this).css('transform', 'scale(1)');
        }
      );


 // ----- function ----- //


    const inStockSearch = (product_id, positionThisProductInCart, callback) =>{
        let canAdd = false;
        $.ajax({
            url: 'postform_in_stock.php',
            method: 'POST',
            data: { key: product_id },
            success: function(response){
                let inStockQuantity = parseInt(response);
                if (positionThisProductInCart < 0){
                    let cartQuantity = 0;
                    console.log(cartQuantity);
                    if (inStockQuantity > cartQuantity){
                        addToCart(product_id);
                        canAdd = true;
                    }
                     
                }
                else {
                    let cartQuantity = carts[positionThisProductInCart].quantity;
                    if (inStockQuantity > cartQuantity){
                        addToCart(product_id);
                        if (inStockQuantity - cartQuantity == 1){
                        canAdd = false;
                        }
                        else {
                            canAdd = true;
                        }
                    } 
                    else {
                        canAdd = false;
                    }
                }     
                callback(canAdd);
            },
            error: function(xhr, status, error){
                // Handle errors
                console.error(error);
                callback(false);
            }
        });
    }

    const clickPlusMinus = () => {
        let positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = 'minus';
            if(positionClick.classList.contains('plus')){
                type = 'plus';
            }
            
            changeQuantity(product_id, type);
        }
    }
 
    

    //add to cart function
    const addToCart = (product_id) => {
        let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
        if(carts.length <= 0){
            carts = [{
                product_id: product_id,
                quantity: 1
            }]
        }
        else if (positionThisProductInCart < 0){
            carts.push({
                product_id: product_id,
                quantity: 1
            })
        }
        else {
            carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
        }

        addCartToHTML();
        addCartToMemory();
    }

    // display to cart function
    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        let totalSummingPrice = 0;

        if (carts.length > 0){
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
                <div class="totalPrice">
                    $${totalPrice.toFixed(2)}
                </div> 
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div> 
                `;
            listCartHTML.appendChild(newCart);    
            })
            $('.checkOut').css('background-color', '#E8BC0E');
            $('.checkOut').hover(function() {
                $(this).css('background-color', 'rgb(0, 255, 128)');
            }, function() {
                $(this).css('background-color', '#E8BC0E');
            });
        }
        else {
            $('.checkOut').css('background-color', 'lightgrey');
            $('.checkOut').hover(function() {
                $(this).css('background-color', 'lightgrey');
            }, function() {
                $(this).css('background-color', 'lightgrey');
            });

        }
        iconsSpan.textContent = totalQuantity;
        totalCartPrice.textContent = '$ ' + totalSummingPrice.toFixed(2);

    }


    // save cart info
    const addCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(carts));
    }




    const changeQuantity = (product_id, type) => {
        let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
        if (positionItemInCart>=0){
            switch (type) {
                case 'plus':
                    inStockSearch(product_id, positionItemInCart, function(canAdd){
                        if (!canAdd){
                            $('#' + product_id).siblings('.warning').text("*Out of Stock");
                            $('#' + product_id).siblings('.addCart').css('color', '#eee');
                            $('#' + product_id).siblings('.addCart').css('background-color','lightgrey');
                            $('#' + product_id).siblings('.addCart').hover(function() {
                                $(this).css('color', '#eee');
                                $(this).css('background-color','lightgrey');
                            }, function() {
                                $(this).css('color', '#eee'); 
                                $(this).css('background-color','lightgrey');
                            });
                        }

                    });    
                    break;

                default:   
                    let valueChange = carts[positionItemInCart].quantity - 1;
                    if (valueChange > 0) {
                        carts[positionItemInCart].quantity = valueChange;
                    }else{
                        carts.splice(positionItemInCart, 1);
                    }


                    $.ajax({
                        url: 'postform_in_stock.php',
                        method: 'POST',
                        data: { key: product_id },
                        success: function(response){
                          let inStockQuantity = parseInt(response);

                            if (carts[positionItemInCart]){
                                let cartQuantity = carts[positionItemInCart].quantity;

                                if (inStockQuantity > cartQuantity){
                                    $('#' + product_id).siblings('.warning').text("");
                                    $('#' + product_id).siblings('.addCart').css('background-color','#353432');
                                    $('#' + product_id).siblings('.addCart').hover(function() {
                                        $(this).css('background-color', '#999');
                                        $(this).css('color', 'black');
                                    }, function() {
                                        $(this).css('background-color', '#353432'); 
                                        $(this).css('color', '#eee'); 
                                    });
                                } 
                            }    
                            else {
                                $('#' + product_id).siblings('.warning').text("");
                                $('#' + product_id).siblings('.addCart').css('background-color','#353432');
                                $('#' + product_id).siblings('.addCart').hover(function() {
                                    $(this).css('background-color', '#999');
                                    $(this).css('color', 'black');
                                }, function() {
                                    $(this).css('background-color', '#353432'); 
                                    $(this).css('color', '#eee'); 
                                });
                            }
                        },
                        error: function(xhr, status, error){
                            // Handle errors
                            console.error(error);
                            callback(false);
                        }
                    });

                    break;
            }
        }
        addCartToMemory();
        addCartToHTML();
    }




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

    // get cart data from localStorage in JSON
    const initApp = () => {
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();

        }
    }

    
});
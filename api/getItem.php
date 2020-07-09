<?php
    include 'cors.php';
    include "connection.php";
    include "vendor/autoload.php";
    require_once('vendor/stripe/stripe-php/init.php');
    $connection  = connect();

    // Get the posted data.
   /* $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
    // Extract the data.
    $id = json_decode($postdata);
    }*/
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata))
    {
    // Extract the data.
    $getItemRequest = json_decode($postdata);
    $id = $getItemRequest->id;
    //echo json_encode($id);
    //echo json_encode($getItemRequest);
    }



    // Create.
    function getData($connection, $query){
        $result = $connection->query($query) or die($connection->error);
        $rows = array();
        while($tuple = $result->fetch_assoc()){
            $rows[] = $tuple;
        }
        $rowCount = mysqli_affected_rows($connection);
        return json_encode($rows);
    }
    $sql = "SELECT * FROM `items` Where id=$id";
    $results =  getData($connection, $sql);
    //stripe
    // Set your secret key. Remember to switch to your live secret key in production!
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    /*\Stripe\Stripe::setApiKey('sk_test_klfUjXVNOKEWpuo3O4dbQbNW002TLtL1vy');

    $session = \Stripe\Checkout\Session::create([
    'payment_method_types' => ['card'],
    'line_items' => [[
        'price' => 'price_HHW8ioN1tSL9wC',
        'quantity' => 1,
    ]],
    'mode' => 'payment',
    'success_url' => 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url' => 'https://example.com/cancel',
    ]);*/

    \Stripe\Stripe::setApiKey('sk_test_klfUjXVNOKEWpuo3O4dbQbNW002TLtL1vy');
    //stripe test run
    $result = \Stripe\PaymentIntent::create([
                'amount' => 1000,
                'currency' => 'usd',
                'payment_method_types' => ['card'],
                'receipt_email' => 'jenny.rosen@example.com',
                ]);

    //stripe balance
    $balance = \Stripe\Balance::retrieve();

    //stripe charge
    $charge = \Stripe\Charge::create([
            'amount' => 2000,
            'currency' => 'usd',
            'source' => 'tok_mastercard',
            'description' => 'My First Test Charge (created for API docs)',
        ]);

    
    header('Content-type: application/json');
    
    //create a product
    /*$product = \Stripe\Product::create([
                'name' => 'T-shirt',
                'type' => 'good',
                'description' => 'Comfortable cotton t-shirt',
                'attributes' => ['size', 'gender'],
            ]);*/
    //list all products
    $productList = \Stripe\Product::all(['limit' => 3]);

    //create A token
    $token = \Stripe\Token::create([
                'card' => [
                'number' => '4242424242424242',
                'exp_month' => 5,
                'exp_year' => 2021,
                'cvc' => '314',
                ],
            ]);
        $tId = $token -> id;
        //pay using $tId
        $chargeWithCard = \Stripe\Charge::create([
            'amount' => 2000,
            'currency' => 'usd',
            'source' => $tId,
            'description' => 'My First Test Charge with token)',
        ]);

    //echo $results;
    //echo json_encode($result);
    //echo json_encode($balance);
    //echo json_encode($charge);
    //echo json_encode($product);
    //echo json_encode($productList);
    echo json_encode($chargeWithCard);
?>
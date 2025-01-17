<?php
session_start();

// Verificar si el usuario no ha iniciado sesión
if (!isset($_SESSION['email'])) {
    header("Location: index.html"); // Redirigir al login si no hay sesión
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de Tareas con Vue</title>
    <link rel="website icon" href="../Imagenes/icon.png">
    <link rel="stylesheet" href="../estilo.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuex@3.6.2"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
</head>
<body>
    
    <div id="app">
        <nav-bar title="Mi tienda Online" :toggleCart="toggleCart"></nav-bar>

        <div class="container">
            <div class="row">
                <div v-for="product in products" :key="product.id" class="col-md-4">
                    <div class="card">
                        <img :src="product.image" class="card-img-top" alt="Imagen del curso">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">{{ product.description }}</p>
                            <p class="card-text">Precio: {{ product.price }}</p>
                            <img 
                                src="../Imagenes/carrito.png" 
                                alt="Agregar al carrito" 
                                @click="addToCart(product)" 
                                style="width: 40px; cursor: pointer;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="floating-cart" @click="toggleCart">
                <img src="../Imagenes/carrito.png" alt="Carrito" />
                <span class="badge">{{ cart.length }}</span>
            </div>
            <div v-if="isCartOpen" class="cart-modal">
                <h2>Carrito de compras</h2>
                <p v-if="cart.length === 0">El carrito está vacío</p>
                <ul>
                    <li v-for="item in cart" :key="item.id">
                        {{ item.name }} - {{ item.price }}  
                        <button class="btn btn-danger" @click="removeFromCart(item)">Eliminar</button>
                    </li>
                </ul>
                <p>Total: ${{ cartTotal }}</p>
                <div id="paypal-button-container">

    <button v-if="cart.length > 0 && !showPayPal" @click="confirmPurchase" class="btn btn-success">
        Confirmar compra
    </button>
    <div v-if="showPayPal">


    </div>
    </div>
    </div>
    <foot title="My Footer" description="Espero y tengas un buen resto de día"></foot>

    <script src="https://www.paypal.com/sdk/js?client-id=AciKTF_4pqY8pX4zcD0OCmotsGkifcKaTKS_0KlLtzzxalNFbfcsKxHy9eCh94XOeeCt5HkHTh-eMsXl&currency=USD"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/javascript.js"></script>    

</body>

</html>
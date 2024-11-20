Vue.component('nav-bar', {
    props: ['title', 'toggleCart', 'categories'],
    data() {
        return {
            isSearchOpen: false,
            searchQuery: '',
            suggestions: [],
            debounceTimeout: null, // Para el debounce
        };
    },
    methods: {
        toggleSearch() {
            this.isSearchOpen = !this.isSearchOpen;
        },
        handleSearchInput() {
            clearTimeout(this.debounceTimeout); // Limpiar el timeout anterior
            this.debounceTimeout = setTimeout(() => {
                const query = this.searchQuery.toLowerCase();
                const allProducts = this.$root.products; // Acceso a productos desde la instancia raíz
                if (query) {
                    this.suggestions = allProducts.filter(product =>
                        product.name.toLowerCase().includes(query)
                    );
                } else {
                    this.suggestions = [];
                }
            }, 300); // Ajusta el tiempo de debounce según sea necesario
        },
        selectSuggestion(product) {
            this.searchQuery = product.name; // Establecer la consulta de búsqueda
            this.suggestions = []; // Limpiar sugerencias
            this.addToCart(product); // Agregar el producto al carrito
        },
        handleBlur() {
            setTimeout(() => {
                this.suggestions = []; // Limpiar sugerencias después de un breve retardo
            }, 200);
        },
        addToCart(product) {
            this.$store.commit('ADD_TO_CART', product); // Agregar el producto al carrito usando Vuex
        },
        searchByCategory(category) {
            this.suggestions = this.$root.products.filter(product =>
                product.categories.toLowerCase() === category.toLowerCase()
            );
        }
    },
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">{{ title }}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item" v-for="category in categories" :key="category">
                        <a class="nav-link" href="#" @click="searchByCategory(category)">{{ category }}</a>
                    </li>
                </ul>
                <div class="search-container">
                    <button class="search-icon" @click="toggleSearch">
                        <img src="../Imagenes/lupa.png" alt="Buscar" id="searchIcon">
                    </button>
                    <input 
                        v-model="searchQuery"
                        class="search-bar"
                        :class="{ open: isSearchOpen }"
                        type="text" 
                        placeholder="Buscar..."
                        @input="handleSearchInput"
                        @blur="handleBlur"
                    />
                    <div class="autocomplete-suggestions" v-if="suggestions.length">
                        <div 
                            class="autocomplete-suggestion" 
                            v-for="product in suggestions" 
                            :key="product.id"
                            @click="selectSuggestion(product)"
                        >
                            {{ product.name }} - {{ product.price }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `
});
Vue.component('foot', {
    props: ['description', 'title'],
    template: `
    <footer class="bg-light text-center text-lg-start">
        <div class="container p-4">
            <div class="row">
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">{{ title }}</h5>
                    <p>{{ description }}</p>
                </div>
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Contacto</h5>
                    <p><i class="fas fa-envelope"></i> TodoApuerta@</p>
                    <p><i class="fas fa-phone"></i> +57 317 713 0121</p>
                </div>
            </div>
        </div>
    </footer>
    `
});

const store = new Vuex.Store({
    state: {
        cart: []
    },
    getters: {
        cart: state => state.cart,
        cartTotal: state => state.cart.reduce((total, product) => total + product.price, 0)
    },
    mutations: {
        ADD_TO_CART(state, product) {
            state.cart.push(product);
            localStorage.setItem('cart', JSON.stringify(state.cart)); // Guardar en localStorage
        },
        REMOVE_FROM_CART(state, product) {
            const index = state.cart.findIndex(item => item.id === product.id);
            if (index !== -1) {
                state.cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(state.cart)); // Actualizar en localStorage
            }
        },
        LOAD_CART(state) {
            const cart = localStorage.getItem('cart');
            if (cart) {
                state.cart = JSON.parse(cart);
            }
        }
    },
    actions: {
        loadCart({ commit }) {
            commit('LOAD_CART');
        }
    }
});

new Vue({
    el: '#app',
    store,
    data() {
        return {
            products: [
                { id: 1, name: 'VPN Para principiantes', description: 'Instalación y funcionamiento', price: 45, categories: 'Tecnología', image: '../Imagenes/vpn.png' },
                { id: 2, name: 'Computadora', description: 'Incluye sistema operativo Linux', price: 950, categories: 'Tecnología', image: '../Imagenes/Computador.png' },
                { id: 3, name: 'Curso de Python desde cero', description: 'Curso completo de Python', price: 90, categories: 'Educación', image: '../Imagenes/python.jpg' },
                { id: 4, name: 'Introducción al Kali Linux', description: 'Romero Hernan', price: 50, categories: 'Seguridad', image: '../Imagenes/kali.png' },
                { id: 5, name: 'Introducción a la matemática', description: 'Romero Hernan', price: 40, categories: 'Educación', image: '../Imagenes/MaquinaV.png' },
                { id: 6, name: 'Curso de canto desde cero', description: 'Romero Hernan', price: 100, categories: 'Arte', image: '../Imagenes/virus.png' }
            ],
            searchQuery: '',
            categories: ['Tecnología', 'Educación', 'Seguridad', 'Arte'],
            isCartOpen: false,
            showPayPal: false 
        };
    },
    created() {
        this.$store.dispatch('loadCart');
    },
    computed: {
        cart() {
            return this.$store.getters.cart;
        },
        cartTotal() {
            return this.$store.getters.cartTotal;
        }
    },
    methods: {
        addToCart(product) {
            this.$store.commit('ADD_TO_CART', product);
        },
        removeFromCart(product) {
            this.$store.commit('REMOVE_FROM_CART', product);
        },
        toggleCart() {
            this.isCartOpen = !this.isCartOpen;
    
            if (this.isCartOpen && this.cart.length > 0) {
                this.showPayPal = false; // Ocultar PayPal al abrir el carrito
            }
        },
        confirmPurchase() {
            this.showPayPal = true; // Mostrar PayPal al hacer clic en "Confirmar compra"
        
            paypal.Buttons({
                style:{
                    color:'blue',
                    shape:'pill',
                },
                createOrder: (data, actions) => {
                    console.log("Creando orden...");
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: this.cartTotal.toFixed(2) // Total de la compra
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    console.log("Orden aprobada...");
                    return actions.order.capture().then((details) => {
                        console.log("Detalles del pedido:", details);
                        Swal.fire("Compra realizada", "Tu compra ha sido procesada con éxito.", "success");
                        this.cart.forEach(item => this.removeFromCart(item));
                        this.isCartOpen = false;
                        this.showPayPal = false; // Ocultar PayPal tras la compra
                    });
                },
                onCancel: () => {
                    console.warn("El usuario canceló la compra.");
                    Swal.fire("Cancelado", "El pago fue cancelado.", "info");
                    this.showPayPal = true;
                },
                onError: (err) => {
                    console.error("Error con PayPal:", err);
                    Swal.fire("Error", "Hubo un problema al procesar tu pago. Intenta de nuevo.", "error");
                    this.showPayPal = true;
                }
            }).render("#paypal-button-container"); // Renderiza el botón de PayPal en el contenedor
        }
        
    }
});
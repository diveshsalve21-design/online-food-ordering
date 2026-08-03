/**
 * API Service for connecting to FastAPI backend
 */

const API_BASE_URL = 'http://localhost:8000';

// Helper function to get auth token from localStorage
function getAuthToken() {
    return localStorage.getItem('access_token');
}

// Helper function to set auth tokens
function setAuthTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
}

// Helper function to clear auth tokens
function clearAuthTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
}

// Helper function to get current user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Generic API call function
async function apiCall(endpoint, options = {}) {
    const token = getAuthToken();
    
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        },
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        if (response.status === 401) {
            // Token expired, try to refresh or logout
            clearAuthTokens();
            window.location.href = '/login.html';
            throw new Error('Unauthorized');
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'An error occurred');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Authentication APIs
const AuthAPI = {
    async register(userData) {
        const response = await apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        return response;
    },
    
    async login(email, password) {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }
        
        const data = await response.json();
        setAuthTokens(data.access_token, data.refresh_token);
        return data;
    },
    
    async getCurrentUser() {
        const user = await apiCall('/auth/me');
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    },
    
    logout() {
        clearAuthTokens();
        window.location.href = '/index.html';
    },
    
    isAuthenticated() {
        return !!getAuthToken();
    }
};

// User APIs
const UserAPI = {
    async getUsers() {
        return apiCall('/users/');
    },
    
    async getUser(userId) {
        return apiCall(`/users/${userId}`);
    },
    
    async updateUser(userId, userData) {
        return apiCall(`/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(userData),
        });
    },
    
    async deleteUser(userId) {
        return apiCall(`/users/${userId}`, {
            method: 'DELETE',
        });
    }
};

// Restaurant APIs
const RestaurantAPI = {
    async getRestaurants() {
        return apiCall('/restaurants/');
    },
    
    async getRestaurant(id) {
        return apiCall(`/restaurants/${id}`);
    },
    
    async createRestaurant(restaurantData) {
        return apiCall('/restaurants/', {
            method: 'POST',
            body: JSON.stringify(restaurantData),
        });
    },
    
    async updateRestaurant(id, restaurantData) {
        return apiCall(`/restaurants/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(restaurantData),
        });
    },
    
    async deleteRestaurant(id) {
        return apiCall(`/restaurants/${id}`, {
            method: 'DELETE',
        });
    }
};

// Menu Category APIs
const MenuCategoryAPI = {
    async getCategories() {
        return apiCall('/menu_categories/');
    },
    
    async getCategory(id) {
        return apiCall(`/menu_categories/${id}`);
    },
    
    async createCategory(categoryData) {
        return apiCall('/menu_categories/', {
            method: 'POST',
            body: JSON.stringify(categoryData),
        });
    }
};

// Menu Item APIs
const MenuItemAPI = {
    async getMenuItems() {
        return apiCall('/menu_items/');
    },
    
    async getMenuItem(id) {
        return apiCall(`/menu_items/${id}`);
    },
    
    async getMenuItemsByRestaurant(restaurantId) {
        return apiCall(`/menu_items/?restaurant_id=${restaurantId}`);
    },
    
    async createMenuItem(itemData) {
        return apiCall('/menu_items/', {
            method: 'POST',
            body: JSON.stringify(itemData),
        });
    }
};

// Cart APIs
const CartAPI = {
    async getCart(cartId) {
        return apiCall(`/carts/${cartId}`);
    },
    
    async getCarts() {
        return apiCall('/carts/');
    },
    
    async createCart(cartData) {
        return apiCall('/carts/', {
            method: 'POST',
            body: JSON.stringify(cartData),
        });
    },
    
    async updateCart(cartId, cartData) {
        return apiCall(`/carts/${cartId}`, {
            method: 'PATCH',
            body: JSON.stringify(cartData),
        });
    },
    
    async deleteCart(cartId) {
        return apiCall(`/carts/${cartId}`, {
            method: 'DELETE',
        });
    }
};

// Cart Item APIs
const CartItemAPI = {
    async getCartItems() {
        return apiCall('/cart_items/');
    },
    
    async addCartItem(itemData) {
        return apiCall('/cart_items/', {
            method: 'POST',
            body: JSON.stringify(itemData),
        });
    },
    
    async updateCartItem(itemId, itemData) {
        return apiCall(`/cart_items/${itemId}`, {
            method: 'PATCH',
            body: JSON.stringify(itemData),
        });
    },
    
    async removeCartItem(itemId) {
        return apiCall(`/cart_items/${itemId}`, {
            method: 'DELETE',
        });
    }
};

// Order APIs
const OrderAPI = {
    async getOrders() {
        return apiCall('/orders/');
    },
    
    async getOrder(id) {
        return apiCall(`/orders/${id}`);
    },
    
    async createOrder(orderData) {
        return apiCall('/orders/', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    },
    
    async updateOrder(id, orderData) {
        return apiCall(`/orders/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(orderData),
        });
    },
    
    async cancelOrder(id) {
        return apiCall(`/orders/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'CANCELLED' }),
        });
    }
};

// Payment APIs
const PaymentAPI = {
    async getPayments() {
        return apiCall('/payments/');
    },
    
    async getPayment(id) {
        return apiCall(`/payments/${id}`);
    },
    
    async createPayment(paymentData) {
        return apiCall('/payments/', {
            method: 'POST',
            body: JSON.stringify(paymentData),
        });
    },
    
    async processPayment(id, success = true) {
        return apiCall(`/payments/${id}/process`, {
            method: 'POST',
            body: JSON.stringify({ success }),
        });
    }
};

// Address APIs
const AddressAPI = {
    async getAddresses() {
        return apiCall('/addresses/');
    },
    
    async getAddress(id) {
        return apiCall(`/addresses/${id}`);
    },
    
    async createAddress(addressData) {
        return apiCall('/addresses/', {
            method: 'POST',
            body: JSON.stringify(addressData),
        });
    },
    
    async updateAddress(id, addressData) {
        return apiCall(`/addresses/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(addressData),
        });
    },
    
    async deleteAddress(id) {
        return apiCall(`/addresses/${id}`, {
            method: 'DELETE',
        });
    }
};

// Review APIs
const ReviewAPI = {
    async getReviews() {
        return apiCall('/reviews/');
    },
    
    async createReview(reviewData) {
        return apiCall('/reviews/', {
            method: 'POST',
            body: JSON.stringify(reviewData),
        });
    }
};

// Export all APIs
window.API = {
    Auth: AuthAPI,
    User: UserAPI,
    Restaurant: RestaurantAPI,
    MenuCategory: MenuCategoryAPI,
    MenuItem: MenuItemAPI,
    Cart: CartAPI,
    CartItem: CartItemAPI,
    Order: OrderAPI,
    Payment: PaymentAPI,
    Address: AddressAPI,
    Review: ReviewAPI,
};

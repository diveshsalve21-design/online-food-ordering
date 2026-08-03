/**
 * Main Application JavaScript
 */

// Update navigation based on auth status
function updateNavigation() {
    const isLoggedIn = API.Auth.isAuthenticated();
    const user = getCurrentUser();
    
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Find or create auth links container
    let authContainer = document.getElementById('auth-links');
    if (!authContainer) {
        authContainer = document.createElement('div');
        authContainer.id = 'auth-links';
        authContainer.style.display = 'flex';
        authContainer.style.gap = '1rem';
        navLinks.appendChild(authContainer);
    }
    
    if (isLoggedIn && user) {
        authContainer.innerHTML = `
            <a href="/profile.html">Hello, ${user.full_name}</a>
            <a href="/orders.html">Orders</a>
            <a href="#" onclick="API.Auth.logout()">Logout</a>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="/login.html">Login</a>
            <a href="/register.html" class="btn btn-primary btn-sm">Register</a>
        `;
    }
    
    // Update cart count
    updateCartCount();
}

// Update cart count badge
async function updateCartCount() {
    const cartCountEl = document.querySelector('.cart-count');
    if (!cartCountEl) return;
    
    if (!API.Auth.isAuthenticated()) {
        cartCountEl.textContent = '0';
        return;
    }
    
    try {
        const carts = await API.Cart.getCarts();
        if (carts && carts.length > 0) {
            // Get cart items for the first cart
            const cartItems = await API.CartItem.getCartItems();
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartCountEl.textContent = totalItems || '0';
        } else {
            cartCountEl.textContent = '0';
        }
    } catch (error) {
        cartCountEl.textContent = '0';
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Format currency
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Protect pages that require authentication
function requireAuth() {
    if (!API.Auth.isAuthenticated()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

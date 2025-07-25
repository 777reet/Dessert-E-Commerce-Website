    // Particle Background Animation
    function createParticles() {
      const particleBg = document.getElementById('particleBg');
      // Clear existing particles to prevent accumulation if called multiple times
      particleBg.innerHTML = '';
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particleBg.appendChild(particle);
      }
    }

    // Navbar Scroll Effect
    function handleNavbarScroll() {
      const navbar = document.querySelector('.navbar');
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
      });
    }

    // Parallax Effect for Floating Elements (specific to Cart page)
    function setupParallax() {
      const floatingItems = document.querySelectorAll('.floating-item-cart');
      
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingItems.forEach((item, index) => {
          const speed = 0.3 + (index * 0.07); // Adjusted speed for cart page icons
          item.style.transform = `translateY(${scrolled * -speed}px)`;
        });
      });
    }

    // Add Sparkle Effect on Click
    function createSparkle(x, y) {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'fixed';
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.background = 'radial-gradient(circle, #fff, #ffb6c1)';
      sparkle.style.borderRadius = '50%';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '9999';
      sparkle.style.animation = 'sparkle 1s ease-out forwards';
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }

    // Add sparkle animation CSS (if not already in a shared stylesheet)
    const sparkleCSS = `
      @keyframes sparkle {
        0% {
          transform: scale(0) rotate(0deg);
          opacity: 1;
        }
        50% {
          transform: scale(1) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: scale(0) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = sparkleCSS;
    document.head.appendChild(style);

    // Add click sparkle effect
    document.addEventListener('click', (e) => {
      createSparkle(e.clientX, e.clientY);
    });

    // --- Cart Specific Logic (Placeholder for your script.js content) ---
    // This is a basic example. You'll need to adapt it to how your actual cart data is stored and managed.
    const cartItems = [
      { id: 'waffle-1', name: 'Matcha Dream Waffle', price: 12.00, quantity: 1, image: 'https://via.placeholder.com/80/90ee90/ffffff?text=Matcha+Waffle' },
      { id: 'cupcake-1', name: 'Blossom Matcha Cupcake', price: 6.00, quantity: 2, image: 'https://via.placeholder.com/80/ffb6c1/ffffff?text=Matcha+Cupcake' },
    ]; // This would ideally come from localStorage or a server

    function renderCart() {
      const cartContainer = document.getElementById('cartContainer');
      const cartSummary = document.getElementById('cartSummary');
      const cartEmptyMessage = document.querySelector('.cart-empty-message');

      cartContainer.innerHTML = ''; // Clear existing items

      if (cartItems.length === 0) {
        cartEmptyMessage.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
      } else {
        cartEmptyMessage.style.display = 'none';
        cartSummary.style.display = 'block';
      }

      let subtotal = 0;

      cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Unit Price: $${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrement" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increment" data-id="${item.id}">+</button>
          </div>
          <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          <button class="remove-item-btn" data-id="${item.id}">✖</button>
        `;
        cartContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
      });

      // Update Summary
      const shippingCost = 5.00; // Example fixed shipping
      document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('shipping').textContent = `$${shippingCost.toFixed(2)}`;
      document.getElementById('total').textContent = `$${(subtotal + shippingCost).toFixed(2)}`;

      addEventListenersToCartButtons();
    }

    function addEventListenersToCartButtons() {
      document.querySelectorAll('.decrement').forEach(button => {
        button.onclick = (e) => updateQuantity(e.target.dataset.id, -1);
      });
      document.querySelectorAll('.increment').forEach(button => {
        button.onclick = (e) => updateQuantity(e.target.dataset.id, 1);
      });
      document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.onclick = (e) => removeItem(e.target.dataset.id);
      });
      document.querySelector('.checkout-btn').onclick = () => alert('Proceeding to checkout! (This is a placeholder)');
    }

    function updateQuantity(id, change) {
      const itemIndex = cartItems.findIndex(item => item.id === id);
      if (itemIndex > -1) {
        cartItems[itemIndex].quantity += change;
        if (cartItems[itemIndex].quantity <= 0) {
          removeItem(id); // Remove if quantity drops to 0 or less
        } else {
          renderCart();
        }
      }
    }

    function removeItem(id) {
      const initialLength = cartItems.length;
      cartItems.splice(cartItems.findIndex(item => item.id === id), 1);
      if (cartItems.length < initialLength) {
         renderCart();
      }
    }
    // --- End Cart Specific Logic ---

    // Initialize all functions
    document.addEventListener('DOMContentLoaded', () => {
      createParticles();
      handleNavbarScroll();
      setupParallax();
      renderCart(); // Call to render initial cart content
    });

    // Add some random floating particles periodically
    setInterval(() => {
      if (Math.random() < 0.1) {
        createParticles();
      }
    }, 5000);
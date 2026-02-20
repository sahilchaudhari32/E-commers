import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [step, setStep] = useState("cart"); // cart, address, payment, success
  const [address, setAddress] = useState({ name: "", street: "", city: "", zip: "" });
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isLocating, setIsLocating] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAutoFillAddress = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Using a public reverse geocoding API (OpenStreetMap Nominatim)
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();

            if (data.address) {
              setAddress({
                ...address,
                street: data.display_name.split(',').slice(0, 2).join(','),
                city: data.address.city || data.address.town || data.address.village || "",
                zip: data.address.postcode || ""
              });
            }
          } catch (error) {
            console.error("Geo error:", error);
            alert("Could not fetch address details. Please enter manually.");
          } finally {
            setIsLocating(false);
          }
        },
        () => {
          alert("Location access denied.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation not supported.");
      setIsLocating(false);
    }
  };

  const handleCheckout = () => {
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="main-content">
        <div className="container">
          <div className="empty-state fade-in text-center">
            <div className="empty-state-icon" style={{ color: 'var(--success)' }}>{paymentMethod === 'cod' ? '🚚' : '✅'}</div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order for ${totalPrice.toFixed(2)} is confirmed.</p>
            <p><strong>Shipping to:</strong> {address.street}, {address.city} {address.zip}</p>
            <p className="mt-1">Method: {paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}</p>
            <p className="mt-1">Your product is on its way to delivery! Thank you for shopping with us.</p>
            <a href="/" className="btn btn-primary mt-2">Continue Shopping</a>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="main-content">
        <div className="container">
          <div className="empty-state fade-in">
            <div className="empty-state-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <a href="/" className="btn btn-primary">Start Shopping</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <header className="page-header">
          <div className="flex items-center gap-2">
            {step !== 'cart' && <button className="btn btn-secondary btn-icon" onClick={() => setStep(step === 'payment' ? 'address' : 'cart')}>←</button>}
            <h1 className="page-title">
              {step === 'cart' && "Your Shopping Cart"}
              {step === 'address' && "Shipping Address"}
              {step === 'payment' && "Payment Method"}
            </h1>
          </div>
          <p className="page-subtitle">
            {step === 'cart' && `You have ${totalItems} items in your cart`}
            {step === 'address' && "Where should we send your package?"}
            {step === 'payment' && "Choose how you'd like to pay"}
          </p>
        </header>

        <div className="cart-container fade-in">
          <div className="cart-items">
            {step === 'cart' && (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-item-details">
                      <span className="cart-item-category">{item.category}</span>
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>

                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <div className="qty-num">{item.quantity}</div>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>

                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          <span>🗑️</span> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {step === 'address' && (
              <div className="checkout-form fade-in">
                <button
                  className="address-auto-btn"
                  onClick={handleAutoFillAddress}
                  disabled={isLocating}
                >
                  {isLocating ? "📍 Locating..." : "📍 Use Current Location"}
                </button>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Street Address</label>
                  <textarea
                    placeholder="123 Shopping St, Apartment 4B"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="New Delhi"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      placeholder="110001"
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary mt-2"
                  disabled={!address.name || !address.street || !address.city}
                  onClick={() => setStep('payment')}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="fade-in">
                <div className="payment-options">
                  <div
                    className={`payment-card ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="payment-card-icon">📱</div>
                    <div className="payment-card-title">UPI Payment</div>
                    <small>Scan QR Code</small>
                  </div>
                  <div
                    className={`payment-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="payment-card-icon">💵</div>
                    <div className="payment-card-title">Cash on Delivery</div>
                    <small>Pay when you receive</small>
                  </div>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="upi-qr-container fade-in">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=shophub@upi%26pn=ShopHub%26am=${totalPrice}%26cu=INR`}
                      alt="UPI QR Code"
                    />
                    <div className="upi-details">
                      <p>Scan with Any UPI App</p>
                      <p className="mt-1">Amount to Pay: ${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                <button className="btn btn-primary mt-2" style={{ width: '100%' }} onClick={handleCheckout}>
                  {paymentMethod === 'upi' ? "Confirm Paid & Place Order" : "Place Order (COD)"}
                </button>
              </div>
            )}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: 'var(--success)' }}>Free</span>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <span className="summary-total">${totalPrice.toFixed(2)}</span>
            </div>
            {step === 'cart' && (
              <button className="btn btn-primary mt-2" style={{ width: '100%' }} onClick={() => setStep('address')}>
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
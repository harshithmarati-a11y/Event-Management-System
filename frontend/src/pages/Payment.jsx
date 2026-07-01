import Sidebar from "../components/Sidebar";
import "../styles/Payment.css";

function Payment() {
  return (
    <div className="payment-container">

      <Sidebar />

      <div className="payment-content">

        <h1>Payment Gateway</h1>

        <div className="payment-box">

          {/* Order Summary */}

          <div className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-item">
              <span>Event</span>
              <span>Tech Conference 2026</span>
            </div>

            <div className="summary-item">
              <span>Tickets</span>
              <span>2</span>
            </div>

            <div className="summary-item">
              <span>Price Per Ticket</span>
              <span>₹1500</span>
            </div>

            <div className="summary-item total">
              <span>Total Amount</span>
              <span>₹3000</span>
            </div>

          </div>

          {/* Payment Form */}

          <div className="payment-form">

            <h2>Choose Payment Method</h2>

            <div className="payment-options">
              <button>💳 Credit Card</button>
              <button>🏦 Net Banking</button>
              <button>📱 UPI</button>
            </div>

            <input
              type="text"
              placeholder="Card Holder Name"
            />

            <input
              type="text"
              placeholder="Card Number"
            />

            <div className="card-row">
              <input
                type="text"
                placeholder="MM/YY"
              />

              <input
                type="password"
                placeholder="CVV"
              />
            </div>

            <button className="pay-btn">
              Pay ₹3000
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;
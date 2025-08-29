'use client'
export default function CheckoutFooter() {
  return (
    <div className="contact-support-section pt-5">
    <div className="container">
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="checkout-review">
                    <div className="review-bot-icon">
                        <img src="/img/check_review.svg"/>
                    </div>
                    <div className="review-content">
                        <h6>103 + Million Verified Review</h6>
                        <p>Find the perfect place to stay. Read honest reviews from the Tirtheasy travel community.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="checkout-review">
                    <div className="review-bot-icon">
                        <img src="/img/check_best_price.svg"/>
                    </div>
                    <div className="review-content">
                        <h6>Best Price Gurantee</h6>
                        <p>Nobody work harder to get you the best price. And if you find one lower, we'll you the difference.</p>
                    </div>
                </div>
            </div>

             <div className="col-md-4 mb-4">
                <div className="checkout-review">
                    <div className="review-bot-icon">
                        <img src="/img/check_customer.svg"/>
                    </div>
                    <div className="review-content">
                        <h6>FREE 24/7 Customer Service</h6>
                        <p>All day, every day, we're here to help you.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}
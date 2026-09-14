import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:py-32">
      <h1 className="font-heading text-4xl font-bold text-sb-text mb-8">
        Terms and Conditions
      </h1>
      <div className="prose prose-sm sm:prose-base text-text-muted space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-sb-text mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2 className="text-xl font-semibold text-sb-text mt-8 mb-4">
          2. Product Information and Availability
        </h2>
        <p>
          All of our products are subject to availability. We reserve the right to discontinue any product at any time. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.
        </p>
        <p>
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
        </p>

        <h2 className="text-xl font-semibold text-sb-text mt-8 mb-4">
          3. Delivery Policy
        </h2>
        <p>
          We currently deliver only within Surat, across select pincodes. Delivery times are estimates and not guarantees. We are not responsible for delays caused by weather, traffic, or other unforeseen circumstances.
        </p>

        <h2 className="text-xl font-semibold text-sb-text mt-8 mb-4">
          4. Returns and Refunds
        </h2>
        <p>
          Due to the perishable nature of our products, we do not accept returns. If you are unsatisfied with your purchase, please contact us within 24 hours of receiving your order with photos of the product, and we will work with you to find a resolution.
        </p>

        <h2 className="text-xl font-semibold text-sb-text mt-8 mb-4">
          5. Contact Information
        </h2>
        <p>
          Questions about the Terms of Service should be sent to us at hello@sweetbonanza.in.
        </p>
      </div>
    </div>
  );
}

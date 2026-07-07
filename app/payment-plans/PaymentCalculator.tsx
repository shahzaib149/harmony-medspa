"use client";

import { useMemo, useState } from "react";

const careCreditCalculatorBaseUrl = "https://www.carecredit.com/payment_calculator/template.html";

export default function PaymentCalculator() {
  const [amount, setAmount] = useState("500");

  const calculatorUrl = useMemo(() => {
    const cleanAmount = amount.replace(/[^\d.]/g, "");
    const url = new URL(careCreditCalculatorBaseUrl);

    url.searchParams.set("amount", cleanAmount || "500");
    url.searchParams.set("keys", "");
    url.searchParams.set("plate", "GFF238");

    return url.toString();
  }, [amount]);

  return (
    <div className="payment-calculator-card">
      <div className="payment-calculator-head">
        <span>Payment Calculator</span>
        <strong>CareCredit</strong>
      </div>
      <div className="payment-calculator-body">
        <label>
          <small>ESTIMATED PROCEDURE AMOUNT</small>
          <span className="payment-amount-input-wrap">
            <span aria-hidden="true">$</span>
            <input
              aria-label="Estimated procedure amount"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
            />
          </span>
        </label>
        <a href={calculatorUrl} target="_blank" rel="noreferrer">
          Calculate
        </a>
      </div>
    </div>
  );
}

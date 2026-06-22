import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

const LAST_UPDATED = "June 22, 2026";

function ShippingReturnsPage() {
  return (
    <LegalPage title="Shipping & Returns" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Shipping">
        <ul className="list-disc space-y-2 pl-5">
          <li>Free shipping across India on all orders.</li>
          <li>Orders are dispatched within 1–2 business days of being placed.</li>
          <li>Estimated delivery is 3–7 business days from dispatch.</li>
          <li>Tracking details are shared with you by email once your order ships.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Returns">
        <p>
          We offer a 7-day return window from the date of delivery for unused,
          undamaged items in their original packaging. To initiate a return, email us
          at{" "}
          <a className="text-primary hover:underline" href="mailto:hello@lilchamps.in">
            hello@lilchamps.in
          </a>{" "}
          with your order number and reason for return, and we'll guide you through
          the next steps.
        </p>
      </LegalSection>

      <LegalSection title="Refunds">
        <p>
          Once we receive and inspect the returned item, your refund will be processed
          to your original payment method within 5–7 business days. You'll receive a
          confirmation email once the refund is issued.
        </p>
      </LegalSection>

      <LegalSection title="Damaged or Defective Items">
        <p>
          If your order arrives damaged or defective, please email us within 48 hours
          of delivery with photos of the item and packaging. We'll arrange a
          replacement or a full refund at no additional cost.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          Lil Champs<br />
          4th Floor, Tower C, DLF Cyberpark, Udyog Vihar, Sector 20, Gurugram,
          Haryana 122016<br />
          Email:{" "}
          <a className="text-primary hover:underline" href="mailto:hello@lilchamps.in">
            hello@lilchamps.in
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Lil Champs" },
      { name: "description", content: "Shipping timelines, returns, and refunds at Lil Champs." },
    ],
  }),
  component: ShippingReturnsPage,
});

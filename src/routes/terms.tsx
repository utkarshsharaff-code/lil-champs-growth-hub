import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

const LAST_UPDATED = "June 22, 2026";

function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Acceptance of Terms">
        <p>
          By accessing or using the Lil Champs website and services, you agree to be
          bound by these Terms of Service. If you do not agree, please do not use the
          site.
        </p>
      </LegalSection>

      <LegalSection title="Eligibility">
        <p>
          You must be at least 18 years old (or the age of majority in your
          jurisdiction) to create an account or place an order.
        </p>
      </LegalSection>

      <LegalSection title="Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your account
          credentials and for all activity under your account. Please notify us
          immediately of any unauthorised use.
        </p>
      </LegalSection>

      <LegalSection title="Orders & Pricing">
        <p>
          All prices are listed in Indian Rupees (INR) and are inclusive of applicable
          taxes unless stated otherwise. Prices and product availability may change at
          any time without prior notice. We reserve the right to cancel or refuse any
          order at our discretion.
        </p>
      </LegalSection>

      <LegalSection title="Shipping">
        <p>
          Shipping timelines, returns, and refunds are governed by our{" "}
          <a className="text-primary hover:underline" href="/shipping-returns">
            Shipping &amp; Returns Policy
          </a>
          , which forms part of these Terms.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All content on this site — including the Lil Champs name, logo, product
          images, copy, and design — is owned by Lil Champs or its licensors and is
          protected by applicable intellectual property laws. You may not copy,
          reproduce, or distribute it without our written permission.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable Use">
        <p>
          You agree not to misuse the site, attempt to gain unauthorised access,
          interfere with its operation, or use it for any unlawful purpose.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers & Limitation of Liability">
        <p>
          The site and products are provided on an "as is" and "as available" basis.
          To the maximum extent permitted by law, Lil Champs disclaims all warranties,
          express or implied. Our total liability for any claim relating to the site
          or a product shall not exceed the amount you paid for the relevant order.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of India. Any disputes shall be subject
          to the exclusive jurisdiction of the courts at Gurugram, Haryana.
        </p>
      </LegalSection>

      <LegalSection title="Changes to Terms">
        <p>
          We may update these Terms from time to time. Continued use of the site after
          changes are posted constitutes your acceptance of the revised Terms.
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

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Lil Champs" },
      { name: "description", content: "The terms governing your use of Lil Champs." },
    ],
  }),
  component: TermsPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

const LAST_UPDATED = "June 22, 2026";

function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Introduction">
        <p>
          Lil Champs ("we", "us", or "our") respects your privacy. This Privacy Policy
          explains how we collect, use, and protect information when you visit our
          website and use our services.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Account information:</strong> your email address and password when
            you sign up or log in (authentication is handled via our backend provider,
            Supabase).
          </li>
          <li>
            <strong>Order details:</strong> products you order, order timestamps, and
            associated price information.
          </li>
          <li>
            <strong>Newsletter:</strong> your email address if you subscribe to our
            updates.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use Your Information">
        <p>
          We use your information to operate your account, process and fulfill orders,
          respond to your queries, send transactional communications, and — if you've
          opted in — share newsletters and product updates.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          We use essential cookies and local storage to keep you signed in and to
          remember basic site preferences. We do not use cookies for advertising.
        </p>
      </LegalSection>

      <LegalSection title="Data Storage & Security">
        <p>
          Your data is stored securely via Supabase, our backend infrastructure
          provider. Passwords are hashed and never stored in plain text. We use
          industry-standard safeguards but no method of transmission over the internet
          is 100% secure.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>
          We rely on trusted third-party services (such as Supabase for authentication,
          database, and storage) to run the site. These providers process data only as
          needed to deliver their services.
        </p>
      </LegalSection>

      <LegalSection title="Your Rights">
        <p>
          You may request access to, correction of, or deletion of your personal data
          by emailing us at the address below. You may also unsubscribe from newsletters
          at any time using the link in those emails.
        </p>
      </LegalSection>

      <LegalSection title="Children's Privacy">
        <p>
          Our products are intended for babies and young children, but our website is
          designed for use by parents and guardians. We do not knowingly collect personal
          information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The "Last updated" date
          at the top of this page reflects the most recent revision.
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

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Lil Champs" },
      { name: "description", content: "How Lil Champs collects, uses, and protects your information." },
    ],
  }),
  component: PrivacyPolicyPage,
});

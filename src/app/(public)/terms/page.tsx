import { LegalTemplate } from "@/components/templates";

export default function TermsPage() {
  return (
    <LegalTemplate title="Terms of Service" lastUpdated="September 14, 2026">
      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using the acomo application, you agree to be bound by
          these terms and conditions. If you do not agree with any part of these
          terms, you are not permitted to use our application.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
          2. Use of Service
        </h2>
        <p>
          You are fully responsible for the financial data you enter into the
          application. acomo is provided as a recording tool, and we are not
          responsible for the financial decisions you make based on the data in
          this application.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
          3. User Accounts
        </h2>
        <p>
          You must maintain the confidentiality of your login credentials. You
          are responsible for all activities that occur under your account.
          Notify us immediately if you suspect any unauthorized use of your
          account.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
          4. Modifications to Service
        </h2>
        <p>
          We reserve the right to modify or discontinue our services at any
          time, with or without notice. We may also update these terms and
          conditions periodically, and your continued use signifies your
          agreement to those changes.
        </p>
      </section>
    </LegalTemplate>
  );
}

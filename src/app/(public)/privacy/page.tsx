import { LegalTemplate } from '@/components/templates';

export default function PrivacyPage() {
  return (
    <LegalTemplate title="Privacy Policy" lastUpdated="September 14, 2026">
      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Data Collection</h2>
        <p>We collect information you provide directly to us when you create an account, use our services, or communicate with us. This includes your name, email address, and financial data you manually enter into the application.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Use of Information</h2>
        <p>The information we collect is used to provide, maintain, and improve our services. We use your data to help you manage your cash flow and provide relevant financial insights.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Information Sharing</h2>
        <p>We do not sell or rent your personal information to third parties. We only share your information in limited circumstances, such as with service providers who help us operate the application, with your consent, or when required by law.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Data Security</h2>
        <p>We take reasonable steps to protect your information from loss, theft, misuse, and unauthorized access. Your data is stored on secure servers with advanced encryption.</p>
      </section>
    </LegalTemplate>
  );
}

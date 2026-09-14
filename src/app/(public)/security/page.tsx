import { LegalTemplate } from '@/components/templates';

export default function SecurityPage() {
  return (
    <LegalTemplate title="Security" lastUpdated="September 14, 2026">
      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Encryption Standards</h2>
        <p>All data traffic between your device and our servers is encrypted using industry-standard security protocols. Your sensitive data is also encrypted when stored in our database to prevent unauthorized access.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Secure Authentication</h2>
        <p>We use trusted identity providers like Google to handle your login process. We never see or store your Google account password, ensuring your account security is maintained.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Backup</h2>
        <p>Your data is regularly backed up to prevent data loss due to hardware failure or other technical issues. We are committed to ensuring your data is always available when you need it.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Active Monitoring</h2>
        <p>Our systems are continuously monitored to detect and prevent suspicious activities. If we identify potential security threats, our team will immediately take action to protect your data.</p>
      </section>
    </LegalTemplate>
  );
}

// /pages/legal/privacy.js

export default function PrivacyPolicy() {
    return (
      <main className="p-8 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Last Updated: [02/03/2025]</p>
  
        <section className="mt-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p>We collect personal information such as your name, email, and payment details when you make a purchase...</p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>We use your information to process orders, improve our services, and send promotional emails...</p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">3. Cookies & Tracking</h2>
            <p>Our website uses cookies to improve user experience. You can disable cookies in your browser settings...</p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Third-Party Services</h2>
            <p>We may share necessary data with payment providers and analytics tools...</p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
            <p>You can request access to your personal data or ask for it to be deleted at any time...</p>
          </div>
        </section>
  
        <p className="mt-6 text-center">For any privacy concerns, please <a href="../contact" className="text-blue-500 dark:text-blue-400 underline">contact us</a>.</p>
      </main>
    );
  }
  
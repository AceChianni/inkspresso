// /pages/legal/terms.js
export default function TermsOfService() {
    return (
      <main className="p-8 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-bold text-center mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Last Updated: [02/03/2025]</p>
  
        <section className="mt-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>Welcome to Inkspresso! By using our website, you agree to abide by the following terms and conditions...</p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">2. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials...</p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">3. Purchases & Payments</h2>
            <p>All purchases are processed securely. We accept various payment methods, including Shopify Payments...</p>
          </div>
  
          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
            <p>We are not responsible for any damages arising from the use of our website...</p>
          </div>
        </section>
  
        <p className="mt-6 text-center">For any questions, please <a href="/contact" className="text-blue-500 dark:text-blue-400 underline">contact us</a>.</p>
      </main>
    );
  }
  
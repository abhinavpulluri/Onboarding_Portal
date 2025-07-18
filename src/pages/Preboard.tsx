import React, { useState } from 'react';

const Preboarding = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    taxForm: '',
    healthDeclaration: '',
    insuranceDetails: '',
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('You must agree to the rules and regulations.');
      return;
    }
    console.log('Preboarding Data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="text-gray-600 body-font py-6">
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="/logo.png" alt="Synchrony Logo" className="mx-auto h-16 w-auto" />
            <span className="ml-3 text-2xl font-semibold text-gray-800"></span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Preboarding Form</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter your username"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter your email"
              />
            </div>

            {/* Tax Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Form Information</label>
              <textarea
                name="taxForm"
                value={formData.taxForm}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter tax form details"
              />
            </div>

            {/* Health Declaration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Declaration</label>
              <textarea
                name="healthDeclaration"
                value={formData.healthDeclaration}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter any health-related declarations"
              />
            </div>

            {/* Insurance Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Paperwork</label>
              <textarea
                name="insuranceDetails"
                value={formData.insuranceDetails}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter insurance details"
              />
            </div>

            {/* Rules & Regulations */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">Synchrony - Rules and Regulations</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Employees must adhere to the company code of conduct at all times.</li>
                <li>Working hours are from 9:00 AM to 6:00 PM, Monday to Friday.</li>
                <li>Leaves must be applied at least 2 days in advance and approved by your manager.</li>
                <li>All company data is confidential and must not be shared without authorization.</li>
                <li>Company systems should be used for official purposes only.</li>
                <li>Violation of rules may result in disciplinary action, including termination.</li>
              </ul>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="agreed" className="text-sm text-gray-700">
                I agree to the above rules and regulations
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-md"
              >
                Submit Preboarding
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-gray-600 body-font mt-12">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src="/logo.png" alt="Synchrony Logo" className="mx-auto h-16 w-auto mb-4" />
            <span className="ml-3 text-xl"></span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2025 Synchrony
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Preboarding;

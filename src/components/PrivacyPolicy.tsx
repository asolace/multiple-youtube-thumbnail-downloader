import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              YouTube Thumbnail Downloader is a client-side web application that helps users extract and download thumbnails from YouTube videos. We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>YouTube URLs that you input into the application</li>
                  <li>No personal information is required or collected</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Basic usage analytics (if enabled by hosting provider)</li>
                  <li>Technical information such as browser type and device information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Process YouTube URLs to extract video IDs and generate thumbnail URLs</li>
              <li>Fetch video titles using YouTube's public oEmbed API</li>
              <li>Enable thumbnail downloads directly to your device</li>
              <li>Improve the application's functionality and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage and Processing</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-800 font-semibold mb-2">Client-Side Processing</p>
              <p className="text-blue-700">
                All data processing happens locally in your browser. We do not store or transmit your YouTube URLs or any personal data to our servers.
              </p>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>YouTube URLs are processed entirely in your browser</li>
              <li>Video titles are fetched directly from YouTube's public API</li>
              <li>Thumbnails are downloaded directly from YouTube's servers to your device</li>
              <li>No data is stored on our servers or databases</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">YouTube</h3>
                <p className="text-gray-700">
                  We use YouTube's public oEmbed API to fetch video titles and YouTube's public thumbnail URLs to display and download thumbnails. This usage is subject to YouTube's Terms of Service and Privacy Policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Hosting Provider</h3>
                <p className="text-gray-700">
                  This application is hosted on Netlify, which may collect basic analytics and technical information as outlined in their privacy policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You can clear all data from the application at any time using the "Clear All" button</li>
              <li>You can stop using the application at any time</li>
              <li>Your browser's local storage can be cleared to remove any temporary data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
            <p className="text-gray-700 leading-relaxed">
              Since all processing happens client-side in your browser, your data never leaves your device except for the necessary API calls to YouTube's public services. We implement security best practices in our code to protect against common web vulnerabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              This application does not knowingly collect any personal information from children under 13. The application is designed to be used by anyone who can access YouTube content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this privacy policy or our data practices, you can contact us through the GitHub repository or hosting platform where this application is deployed.
            </p>
          </section>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
            <p className="text-gray-700">
              This application prioritizes your privacy by processing all data locally in your browser. We don't collect, store, or transmit any personal information to our servers. Your YouTube URLs and usage data remain private and under your control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";

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
              YouTube Thumbnail Downloader is a client-side web application that
              helps users extract and download thumbnails from YouTube videos.
              We are committed to protecting your privacy and being transparent
              about our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Information You Provide
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>YouTube URLs that you input into the application</li>
                  <li>No personal information is required or collected</li>
                  <li>Analyzing trends and site traffic</li>
                  <li>Improving user experience</li>
                  <li>Administering the website</li>
                  <li>Gathering general demographic insights</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    Basic usage analytics (if enabled by hosting provider)
                  </li>
                  <li>
                    Technical information such as browser type and device
                    information
                  </li>
                  <li>Internet Protocol (IP) address</li>
                  <li>Browser type and version</li>
                  <li>Internet Service Provider (ISP)</li>
                  <li>Date and time of visit</li>
                  <li>Referring and exit pages</li>
                  <li>Number of clicks and browsing patterns</li>
                  <li>Screen resolution and device type</li>
                  <li>Geolocation data (if permitted by user)</li>
                  <li>Session duration and engagement metrics</li>
                  <li>Custom user preferences (if applicable) </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Process YouTube URLs to extract video IDs and generate thumbnail
                URLs
              </li>
              <li>Fetch video titles using YouTube's public oEmbed API</li>
              <li>Enable thumbnail downloads directly to your device</li>
              <li>
                Improve the application's functionality and user experience
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies and Web Beacons
            </h2>
            <p className="text-gray-700 mb-4">
              Like most websites, we use cookies to enhance your browsing
              experience. Cookies allow us to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                Process YouTube URLs to extract video IDs and generate thumbnail
                URLs
              </li>
              <li>Fetch video titles using YouTube's public oEmbed API</li>
              <li>Enable thumbnail downloads directly to your device</li>
              <li>
                Improve the application's functionality and user experience
              </li>
              <li>Remember visitor preferences</li>
              <li>Optimize website performance</li>
              <li>
                Customize content based on browser type or other information
              </li>
            </ul>
            <p className="text-gray-700">
              You may choose to disable cookies in your browser settings. For
              more details on managing cookies, visit your browser’s official
              help pages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Google DoubleClick DART Cookie
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We work with Google as a third-party vendor. Google uses DART
              cookies to serve ads based on your visit to our website and other
              websites on the internet.
            </p>

            <p className="text-gray-700">
              You can opt out of DART cookies by visiting Google’s advertising
              privacy page:{" "}
              <a href="https://policies.google.com/technologies/ads">
                https://policies.google.com/technologies/ads
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Storage and Processing
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-800 font-semibold mb-2">
                Client-Side Processing
              </p>
              <p className="text-blue-700">
                All data processing happens locally in your browser. We do not
                store or transmit your YouTube URLs or any personal data to our
                servers.
              </p>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>YouTube URLs are processed entirely in your browser</li>
              <li>
                Video titles are fetched directly from YouTube's public API
              </li>
              <li>
                Thumbnails are downloaded directly from YouTube's servers to
                your device
              </li>
              <li>No data is stored on our servers or databases</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Advertisers
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Our website may display ads or contain links from third-party ad
                networks. These partners may use:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>Cookies</li>
                <li>JavaScript</li>
                <li>Web Beacons</li>
              </ul>
              <p className="text-gray-700">
                These technologies automatically collect your IP address to
                measure the effectiveness of their campaigns and personalize ads
                you see across the internet.
              </p>
              <p className="text-gray-700">
                We have <b>no access to or control</b> over these third-party
                cookies. Please consult their respective Privacy Policies for
                details on their practices and opt-out options.
              </p>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  YouTube
                </h3>
                <p className="text-gray-700">
                  We use YouTube's public oEmbed API to fetch video titles and
                  YouTube's public thumbnail URLs to display and download
                  thumbnails. This usage is subject to YouTube's Terms of
                  Service and Privacy Policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Hosting Provider
                </h3>
                <p className="text-gray-700">
                  This application is hosted on Netlify, which may collect basic
                  analytics and technical information as outlined in their
                  privacy policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights and Choices
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                You can clear all data from the application at any time using
                the "Clear All" button
              </li>
              <li>You can stop using the application at any time</li>
              <li>
                Your browser's local storage can be cleared to remove any
                temporary data
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
            <p className="text-gray-700 leading-relaxed">
              Since all processing happens client-side in your browser, your
              data never leaves your device except for the necessary API calls
              to YouTube's public services. We implement security best practices
              in our code to protect against common web vulnerabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This application does not knowingly collect any personal
              information from children under 13. The application is designed to
              be used by anyone who can access YouTube content. If you believe
              your child has provided such information on our website, please
              contact us immediately. We will promptly remove the data from our
              records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              GDPR Compliance (For EU/EEA Visitors)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you are located in the European Union (EU) or European Economic
              Area (EEA), our processing of personal data complies with the
              General Data Protection Regulation (GDPR). By using our website
              and submitting any personal information, you consent to our data
              practices outlined in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Online-Only Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy applies only to information collected through
              our website and not to information collected offline or via any
              other channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consent</h2>
            <p className="text-gray-700 leading-relaxed">
              By using our website, you consent to our Privacy Policy and agree
              to its Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated "Last updated" date.
              We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this privacy policy or our data
              practices, you can contact us through the GitHub repository or
              hosting platform where this application is deployed.
            </p>
          </section>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Summary
            </h3>
            <p className="text-gray-700">
              This application prioritizes your privacy by processing all data
              locally in your browser. We don't collect, store, or transmit any
              personal information to our servers. Your YouTube URLs and usage
              data remain private and under your control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

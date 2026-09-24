import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Vertex Studio Works, including how we collect, use, and protect information submitted through our website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Vertex Studio Works
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-white/50">
            Last updated: September 24, 2026
          </p>
        </div>

        <div className="space-y-10 text-white/70 leading-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              1. Introduction
            </h2>

            <p>
              Vertex Studio Works respects your privacy. This Privacy Policy
              explains how we collect, use, and protect information when you
              visit our website, contact us, request a project, or use features
              available through our website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              2. Information We Collect
            </h2>

            <p className="mb-4">
              Depending on how you interact with our website, we may collect
              information such as:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Business or company name</li>
              <li>Website information</li>
              <li>Project requirements and messages</li>
              <li>Appointment or booking information</li>
              <li>Website usage and technical information</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              3. How We Use Information
            </h2>

            <p className="mb-4">
              Information submitted through our website may be used to:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to inquiries and project requests</li>
              <li>Schedule and manage appointments</li>
              <li>Communicate about requested services</li>
              <li>Provide and improve our services</li>
              <li>Maintain website security and functionality</li>
              <li>Understand website usage and performance</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              4. Website Analytics
            </h2>

            <p>
              We may use analytics and website measurement technologies to
              understand how visitors use our website, such as which pages are
              visited and how the website performs. These tools help us improve
              the website and user experience.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              5. Information Sharing
            </h2>

            <p>
              We do not sell personal information submitted through our website.
              Information may be processed by service providers that help us
              operate our website, communications, analytics, hosting, and
              business systems.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              6. Data Security
            </h2>

            <p>
              We use reasonable technical and organizational measures designed
              to protect information handled through our website. However, no
              internet transmission or electronic storage system can be
              guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              7. Third-Party Services
            </h2>

            <p>
              Our website may rely on third-party services for hosting,
              authentication, analytics, communications, scheduling, or other
              functionality. Those services may process information according
              to their own privacy policies and terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              8. Your Choices
            </h2>

            <p>
              You may choose not to provide certain information. However, some
              information may be necessary for us to respond to an inquiry,
              schedule an appointment, or provide a requested service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              9. Contact
            </h2>

            <p>
              If you have questions about this Privacy Policy or how information
              is handled, you can contact Vertex Studio Works at:
            </p>

            <p className="mt-4">
              <a
                href="mailto:hello.vertexstudioworks@gmail.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                hello.vertexstudioworks@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
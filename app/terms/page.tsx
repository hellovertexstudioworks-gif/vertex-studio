import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Vertex Studio Works website design, development, e-commerce, and business system services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Vertex Studio Works
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-white/50">
            Last updated: September 24, 2026
          </p>
        </div>

        <div className="space-y-10 text-white/70 leading-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              1. Overview
            </h2>

            <p>
              These Terms of Service govern the use of the Vertex Studio Works
              website and the services provided by Vertex Studio Works.
              By using this website or engaging our services, you agree to
              these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              2. Services
            </h2>

            <p className="mb-4">
              Vertex Studio Works may provide services including:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Website design and development</li>
              <li>E-commerce website development</li>
              <li>Business website solutions</li>
              <li>Custom web applications and business systems</li>
              <li>Search engine optimization and digital growth services</li>
              <li>Website maintenance and care</li>
            </ul>

            <p className="mt-4">
              The specific services, deliverables, timelines, pricing, and
              responsibilities for a project will be agreed upon between
              Vertex Studio Works and the client before work begins.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              3. Project Scope
            </h2>

            <p>
              Project scope is based on the agreed proposal, package, or
              written project agreement. Requests outside the agreed scope
              may require additional time, fees, or a separate agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              4. Client Responsibilities
            </h2>

            <p className="mb-4">
              Clients are responsible for providing accurate information,
              content, credentials, assets, approvals, and other materials
              reasonably required to complete a project.
            </p>

            <p>
              Delays in providing required materials or approvals may affect
              project timelines.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              5. Payments
            </h2>

            <p>
              Project pricing and payment requirements will be communicated
              before work begins. Payment terms may vary depending on the
              project, package, scope, and agreement with the client.
            </p>

            <p className="mt-4">
              Work outside the agreed scope may be subject to additional
              charges after the additional work has been discussed with the
              client.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              6. Website Care and Maintenance
            </h2>

            <p>
              Any complimentary website care or maintenance period offered as
              part of a package applies only to the services and period
              specified in the applicable project agreement.
            </p>

            <p className="mt-4">
              Complimentary care does not automatically include major redesigns,
              new features, third-party service fees, new integrations, or
              substantial changes outside the original project scope.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              7. Third-Party Services
            </h2>

            <p>
              Websites and business systems may use third-party platforms,
              hosting providers, payment processors, analytics services,
              email services, scheduling tools, APIs, or other external
              services.
            </p>

            <p className="mt-4">
              Third-party services may have their own terms, fees,
              availability, limitations, and privacy policies. Vertex Studio
              Works is not responsible for outages or changes caused by
              third-party providers.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              8. Intellectual Property
            </h2>

            <p>
              Ownership and licensing of project materials will depend on the
              applicable project agreement and payment status.
            </p>

            <p className="mt-4">
              Unless otherwise agreed in writing, Vertex Studio Works may
              retain ownership of reusable development methods, internal
              frameworks, templates, components, tools, and general
              know-how used to create a project.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              9. Portfolio Use
            </h2>

            <p>
              Unless a client requests otherwise in writing, Vertex Studio
              Works may display completed work as part of its portfolio,
              including screenshots, descriptions, and links to publicly
              accessible project pages.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              10. Third-Party Content
            </h2>

            <p>
              Clients are responsible for ensuring that content, images,
              logos, text, software, data, and other materials they provide
              to Vertex Studio Works are legally permitted for use.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              11. Limitation of Liability
            </h2>

            <p>
              Vertex Studio Works will make reasonable efforts to deliver
              agreed services professionally and according to the applicable
              project agreement. However, no website, software system,
              hosting environment, or online service can be guaranteed to
              operate without interruption or errors.
            </p>

            <p className="mt-4">
              To the extent permitted by applicable law, Vertex Studio Works
              is not responsible for losses caused by third-party services,
              hosting failures, unauthorized access, internet outages, or
              circumstances outside its reasonable control.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              12. Changes to These Terms
            </h2>

            <p>
              Vertex Studio Works may update these Terms of Service from time
              to time. The updated version will be posted on this page with
              a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              13. Contact
            </h2>

            <p>
              If you have questions about these Terms of Service, contact
              Vertex Studio Works at:
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
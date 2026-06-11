import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/PageTransition";
import { FileText, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — BlackPiston Consultancy" },
      { name: "description", content: "Terms and Conditions governing the use of BlackPiston Consultancy's website and services." },
      { property: "og:title", content: "Terms & Conditions — BlackPiston Consultancy" },
      { property: "og:description", content: "Terms governing our services and your use of our platform." },
    ],
  }),
  component: TermsAndConditions,
});

const lastUpdated = "June 10, 2026";

function TermsAndConditions() {
  return (
    <div className="bg-background pt-32 pb-24">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-radial-gold)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-background">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Legal</div>
                <h1 className="font-display text-5xl md:text-7xl">Terms & Conditions</h1>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <div className="space-y-12">
            <Reveal>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Agreement to Terms</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and BlackPiston Consultancy ("Company", "we", "our", or "us"), governing your access to and use of our website, services, and any related content.
                  </p>
                  <p>
                    By accessing our website or engaging our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website or services.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Our Services</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    BlackPiston Consultancy provides automobile and motorcycle consultancy services, including but not limited to:
                  </p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Vehicle sourcing and procurement assistance</li>
                    <li>Pre-purchase inspection coordination</li>
                    <li>Vehicle valuation and market analysis</li>
                    <li>Buy and sell facilitation for automobiles and motorcycles</li>
                    <li>Private viewings and test drive arrangements</li>
                    <li>Post-purchase support and advisory services</li>
                  </ul>
                  <p>
                    We act as consultants and facilitators. We are not a dealership, financing institution, or insurance provider. All vehicle transactions are conducted between the buyer and seller directly, with our guidance and support.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">User Responsibilities</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>When using our website and services, you agree to:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Provide accurate, current, and complete information when submitting enquiries or engaging with our services.</li>
                    <li>Not use our website for any unlawful purpose or in violation of any applicable laws or regulations.</li>
                    <li>Not attempt to gain unauthorised access to any part of our website, server, or any system connected to our website.</li>
                    <li>Not transmit any viruses, malware, or other harmful code through our website.</li>
                    <li>Not impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
                    <li>Not use automated systems (bots, scrapers) to access our website without our prior written consent.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Vehicle Listings & Information</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    While we make every effort to ensure the accuracy of vehicle listings and information on our website, we do not warrant or guarantee that:
                  </p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>All information presented is complete, accurate, or up-to-date at all times.</li>
                    <li>Vehicles listed are available at the time of your enquiry.</li>
                    <li>Prices, specifications, and features are free from error.</li>
                    <li>Images accurately represent the current condition of any vehicle.</li>
                  </ul>
                  <p>
                    All vehicle details, prices, and availability are subject to change without prior notice. We recommend verifying all details directly with our consultancy team before making any purchasing decisions.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Intellectual Property</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    All content on this website — including but not limited to text, graphics, logos, images, videos, icons, and software — is the property of BlackPiston Consultancy or its content suppliers and is protected by applicable intellectual property laws.
                  </p>
                  <p>You may not, without our express written permission:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Reproduce, distribute, or publicly display any content from our website.</li>
                    <li>Modify, create derivative works from, or reverse-engineer any part of our website.</li>
                    <li>Use our branding, trademarks, or logos for any commercial purpose.</li>
                    <li>Frame or mirror any portion of our website on any other server or internet-based device.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Enquiries & Communications</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    When you submit an enquiry through our website or contact us via email, phone, or WhatsApp:
                  </p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Your information will be used solely to respond to your enquiry and provide relevant services.</li>
                    <li>We aim to respond within 24 hours on business days, though response times may vary.</li>
                    <li>Submitting an enquiry does not constitute a binding agreement or contract for any service.</li>
                    <li>All communications are treated as confidential and handled in accordance with our <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Limitation of Liability</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    To the fullest extent permitted by applicable law, BlackPiston Consultancy shall not be liable for:
                  </p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.</li>
                    <li>Any loss or damage resulting from reliance on information provided on our website.</li>
                    <li>Any interruption, suspension, or termination of our website or services.</li>
                    <li>The condition, quality, or fitness of any vehicle purchased through our facilitation — buyers are responsible for their own due diligence.</li>
                    <li>Any unauthorised access to or alteration of your personal data.</li>
                  </ul>
                  <p>
                    Our total liability for any claim arising from or related to our services shall not exceed the fees paid by you to us for the specific service giving rise to the claim.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Indemnification</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    You agree to indemnify, defend, and hold harmless BlackPiston Consultancy, its directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from:
                  </p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Your use or misuse of our website or services.</li>
                    <li>Your violation of these Terms.</li>
                    <li>Your violation of any applicable laws or regulations.</li>
                    <li>Any content or information you provide to us.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Governing Law & Dispute Resolution</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from or relating to these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Tanjavur, Tamil Nadu, India.
                  </p>
                  <p>
                    Before initiating any formal legal proceedings, both parties agree to attempt to resolve disputes through good-faith negotiation. If a resolution cannot be reached within 30 days, either party may pursue legal remedies.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Modifications to Terms</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    We reserve the right to modify or replace these Terms at any time at our sole discretion. Changes will be effective immediately upon posting to our website. Your continued use of our website after any changes constitutes acceptance of the modified Terms.
                  </p>
                  <p>
                    We encourage you to review these Terms periodically for any updates. Material changes will be highlighted on our website.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Severability</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-8 md:p-10">
                <h2 className="font-display text-3xl">Contact Us</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>If you have any questions about these Terms, please contact us:</p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-medium text-gold">Address:</span>
                      <span>No-6, Melasooriyathotaam, Madukkur, Pattukottai, Tanjavur - 614903</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-medium text-gold">Email:</span>
                      <a href="mailto:blackpistonconsultancy@gmail.com" className="hover:text-gold transition">blackpistonconsultancy@gmail.com</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-medium text-gold">Phone:</span>
                      <a href="tel:+919361081244" className="hover:text-gold transition">+91 93610 81244</a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

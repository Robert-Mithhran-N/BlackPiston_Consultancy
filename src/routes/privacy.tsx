import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/PageTransition";
import { Shield, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BlackPiston Consultancy" },
      { name: "description", content: "Privacy Policy of BlackPiston Consultancy. Learn how we collect, use, and protect your personal information." },
      { property: "og:title", content: "Privacy Policy — BlackPiston Consultancy" },
      { property: "og:description", content: "Your privacy matters to us." },
    ],
  }),
  component: PrivacyPolicy,
});

const lastUpdated = "June 10, 2026";

function PrivacyPolicy() {
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
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Legal</div>
                <h1 className="font-display text-5xl md:text-7xl">Privacy Policy</h1>
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
                <h2 className="font-display text-3xl">Introduction</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    BlackPiston Consultancy ("we", "our", or "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our automobile and motorcycle consultancy services.
                  </p>
                  <p>
                    By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access our website or use our services.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Information We Collect</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p className="font-medium text-foreground">Personal Information</p>
                  <p>When you interact with us — whether through our contact form, by phone, or in person — we may collect:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Postal address</li>
                    <li>Vehicle preferences and interests</li>
                    <li>Messages and correspondence details</li>
                  </ul>

                  <p className="font-medium text-foreground pt-4">Automatically Collected Information</p>
                  <p>When you visit our website, we may automatically collect certain information about your device and usage patterns, including:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address (anonymised)</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">How We Use Your Information</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li><span className="text-foreground font-medium">To provide our services:</span> Responding to your enquiries, facilitating vehicle consultations, and managing appointments.</li>
                    <li><span className="text-foreground font-medium">To communicate with you:</span> Sending updates about vehicles that match your interests, appointment confirmations, and service-related notifications.</li>
                    <li><span className="text-foreground font-medium">To improve our website:</span> Analysing usage patterns to enhance the user experience and functionality of our platform.</li>
                    <li><span className="text-foreground font-medium">To comply with legal obligations:</span> Meeting regulatory requirements and responding to lawful requests from authorities.</li>
                    <li><span className="text-foreground font-medium">To protect our business:</span> Detecting and preventing fraud, unauthorised access, and other potentially harmful activities.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Information Sharing & Disclosure</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>We do <span className="text-foreground font-medium">not</span> sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li><span className="text-foreground font-medium">Service providers:</span> Trusted third-party vendors who assist us in operating our website and conducting our business, bound by confidentiality agreements.</li>
                    <li><span className="text-foreground font-medium">Legal requirements:</span> When required by law, regulation, or legal process.</li>
                    <li><span className="text-foreground font-medium">Business transfers:</span> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                    <li><span className="text-foreground font-medium">With your consent:</span> When you have given explicit consent for a specific purpose.</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Data Security</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                  <p>
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Cookies</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand how you interact with our website.
                  </p>
                  <p className="font-medium text-foreground">Types of cookies we use:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li><span className="text-foreground font-medium">Essential cookies:</span> Necessary for the website to function properly.</li>
                    <li><span className="text-foreground font-medium">Analytics cookies:</span> Help us understand how visitors interact with our website.</li>
                    <li><span className="text-foreground font-medium">Preference cookies:</span> Remember your settings and preferences for a better experience.</li>
                  </ul>
                  <p>
                    You can control or disable cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Your Rights</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="ml-4 list-disc space-y-2 marker:text-gold">
                    <li><span className="text-foreground font-medium">Right to access:</span> Request a copy of the personal data we hold about you.</li>
                    <li><span className="text-foreground font-medium">Right to rectification:</span> Request correction of any inaccurate or incomplete data.</li>
                    <li><span className="text-foreground font-medium">Right to erasure:</span> Request deletion of your personal data, subject to legal retention requirements.</li>
                    <li><span className="text-foreground font-medium">Right to restrict processing:</span> Request that we limit the processing of your data in certain circumstances.</li>
                    <li><span className="text-foreground font-medium">Right to data portability:</span> Request a machine-readable copy of your data.</li>
                    <li><span className="text-foreground font-medium">Right to object:</span> Object to the processing of your data for specific purposes.</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the details provided below.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Third-Party Links</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Children's Privacy</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a child, we will take steps to delete such information promptly.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border/50 bg-card p-8 md:p-10">
                <h2 className="font-display text-3xl">Changes to This Policy</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-8 md:p-10">
                <h2 className="font-display text-3xl">Contact Us</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your data rights, please contact us:</p>
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

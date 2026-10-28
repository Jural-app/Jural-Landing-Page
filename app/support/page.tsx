import type { Metadata } from "next";
import { LegalDoc, List, Section } from "@/components/LegalDoc";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Support | Jural",
  description:
    "Get help with Jural for iPhone, iPad and Mac: contact support, delete your account or get a copy of your data, and report a security issue.",
  path: "/support",
});

const mail = (a: string, subject?: string) => (
  <a href={`mailto:${a}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`}>{a}</a>
);

export default function SupportPage() {
  return (
    <LegalDoc
      eyebrow="Support"
      title="How can we help?"
      intro={
        <p>
          Questions about Jural for iPhone, iPad or Mac, the client portal or your account? Email us and a person on
          the Jural team will reply.
        </p>
      }
    >
      <Section id="contact" title="Contact support">
        <p>
          Email {mail("hello@jural.app", "Support request")}. To help us help you faster, include:
        </p>
        <List
          items={[
            "the email address you sign in with;",
            "which device you're using (iPhone, iPad or Mac) and the app version;",
            "what you were trying to do, and what happened instead; and",
            "a screenshot, if you have one. Please don't send client documents or confidential case details.",
          ]}
        />
      </Section>

      <Section id="account" title="Delete your account or get a copy of your data">
        <p>
          Email {mail("privacy@jural.app", "Privacy request")} from the address on your account and tell us whether
          you want your account deleted or a copy of your data. We&rsquo;ll confirm it&rsquo;s you before acting on the
          request. Individual documents can also be downloaded in the apps at any time.
        </p>
        <p>
          How long we keep data, and what happens after an account is closed, is explained in our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </Section>

      <Section id="security" title="Report a security issue">
        <p>
          If you think you&rsquo;ve found a vulnerability, or that someone has accessed your account without
          permission, email {mail("security@jural.app")}. How we protect your data is described on our{" "}
          <a href="/security">Security</a> page and in our{" "}
          <a href="https://trust.jural.app">Trust Center</a>.
        </p>
      </Section>

      <Section id="status" title="Is Jural down?">
        <p>
          Check <a href="https://status.jural.app">status.jural.app</a> for live service status and any ongoing
          incidents.
        </p>
      </Section>

      <Section id="faq" title="Common questions">
        <div className="space-y-6">
          <div>
            <p className="font-semibold text-[var(--color-ink)]">How do I sign in?</p>
            <p className="mt-1">
              With your Microsoft, Google or Apple account. Jural never sees the password for that account.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-ink)]">I&rsquo;m a law firm&rsquo;s client. Who do I contact?</p>
            <p className="mt-1">
              For questions about your case, intake or a document you were asked to sign, contact your law firm
              directly. Your firm controls your information in Jural, so it&rsquo;s best placed to help.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-ink)]">Does Jural give legal advice?</p>
            <p className="mt-1">
              No. Jural is software for licensed legal professionals. Anything its AI assistant writes is a draft for
              an attorney to review.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-ink)]">Is my data used to train AI?</p>
            <p className="mt-1">
              No. We do not train AI models on customer data. See our <a href="/privacy">Privacy Policy</a> for how AI
              features handle your information.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-ink)]">I lost a device. What should I do?</p>
            <p className="mt-1">
              Revoke its access from your firm&rsquo;s linked devices in the app, then email{" "}
              {mail("security@jural.app")} if you think anyone else has used it.
            </p>
          </div>
        </div>
      </Section>
    </LegalDoc>
  );
}

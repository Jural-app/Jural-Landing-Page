import type { Metadata } from "next";
import { LegalDoc, List, Section, SubHead, Table } from "@/components/LegalDoc";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Jural",
  description:
    "How Jural collects, uses and protects personal information across the Jural apps, the client portal and jural.app.",
  path: "/privacy",
});

/**
 * Written from trust-center/legal/privacy-policy.md, which is itself written
 * only from trust-center/01-FACTS.md. Every sentence that file left as
 * [CONFIRM] was removed rather than guessed. Change a fact here only after it
 * changes in 01-FACTS.md.
 */

const mail = (a: string) => <a href={`mailto:${a}`}>{a}</a>;

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <>
          <p>Last updated: 29 October 2026</p>
          <p className="mt-4">
            This policy explains how Jural (&ldquo;Jural&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses,
            discloses and protects personal information. Jural makes practice-management software for solo attorneys
            and small law firms in the United States.
          </p>
        </>
      }
    >
      <Section title="1. Contact">
        <List
          items={[
            <>Privacy questions and requests: {mail("privacy@jural.app")}</>,
            <>Security matters and vulnerability reports: {mail("security@jural.app")}</>,
            <>Everything else: {mail("hello@jural.app")}</>,
          ]}
        />
      </Section>

      <Section title="2. What this policy covers">
        <p>This policy covers personal information processed through:</p>
        <List
          items={[
            <>
              <strong>Our website</strong>, jural.app, including the demo request form;
            </>,
            <>
              <strong>The Jural apps</strong> for iPhone, iPad and Mac;
            </>,
            <>
              <strong>Our backend service</strong>, api.jural.app, which the apps and the client portal use;
            </>,
            <>
              <strong>The client portal</strong>, portal.jural.app, where a law firm&rsquo;s clients complete
              AI-assisted intake and sign documents; and
            </>,
            <>communications with us, such as emails to our contact addresses.</>,
          ]}
        />
        <p>
          Our status page (status.jural.app) and Trust Center (trust.jural.app) are run with third-party providers
          (Better Stack and Sprinto). Those providers do not receive customer data from the Jural service.
        </p>
      </Section>

      <Section title="3. Our two roles">
        <p>Jural handles personal information in two capacities, depending on whose information it is.</p>
        <Table
          head={["Information", "Jural's role"]}
          rows={[
            [
              "Website visitors, demo requests and messages sent to us",
              "We decide how it is used, under this policy.",
            ],
            [
              "An account holder's own account and sign-in information",
              "We decide how it is used, under this policy.",
            ],
            [
              "Information a law firm puts into Jural about its practice: clients, cases, parties, documents, intake, e-signatures, invoices and similar (\"Firm Data\")",
              "We are the firm's service provider. The law firm decides how it is used.",
            ],
          ]}
        />
        <p>
          <strong>If you are a client of a law firm that uses Jural</strong> (for example, you completed an intake
          questionnaire or signed a document through the client portal), that law firm controls your information.
          Jural processes it only on the firm&rsquo;s behalf. Please send privacy questions and requests to the firm
          first. If you contact us, we will refer your request to the firm or help the firm respond.
        </p>
      </Section>

      <Section title="4. Information we collect">
        <SubHead>4.1 Account and sign-in information</SubHead>
        <p>
          You sign in through our authentication provider, Auth0 (Okta), using a Microsoft, Google or Apple account,
          with multi-factor authentication. We receive and store:
        </p>
        <List
          items={[
            "your name, email address and profile picture, as provided by your sign-in provider;",
            "login metadata, such as sign-in events handled by Auth0; and",
            "your firm membership and role.",
          ]}
        />
        <p>We never receive your Microsoft, Google or Apple password.</p>

        <SubHead>4.2 Firm Data</SubHead>
        <p>When a firm uses Jural, we store and process what the firm enters or generates. This may include:</p>
        <List
          items={[
            "firm, user and membership records;",
            "client records: name, email, phone number, address and notes;",
            "case records: title, description, court, judge, dates and billing terms;",
            "case parties, which may include opposing parties and other third parties;",
            "client intake transcripts, intake uploads and AI-generated summaries;",
            "documents stored in file storage;",
            "e-signature documents, signed PDFs and signing audit trails;",
            "invoices (mirrored from Stripe) and client billing contact details;",
            "the content of emails the service sends; and",
            "meeting details (topic, time and agenda) where a user connects their own Zoom account.",
          ]}
        />
        <p>
          Firm Data can include confidential or privileged information about a firm&rsquo;s clients and matters. We
          process it only to provide the service to the firm.
        </p>

        <SubHead>4.3 Client portal: intake and e-signature</SubHead>
        <List
          items={[
            <>
              <strong>Intake:</strong> we collect the client&rsquo;s answers (the question-and-answer transcript) and
              any documents the client uploads. The transcript and the client&rsquo;s name are processed with AI to
              produce a summary for the firm (see section 6). Uploaded documents are stored for the firm and are not
              sent to our AI provider.
            </>,
            <>
              <strong>E-signature:</strong> we collect the signer&rsquo;s name and email address, their consent to
              sign electronically (under the ESIGN Act and UETA), and an audit trail of signing events, including{" "}
              <strong>IP address, browser and device information, and timestamps</strong>. If the firm turns on
              identity checks, we email the signer a one-time code. The signed copy is filed to the firm&rsquo;s case
              and emailed to the signer.
            </>,
          ]}
        />

        <SubHead>4.4 Demo requests</SubHead>
        <p>
          If you request a demo on jural.app, we collect your first and last name, work email, firm name, firm size
          and any message you add. Your request reaches our team by email through our email provider, Resend. We use
          it to contact you about a demo.
        </p>

        <SubHead>4.5 Device information</SubHead>
        <p>
          So a firm can see and manage which devices have access, we store each linked device&rsquo;s name, platform
          (iPhone or Mac), the public keys used for end-to-end encrypted sync, a registration number used for that
          sync, and when the device was linked, last seen and revoked. We do not store the device model or operating
          system version.
        </p>

        <SubHead>4.6 Technical logs</SubHead>
        <p>
          Our backend writes operational logs. They are not currently retained centrally. Request bodies and
          sign-in headers are never logged. Some logs may currently contain short snippets of case text; we are
          removing these.
        </p>

        <SubHead>4.7 Messages to us</SubHead>
        <p>If you email us, we keep your message and email address so we can reply.</p>
      </Section>

      <Section title="5. How we use personal information">
        <p>We use account information, demo requests, messages and technical logs to:</p>
        <List
          items={[
            "create and secure accounts, sign users in and enforce firm roles;",
            "provide, run, maintain and fix the service;",
            "answer demo requests, questions and support requests;",
            "send service and security notices;",
            "detect and prevent security incidents, fraud and abuse; and",
            "meet legal obligations and enforce our agreements.",
          ]}
        />
        <p>
          We use Firm Data only to provide the service to the firm. We do not use Firm Data for our own marketing.
        </p>
        <p>
          <strong>We do not train AI models on customer data.</strong>
        </p>
      </Section>

      <Section title="6. How AI processing works">
        <p>
          Jural&rsquo;s AI assistant, <strong>Luna</strong>, is powered by an OpenAI model through the OpenAI API.
          AI requests are sent from Jural&rsquo;s servers to OpenAI. Jural does not run generative AI on your device.
        </p>
        <p>
          <strong>Sent to OpenAI when you use AI features:</strong>
        </p>
        <List
          items={[
            "chat messages and voice-note transcripts addressed to the assistant;",
            "relevant case facts and case memory;",
            "up to about 24,000 characters of extracted document text, for summaries;",
            "context needed for drafting; and",
            "for client intake, the question-and-answer transcript and the client's name. Documents uploaded during intake are not sent to OpenAI.",
          ]}
        />
        <p>
          During client intake, the model may use OpenAI&rsquo;s web search tool. Search queries may include text
          from the intake conversation.
        </p>
        <p>
          <strong>Stays on your device:</strong>
        </p>
        <List
          items={[
            "document text extraction and OCR, using Apple's PDFKit and Vision;",
            "search embeddings and the search index; and",
            "voice audio. Transcription runs on the device where supported; otherwise Apple's speech recognition service is used and the audio is sent to Apple for that purpose.",
          ]}
        />
        <p>
          <strong>Retention at OpenAI:</strong> we send AI requests with OpenAI&rsquo;s storage setting turned off.
          Under OpenAI&rsquo;s standard API terms, OpenAI may keep API inputs and outputs for up to 30 days for abuse
          monitoring, and does not use API data to train its models.
        </p>
        <p>
          <strong>Luna conversations</strong> are not stored on Jural&rsquo;s servers. Chat history is kept on your
          devices and synced between them with end-to-end encryption.
        </p>
        <p>
          <strong>You stay in control.</strong> AI output is a draft for an attorney to review and is not legal
          advice. Emails, documents and signature requests go out only when you send them.
        </p>
      </Section>

      <Section title="7. Who we share personal information with">
        <List
          items={[
            <>
              <strong>Service providers</strong> that help us run Jural, under contracts that limit how they use it:
              Microsoft Azure (hosting, database, file storage), Auth0 (sign-in), OpenAI (AI features), Resend
              (email), Stripe (invoicing and payments), Zoom (only if a user connects Zoom) and Apple (app
              distribution and speech recognition fallback). The current list is in our Trust Center at{" "}
              <a href="https://trust.jural.app">trust.jural.app</a>.
            </>,
            <>
              <strong>The people a firm chooses to send things to</strong>, such as a signer receiving a signed
              document or a client receiving an invoice.
            </>,
            <>
              <strong>Payments.</strong> Firms take client payments through Stripe Connect, and the firm is the
              merchant of record. Clients pay on Stripe-hosted pages, so card details go directly to Stripe and never
              reach Jural&rsquo;s servers.
            </>,
            <>
              <strong>Legal and safety.</strong> When we believe in good faith that disclosure is required by law,
              subpoena or court order, or is needed to protect the rights, property or safety of Jural, our customers
              or others.
            </>,
            <>
              <strong>Business transfers</strong>, such as a merger, acquisition or sale of assets, subject to this
              policy.
            </>,
            <>
              <strong>With consent</strong>, or at the direction of the firm or the individual.
            </>,
          ]}
        />
        <SubHead>What we don&rsquo;t do</SubHead>
        <List
          items={[
            "We do not sell personal information or share it for cross-context behavioral advertising.",
            "We do not train AI models on customer data.",
            "The Jural apps contain no third-party analytics or crash-reporting tools.",
            "jural.app has no analytics, advertising pixels or tracking scripts, and sets no cookies.",
            "No customer-support tool gives our staff access to customer data.",
          ]}
        />
      </Section>

      <Section title="8. How long we keep information">
        <Table
          head={["Information", "How long"]}
          rows={[
            ["Firm Data, active account", "As long as the firm keeps its account, or until the firm deletes it."],
            [
              "Firm Data after cancellation",
              "Deleted within 30 days of cancellation. Copies in database backups expire within the 7-day backup window after that. Records of emails the service sent are not yet deleted on cancellation; we are adding this.",
            ],
            ["Database backups", "7 days."],
            [
              "Signed PDFs and e-signature audit trails",
              "For the life of the firm's account, as the firm's business record, then deleted with other Firm Data.",
            ],
            ["Intake transcripts", "Kept as part of the case record."],
            ["Intake uploads", "Kept with the firm's data until deleted with other Firm Data."],
            ["AI requests at OpenAI", "Sent with storage off; OpenAI may keep them up to 30 days for abuse monitoring."],
            ["End-to-end encrypted sync messages", "Deleted from our relay once delivered."],
            ["End-to-end encrypted sync attachments", "Deleted once all devices receive them, and after 30 days at most."],
            ["Technical logs", "Not currently retained centrally."],
            ["Account information", "For the life of the account."],
          ]}
        />
        <p>We may keep information longer where the law requires it, or to resolve disputes.</p>
      </Section>

      <Section title="9. Security">
        <List
          items={[
            "Hosting in the United States on Microsoft Azure (Central US).",
            "Encryption in transit with TLS 1.2 or higher on our API, website and portal.",
            "Encryption at rest (AES-256) for our database and file storage.",
            "End-to-end encryption for device sync and case chat, using the Signal protocol. Our relay stores only public keys and encrypted content it cannot read.",
            "Each firm's records are isolated from every other firm's, and access is checked on every request.",
            "Sign-in through Auth0 with multi-factor authentication.",
            "Production access limited to authorized personnel, with multi-factor authentication on all company accounts.",
            "On iPhone, an app lock with a PIN and Face ID or Touch ID.",
          ]}
        />
        <p>
          <strong>What our servers can read.</strong> End-to-end encryption covers device sync and case chat only, not
          the whole product. Jural&rsquo;s servers can read the Firm Data stored on our backend: client and case
          records, case parties, intake transcripts and uploads, AI summaries, stored documents, e-signature documents
          and audit trails, invoices, emails the service sends, and AI requests while they are processed. That data is
          protected by encryption in transit and at rest, firm isolation and access controls.
        </p>
        <p>
          No system is perfectly secure. More detail is in our Trust Center at{" "}
          <a href="https://trust.jural.app">trust.jural.app</a>. If we confirm a personal data breach affecting
          customer data, we will tell affected customers without undue delay, and within 72 hours of confirming it.
        </p>
      </Section>

      <Section title="10. Your privacy rights">
        <p>
          Depending on where you live (for example, California), you may have the right to:
        </p>
        <List
          items={[
            "know what personal information we hold about you and get a copy;",
            "ask us to delete it, subject to legal exceptions;",
            "ask us to correct inaccurate information; and",
            "not be treated differently for using these rights.",
          ]}
        />
        <p>
          We do not sell personal information or share it for advertising, so there is nothing to opt out of.
        </p>
        <p>
          <strong>To make a request</strong>, email {mail("privacy@jural.app")} with the subject &ldquo;Privacy
          request&rdquo;. We will confirm your identity, usually by checking you control the email address on the
          account, and reply within the time the law requires. You may use an authorized agent; we may ask for proof
          of their authority.
        </p>
        <p>
          <strong>Deleting your account or getting a copy of your data:</strong> email {mail("privacy@jural.app")}{" "}
          from the address on your account. Individual documents can also be downloaded in the apps.
        </p>
        <p>
          If your request is about information a law firm holds about you in Jural (for example, as its client, an
          opposing party or a signer), we will pass it to the firm or help the firm respond.
        </p>
      </Section>

      <Section title="11. Children">
        <p>
          Jural is a professional tool for law firms and is not directed at children. We do not knowingly
          collect personal information from children. A firm&rsquo;s matters may involve information about minors;
          that is Firm Data, which we process only for the firm. If you believe a child has given us personal
          information directly, email {mail("privacy@jural.app")} and we will delete it.
        </p>
      </Section>

      <Section title="12. Users outside the United States">
        <p>
          Jural is designed for US law firms. Customer data is hosted in the United States, and our service providers
          may process it in the United States. If you use Jural from outside the United States, your information will
          be transferred to and processed in the United States.
        </p>
      </Section>

      <Section title="13. Changes to this policy">
        <p>
          We may update this policy. When we do, we will change the date at the top. If a change is significant, we
          will give reasonable notice, for example by email or in the apps, before it takes effect.
        </p>
      </Section>

      <Section title="14. Contact us">
        <List
          items={[
            <>Privacy: {mail("privacy@jural.app")}</>,
            <>Security: {mail("security@jural.app")}</>,
            <>General: {mail("hello@jural.app")}</>,
          ]}
        />
      </Section>
    </LegalDoc>
  );
}

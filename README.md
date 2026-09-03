# SafeReport — Privacy-Preserving Harassment Reporting Platform

SafeReport is a secure, trauma-informed harassment reporting platform built to safeguard survivors while giving institutional review committees (Internal Complaints Committees - ICC) structured, actionable visibility into incident dossiers and recurring behavioral patterns.

---

## Required Environment Variables

Configure the following variables in your server environment (or `.env` file):

```env
MONGODB_CONNECTION_STRING=
JWT_SECRET=
RESEND_API_KEY=
```

### Environment Variable Details

- **`MONGODB_CONNECTION_STRING`**: The complete MongoDB connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/SafeReport?retryWrites=true&w=majority`). The database name can be part of the URI path; if omitted, SafeReport automatically defaults to the `SafeReport` database.
- **`JWT_SECRET`**: A cryptographically random secret string used by the server to sign and verify survivor verification sessions and ICC officer JWT authentication tokens.
- **`RESEND_API_KEY`**: Your official Resend API key (from [resend.com](https://resend.com)). This key is kept strictly server-side and is used exclusively for dispatching 6-digit email OTPs from `SafeReport <onboarding@resend.dev>`.

---

## Demo ICC Portal Credentials

For evaluators, audit reviewers, and hackathon judges, a dedicated demo ICC Presiding Officer account is provisioned for Crestview Institute of Technology:

```
## Demo ICC Portal Credentials
Email: testmail@shield.com
Password: 123

DEMO ONLY — NOT FOR PRODUCTION
```

*Note: For the demo environment, ICC authentication requires only email and password. No 2FA/OTP is dispatched for the ICC demo login.*

---

## Architecture & Security Model

1. **Trauma-Informed Survivor Reporting**:
   - Three statutory privacy modes:
     - **Anonymous**: Zero identifying survivor tokens or contact information exposed to reviewers; communication is routed via cryptographically unlinked case mailboxes.
     - **Confidential**: Identifying details are sealed in an encrypted vault accessible only to the authorized ICC Presiding Officer.
     - **Identified**: Standard formal grievance filing with identified parties.
   - **Real Resend Email Verification**:
     - Cryptographically random 6-digit numeric OTP.
     - Only a SHA-256 hash is persisted in MongoDB with a 10-minute expiration.
     - Maximum 5 verification attempts; OTP is burnt upon successful verification (single-use).
     - Verified session token (`sr_sess_...`) is required at the server level to submit any report.
     - Email verification confirms mailbox control to discourage automated spam—it makes no claim regarding gender or personal identity authenticity.

2. **Statutory Institutional Isolation**:
   - Case dossiers are strictly scoped to the authenticated officer's institution (e.g. `cres_001` for Crestview Institute of Technology).
   - Cross-institutional access attempts return `HTTP 403 Forbidden` enforced server-side.
   - Unauthenticated requests return `HTTP 401 Unauthorized`.

3. **Secure Evidence Custody**:
   - Evidence files (images, audio recordings, documents, PDFs) are validated server-side by MIME type, extension, and file size (max 25MB).
   - Filenames are sanitized against directory traversal attacks.
   - SHA-256 integrity hashes are computed and stored in MongoDB.
   - Files are stored privately and can only be downloaded through authenticated, institution-authorized ICC endpoints (`/api/icc/cases/:caseNumber/evidence/:evidenceId/download`). No public URLs exist.

---

## End-to-End Evaluation Workflow

Follow these steps to test the complete end-to-end workflow:

1. **Start the Application**:
   - Ensure `MONGODB_CONNECTION_STRING`, `JWT_SECRET`, and `RESEND_API_KEY` are provided.
   - The server boots on port 3000 with unified API and client routing.

2. **Submit a Report as a Survivor**:
   - Open the application in **Survivor Mode**.
   - Select an incident type, date, location, and description.
   - Choose a privacy mode (e.g., **Anonymous** or **Confidential**).
   - Enter your email address to receive a real verification code.
   - Receive the real 6-digit OTP in your inbox via Resend.
   - Enter the OTP to generate a verified server-side submission session.
   - (Optional) Upload evidence files (screenshot, audio note, or document).
   - Submit the report.
   - Observe the calm, dignified success screen displaying your case number (e.g., `CR-2026-XXXX`) and private recovery passkey.

3. **Log Into the ICC Demo Portal**:
   - Switch to the **ICC Portal** tab or visit the review portal.
   - Enter the evaluator demo credentials:
     - **Email**: `testmail@shield.com`
     - **Password**: `123`
   - Click **Log In to ICC Portal**.
   - You are immediately authenticated into the Crestview Institute of Technology ICC dashboard without an OTP prompt.

4. **Review the Case Dossier**:
   - Locate the newly submitted report in the case list.
   - Inspect the dossier: confirm the privacy mode is honored (no identifying tokens in Anonymous mode).
   - Verify that any attached evidence can be securely downloaded and inspected.
   - Update case status, record investigative notes, or trigger safety check-ins.

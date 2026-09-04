# Silent Shield

Silent Shield is a privacy-first harassment and incident reporting platform designed to make reporting safer, simpler, and more actionable.

It allows survivors to submit reports without creating an account or going through email/OTP verification, while authorized Institutional Committee (ICC) officers can securely review reports, evidence, and case information.

---

## Overview

Harassment and misconduct often go unreported because survivors may fear exposure, complicated reporting procedures, or lack of confidence in how their information will be handled.

Silent Shield provides a structured digital reporting system where:

- Survivors can submit reports without creating an account.
- Reports are securely stored in MongoDB.
- Survivors receive a case/reference number after submission.
- Authorized ICC officers can review and manage submitted cases.
- Uploaded evidence can be securely viewed and downloaded by authorized officers.
- Privacy modes allow survivors to control how their identity is presented.
- Case tracking allows users to check the status of a report.

---

## Key Features

### Anonymous & Privacy-Aware Reporting

Survivors can submit reports without creating an account or verifying their email address.

Silent Shield supports privacy-focused reporting modes so that a survivor can choose how their identity is handled.

The reporter's email/contact information can be stored with the report and is accessible to authorized ICC officers when required for case handling.

---

### Structured Incident Reporting

Reports can contain structured information about an incident, including relevant details and supporting information.

Each submitted report receives a unique case/reference number that can be used for tracking.

---

### Secure Evidence Uploads

Survivors can attach supporting evidence to their reports.

Evidence is:

- Stored on the server
- Associated with the corresponding case
- Protected behind ICC authentication
- Restricted according to institutional access
- Available for authorized ICC officers to view and download

Evidence is not exposed through a public URL.

---

### ICC Portal

Authorized ICC officers have access to a protected dashboard where they can:

- View submitted cases
- Review incident details
- Check reporter information available to them
- Review privacy settings
- View uploaded evidence
- Download evidence
- Track case status

ICC access is authenticated and restricted to the appropriate institution.

---

### Institution Isolation

Reports and evidence are associated with institutions.

ICC officers can only access cases belonging to their authorized institution, preventing cross-institution access.

---

### Case Tracking

Survivors can use their case/reference number to check the status of a submitted report without needing a survivor account.

---

### Persistent Database Storage

Silent Shield uses MongoDB for persistent application data.

Reports remain available after:

- Page refreshes
- Server restarts
- New browser sessions

The database is the source of truth for persisted reports.

---

### Quick Exit

Silent Shield includes a browser-based Quick Exit feature.

Pressing **Esc** triggers a redirect to:

`https://weather.com/`

The application attempts to open the destination in a new tab/window and falls back to the current tab if necessary.

This feature is intentionally placed as a secondary convenience feature rather than a core reporting feature.

---

## How It Works

### 1. Submit a Report

A survivor opens Silent Shield and completes the reporting flow.

No survivor account or email verification is required.

### 2. Select Privacy Preferences

The survivor selects the appropriate privacy mode for their report.

### 3. Provide Contact Information

A survivor can provide contact information such as an email address for communication and case handling.

### 4. Upload Evidence

Supporting files can be attached when necessary.

### 5. Submit

The report is stored in MongoDB and assigned a case/reference number.

### 6. ICC Review

Authorized ICC officers can log into the ICC Portal and review cases belonging to their institution.

### 7. Evidence Review

Authorized officers can securely view or download evidence associated with a case.

---

## Privacy & Security

Silent Shield is designed around the principle of minimizing unnecessary exposure of survivor information.

Important security considerations include:

- No survivor login is required for reporting.
- No OTP or email ownership verification is used.
- ICC authentication is separate from public reporting.
- ICC endpoints require authenticated sessions.
- Institution-level access restrictions are enforced.
- Evidence access is protected by authentication and authorization.
- Reports are persisted in MongoDB rather than relying on browser-only state.
- Sensitive configuration values are supplied through environment variables rather than committed to the repository.

> Silent Shield is a hackathon/project implementation and should undergo additional security, privacy, legal, and infrastructure review before being used for real-world sensitive reporting.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion

### Backend

- Node.js
- Express
- TypeScript
- Mongoose

### Database

- MongoDB

### AI

- Google Gemini / Google GenAI services where configured by the application

### Deployment

- Render or another Node.js-compatible hosting platform

---

## Project Structure

```text
.
├── src/
│   ├── components/
│   │   └── report/
│   │       └── ReportWizard.tsx
│   ├── lib/
│   │   └── api.ts
│   └── server/
│       ├── auth.ts
│       ├── db/
│       │   └── models/
│       ├── evidenceStorage.ts
│       └── store.ts
│
├── server.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md

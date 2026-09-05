# 🛤️ TrackGuard DHR

**An offline-first track inspection and hazard reporting system for the Darjeeling Himalayan Railway.**

TrackGuard DHR is a Progressive Web App designed for permanent-way staff to record track hazards while working along the railway alignment, including areas with unreliable or unavailable network connectivity.

Capture a photo, record the location, receive an on-device AI suggestion, review the information, and save the report locally. Reports can be synchronized when connectivity becomes available.

---

## What is TrackGuard DHR?

TrackGuard DHR digitizes the field inspection workflow while keeping it **offline-first and human-controlled**.

The system supports reporting hazards such as:

* Slips / landslides
* Rockfalls
* Blocked drains
* Damaged retaining walls
* Track defects
* Vegetation overgrowth
* Other observed hazards

### Core Workflow

```text
📷 Capture Photo
      ↓
📍 Capture GPS Location
      ↓
🤖 On-device AI Analysis
      ↓
👷 Review & Confirm
      ↓
💾 Save Offline
      ↓
☁️ Synchronize When Online
```

---

## Key Features

* **Offline-first PWA** — the core reporting workflow does not depend on network connectivity.
* **Photo & GPS capture** — every report can include visual evidence and location data.
* **On-device AI** — Gemma 4 E2B provides local hazard and severity suggestions through WebGPU.
* **Human-in-the-loop review** — AI suggestions can be edited or rejected before a report is saved.
* **IndexedDB persistence** — reports and captured media remain available on the device while offline.
* **Synchronization queue** — pending reports can be synchronized once connectivity returns.
* **Inspection dashboard** — view reports by railway section and inspection status.

---

## AI-Assisted, Not AI-Driven

TrackGuard DHR uses AI as an **inspection assistant**, not as an autonomous decision-maker.

The on-device model can suggest:

* Hazard type
* Severity
* An observational note

The field worker reviews and confirms the final values before submission.

The system does **not** make operational decisions such as closing a track, stopping traffic, or declaring a structure unsafe.

---

## Demo & Offline Proof
### 🎥 Demo Video

<a href="https://youtu.be/uKGf_rdW5oM">
  <img src="https://img.youtube.com/vi/uKGf_rdW5oM/maxresdefault.jpg" alt="TrackGuard DHR Demo — Click to Watch">
</a>

*▶️ Click the thumbnail to watch the full demo on YouTube.*
### 📱 Offline Workflow

The screen recording demonstrates the reporting workflow while the device is in **airplane mode**, proving that a report can still be captured, analyzed, reviewed, and stored without network connectivity.



https://github.com/user-attachments/assets/462966d0-dd0c-4217-a00d-eb7b00295e19



---

## Architecture

```text
                         TrackGuard DHR
                              │
                ┌─────────────┴─────────────┐
                │                           │
          Field Device                 Server
                │                           │
       ┌────────┴────────┐             Next.js API
       │                 │                   │
    Camera             GPS                  │
       │                 │                   │
       └────────┬────────┘                   │
                │                            │
          Gemma 4 E2B                        │
          + WebGPU                           │
                │                            │
                ▼                            │
            IndexedDB ◄──── Sync ────────────┘
                │
                ▼
          Inspection Queue
                │
                ▼
            Dashboard
```

---

## Technology Stack

| Layer         | Technology                 |
| ------------- | -------------------------- |
| Frontend      | Next.js, React, TypeScript |
| UI            | Tailwind CSS, shadcn/ui    |
| PWA           | Serwist                    |
| Local Storage | IndexedDB (`idb`)          |
| AI Model      | Gemma 4 E2B                |
| AI Runtime    | LiteRT-LM + WebGPU         |
| Camera        | `getUserMedia`             |
| Location      | Geolocation API            |
| Backend       | Next.js API Routes         |
| Deployment    | Vercel                     |

---

## Offline-First Design

The application is designed so that network availability is **not a prerequisite for field reporting**.

```text
              ┌──────────────────────┐
              │     Field Report     │
              └──────────┬───────────┘
                         │
                         ▼
                  Save to IndexedDB
                         │
                  ┌──────┴──────┐
                  │             │
               Offline        Online
                  │             │
                  ▼             ▼
             Pending Queue    Sync
                  │             │
                  └──────┬──────┘
                         ▼
                    Server API
```

Reports remain locally available until synchronization succeeds.

---

## Getting Started

### Prerequisites

* Node.js 20+
* A modern browser
* WebGPU support for on-device AI

### Installation

```bash
git clone https://github.com/ShahbazCoder1/TrackGuard-DHR.git
cd TrackGuard-DHR

npm install
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

---

## Testing Offline Mode

To verify the offline workflow:

1. Open the application.
2. Enable **airplane mode** or disable network connectivity.
3. Create a new report.
4. Capture a photograph and GPS location.
5. Run the on-device AI analysis.
6. Review and confirm the report.
7. Save the report.
8. Verify that it appears in the offline queue.
9. Restore connectivity and synchronize the report.

---

## Project Structure

```text
src/
├── app/
│   ├── api/reports/        # Report API
│   ├── dashboard/          # Inspection dashboard
│   └── queue/              # Offline report queue
│
├── components/             # Shared UI components
│
└── lib/
    ├── storage.ts          # IndexedDB persistence
    ├── sync.ts             # Report synchronization
    ├── llm.ts              # On-device AI
    ├── geo.ts              # GPS handling
    └── types.ts            # Shared data contracts

public/
└── sw.ts                   # Service worker
```

---

## Design Principles

### Offline by Default

Field reporting continues even when connectivity is unavailable.

### Human Verification

AI provides suggestions; the field worker makes the final determination.

### Evidence-Based Reporting

Reports combine photographs, location information, hazard classification, and inspection status.

### Simple Field Workflow

The interface minimizes unnecessary steps so reports can be created quickly in the field.

---

## Project Status

**Status:** Active development

TrackGuard DHR is built as a prototype demonstrating an offline-first digital workflow for railway track inspection, combining local AI assistance, field evidence, and deferred synchronization.

---

**Built for safer, more reliable field inspection. 🛤️**

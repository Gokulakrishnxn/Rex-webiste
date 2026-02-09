# Rex - Hospital Management System

Rex is a modern, premium hospital management dashboard designed to streamline healthcare operations. It features a comprehensive interface for managing patients, schedules, and medical reports with a focus on user experience and visual aesthetics.

## Features

### 🏥 Dashboard Overview
- **Real-time Stats**: Quick view of total patients, appointments, and critical cases.
- **Recent Activity**: Activity feed of hospital operations.
- **Patient Queue**: Live view of current waiting list.

### 👥 Patient Management
- **Patient List**: Searchable and filterable list of all patients.
- **Patient Profiles**: Detailed view including:
  - Demographics & Contact Info
  - Vital Statistics
  - Medical History timeline
  - Prescriptions & Reports
- **Add Patient**: Quick intake flow with QR code scanning (simulated) and manual ID entry.

### 📑 Medical Reports
- **Report Management**: Centralized hub for lab results, imaging, and consultation notes.
- **Patient Filtering**: Smart filtering to view reports for specific patients.
- **Upload System**: Drag-and-drop interface for adding new reports (PDF, Images).
- **Status Tracking**: Visual indicators for Ready, Processing, and Flagged reports.

### 📅 Schedule & Appointments
- **Calendar View**: Interactive calendar for tracking appointments.
- **Upcoming List**: Daily agenda view for doctors and staff.

### 🔐 Security & Access
- **Hospital Branding**: Dynamic customization based on hospital name.
- **Secure Access**: Foundation for role-based access control.

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks & Context

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gokulakrishnxn/Rex-webiste.git
   cd Rex-webiste
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## Project Structure

```
src/
├── app/
│   ├── (website)/      # Marketing/Landing page routes
│   ├── dashboard/      # Protected dashboard routes
│   │   ├── patients/   # Patient management
│   │   ├── reports/    # Medical reports
│   │   └── schedule/   # Calendar & appointments
│   └── layout.tsx      # Root layout
├── components/
│   ├── dashboard/      # Dashboard-specific components (Sidebar, Stats, Modals)
│   └── ui/             # Reusable UI components (Shadcn)
└── lib/                # Utilities and helper functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

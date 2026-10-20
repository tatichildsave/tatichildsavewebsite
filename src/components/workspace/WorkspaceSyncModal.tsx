import React from "react";
import { ShieldCheck } from "lucide-react";
export const WorkspaceSyncModal = () => (
  <section className="home-container enrol-section">
    <ShieldCheck size={40} />
    <h1>Workspace integration</h1>
    <p className="enrol-intro">
      This developer preview does not connect to a live administration
      workspace. Configure server-side authentication and authorization before
      enabling registration management, Google Sheets or email delivery.
    </p>
  </section>
);

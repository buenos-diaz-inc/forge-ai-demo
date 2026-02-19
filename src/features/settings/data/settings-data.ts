import type { TeamMember, ApiKey } from "@/data/types";

export const teamMembers: TeamMember[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-03-15" },
  { id: "u2", name: "Marcus Johnson", email: "marcus@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-01-10" },
  { id: "u3", name: "Elena Rodriguez", email: "elena@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-06-20" },
  { id: "u4", name: "Alex Kim", email: "alex@forge.ai", role: "Admin", status: "Active", joinedAt: "2024-11-01" },
  { id: "u5", name: "Priya Patel", email: "priya@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-08-05" },
  { id: "u6", name: "James Wright", email: "james@forge.ai", role: "Viewer", status: "Invited", joinedAt: "2026-02-18" },
  { id: "u7", name: "Lisa Park", email: "lisa@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-11-01" },
  { id: "u8", name: "David Kumar", email: "david@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-05-20" },
];

export const apiKeys: ApiKey[] = [
  { id: "k1", name: "Production API", prefix: "sk-prod-...a3f7", createdAt: "2025-06-15", lastUsed: "2026-02-19", status: "Active" },
  { id: "k2", name: "Staging API", prefix: "sk-stag-...b2e1", createdAt: "2025-09-01", lastUsed: "2026-02-18", status: "Active" },
  { id: "k3", name: "CI/CD Pipeline", prefix: "sk-cicd-...c9d4", createdAt: "2025-11-20", lastUsed: "2026-02-19", status: "Active" },
  { id: "k4", name: "Development (old)", prefix: "sk-dev-...d1f8", createdAt: "2025-03-01", lastUsed: "2025-12-01", status: "Revoked" },
  { id: "k5", name: "Mobile App", prefix: "sk-mob-...e5g2", createdAt: "2026-01-10", lastUsed: "2026-02-17", status: "Active" },
];

export const billingData = [
  { month: "Sep", hours: 1200 },
  { month: "Oct", hours: 1850 },
  { month: "Nov", hours: 2100 },
  { month: "Dec", hours: 1900 },
  { month: "Jan", hours: 2400 },
  { month: "Feb", hours: 2847 },
];

export const notificationPrefs = [
  { category: "Deployments", description: "Deployment status changes and alerts", email: true, inApp: true },
  { category: "Training", description: "Experiment completion and failure alerts", email: true, inApp: true },
  { category: "Team", description: "New members, role changes", email: false, inApp: true },
  { category: "Security", description: "API key usage, login alerts", email: true, inApp: true },
  { category: "Billing", description: "Usage thresholds, invoices", email: true, inApp: false },
];

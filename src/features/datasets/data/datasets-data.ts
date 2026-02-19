import type { Dataset, TeamMember } from "@/data/types";

const users: TeamMember[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-03-15" },
  { id: "u2", name: "Marcus Johnson", email: "marcus@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-01-10" },
  { id: "u3", name: "Elena Rodriguez", email: "elena@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-06-20" },
  { id: "u4", name: "Alex Kim", email: "alex@forge.ai", role: "Admin", status: "Active", joinedAt: "2024-11-01" },
  { id: "u5", name: "Priya Patel", email: "priya@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-08-05" },
];

export const datasets: Dataset[] = [
  { id: "d1", name: "Customer Reviews v3", type: "Text", records: 2400000, size: "3.2 GB", version: "3.0", status: "Ready", columns: 8, author: users[2], createdAt: "2026-02-19T07:20:00Z", updatedAt: "2026-02-19T07:20:00Z" },
  { id: "d2", name: "Product Images HD", type: "Image", records: 850000, size: "45 GB", version: "2.1", status: "Ready", author: users[0], createdAt: "2025-12-10T10:00:00Z", updatedAt: "2026-02-15T09:30:00Z" },
  { id: "d3", name: "Sales Transactions", type: "Tabular", records: 12500000, size: "8.7 GB", version: "5.0", status: "Ready", columns: 24, author: users[3], createdAt: "2025-06-01T08:00:00Z", updatedAt: "2026-02-18T14:00:00Z" },
  { id: "d4", name: "Support Tickets", type: "Text", records: 1800000, size: "2.1 GB", version: "2.0", status: "Ready", columns: 12, author: users[4], createdAt: "2025-09-15T11:00:00Z", updatedAt: "2026-02-14T16:45:00Z" },
  { id: "d5", name: "Satellite Imagery", type: "Image", records: 320000, size: "120 GB", version: "1.0", status: "Processing", author: users[2], createdAt: "2026-02-17T08:00:00Z", updatedAt: "2026-02-19T06:00:00Z" },
  { id: "d6", name: "Audio Transcripts", type: "Audio", records: 450000, size: "28 GB", version: "1.2", status: "Ready", columns: 6, author: users[1], createdAt: "2025-10-20T09:00:00Z", updatedAt: "2026-02-10T12:00:00Z" },
  { id: "d7", name: "Financial Reports", type: "Tabular", records: 5600000, size: "4.3 GB", version: "3.1", status: "Ready", columns: 32, author: users[3], createdAt: "2025-08-05T14:00:00Z", updatedAt: "2026-02-12T10:15:00Z" },
  { id: "d8", name: "Medical Images", type: "Image", records: 180000, size: "62 GB", version: "1.1", status: "Ready", author: users[4], createdAt: "2025-11-30T10:00:00Z", updatedAt: "2026-02-08T08:30:00Z" },
  { id: "d9", name: "Chat Logs", type: "Text", records: 8900000, size: "5.6 GB", version: "4.0", status: "Ready", columns: 10, author: users[0], createdAt: "2025-07-15T12:00:00Z", updatedAt: "2026-02-16T11:00:00Z" },
  { id: "d10", name: "Sensor Readings", type: "Tabular", records: 45000000, size: "15 GB", version: "2.0", status: "Error", columns: 16, author: users[1], createdAt: "2026-01-05T09:00:00Z", updatedAt: "2026-02-19T04:00:00Z" },
  { id: "d11", name: "Podcast Episodes", type: "Audio", records: 85000, size: "340 GB", version: "1.0", status: "Processing", author: users[2], createdAt: "2026-02-15T08:00:00Z", updatedAt: "2026-02-19T05:00:00Z" },
  { id: "d12", name: "User Clickstream", type: "Tabular", records: 98000000, size: "22 GB", version: "6.0", status: "Ready", columns: 20, author: users[3], createdAt: "2025-04-20T10:00:00Z", updatedAt: "2026-02-17T13:30:00Z" },
];

export function getDataset(id: string): Dataset | undefined {
  return datasets.find((d) => d.id === id);
}

export const datasetTypeDistribution = [
  { id: "Tabular", label: "Tabular", value: 4 },
  { id: "Text", label: "Text", value: 3 },
  { id: "Image", label: "Image", value: 3 },
  { id: "Audio", label: "Audio", value: 2 },
];

export const datasetSampleData = [
  { id: 1, text: "Great product, fast shipping!", sentiment: "positive", score: 0.94, category: "electronics", date: "2026-01-15" },
  { id: 2, text: "Terrible customer service", sentiment: "negative", score: 0.12, category: "services", date: "2026-01-16" },
  { id: 3, text: "Average quality, nothing special", sentiment: "neutral", score: 0.51, category: "clothing", date: "2026-01-17" },
  { id: 4, text: "Best purchase I've made this year!", sentiment: "positive", score: 0.97, category: "electronics", date: "2026-01-18" },
  { id: 5, text: "Product broke after one week", sentiment: "negative", score: 0.08, category: "home", date: "2026-01-19" },
];

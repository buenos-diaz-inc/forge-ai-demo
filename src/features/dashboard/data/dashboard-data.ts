import type { ActivityEvent, MetricSeries, TeamMember } from "@/data/types";

const users: TeamMember[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-03-15" },
  { id: "u2", name: "Marcus Johnson", email: "marcus@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-01-10" },
  { id: "u3", name: "Elena Rodriguez", email: "elena@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-06-20" },
  { id: "u4", name: "Alex Kim", email: "alex@forge.ai", role: "Admin", status: "Active", joinedAt: "2024-11-01" },
  { id: "u5", name: "Priya Patel", email: "priya@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-08-05" },
];

export const dashboardStats = {
  totalModels: { value: 24, change: 12.5, changeLabel: "vs last month" },
  activeExperiments: { value: 8, change: 33.3, changeLabel: "vs last week" },
  deployments: { value: 16, change: -6.2, changeLabel: "vs last month" },
  gpuHours: { value: "2,847", change: 18.7, changeLabel: "vs last month" },
};

export const trainingTrendsData: MetricSeries[] = [
  {
    id: "Completed",
    data: [
      { x: "Week 1", y: 12 },
      { x: "Week 2", y: 15 },
      { x: "Week 3", y: 11 },
      { x: "Week 4", y: 18 },
      { x: "Week 5", y: 22 },
      { x: "Week 6", y: 19 },
      { x: "Week 7", y: 24 },
      { x: "Week 8", y: 28 },
      { x: "Week 9", y: 25 },
      { x: "Week 10", y: 31 },
      { x: "Week 11", y: 27 },
      { x: "Week 12", y: 34 },
    ],
  },
  {
    id: "Running",
    data: [
      { x: "Week 1", y: 4 },
      { x: "Week 2", y: 6 },
      { x: "Week 3", y: 5 },
      { x: "Week 4", y: 7 },
      { x: "Week 5", y: 8 },
      { x: "Week 6", y: 6 },
      { x: "Week 7", y: 9 },
      { x: "Week 8", y: 8 },
      { x: "Week 9", y: 10 },
      { x: "Week 10", y: 7 },
      { x: "Week 11", y: 11 },
      { x: "Week 12", y: 8 },
    ],
  },
  {
    id: "Failed",
    data: [
      { x: "Week 1", y: 2 },
      { x: "Week 2", y: 1 },
      { x: "Week 3", y: 3 },
      { x: "Week 4", y: 1 },
      { x: "Week 5", y: 2 },
      { x: "Week 6", y: 0 },
      { x: "Week 7", y: 1 },
      { x: "Week 8", y: 2 },
      { x: "Week 9", y: 1 },
      { x: "Week 10", y: 0 },
      { x: "Week 11", y: 3 },
      { x: "Week 12", y: 1 },
    ],
  },
];

export const resourceUtilizationData = [
  { cluster: "us-east-1", GPU: 78, CPU: 62, Memory: 45 },
  { cluster: "us-west-2", GPU: 65, CPU: 58, Memory: 52 },
  { cluster: "eu-west-1", GPU: 82, CPU: 71, Memory: 48 },
  { cluster: "ap-south-1", GPU: 45, CPU: 38, Memory: 31 },
];

export const modelComparisonData = [
  { metric: "Accuracy", "GPT-Forge": 92, "BERT-Custom": 88, "ResNet-V3": 85, "LLaMA-Fine": 90, "XGBoost-Pro": 82 },
  { metric: "Latency", "GPT-Forge": 75, "BERT-Custom": 85, "ResNet-V3": 92, "LLaMA-Fine": 70, "XGBoost-Pro": 95 },
  { metric: "Throughput", "GPT-Forge": 80, "BERT-Custom": 72, "ResNet-V3": 88, "LLaMA-Fine": 76, "XGBoost-Pro": 90 },
  { metric: "Efficiency", "GPT-Forge": 88, "BERT-Custom": 82, "ResNet-V3": 78, "LLaMA-Fine": 85, "XGBoost-Pro": 91 },
  { metric: "Cost", "GPT-Forge": 70, "BERT-Custom": 88, "ResNet-V3": 85, "LLaMA-Fine": 65, "XGBoost-Pro": 92 },
];

export const activityFeed: ActivityEvent[] = [
  { id: "a1", type: "deployment", message: "GPT-Forge v2.1 deployed to production (us-east-1)", author: users[0], timestamp: "2026-02-19T09:30:00Z" },
  { id: "a2", type: "training", message: "Experiment RUN-0187 completed — 94.2% accuracy", author: users[1], timestamp: "2026-02-19T08:45:00Z" },
  { id: "a3", type: "dataset", message: "Customer Reviews v3 dataset uploaded (2.4M records)", author: users[2], timestamp: "2026-02-19T07:20:00Z" },
  { id: "a4", type: "model", message: "BERT-Custom promoted from staging to active", author: users[3], timestamp: "2026-02-18T16:15:00Z" },
  { id: "a5", type: "training", message: "Experiment RUN-0186 failed — OOM error on epoch 45", author: users[4], timestamp: "2026-02-18T14:30:00Z" },
  { id: "a6", type: "team", message: "Elena Rodriguez joined the Engineering team", author: users[2], timestamp: "2026-02-18T10:00:00Z" },
  { id: "a7", type: "deployment", message: "ResNet-V3 auto-scaled to 8 replicas (traffic spike)", author: users[0], timestamp: "2026-02-17T22:45:00Z" },
  { id: "a8", type: "model", message: "LLaMA-Fine v1.3 registered with 90.1% benchmark score", author: users[1], timestamp: "2026-02-17T15:20:00Z" },
];

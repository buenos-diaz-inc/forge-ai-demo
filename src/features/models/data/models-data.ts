import type { Model, TeamMember } from "@/data/types";

const users: TeamMember[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-03-15" },
  { id: "u2", name: "Marcus Johnson", email: "marcus@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-01-10" },
  { id: "u3", name: "Elena Rodriguez", email: "elena@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-06-20" },
  { id: "u4", name: "Alex Kim", email: "alex@forge.ai", role: "Admin", status: "Active", joinedAt: "2024-11-01" },
  { id: "u5", name: "Priya Patel", email: "priya@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-08-05" },
];

export const models: Model[] = [
  { id: "m1", name: "GPT-Forge", framework: "PyTorch", type: "Generative", version: "2.1.0", status: "Active", accuracy: 94.2, latency: 120, parameters: "1.3B", size: "4.8 GB", author: users[0], createdAt: "2025-11-15T10:00:00Z", updatedAt: "2026-02-18T14:30:00Z", deployed: true },
  { id: "m2", name: "BERT-Custom", framework: "PyTorch", type: "NLP", version: "3.0.1", status: "Active", accuracy: 91.8, latency: 45, parameters: "340M", size: "1.2 GB", author: users[1], createdAt: "2025-09-20T08:00:00Z", updatedAt: "2026-02-17T09:15:00Z", deployed: true },
  { id: "m3", name: "ResNet-V3", framework: "TensorFlow", type: "Vision", version: "3.2.0", status: "Active", accuracy: 96.1, latency: 28, parameters: "44M", size: "180 MB", author: users[2], createdAt: "2025-07-01T12:00:00Z", updatedAt: "2026-02-15T11:45:00Z", deployed: true },
  { id: "m4", name: "LLaMA-Fine", framework: "PyTorch", type: "Generative", version: "1.3.0", status: "Active", accuracy: 90.1, latency: 200, parameters: "7B", size: "14 GB", author: users[1], createdAt: "2025-12-01T09:00:00Z", updatedAt: "2026-02-14T16:20:00Z", deployed: true },
  { id: "m5", name: "XGBoost-Pro", framework: "ONNX", type: "Tabular", version: "4.1.2", status: "Active", accuracy: 89.5, latency: 8, parameters: "2.1M", size: "45 MB", author: users[3], createdAt: "2025-06-15T14:00:00Z", updatedAt: "2026-02-16T10:00:00Z", deployed: true },
  { id: "m6", name: "ViT-Large", framework: "JAX", type: "Vision", version: "1.0.0", status: "Active", accuracy: 97.3, latency: 35, parameters: "307M", size: "1.1 GB", author: users[4], createdAt: "2026-01-10T08:30:00Z", updatedAt: "2026-02-13T15:00:00Z", deployed: false },
  { id: "m7", name: "Whisper-Custom", framework: "PyTorch", type: "NLP", version: "2.0.0", status: "Active", accuracy: 93.7, latency: 150, parameters: "769M", size: "2.9 GB", author: users[0], createdAt: "2025-10-05T11:00:00Z", updatedAt: "2026-02-12T08:45:00Z", deployed: true },
  { id: "m8", name: "TabNet-Enterprise", framework: "TensorFlow", type: "Tabular", version: "2.3.1", status: "Active", accuracy: 88.2, latency: 12, parameters: "8.5M", size: "95 MB", author: users[3], createdAt: "2025-08-20T10:00:00Z", updatedAt: "2026-02-11T14:20:00Z", deployed: false },
  { id: "m9", name: "CLIP-Forge", framework: "PyTorch", type: "Vision", version: "1.1.0", status: "Draft", accuracy: 91.5, latency: 65, parameters: "428M", size: "1.6 GB", author: users[2], createdAt: "2026-01-20T09:00:00Z", updatedAt: "2026-02-10T16:30:00Z", deployed: false },
  { id: "m10", name: "T5-Summarizer", framework: "JAX", type: "NLP", version: "1.2.0", status: "Active", accuracy: 87.9, latency: 95, parameters: "220M", size: "820 MB", author: users[4], createdAt: "2025-11-01T13:00:00Z", updatedAt: "2026-02-09T12:15:00Z", deployed: true },
  { id: "m11", name: "EfficientNet-B7", framework: "TensorFlow", type: "Vision", version: "2.0.0", status: "Archived", accuracy: 84.3, latency: 42, parameters: "66M", size: "250 MB", author: users[0], createdAt: "2025-04-10T08:00:00Z", updatedAt: "2025-12-20T10:00:00Z", deployed: false },
  { id: "m12", name: "Falcon-7B-QLoRA", framework: "PyTorch", type: "Generative", version: "0.9.0", status: "Draft", accuracy: 86.7, latency: 180, parameters: "7B", size: "13.5 GB", author: users[1], createdAt: "2026-02-01T10:00:00Z", updatedAt: "2026-02-08T09:30:00Z", deployed: false },
  { id: "m13", name: "Sentence-BERT", framework: "PyTorch", type: "NLP", version: "4.0.0", status: "Active", accuracy: 92.4, latency: 22, parameters: "110M", size: "420 MB", author: users[4], createdAt: "2025-05-15T09:00:00Z", updatedAt: "2026-02-07T11:45:00Z", deployed: true },
  { id: "m14", name: "YOLO-Forge", framework: "PyTorch", type: "Vision", version: "5.1.0", status: "Active", accuracy: 95.8, latency: 18, parameters: "25M", size: "100 MB", author: users[2], createdAt: "2025-09-01T14:00:00Z", updatedAt: "2026-02-06T08:00:00Z", deployed: true },
  { id: "m15", name: "RandomForest-XL", framework: "ONNX", type: "Tabular", version: "3.0.0", status: "Archived", accuracy: 82.1, latency: 5, parameters: "500K", size: "12 MB", author: users[3], createdAt: "2025-03-01T10:00:00Z", updatedAt: "2025-11-15T14:00:00Z", deployed: false },
  { id: "m16", name: "CodeLLaMA-Finetune", framework: "PyTorch", type: "Generative", version: "1.0.0", status: "Draft", accuracy: 88.9, latency: 250, parameters: "13B", size: "26 GB", author: users[0], createdAt: "2026-02-10T08:00:00Z", updatedAt: "2026-02-19T07:00:00Z", deployed: false },
];

export function getModel(id: string): Model | undefined {
  return models.find((m) => m.id === id);
}

export const modelVersions = [
  { version: "2.1.0", accuracy: 94.2, delta: "+0.8%", date: "2026-02-18", author: users[0] },
  { version: "2.0.0", accuracy: 93.4, delta: "+1.2%", date: "2026-01-15", author: users[0] },
  { version: "1.5.0", accuracy: 92.2, delta: "+2.1%", date: "2025-12-01", author: users[1] },
  { version: "1.0.0", accuracy: 90.1, delta: "baseline", date: "2025-11-15", author: users[0] },
];

export const modelMetricsOverVersions = [
  { id: "Accuracy", data: [{ x: "v1.0", y: 90.1 }, { x: "v1.5", y: 92.2 }, { x: "v2.0", y: 93.4 }, { x: "v2.1", y: 94.2 }] },
  { id: "F1 Score", data: [{ x: "v1.0", y: 88.5 }, { x: "v1.5", y: 90.8 }, { x: "v2.0", y: 92.1 }, { x: "v2.1", y: 93.0 }] },
];

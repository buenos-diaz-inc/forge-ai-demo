import type { Experiment, TeamMember, MetricSeries } from "@/data/types";

const users: TeamMember[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-03-15" },
  { id: "u2", name: "Marcus Johnson", email: "marcus@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-01-10" },
  { id: "u3", name: "Elena Rodriguez", email: "elena@forge.ai", role: "Engineer", status: "Active", joinedAt: "2025-06-20" },
  { id: "u4", name: "Alex Kim", email: "alex@forge.ai", role: "Admin", status: "Active", joinedAt: "2024-11-01" },
  { id: "u5", name: "Priya Patel", email: "priya@forge.ai", role: "Scientist", status: "Active", joinedAt: "2025-08-05" },
];

export const experiments: Experiment[] = [
  { id: "e1", runId: "RUN-0187", model: "GPT-Forge", dataset: "Customer Reviews v3", status: "Completed", epoch: 100, totalEpochs: 100, loss: 0.0234, accuracy: 94.2, duration: "4h 12m", gpu: "A100 x4", author: users[1], startedAt: "2026-02-19T04:30:00Z", hyperparameters: { lr: 0.0001, batch_size: 32, optimizer: "AdamW", scheduler: "cosine", warmup_steps: 500 } },
  { id: "e2", runId: "RUN-0186", model: "BERT-Custom", dataset: "Support Tickets", status: "Failed", epoch: 45, totalEpochs: 80, loss: 0.1892, accuracy: 78.3, duration: "2h 34m", gpu: "A100 x2", author: users[4], startedAt: "2026-02-18T14:00:00Z", hyperparameters: { lr: 0.0003, batch_size: 64, optimizer: "Adam", scheduler: "linear", warmup_steps: 200 } },
  { id: "e3", runId: "RUN-0185", model: "ResNet-V3", dataset: "Product Images HD", status: "Completed", epoch: 50, totalEpochs: 50, loss: 0.0156, accuracy: 96.1, duration: "1h 45m", gpu: "V100 x4", author: users[2], startedAt: "2026-02-18T10:00:00Z", hyperparameters: { lr: 0.001, batch_size: 128, optimizer: "SGD", scheduler: "step", weight_decay: 0.0001 } },
  { id: "e4", runId: "RUN-0184", model: "LLaMA-Fine", dataset: "Chat Logs", status: "Running", epoch: 67, totalEpochs: 100, loss: 0.0456, accuracy: 89.7, duration: "6h 20m", gpu: "A100 x8", author: users[0], startedAt: "2026-02-19T01:00:00Z", hyperparameters: { lr: 0.00005, batch_size: 16, optimizer: "AdamW", scheduler: "cosine", warmup_steps: 1000 } },
  { id: "e5", runId: "RUN-0183", model: "XGBoost-Pro", dataset: "Sales Transactions", status: "Completed", epoch: 200, totalEpochs: 200, loss: 0.0312, accuracy: 89.5, duration: "0h 35m", gpu: "CPU", author: users[3], startedAt: "2026-02-18T08:00:00Z", hyperparameters: { n_estimators: 200, max_depth: 8, learning_rate: 0.1, subsample: 0.8 } },
  { id: "e6", runId: "RUN-0182", model: "ViT-Large", dataset: "Satellite Imagery", status: "Queued", epoch: 0, totalEpochs: 80, loss: 0, accuracy: 0, duration: "-", gpu: "A100 x4", author: users[4], startedAt: "2026-02-19T10:00:00Z", hyperparameters: { lr: 0.0001, batch_size: 48, optimizer: "AdamW", scheduler: "cosine" } },
  { id: "e7", runId: "RUN-0181", model: "Whisper-Custom", dataset: "Audio Transcripts", status: "Completed", epoch: 60, totalEpochs: 60, loss: 0.0289, accuracy: 93.7, duration: "3h 15m", gpu: "A100 x4", author: users[0], startedAt: "2026-02-17T20:00:00Z", hyperparameters: { lr: 0.0001, batch_size: 24, optimizer: "AdamW", scheduler: "cosine", warmup_steps: 300 } },
  { id: "e8", runId: "RUN-0180", model: "TabNet-Enterprise", dataset: "Financial Reports", status: "Completed", epoch: 150, totalEpochs: 150, loss: 0.0445, accuracy: 88.2, duration: "1h 10m", gpu: "V100 x2", author: users[3], startedAt: "2026-02-17T14:00:00Z", hyperparameters: { lr: 0.02, batch_size: 1024, n_steps: 5, gamma: 1.5 } },
  { id: "e9", runId: "RUN-0179", model: "CLIP-Forge", dataset: "Product Images HD", status: "Running", epoch: 23, totalEpochs: 60, loss: 0.0678, accuracy: 85.1, duration: "2h 05m", gpu: "A100 x4", author: users[2], startedAt: "2026-02-19T06:00:00Z", hyperparameters: { lr: 0.0001, batch_size: 64, optimizer: "AdamW", temperature: 0.07 } },
  { id: "e10", runId: "RUN-0178", model: "T5-Summarizer", dataset: "Chat Logs", status: "Completed", epoch: 40, totalEpochs: 40, loss: 0.0512, accuracy: 87.9, duration: "2h 50m", gpu: "A100 x2", author: users[4], startedAt: "2026-02-16T18:00:00Z", hyperparameters: { lr: 0.0003, batch_size: 32, optimizer: "Adafactor", max_length: 512 } },
  { id: "e11", runId: "RUN-0177", model: "Sentence-BERT", dataset: "Customer Reviews v3", status: "Completed", epoch: 30, totalEpochs: 30, loss: 0.0198, accuracy: 92.4, duration: "0h 55m", gpu: "V100 x2", author: users[1], startedAt: "2026-02-16T10:00:00Z", hyperparameters: { lr: 0.0002, batch_size: 128, optimizer: "AdamW", pooling: "mean" } },
  { id: "e12", runId: "RUN-0176", model: "YOLO-Forge", dataset: "Product Images HD", status: "Completed", epoch: 80, totalEpochs: 80, loss: 0.0123, accuracy: 95.8, duration: "2h 20m", gpu: "A100 x2", author: users[2], startedAt: "2026-02-15T22:00:00Z", hyperparameters: { lr: 0.01, batch_size: 16, optimizer: "SGD", momentum: 0.937, img_size: 640 } },
  { id: "e13", runId: "RUN-0175", model: "Falcon-7B-QLoRA", dataset: "Chat Logs", status: "Running", epoch: 12, totalEpochs: 50, loss: 0.0891, accuracy: 82.4, duration: "3h 40m", gpu: "A100 x8", author: users[1], startedAt: "2026-02-19T03:00:00Z", hyperparameters: { lr: 0.0002, batch_size: 8, optimizer: "AdamW", lora_r: 16, lora_alpha: 32 } },
  { id: "e14", runId: "RUN-0174", model: "CodeLLaMA-Finetune", dataset: "Chat Logs", status: "Queued", epoch: 0, totalEpochs: 40, loss: 0, accuracy: 0, duration: "-", gpu: "A100 x8", author: users[0], startedAt: "2026-02-19T12:00:00Z", hyperparameters: { lr: 0.0001, batch_size: 4, optimizer: "AdamW", scheduler: "cosine" } },
];

export function getExperiment(id: string): Experiment | undefined {
  return experiments.find((e) => e.id === id);
}

export const lossCurveData: MetricSeries[] = [
  {
    id: "Training Loss",
    data: Array.from({ length: 100 }, (_, i) => ({
      x: `${i + 1}`,
      y: Math.round((1.5 * Math.exp(-0.04 * i) + 0.02 + Math.random() * 0.02) * 10000) / 10000,
    })),
  },
  {
    id: "Validation Loss",
    data: Array.from({ length: 100 }, (_, i) => ({
      x: `${i + 1}`,
      y: Math.round((1.6 * Math.exp(-0.035 * i) + 0.03 + Math.random() * 0.03) * 10000) / 10000,
    })),
  },
];

export const accuracyCurveData: MetricSeries[] = [
  {
    id: "Accuracy",
    data: Array.from({ length: 100 }, (_, i) => ({
      x: `${i + 1}`,
      y: Math.round((95 - 40 * Math.exp(-0.05 * i) + Math.random() * 1) * 100) / 100,
    })),
  },
  {
    id: "F1 Score",
    data: Array.from({ length: 100 }, (_, i) => ({
      x: `${i + 1}`,
      y: Math.round((93 - 42 * Math.exp(-0.045 * i) + Math.random() * 1.2) * 100) / 100,
    })),
  },
];

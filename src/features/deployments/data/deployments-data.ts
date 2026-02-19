import type { Deployment, MetricSeries } from "@/data/types";

export const deployments: Deployment[] = [
  { id: "dep1", name: "gpt-forge-prod", model: "GPT-Forge", version: "2.1.0", environment: "Production", region: "us-east-1", status: "Healthy", requestsPerSec: 1240, p99Latency: 145, uptime: 99.97, replicas: 6, autoScale: true, createdAt: "2026-01-15T10:00:00Z", endpoint: "https://api.forge.ai/v1/gpt-forge" },
  { id: "dep2", name: "bert-custom-prod", model: "BERT-Custom", version: "3.0.1", environment: "Production", region: "us-east-1", status: "Healthy", requestsPerSec: 3200, p99Latency: 52, uptime: 99.99, replicas: 4, autoScale: true, createdAt: "2025-12-01T08:00:00Z", endpoint: "https://api.forge.ai/v1/bert-custom" },
  { id: "dep3", name: "resnet-v3-prod", model: "ResNet-V3", version: "3.2.0", environment: "Production", region: "eu-west-1", status: "Healthy", requestsPerSec: 890, p99Latency: 35, uptime: 99.95, replicas: 3, autoScale: true, createdAt: "2025-10-20T12:00:00Z", endpoint: "https://api.forge.ai/v1/resnet-v3" },
  { id: "dep4", name: "llama-fine-prod", model: "LLaMA-Fine", version: "1.3.0", environment: "Production", region: "us-west-2", status: "Degraded", requestsPerSec: 420, p99Latency: 380, uptime: 98.12, replicas: 8, autoScale: true, createdAt: "2026-02-01T09:00:00Z", endpoint: "https://api.forge.ai/v1/llama-fine" },
  { id: "dep5", name: "xgboost-pro-prod", model: "XGBoost-Pro", version: "4.1.2", environment: "Production", region: "us-east-1", status: "Healthy", requestsPerSec: 8500, p99Latency: 12, uptime: 99.99, replicas: 2, autoScale: false, createdAt: "2025-09-01T10:00:00Z", endpoint: "https://api.forge.ai/v1/xgboost-pro" },
  { id: "dep6", name: "gpt-forge-staging", model: "GPT-Forge", version: "2.2.0-rc1", environment: "Staging", region: "us-east-1", status: "Healthy", requestsPerSec: 45, p99Latency: 138, uptime: 99.80, replicas: 2, autoScale: false, createdAt: "2026-02-17T14:00:00Z", endpoint: "https://staging.forge.ai/v1/gpt-forge" },
  { id: "dep7", name: "whisper-custom-prod", model: "Whisper-Custom", version: "2.0.0", environment: "Production", region: "us-west-2", status: "Healthy", requestsPerSec: 320, p99Latency: 180, uptime: 99.91, replicas: 4, autoScale: true, createdAt: "2025-11-15T08:00:00Z", endpoint: "https://api.forge.ai/v1/whisper-custom" },
  { id: "dep8", name: "yolo-forge-prod", model: "YOLO-Forge", version: "5.1.0", environment: "Production", region: "ap-south-1", status: "Healthy", requestsPerSec: 560, p99Latency: 22, uptime: 99.98, replicas: 3, autoScale: true, createdAt: "2025-12-10T10:00:00Z", endpoint: "https://api.forge.ai/v1/yolo-forge" },
  { id: "dep9", name: "t5-summarizer-prod", model: "T5-Summarizer", version: "1.2.0", environment: "Production", region: "eu-west-1", status: "Down", requestsPerSec: 0, p99Latency: 0, uptime: 95.20, replicas: 0, autoScale: true, createdAt: "2026-01-20T09:00:00Z", endpoint: "https://api.forge.ai/v1/t5-summarizer" },
  { id: "dep10", name: "sentence-bert-prod", model: "Sentence-BERT", version: "4.0.0", environment: "Production", region: "us-east-1", status: "Healthy", requestsPerSec: 5600, p99Latency: 28, uptime: 99.99, replicas: 3, autoScale: true, createdAt: "2025-08-01T10:00:00Z", endpoint: "https://api.forge.ai/v1/sentence-bert" },
  { id: "dep11", name: "bert-custom-dev", model: "BERT-Custom", version: "3.1.0-dev", environment: "Development", region: "us-east-1", status: "Deploying", requestsPerSec: 0, p99Latency: 0, uptime: 0, replicas: 1, autoScale: false, createdAt: "2026-02-19T08:00:00Z", endpoint: "https://dev.forge.ai/v1/bert-custom" },
];

export function getDeployment(id: string): Deployment | undefined {
  return deployments.find((d) => d.id === id);
}

export const trafficData: MetricSeries[] = [
  {
    id: "Requests/sec",
    data: Array.from({ length: 24 }, (_, i) => ({
      x: `${i}:00`,
      y: Math.round(800 + Math.sin(i / 4) * 400 + Math.random() * 100),
    })),
  },
];

export const latencyData: MetricSeries[] = [
  {
    id: "P50",
    data: Array.from({ length: 24 }, (_, i) => ({
      x: `${i}:00`,
      y: Math.round(85 + Math.random() * 20),
    })),
  },
  {
    id: "P95",
    data: Array.from({ length: 24 }, (_, i) => ({
      x: `${i}:00`,
      y: Math.round(120 + Math.random() * 30),
    })),
  },
  {
    id: "P99",
    data: Array.from({ length: 24 }, (_, i) => ({
      x: `${i}:00`,
      y: Math.round(140 + Math.random() * 40),
    })),
  },
];

export const statusCodeDistribution = [
  { id: "200", label: "200 OK", value: 95.2 },
  { id: "400", label: "400 Bad Request", value: 2.1 },
  { id: "404", label: "404 Not Found", value: 1.3 },
  { id: "500", label: "500 Server Error", value: 0.8 },
  { id: "503", label: "503 Unavailable", value: 0.6 },
];

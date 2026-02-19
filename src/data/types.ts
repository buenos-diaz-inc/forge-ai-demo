export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Engineer" | "Scientist" | "Viewer";
  avatar?: string;
  status: "Active" | "Invited" | "Deactivated";
  joinedAt: string;
}

export interface Model {
  id: string;
  name: string;
  framework: "PyTorch" | "TensorFlow" | "JAX" | "ONNX";
  type: "Classification" | "NLP" | "Vision" | "Generative" | "Tabular";
  version: string;
  status: "Active" | "Archived" | "Draft";
  accuracy: number;
  latency: number;
  parameters: string;
  size: string;
  author: TeamMember;
  createdAt: string;
  updatedAt: string;
  deployed: boolean;
}

export interface Dataset {
  id: string;
  name: string;
  type: "Tabular" | "Image" | "Text" | "Audio";
  records: number;
  size: string;
  version: string;
  status: "Ready" | "Processing" | "Error";
  columns?: number;
  author: TeamMember;
  createdAt: string;
  updatedAt: string;
}

export interface Experiment {
  id: string;
  runId: string;
  model: string;
  dataset: string;
  status: "Running" | "Completed" | "Failed" | "Queued";
  epoch: number;
  totalEpochs: number;
  loss: number;
  accuracy: number;
  duration: string;
  gpu: string;
  author: TeamMember;
  startedAt: string;
  hyperparameters: Record<string, string | number>;
}

export interface Deployment {
  id: string;
  name: string;
  model: string;
  version: string;
  environment: "Production" | "Staging" | "Development";
  region: string;
  status: "Healthy" | "Degraded" | "Down" | "Deploying";
  requestsPerSec: number;
  p99Latency: number;
  uptime: number;
  replicas: number;
  autoScale: boolean;
  createdAt: string;
  endpoint: string;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
  status: "Active" | "Revoked";
}

export interface ActivityEvent {
  id: string;
  type: "deployment" | "training" | "dataset" | "model" | "team";
  message: string;
  author: TeamMember;
  timestamp: string;
}

export interface TimeSeriesPoint {
  x: string;
  y: number;
}

export interface MetricSeries {
  id: string;
  data: TimeSeriesPoint[];
}

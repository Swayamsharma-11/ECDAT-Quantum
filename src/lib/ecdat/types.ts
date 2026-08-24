/**
 * ECDAT domain model.
 * These types mirror the intended REST/PostgreSQL schema so a real scanning
 * backend can be connected later without touching the UI layer.
 */

export type Severity = "critical" | "high" | "medium" | "low";
export type QuantumStatus = "vulnerable" | "at-risk" | "safe" | "pqc-ready";
export type Environment = "Production" | "Staging" | "Development" | "DR";
export type Criticality = "Critical" | "High" | "Medium" | "Low";
export type Role = "Admin" | "Security Analyst" | "Auditor" | "Viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  lastActive: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  regions: string[];
  demo: boolean;
}

export interface Application {
  id: string;
  name: string;
  owner: string;
  criticality: Criticality;
  services: string[];
  assets: number;
}

export interface Repository {
  id: string;
  name: string;
  provider: "GitHub" | "GitLab" | "Bitbucket" | "Upload";
  branch: string;
  lastScan: string;
  findings: number;
  language: string;
}

export interface CryptographicAsset {
  id: string;
  algorithm: string;
  keySize: string;
  protocol: string;
  library: string;
  version: string;
  location: string;
  application: string;
  environment: Environment;
  owner: string;
  criticality: Criticality;
  quantumStatus: QuantumStatus;
  riskScore: number;
  severity: Severity;
  dataLifetimeYears: number;
  migrationYears: number;
  lastSeen: string;
  department: string;
  repository: string;
  migrationComplexity: number; // 0-100
  recommendation: string;
  rationale: string;
}

export interface AlgorithmStat {
  algorithm: string;
  count: number;
  vulnerable: number;
  family: "Asymmetric" | "Symmetric" | "Hash" | "Protocol";
}

export interface CryptoLibrary {
  id: string;
  name: string;
  version: string;
  components: number;
  vulnerable: number;
  status: "Supported" | "Outdated" | "End of life";
}

export interface Certificate {
  id: string;
  commonName: string;
  domain: string;
  algorithm: string;
  keySize: string;
  issuer: string;
  expiry: string;
  daysToExpiry: number;
  tls: string;
  severity: Severity;
  quantumStatus: QuantumStatus;
  status: "Valid" | "Expiring" | "Expired" | "Weak key";
}

export interface CBOMNode {
  id: string;
  name: string;
  type:
    | "organization"
    | "application"
    | "service"
    | "library"
    | "component"
    | "certificate";
  meta?: string;
  severity?: Severity;
  children?: CBOMNode[];
}

export interface RiskAssessment {
  assetId: string;
  dataLifetimeYears: number;
  migrationYears: number;
  threatWindowYears: number;
  riskGapYears: number;
  verdict: "Immediate action required" | "Plan migration" | "Monitor";
}

export interface PQCRecommendation {
  id: string;
  current: string;
  severity: Severity;
  recommended: string;
  standard: string;
  reason: string;
  complexity: "Low" | "Medium" | "High";
  effort: string;
  affectedAssets: number;
  category: "Key establishment" | "Signatures" | "Symmetric" | "Protocol";
}

export interface MigrationTask {
  id: string;
  title: string;
  done: boolean;
  owner: string;
}

export interface MigrationPhase {
  id: string;
  phase: string;
  title: string;
  status: "Complete" | "In Progress" | "Planned";
  window: string;
  progress: number;
  tasks: MigrationTask[];
}

export interface ScanStep {
  label: string;
  detail: string;
}

export interface Scan {
  id: string;
  target: string;
  type: "Repository" | "Container" | "Infrastructure" | "Certificates";
  startedAt: string;
  duration: string;
  filesScanned: number;
  assetsFound: number;
  critical: number;
  high: number;
  status: "Complete" | "Running" | "Failed";
}

export interface Report {
  id: string;
  title: string;
  description: string;
  audience: string;
  pages: number;
  updated: string;
  formats: string[];
}

export interface Connector {
  id: string;
  name: string;
  kind: "Cloud" | "Orchestration" | "Host" | "Registry";
  connected: boolean;
  lastScan: string;
  assets: number;
  risk: Severity;
}

export interface Notification {
  id: string;
  severity: Severity | "success";
  title: string;
  body: string;
  time: string;
}

export interface GraphNode {
  id: string;
  label: string;
  kind: "service" | "algorithm" | "library" | "protocol" | "datastore" | "gateway";
  x: number;
  y: number;
  severity: Severity;
  criticality: Criticality;
  riskScore: number;
  applications: string[];
  services: string[];
  certificates: string[];
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  ip: string;
}

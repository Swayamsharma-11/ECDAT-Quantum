import type {
  Application,
  AlgorithmStat,
  AuditEntry,
  CBOMNode,
  Certificate,
  Connector,
  CryptoLibrary,
  CryptographicAsset,
  Criticality,
  Environment,
  GraphEdge,
  GraphNode,
  MigrationPhase,
  Notification,
  Organization,
  PQCRecommendation,
  Report,
  Repository,
  Scan,
  ScanStep,
  Severity,
  User,
} from "./types";

export const organization: Organization = {
  id: "org-astra",
  name: "Astra Financial Technologies",
  industry: "Banking & Payments",
  regions: ["EU-West", "AP-South", "US-East"],
  demo: true,
};

export const organizations: Organization[] = [
  organization,
  {
    id: "org-northwind",
    name: "Northwind Insurance Group",
    industry: "Insurance",
    regions: ["EU-North"],
    demo: true,
  },
];

export const currentUser: User = {
  id: "usr-001",
  name: "Swayam",
  email: "swayam@astra-fintech.io",
  role: "Security Analyst",
  initials: "SW",
  lastActive: "Just now",
};

export const teamUsers: User[] = [
  currentUser,
  {
    id: "usr-002",
    name: "Ana Ferreira",
    email: "ana.f@astra-fintech.io",
    role: "Admin",
    initials: "AF",
    lastActive: "12 min ago",
  },
  {
    id: "usr-003",
    name: "Rahul Menon",
    email: "rahul.m@astra-fintech.io",
    role: "Auditor",
    initials: "RM",
    lastActive: "2 h ago",
  },
  {
    id: "usr-004",
    name: "Lena Krause",
    email: "lena.k@astra-fintech.io",
    role: "Viewer",
    initials: "LK",
    lastActive: "Yesterday",
  },
];

export const kpis = {
  quantumRiskScore: 78,
  cryptoAssets: 1284,
  quantumVulnerable: 327,
  pqcReady: 184,
  migrationRequired: 143,
  criticalAssets: 18,
};

export const riskDistribution = [
  { label: "Critical", value: 18, severity: "critical" as Severity },
  { label: "High", value: 61, severity: "high" as Severity },
  { label: "Medium", value: 104, severity: "medium" as Severity },
  { label: "Low", value: 164, severity: "low" as Severity },
];

export const algorithmStats: AlgorithmStat[] = [
  { algorithm: "AES", count: 401, vulnerable: 12, family: "Symmetric" },
  { algorithm: "RSA", count: 327, vulnerable: 327, family: "Asymmetric" },
  { algorithm: "ECC", count: 214, vulnerable: 214, family: "Asymmetric" },
  { algorithm: "SHA", count: 182, vulnerable: 24, family: "Hash" },
  { algorithm: "ECDSA", count: 97, vulnerable: 97, family: "Asymmetric" },
  { algorithm: "ECDH", count: 63, vulnerable: 63, family: "Asymmetric" },
  { algorithm: "TLS", count: 148, vulnerable: 71, family: "Protocol" },
  { algorithm: "SSH", count: 52, vulnerable: 33, family: "Protocol" },
];

export const postureTrend = [
  { month: "Feb", risk: 91, vulnerable: 412, pqc: 41 },
  { month: "Mar", risk: 89, vulnerable: 398, pqc: 66 },
  { month: "Apr", risk: 87, vulnerable: 384, pqc: 88 },
  { month: "May", risk: 84, vulnerable: 371, pqc: 112 },
  { month: "Jun", risk: 82, vulnerable: 356, pqc: 139 },
  { month: "Jul", risk: 80, vulnerable: 341, pqc: 161 },
  { month: "Aug", risk: 78, vulnerable: 327, pqc: 184 },
];

export const applications: Application[] = [
  {
    id: "app-pay",
    name: "Payment Gateway",
    owner: "Payments Platform",
    criticality: "Critical",
    services: ["payment-service", "settlement-worker", "ledger-api"],
    assets: 314,
  },
  {
    id: "app-auth",
    name: "Customer Authentication",
    owner: "Identity",
    criticality: "Critical",
    services: ["auth-service", "mfa-service", "session-store"],
    assets: 268,
  },
  {
    id: "app-bank",
    name: "Banking API",
    owner: "Core Banking",
    criticality: "High",
    services: ["accounts-api", "transfers-api", "api-gateway"],
    assets: 291,
  },
  {
    id: "app-store",
    name: "Data Storage",
    owner: "Data Platform",
    criticality: "High",
    services: ["storage-service", "backup-agent", "archive-vault"],
    assets: 247,
  },
  {
    id: "app-admin",
    name: "Internal Admin Portal",
    owner: "Corporate IT",
    criticality: "Medium",
    services: ["admin-portal", "reporting-service"],
    assets: 164,
  },
];

export const repositories: Repository[] = [
  {
    id: "repo-1",
    name: "astra/payment-service",
    provider: "GitHub",
    branch: "main",
    lastScan: "2 h ago",
    findings: 94,
    language: "Java",
  },
  {
    id: "repo-2",
    name: "astra/auth-service",
    provider: "GitHub",
    branch: "main",
    lastScan: "5 h ago",
    findings: 71,
    language: "Go",
  },
  {
    id: "repo-3",
    name: "astra/banking-api",
    provider: "GitLab",
    branch: "release/24.8",
    lastScan: "1 d ago",
    findings: 63,
    language: "Kotlin",
  },
  {
    id: "repo-4",
    name: "astra/storage-service",
    provider: "GitHub",
    branch: "main",
    lastScan: "3 d ago",
    findings: 48,
    language: "Rust",
  },
  {
    id: "repo-5",
    name: "astra/admin-portal",
    provider: "Bitbucket",
    branch: "develop",
    lastScan: "6 d ago",
    findings: 27,
    language: "TypeScript",
  },
];

const severityFor = (score: number): Severity =>
  score >= 85 ? "critical" : score >= 70 ? "high" : score >= 45 ? "medium" : "low";

interface Seed {
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
  score: number;
  dataLifetimeYears: number;
  migrationYears: number;
  complexity: number;
  repository: string;
  department: string;
  lastSeen: string;
}

const seeds: Seed[] = [
  { algorithm: "RSA", keySize: "2048", protocol: "TLS 1.2", library: "OpenSSL", version: "3.2", location: "payment-service", application: "Payment Gateway", environment: "Production", owner: "Payments Platform", criticality: "Critical", score: 94, dataLifetimeYears: 15, migrationYears: 4, complexity: 62, repository: "astra/payment-service", department: "Payments", lastSeen: "2 h ago" },
  { algorithm: "AES", keySize: "256", protocol: "AES-GCM", library: "OpenSSL", version: "3.2", location: "storage-service", application: "Data Storage", environment: "Production", owner: "Data Platform", criticality: "High", score: 18, dataLifetimeYears: 10, migrationYears: 1, complexity: 22, repository: "astra/storage-service", department: "Data", lastSeen: "4 h ago" },
  { algorithm: "ECDSA", keySize: "P-256", protocol: "TLS 1.3", library: "BoringSSL", version: "1.x", location: "auth-service", application: "Customer Authentication", environment: "Production", owner: "Identity", criticality: "Critical", score: 89, dataLifetimeYears: 12, migrationYears: 3, complexity: 55, repository: "astra/auth-service", department: "Identity", lastSeen: "1 h ago" },
  { algorithm: "RSA", keySize: "2048", protocol: "TLS 1.2", library: "OpenSSL", version: "1.1.1", location: "api-gateway", application: "Banking API", environment: "Production", owner: "Core Banking", criticality: "High", score: 82, dataLifetimeYears: 9, migrationYears: 3, complexity: 74, repository: "astra/banking-api", department: "Core Banking", lastSeen: "3 h ago" },
  { algorithm: "ECDH", keySize: "P-384", protocol: "TLS 1.3", library: "OpenSSL", version: "3.2", location: "transfers-api", application: "Banking API", environment: "Production", owner: "Core Banking", criticality: "High", score: 77, dataLifetimeYears: 8, migrationYears: 2, complexity: 44, repository: "astra/banking-api", department: "Core Banking", lastSeen: "3 h ago" },
  { algorithm: "SHA", keySize: "256", protocol: "HMAC", library: "libsodium", version: "1.0.19", location: "ledger-api", application: "Payment Gateway", environment: "Production", owner: "Payments Platform", criticality: "Critical", score: 21, dataLifetimeYears: 15, migrationYears: 1, complexity: 15, repository: "astra/payment-service", department: "Payments", lastSeen: "2 h ago" },
  { algorithm: "RSA", keySize: "1024", protocol: "JWT RS256", library: "Bouncy Castle", version: "1.76", location: "admin-portal", application: "Internal Admin Portal", environment: "Production", owner: "Corporate IT", criticality: "Medium", score: 96, dataLifetimeYears: 6, migrationYears: 2, complexity: 33, repository: "astra/admin-portal", department: "Corporate IT", lastSeen: "1 d ago" },
  { algorithm: "AES", keySize: "128", protocol: "AES-CBC", library: "JCE", version: "17", location: "session-store", application: "Customer Authentication", environment: "Production", owner: "Identity", criticality: "High", score: 48, dataLifetimeYears: 4, migrationYears: 1, complexity: 26, repository: "astra/auth-service", department: "Identity", lastSeen: "5 h ago" },
  { algorithm: "ECDSA", keySize: "P-256", protocol: "mTLS", library: "OpenSSL", version: "3.0", location: "settlement-worker", application: "Payment Gateway", environment: "Production", owner: "Payments Platform", criticality: "Critical", score: 91, dataLifetimeYears: 14, migrationYears: 4, complexity: 68, repository: "astra/payment-service", department: "Payments", lastSeen: "2 h ago" },
  { algorithm: "SSH-RSA", keySize: "2048", protocol: "SSH", library: "OpenSSH", version: "9.3", location: "bastion-host-eu", application: "Banking API", environment: "Production", owner: "Platform SRE", criticality: "High", score: 84, dataLifetimeYears: 7, migrationYears: 2, complexity: 38, repository: "astra/banking-api", department: "SRE", lastSeen: "6 h ago" },
  { algorithm: "ML-KEM", keySize: "768", protocol: "Hybrid TLS", library: "OQS-OpenSSL", version: "0.10", location: "edge-proxy", application: "Banking API", environment: "Staging", owner: "Platform SRE", criticality: "Medium", score: 9, dataLifetimeYears: 12, migrationYears: 0, complexity: 30, repository: "astra/banking-api", department: "SRE", lastSeen: "1 h ago" },
  { algorithm: "ML-DSA", keySize: "65", protocol: "Code signing", library: "liboqs", version: "0.10", location: "build-pipeline", application: "Internal Admin Portal", environment: "Development", owner: "Corporate IT", criticality: "Medium", score: 12, dataLifetimeYears: 5, migrationYears: 0, complexity: 28, repository: "astra/admin-portal", department: "Corporate IT", lastSeen: "8 h ago" },
  { algorithm: "3DES", keySize: "168", protocol: "PIN block", library: "HSM firmware", version: "4.2", location: "hsm-cluster-1", application: "Payment Gateway", environment: "Production", owner: "Payments Platform", criticality: "Critical", score: 88, dataLifetimeYears: 10, migrationYears: 3, complexity: 86, repository: "n/a", department: "Payments", lastSeen: "12 h ago" },
  { algorithm: "AES", keySize: "256", protocol: "AES-GCM", library: "Rust ring", version: "0.17", location: "archive-vault", application: "Data Storage", environment: "Production", owner: "Data Platform", criticality: "High", score: 16, dataLifetimeYears: 20, migrationYears: 1, complexity: 20, repository: "astra/storage-service", department: "Data", lastSeen: "9 h ago" },
  { algorithm: "RSA", keySize: "4096", protocol: "TLS 1.3", library: "OpenSSL", version: "3.2", location: "accounts-api", application: "Banking API", environment: "Production", owner: "Core Banking", criticality: "High", score: 73, dataLifetimeYears: 11, migrationYears: 3, complexity: 58, repository: "astra/banking-api", department: "Core Banking", lastSeen: "3 h ago" },
  { algorithm: "SHA", keySize: "1", protocol: "Legacy digest", library: "OpenSSL", version: "1.1.1", location: "reporting-service", application: "Internal Admin Portal", environment: "Staging", owner: "Corporate IT", criticality: "Low", score: 64, dataLifetimeYears: 3, migrationYears: 1, complexity: 18, repository: "astra/admin-portal", department: "Corporate IT", lastSeen: "2 d ago" },
  { algorithm: "ECDH", keySize: "P-256", protocol: "TLS 1.2", library: "BoringSSL", version: "1.x", location: "mfa-service", application: "Customer Authentication", environment: "Production", owner: "Identity", criticality: "Critical", score: 86, dataLifetimeYears: 12, migrationYears: 3, complexity: 51, repository: "astra/auth-service", department: "Identity", lastSeen: "1 h ago" },
  { algorithm: "AES", keySize: "256", protocol: "AES-GCM", library: "OpenSSL", version: "3.2", location: "backup-agent", application: "Data Storage", environment: "DR", owner: "Data Platform", criticality: "Medium", score: 24, dataLifetimeYears: 18, migrationYears: 1, complexity: 24, repository: "astra/storage-service", department: "Data", lastSeen: "1 d ago" },
  { algorithm: "RSA", keySize: "2048", protocol: "S/MIME", library: "Bouncy Castle", version: "1.76", location: "notification-relay", application: "Internal Admin Portal", environment: "Production", owner: "Corporate IT", criticality: "Low", score: 69, dataLifetimeYears: 5, migrationYears: 2, complexity: 35, repository: "astra/admin-portal", department: "Corporate IT", lastSeen: "4 d ago" },
  { algorithm: "ECDSA", keySize: "P-521", protocol: "TLS 1.3", library: "OpenSSL", version: "3.2", location: "partner-gateway", application: "Banking API", environment: "Production", owner: "Core Banking", criticality: "High", score: 79, dataLifetimeYears: 9, migrationYears: 2, complexity: 47, repository: "astra/banking-api", department: "Core Banking", lastSeen: "7 h ago" },
  { algorithm: "ChaCha20", keySize: "256", protocol: "AEAD", library: "libsodium", version: "1.0.19", location: "mobile-edge", application: "Customer Authentication", environment: "Production", owner: "Identity", criticality: "Medium", score: 20, dataLifetimeYears: 4, migrationYears: 1, complexity: 19, repository: "astra/auth-service", department: "Identity", lastSeen: "5 h ago" },
  { algorithm: "RSA", keySize: "2048", protocol: "TLS 1.2", library: "OpenSSL", version: "1.1.1", location: "legacy-batch-host", application: "Data Storage", environment: "Production", owner: "Data Platform", criticality: "High", score: 92, dataLifetimeYears: 16, migrationYears: 5, complexity: 91, repository: "n/a", department: "Data", lastSeen: "1 d ago" },
  { algorithm: "ECDSA", keySize: "P-256", protocol: "JWT ES256", library: "Go crypto", version: "1.22", location: "auth-service", application: "Customer Authentication", environment: "Staging", owner: "Identity", criticality: "Medium", score: 66, dataLifetimeYears: 6, migrationYears: 2, complexity: 40, repository: "astra/auth-service", department: "Identity", lastSeen: "6 h ago" },
  { algorithm: "AES", keySize: "256", protocol: "AES-GCM", library: "JCE", version: "17", location: "ledger-api", application: "Payment Gateway", environment: "Production", owner: "Payments Platform", criticality: "Critical", score: 22, dataLifetimeYears: 15, migrationYears: 1, complexity: 21, repository: "astra/payment-service", department: "Payments", lastSeen: "2 h ago" },
];

const recommendationFor = (algorithm: string) => {
  if (["RSA", "ECDH", "SSH-RSA"].includes(algorithm))
    return "ML-KEM / hybrid key establishment";
  if (["ECDSA"].includes(algorithm)) return "ML-DSA / hybrid signatures";
  if (["3DES"].includes(algorithm)) return "AES-256-GCM replacement";
  if (algorithm === "SHA") return "Upgrade to SHA-384 / SHA-3";
  if (algorithm.startsWith("ML-")) return "Already PQC standardised";
  return "Maintain and monitor";
};

const statusFor = (algorithm: string, score: number) => {
  if (algorithm.startsWith("ML-")) return "pqc-ready" as const;
  if (["RSA", "ECDSA", "ECDH", "SSH-RSA"].includes(algorithm))
    return "vulnerable" as const;
  return score >= 45 ? ("at-risk" as const) : ("safe" as const);
};

export const cryptoAssets: CryptographicAsset[] = seeds.map((s, i) => ({
  id: `CRYPTO-${String(i + 1).padStart(3, "0")}`,
  algorithm: s.algorithm,
  keySize: s.keySize,
  protocol: s.protocol,
  library: s.library,
  version: s.version,
  location: s.location,
  application: s.application,
  environment: s.environment,
  owner: s.owner,
  criticality: s.criticality,
  quantumStatus: statusFor(s.algorithm, s.score),
  riskScore: s.score,
  severity: severityFor(s.score),
  dataLifetimeYears: s.dataLifetimeYears,
  migrationYears: s.migrationYears,
  lastSeen: s.lastSeen,
  department: s.department,
  repository: s.repository,
  migrationComplexity: s.complexity,
  recommendation: recommendationFor(s.algorithm),
  rationale:
    statusFor(s.algorithm, s.score) === "vulnerable"
      ? `Public-key cryptography based on ${s.algorithm} is considered vulnerable to sufficiently capable quantum attacks. The protected data has a ${s.dataLifetimeYears}-year retention period and the associated service has ${s.criticality.toLowerCase()} business impact.`
      : `${s.algorithm}-${s.keySize} retains adequate security margin against known quantum attacks, but key management and library currency remain in scope for continuous monitoring.`,
}));

export const topRisks = [...cryptoAssets]
  .sort((a, b) => b.riskScore - a.riskScore)
  .slice(0, 6);

export const libraries: CryptoLibrary[] = [
  { id: "lib-1", name: "OpenSSL", version: "3.2", components: 412, vulnerable: 118, status: "Supported" },
  { id: "lib-2", name: "OpenSSL", version: "1.1.1", components: 96, vulnerable: 74, status: "End of life" },
  { id: "lib-3", name: "BoringSSL", version: "1.x", components: 143, vulnerable: 61, status: "Supported" },
  { id: "lib-4", name: "Bouncy Castle", version: "1.76", components: 88, vulnerable: 39, status: "Outdated" },
  { id: "lib-5", name: "libsodium", version: "1.0.19", components: 64, vulnerable: 2, status: "Supported" },
  { id: "lib-6", name: "liboqs", version: "0.10", components: 41, vulnerable: 0, status: "Supported" },
  { id: "lib-7", name: "Java JCE", version: "17", components: 122, vulnerable: 33, status: "Supported" },
  { id: "lib-8", name: "OpenSSH", version: "9.3", components: 52, vulnerable: 33, status: "Supported" },
];

export const certificates: Certificate[] = [
  { id: "cert-01", commonName: "pay.astra-fintech.io", domain: "pay.astra-fintech.io", algorithm: "RSA", keySize: "2048", issuer: "DigiCert TLS RSA CA G1", expiry: "2026-11-04", daysToExpiry: 72, tls: "TLS 1.2", severity: "critical", quantumStatus: "vulnerable", status: "Valid" },
  { id: "cert-02", commonName: "auth.astra-fintech.io", domain: "auth.astra-fintech.io", algorithm: "ECDSA", keySize: "P-256", issuer: "Let's Encrypt E5", expiry: "2026-09-12", daysToExpiry: 19, tls: "TLS 1.3", severity: "high", quantumStatus: "vulnerable", status: "Expiring" },
  { id: "cert-03", commonName: "api.astra-fintech.io", domain: "api.astra-fintech.io", algorithm: "RSA", keySize: "4096", issuer: "DigiCert TLS RSA CA G1", expiry: "2027-03-19", daysToExpiry: 207, tls: "TLS 1.3", severity: "high", quantumStatus: "vulnerable", status: "Valid" },
  { id: "cert-04", commonName: "internal-mtls-root", domain: "*.internal.astra", algorithm: "RSA", keySize: "1024", issuer: "Astra Internal CA", expiry: "2026-08-30", daysToExpiry: 6, tls: "TLS 1.1", severity: "critical", quantumStatus: "vulnerable", status: "Weak key" },
  { id: "cert-05", commonName: "storage.astra-fintech.io", domain: "storage.astra-fintech.io", algorithm: "ECDSA", keySize: "P-384", issuer: "GlobalSign R6", expiry: "2027-01-22", daysToExpiry: 151, tls: "TLS 1.3", severity: "medium", quantumStatus: "vulnerable", status: "Valid" },
  { id: "cert-06", commonName: "pqc-edge.astra-fintech.io", domain: "pqc-edge.astra-fintech.io", algorithm: "ML-DSA-65", keySize: "65", issuer: "Astra PQC Pilot CA", expiry: "2027-06-01", daysToExpiry: 281, tls: "Hybrid TLS 1.3", severity: "low", quantumStatus: "pqc-ready", status: "Valid" },
  { id: "cert-07", commonName: "legacy-batch.astra", domain: "legacy-batch.astra", algorithm: "RSA", keySize: "2048", issuer: "Astra Internal CA", expiry: "2026-08-11", daysToExpiry: -13, tls: "TLS 1.0", severity: "critical", quantumStatus: "vulnerable", status: "Expired" },
  { id: "cert-08", commonName: "admin.astra-fintech.io", domain: "admin.astra-fintech.io", algorithm: "RSA", keySize: "2048", issuer: "Sectigo RSA DV", expiry: "2026-10-08", daysToExpiry: 45, tls: "TLS 1.2", severity: "high", quantumStatus: "vulnerable", status: "Expiring" },
];

export const cbomSummary = [
  { label: "Total components", value: 1284 },
  { label: "Algorithms", value: 24 },
  { label: "Libraries", value: 18 },
  { label: "Certificates", value: 231 },
  { label: "Protocols", value: 17 },
  { label: "Quantum vulnerable", value: 327 },
];

export const cbomTree: CBOMNode = {
  id: "org",
  name: "Astra Financial Technologies",
  type: "organization",
  meta: "1,284 components",
  children: applications.map((app) => ({
    id: app.id,
    name: app.name,
    type: "application" as const,
    meta: `${app.assets} components · ${app.criticality}`,
    severity: app.criticality === "Critical" ? ("critical" as const) : ("medium" as const),
    children: app.services.map((svc) => {
      const assets = cryptoAssets.filter((a) => a.location === svc);
      const libs = Array.from(
        new Set((assets.length ? assets : cryptoAssets.slice(0, 2)).map((a) => a.library)),
      );
      return {
        id: `${app.id}-${svc}`,
        name: svc,
        type: "service" as const,
        meta: `${libs.length} libraries`,
        children: libs.map((lib) => ({
          id: `${app.id}-${svc}-${lib}`,
          name: lib,
          type: "library" as const,
          meta: `${(assets.length ? assets : cryptoAssets.slice(0, 2)).filter((a) => a.library === lib).length} components`,
          children: (assets.length ? assets : cryptoAssets.slice(0, 2))
            .filter((a) => a.library === lib)
            .map((a) => ({
              id: `${a.id}-node`,
              name: `${a.algorithm}-${a.keySize}`,
              type: "component" as const,
              meta: `${a.protocol} · risk ${a.riskScore}`,
              severity: a.severity,
            })),
        })),
      };
    }),
  })),
};

export const mosca = {
  dataLifetimeYears: 15,
  migrationYears: 4,
  threatWindowYears: 12,
  riskGapYears: 7,
  verdict: "IMMEDIATE ACTION REQUIRED",
};

export const moscaTimeline = [
  { year: "2026", label: "Current posture", detail: "Discovery + CBOM complete", state: "done" as const },
  { year: "2028", label: "Migration start", detail: "Hybrid TLS on critical edges", state: "active" as const },
  { year: "2030", label: "Migration complete", detail: "PQC across payment + identity", state: "planned" as const },
  { year: "2035", label: "Quantum threat window", detail: "CRQC plausibility rises sharply", state: "threat" as const },
  { year: "2040", label: "Data still sensitive", detail: "15-year retention still in force", state: "planned" as const },
];

export const pqcRecommendations: PQCRecommendation[] = [
  { id: "pqc-1", current: "RSA-2048", severity: "critical", recommended: "ML-KEM / hybrid key establishment", standard: "FIPS 203", reason: "Replace or transition RSA-based key establishment with a standardised PQC or hybrid approach before the harvest-now-decrypt-later window closes.", complexity: "Medium", effort: "6–12 months", affectedAssets: 327, category: "Key establishment" },
  { id: "pqc-2", current: "ECDSA P-256", severity: "high", recommended: "ML-DSA / hybrid signature strategy", standard: "FIPS 204", reason: "Signature verification chains must accept composite certificates before issuer migration begins.", complexity: "Medium", effort: "6–9 months", affectedAssets: 97, category: "Signatures" },
  { id: "pqc-3", current: "ECDH P-256/P-384", severity: "high", recommended: "X25519 + ML-KEM hybrid", standard: "IETF hybrid KEX", reason: "Hybrid key exchange retains classical assurance while adding lattice-based protection.", complexity: "Low", effort: "3–6 months", affectedAssets: 63, category: "Key establishment" },
  { id: "pqc-4", current: "3DES (PIN block)", severity: "critical", recommended: "AES-256-GCM", standard: "NIST SP 800-131A", reason: "3DES is deprecated independent of quantum risk; HSM firmware upgrade required.", complexity: "High", effort: "9–18 months", affectedAssets: 12, category: "Symmetric" },
  { id: "pqc-5", current: "SSH-RSA host keys", severity: "high", recommended: "SLH-DSA or ML-DSA host keys", standard: "FIPS 205", reason: "Long-lived host keys are ideal harvest targets; rotate to stateless hash-based signatures.", complexity: "Medium", effort: "4–8 months", affectedAssets: 52, category: "Signatures" },
  { id: "pqc-6", current: "TLS 1.2 endpoints", severity: "medium", recommended: "TLS 1.3 + hybrid groups", standard: "RFC 8446", reason: "TLS 1.2 cannot negotiate hybrid key shares; upgrade is a prerequisite for PQC rollout.", complexity: "Low", effort: "2–4 months", affectedAssets: 148, category: "Protocol" },
];

export const migrationPhases: MigrationPhase[] = [
  {
    id: "ph-1",
    phase: "Phase 1",
    title: "Discover",
    status: "Complete",
    window: "Q1 2026",
    progress: 100,
    tasks: [
      { id: "t1", title: "Inventory cryptographic assets", done: true, owner: "Security Engineering" },
      { id: "t2", title: "Generate CBOM", done: true, owner: "Security Engineering" },
      { id: "t3", title: "Identify legacy algorithms", done: true, owner: "AppSec" },
    ],
  },
  {
    id: "ph-2",
    phase: "Phase 2",
    title: "Prioritize",
    status: "In Progress",
    window: "Q3 2026",
    progress: 62,
    tasks: [
      { id: "t4", title: "Calculate quantum risk", done: true, owner: "Risk Office" },
      { id: "t5", title: "Identify critical assets", done: true, owner: "Risk Office" },
      { id: "t6", title: "Prioritize long-lived data", done: false, owner: "Data Platform" },
    ],
  },
  {
    id: "ph-3",
    phase: "Phase 3",
    title: "Prepare",
    status: "Planned",
    window: "Q1 2027",
    progress: 12,
    tasks: [
      { id: "t7", title: "Select PQC algorithms", done: true, owner: "Cryptography Guild" },
      { id: "t8", title: "Test compatibility", done: false, owner: "Platform SRE" },
      { id: "t9", title: "Create hybrid architecture", done: false, owner: "Architecture" },
    ],
  },
  {
    id: "ph-4",
    phase: "Phase 4",
    title: "Migrate",
    status: "Planned",
    window: "Q3 2027 – Q4 2029",
    progress: 0,
    tasks: [
      { id: "t10", title: "Replace vulnerable algorithms", done: false, owner: "App Teams" },
      { id: "t11", title: "Update certificates", done: false, owner: "PKI Team" },
      { id: "t12", title: "Upgrade libraries", done: false, owner: "App Teams" },
      { id: "t13", title: "Update infrastructure", done: false, owner: "Platform SRE" },
    ],
  },
  {
    id: "ph-5",
    phase: "Phase 5",
    title: "Validate",
    status: "Planned",
    window: "2030",
    progress: 0,
    tasks: [
      { id: "t14", title: "Re-scan estate", done: false, owner: "Security Engineering" },
      { id: "t15", title: "Verify PQC adoption", done: false, owner: "Risk Office" },
      { id: "t16", title: "Generate compliance report", done: false, owner: "Compliance" },
    ],
  },
];

export const overallMigrationProgress = 38;

export const repoScanSteps: ScanStep[] = [
  { label: "Cloning repository", detail: "Fetching refs and shallow history" },
  { label: "Analyzing source code", detail: "48,291 files parsed across 6 languages" },
  { label: "Detecting cryptographic APIs", detail: "Matching 1,140 crypto API signatures" },
  { label: "Analyzing dependencies", detail: "Resolving transitive crypto libraries" },
  { label: "Checking certificates", detail: "Inspecting embedded keys and trust stores" },
  { label: "Building CBOM", detail: "Normalising components to CycloneDX 1.6" },
  { label: "Calculating quantum risk", detail: "Applying Mosca inequality per asset" },
];

export const infraScanSteps: ScanStep[] = [
  { label: "Authenticating connector", detail: "Assuming read-only audit role" },
  { label: "Enumerating workloads", detail: "Clusters, nodes, images and load balancers" },
  { label: "Inspecting TLS endpoints", detail: "Negotiated suites and key exchange groups" },
  { label: "Reading key stores", detail: "Metadata and fingerprints only — no key material" },
  { label: "Correlating with CBOM", detail: "Linking runtime findings to source components" },
  { label: "Scoring quantum risk", detail: "Environment and criticality weighting" },
];

export const scans: Scan[] = [
  { id: "scan-1", target: "astra/payment-service", type: "Repository", startedAt: "Today 09:14", duration: "4m 12s", filesScanned: 48291, assetsFound: 347, critical: 18, high: 61, status: "Complete" },
  { id: "scan-2", target: "eu-west-prod (EKS)", type: "Infrastructure", startedAt: "Today 07:02", duration: "9m 51s", filesScanned: 12840, assetsFound: 214, critical: 9, high: 38, status: "Complete" },
  { id: "scan-3", target: "registry/astra-payments:1.42", type: "Container", startedAt: "Yesterday 22:35", duration: "2m 47s", filesScanned: 9120, assetsFound: 96, critical: 4, high: 17, status: "Complete" },
  { id: "scan-4", target: "Public TLS estate", type: "Certificates", startedAt: "Yesterday 18:10", duration: "1m 06s", filesScanned: 231, assetsFound: 231, critical: 3, high: 21, status: "Complete" },
];

export const connectors: Connector[] = [
  { id: "aws", name: "AWS", kind: "Cloud", connected: true, lastScan: "2 h ago", assets: 412, risk: "critical" },
  { id: "azure", name: "Azure", kind: "Cloud", connected: true, lastScan: "8 h ago", assets: 188, risk: "high" },
  { id: "gcp", name: "GCP", kind: "Cloud", connected: false, lastScan: "Never", assets: 0, risk: "low" },
  { id: "k8s", name: "Kubernetes", kind: "Orchestration", connected: true, lastScan: "1 h ago", assets: 264, risk: "high" },
  { id: "docker", name: "Docker Registry", kind: "Registry", connected: true, lastScan: "12 h ago", assets: 143, risk: "medium" },
  { id: "linux", name: "Linux Fleet", kind: "Host", connected: true, lastScan: "1 d ago", assets: 209, risk: "high" },
  { id: "windows", name: "Windows Fleet", kind: "Host", connected: false, lastScan: "Never", assets: 0, risk: "low" },
];

export const reports: Report[] = [
  { id: "rep-exec", title: "Executive Security Report", description: "Board-level summary of quantum readiness, exposure and investment needs.", audience: "Executive / Board", pages: 12, updated: "Today 09:40", formats: ["PDF", "JSON"] },
  { id: "rep-inv", title: "Cryptographic Inventory Report", description: "Complete inventory of discovered cryptographic assets with owners and locations.", audience: "Security Engineering", pages: 84, updated: "Today 09:41", formats: ["PDF", "CSV", "JSON"] },
  { id: "rep-cbom", title: "CBOM Report", description: "Machine-readable CycloneDX 1.6 cryptographic bill of materials.", audience: "Tooling / Auditors", pages: 0, updated: "Today 09:41", formats: ["JSON", "CSV"] },
  { id: "rep-risk", title: "Quantum Risk Report", description: "Mosca-based risk analysis, threat windows and prioritised exposure.", audience: "Risk Office", pages: 34, updated: "Today 09:42", formats: ["PDF", "JSON"] },
  { id: "rep-pqc", title: "PQC Migration Report", description: "Recommended algorithms, sequencing, effort estimates and dependencies.", audience: "Architecture", pages: 41, updated: "Today 09:42", formats: ["PDF", "CSV", "JSON"] },
];

export const notifications: Notification[] = [
  { id: "n1", severity: "critical", title: "RSA-2048 detected in Payment Service", body: "CRYPTO-001 scored 94/100 with a 15-year data lifetime.", time: "6 min ago" },
  { id: "n2", severity: "high", title: "27 certificates require PQC migration planning", body: "Public TLS estate scan flagged RSA and ECDSA leaf certificates.", time: "42 min ago" },
  { id: "n3", severity: "medium", title: "Outdated OpenSSL configuration detected", body: "OpenSSL 1.1.1 (end of life) still active on api-gateway.", time: "2 h ago" },
  { id: "n4", severity: "success", title: "Repository scan completed successfully", body: "astra/payment-service — 347 crypto assets discovered.", time: "3 h ago" },
];

export const graphNodes: GraphNode[] = [
  { id: "g-pay", label: "Payment Service", kind: "service", x: 12, y: 22, severity: "critical", criticality: "Critical", riskScore: 94, applications: ["Payment Gateway"], services: ["settlement-worker", "ledger-api"], certificates: ["pay.astra-fintech.io"] },
  { id: "g-ecdsa", label: "ECDSA P-256", kind: "algorithm", x: 34, y: 12, severity: "high", criticality: "Critical", riskScore: 89, applications: ["Payment Gateway", "Customer Authentication"], services: ["auth-service", "settlement-worker"], certificates: ["auth.astra-fintech.io"] },
  { id: "g-rsa", label: "RSA-2048", kind: "algorithm", x: 34, y: 40, severity: "critical", criticality: "Critical", riskScore: 94, applications: ["Payment Gateway", "Banking API"], services: ["payment-service", "api-gateway"], certificates: ["pay.astra-fintech.io", "admin.astra-fintech.io"] },
  { id: "g-openssl", label: "OpenSSL 3.2", kind: "library", x: 55, y: 26, severity: "medium", criticality: "High", riskScore: 61, applications: ["Payment Gateway", "Banking API", "Data Storage"], services: ["payment-service", "accounts-api", "storage-service"], certificates: ["api.astra-fintech.io"] },
  { id: "g-tls", label: "TLS 1.2", kind: "protocol", x: 55, y: 58, severity: "high", criticality: "High", riskScore: 74, applications: ["Payment Gateway", "Banking API"], services: ["api-gateway", "partner-gateway"], certificates: ["pay.astra-fintech.io", "legacy-batch.astra"] },
  { id: "g-gw", label: "API Gateway", kind: "gateway", x: 76, y: 40, severity: "high", criticality: "High", riskScore: 82, applications: ["Banking API"], services: ["transfers-api", "accounts-api"], certificates: ["api.astra-fintech.io"] },
  { id: "g-db", label: "Banking Database", kind: "datastore", x: 90, y: 70, severity: "critical", criticality: "Critical", riskScore: 88, applications: ["Banking API", "Data Storage"], services: ["accounts-api", "archive-vault"], certificates: ["storage.astra-fintech.io"] },
  { id: "g-auth", label: "Auth Service", kind: "service", x: 12, y: 66, severity: "critical", criticality: "Critical", riskScore: 89, applications: ["Customer Authentication"], services: ["mfa-service", "session-store"], certificates: ["auth.astra-fintech.io"] },
  { id: "g-hsm", label: "HSM Cluster", kind: "datastore", x: 76, y: 84, severity: "critical", criticality: "Critical", riskScore: 88, applications: ["Payment Gateway"], services: ["settlement-worker"], certificates: ["internal-mtls-root"] },
];

export const graphEdges: GraphEdge[] = [
  { from: "g-pay", to: "g-ecdsa" },
  { from: "g-pay", to: "g-rsa" },
  { from: "g-auth", to: "g-ecdsa" },
  { from: "g-auth", to: "g-rsa" },
  { from: "g-ecdsa", to: "g-openssl" },
  { from: "g-rsa", to: "g-openssl" },
  { from: "g-rsa", to: "g-tls" },
  { from: "g-openssl", to: "g-gw" },
  { from: "g-tls", to: "g-gw" },
  { from: "g-gw", to: "g-db" },
  { from: "g-tls", to: "g-hsm" },
  { from: "g-gw", to: "g-hsm" },
];

export const auditLog: AuditEntry[] = [
  { id: "a1", actor: "ana.f@astra-fintech.io", action: "Started repository scan", target: "astra/payment-service", time: "Today 09:14", ip: "10.2.44.8" },
  { id: "a2", actor: "swayam@astra-fintech.io", action: "Exported CBOM (JSON)", target: "Astra Financial Technologies", time: "Today 09:42", ip: "10.2.51.19" },
  { id: "a3", actor: "rahul.m@astra-fintech.io", action: "Viewed quantum risk report", target: "Quantum Risk Report", time: "Today 08:20", ip: "10.2.19.4" },
  { id: "a4", actor: "ana.f@astra-fintech.io", action: "Updated risk threshold", target: "Critical ≥ 85", time: "Yesterday 17:55", ip: "10.2.44.8" },
  { id: "a5", actor: "system", action: "Scheduled certificate sweep", target: "Public TLS estate", time: "Yesterday 18:10", ip: "internal" },
];

export const apiKeys = [
  { id: "key-1", name: "CI pipeline scanner", prefix: "ecdat_live_9f2c", created: "2026-04-11", lastUsed: "2 h ago", scopes: ["scan:write", "cbom:read"] },
  { id: "key-2", name: "GRC export job", prefix: "ecdat_live_41ab", created: "2026-02-02", lastUsed: "1 d ago", scopes: ["reports:read"] },
];

import { certificates, cryptoAssets, libraries, organization } from "./data";

/** CycloneDX-1.6-shaped CBOM built from the demo dataset. */
export function buildCbom() {
  return {
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    version: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      tools: [{ vendor: "ECDAT", name: "Enterprise Cryptographic Discovery & Analysis Tool", version: "1.4.0" }],
      component: { type: "application", name: organization.name, "bom-ref": organization.id },
    },
    components: [
      ...cryptoAssets.map((a) => ({
        type: "cryptographic-asset",
        "bom-ref": a.id,
        name: `${a.algorithm}-${a.keySize}`,
        cryptoProperties: {
          assetType: a.algorithm.startsWith("ML-") ? "algorithm-pqc" : "algorithm",
          algorithmProperties: {
            primitive: a.protocol,
            parameterSetIdentifier: a.keySize,
            cryptoFunctions: [a.protocol],
            nistQuantumSecurityLevel: a.quantumStatus === "vulnerable" ? 0 : 3,
          },
          oid: undefined,
        },
        properties: [
          { name: "ecdat:location", value: a.location },
          { name: "ecdat:application", value: a.application },
          { name: "ecdat:environment", value: a.environment },
          { name: "ecdat:library", value: `${a.library} ${a.version}` },
          { name: "ecdat:quantumStatus", value: a.quantumStatus },
          { name: "ecdat:riskScore", value: String(a.riskScore) },
          { name: "ecdat:dataLifetimeYears", value: String(a.dataLifetimeYears) },
          { name: "ecdat:recommendation", value: a.recommendation },
        ],
      })),
      ...libraries.map((l) => ({
        type: "library",
        "bom-ref": l.id,
        name: l.name,
        version: l.version,
        properties: [
          { name: "ecdat:components", value: String(l.components) },
          { name: "ecdat:vulnerableComponents", value: String(l.vulnerable) },
          { name: "ecdat:supportStatus", value: l.status },
        ],
      })),
      ...certificates.map((c) => ({
        type: "cryptographic-asset",
        "bom-ref": c.id,
        name: c.commonName,
        cryptoProperties: {
          assetType: "certificate",
          certificateProperties: {
            subjectName: c.commonName,
            issuerName: c.issuer,
            notValidAfter: c.expiry,
            signatureAlgorithmRef: `${c.algorithm}-${c.keySize}`,
          },
        },
        properties: [
          { name: "ecdat:tls", value: c.tls },
          { name: "ecdat:quantumStatus", value: c.quantumStatus },
          { name: "ecdat:status", value: c.status },
        ],
      })),
    ],
  };
}

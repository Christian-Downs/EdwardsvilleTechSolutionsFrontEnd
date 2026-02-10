import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Edwardsville Tech Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: 60,
        }}
      >
        {/* Logo */}
        <img
          src="https://www.edwardsvilletechsolutions.com/logo.png"
          alt="Logo"
          width={120}
          height={120}
          style={{ marginBottom: 32 }}
        />

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Edwardsville Tech Solutions
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#94a3b8",
              marginTop: 16,
              maxWidth: 800,
            }}
          >
            Web Development • AI Chatbots • Automation
          </p>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            padding: "12px 28px",
            background: "#10b981",
            borderRadius: 9999,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 600, color: "#ffffff" }}>
            Local expertise. Modern solutions.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Edwardsville Tech Solutions — tech help that works like a good repair shop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#F4EEDF",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            border: "4px solid #18202F",
            background: "#FBF8EF",
            boxShadow: "14px 16px 0 rgba(24,32,47,.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#18202F",
              color: "#FBF8EF",
              padding: "18px 36px",
              fontSize: 30,
              letterSpacing: 4,
            }}
          >
            <span>WORK ORDER</span>
            <span style={{ color: "#F5DC6B" }}>EDWARDSVILLE, ILL.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "36px 44px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 30, color: "#1B3F8F", letterSpacing: 2 }}>EDWARDSVILLE TECH SOLUTIONS</div>
              <div style={{ fontSize: 84, fontWeight: 800, color: "#18202F", lineHeight: 1.02, marginTop: 18 }}>
                Tech help that works like a good repair shop.
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ fontSize: 30, color: "#4A5366" }}>Websites · AI helpers · Custom tools</div>
              <div
                style={{
                  display: "flex",
                  border: "6px solid #C4362B",
                  color: "#C4362B",
                  fontSize: 38,
                  fontWeight: 800,
                  letterSpacing: 4,
                  padding: "8px 22px",
                  transform: "rotate(-7deg)",
                }}
              >
                PLAIN ENGLISH
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

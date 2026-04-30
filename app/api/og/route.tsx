import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ?? "Trade only A+ setups. Copy our master strategy.";
  const subtitle =
    searchParams.get("subtitle") ??
    "AI-driven SMC/ICT strategy on HFM HFcopy. 9 pairs. London + NY sessions.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0A0B0F",
          padding: 80,
          color: "#F5F6F8",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: 0,
            right: 0,
            height: 600,
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(29,158,117,0.18) 0%, rgba(29,158,117,0) 70%)",
          }}
        />
        {/* monogram + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg viewBox="0 0 24 24" width="44" height="44">
            <path
              d="M3 18 L9 12 L13 15 L21 6"
              stroke="#1D9E75"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="21" cy="6" r="2" fill="#1D9E75" />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -0.5 }}>
            HayPlusbot
          </span>
        </div>
        {/* title + subtitle */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 28,
              color: "#A4A9B8",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </span>
        </div>
        {/* bottom strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 56,
            fontSize: 20,
            color: "#6B7080",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          <span>HFM-authorised strategy provider</span>
          <span style={{ color: "#1D9E75" }}>·</span>
          <span>Master account runs 24/5</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

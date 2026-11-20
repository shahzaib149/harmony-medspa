import { ImageResponse } from "next/og";

// Black-and-gold share image for /black-friday ("Harmony Noir"). No people or product
// photos: type and gold rules only, so it is safe until Hayden's artwork arrives.
export const alt = "Harmony Med Spa Black Friday Beauty Event: member early access Nov 23–26, public sale Nov 27–30, Sarasota";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#D9BC7A";
const GOLD_LIGHT = "#EAD7A4";
const IVORY = "#F5F1E8";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background: "radial-gradient(ellipse at 78% 30%, rgba(217,188,122,0.20) 0%, rgba(10,10,11,0) 55%), #0A0A0B",
          color: IVORY,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 28, border: "1px solid rgba(217,188,122,0.35)", borderRadius: 24, display: "flex" }} />
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: GOLD, textTransform: "uppercase" }}>
          Harmony Med Spa · Sarasota
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28, lineHeight: 1.02 }}>
          <span style={{ fontSize: 112, color: GOLD_LIGHT, fontWeight: 700 }}>Black Friday</span>
          <span style={{ fontSize: 96, color: GOLD, fontStyle: "italic" }}>Beauty Event</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 40, gap: 22, fontSize: 30, color: IVORY }}>
          <span>Member Early Access · Nov 23–26</span>
          <span style={{ display: "flex", width: 12, height: 12, background: GOLD, transform: "rotate(45deg)" }} />
          <span>Public Sale · Nov 27–30</span>
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 24, color: "rgba(245,241,232,0.68)" }}>
          Injectables · Facials · Laser & Devices · Gift Cards · Wellness
        </div>
      </div>
    ),
    size,
  );
}

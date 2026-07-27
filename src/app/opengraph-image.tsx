import { ImageResponse } from "next/og";

// Imagem Open Graph gerada dinamicamente (sem necessidade de ficheiro).
export const alt = "3C Trix Studio — Criação e Redesign de Websites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B4F1C",
          padding: "72px",
          color: "#FBFCFA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#FBFCFA",
              color: "#0B4F1C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            3C
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>3C Trix Studio</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.12,
            }}
          >
            <span>O seu negócio merece um</span>
            <span>website à altura.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#8FA38A" }}>
            Criação e redesign de websites · Lisboa e Portugal
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#050814",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(45, 212, 191, 0.12), transparent 45%), radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.1), transparent 50%)",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          border: "8px solid rgba(45, 212, 191, 0.2)",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#2dd4bf",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            <span>&gt;_</span>
            <span>PORTFOLIO</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(45, 212, 191, 0.12)",
              border: "1px solid rgba(45, 212, 191, 0.35)",
              color: "#5eead4",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            <span>MS CS @ UIC • 4.0 GPA</span>
          </div>
        </div>

        {/* Center Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "66px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Abhineet Menon
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#2dd4bf",
              letterSpacing: "-0.01em",
            }}
          >
            Full-Stack &amp; AI Data Engineer
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.5,
              marginTop: "6px",
            }}
          >
            Specializing in High-Throughput Pipelines, RAG Architectures, Snowflake Migrations, and Real-Time Web Applications.
          </div>
        </div>

        {/* Bottom Bar: Badges & URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {["Python", "Snowflake", "SQL", "Next.js", "TypeScript", "RAG / LLMs", "AWS"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#cbd5e1",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            menonabhineet.github.io/portfolio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

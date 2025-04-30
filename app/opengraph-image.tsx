import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Word Assassins - The ultimate social deduction game";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const interBold = await readFile(
    join(process.cwd(), "public/fonts/Inter-Bold.ttf")
  );
  const interMedium = await readFile(
    join(process.cwd(), "public/fonts/Inter-Medium.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Inter, sans-serif",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Grid Lines */}
        <div
          style={{
            position: "absolute",
            top: "70px",
            left: "0",
            right: "0",
            height: "1px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "0",
            right: "0",
            height: "1px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "70px",
            top: "0",
            bottom: "0",
            width: "1px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "70px",
            top: "0",
            bottom: "0",
            width: "1px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            maxWidth: "900px",
            gap: "24px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: "bold",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              marginBottom: "80px",
            }}
          >
            Word Assassins
          </div>
          <div
            style={{
              fontSize: "40px",
              fontWeight: "medium",
              opacity: 0.8,
              maxWidth: "1000px",
              lineHeight: 1.2,
              marginBottom: "40px",
            }}
          >
            The ultimate social deduction game
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1120px",
            paddingTop: "20px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.9,
              fontSize: "24px",
            }}
          >
            <div>Eliminate targets. Stay alive. Be the last one standing.</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: interMedium,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}

import OpenAI, { toFile } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { productImage, logo, productName, category } = await req.json();

    if (!productImage || !logo) {
      return NextResponse.json({ error: "Missing images" }, { status: 400 });
    }

    // Convert base64 data URLs to File objects for OpenAI
    const productBase64 = productImage.replace(/^data:image\/\w+;base64,/, "");
    const logoBase64 = logo.replace(/^data:image\/\w+;base64,/, "");

    const productFile = await toFile(
      Buffer.from(productBase64, "base64"),
      "product.png",
      { type: "image/png" }
    );
    const logoFile = await toFile(
      Buffer.from(logoBase64, "base64"),
      "logo.png",
      { type: "image/png" }
    );

    const garmentType = category?.toLowerCase().includes("hoodie")
      ? "hoodie"
      : "t-shirt";

    const result = await openai.images.edit({
      model: "gpt-image-1",
      image: [productFile, logoFile],
      prompt: `Create a photorealistic product mockup photo. Take the ${garmentType} from the first image and place the logo/design from the second image on the center chest area of the garment. The logo should look naturally screen-printed or embroidered on the fabric — it should follow the fabric's texture, folds, and lighting. Maintain the exact same background, lighting, and camera angle as the original product photo. The result should look like a professional e-commerce product photo.`,
      size: "1024x1024",
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image returned from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error: unknown) {
    console.error("Render logo error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate mockup";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

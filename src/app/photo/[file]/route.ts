import { readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

export async function GET(
  _request: Request,
  { params }: { params: { file: string } }
): Promise<Response> {
  const requested = params.file;
  const normalized = path.posix.basename(requested);

  // Block traversal and only allow known image extensions.
  if (normalized !== requested) {
    return new Response("Invalid file path", { status: 400 });
  }

  const ext = path.extname(normalized).toLowerCase();
  const contentType = CONTENT_TYPES[ext];

  if (!contentType) {
    return new Response("Unsupported image type", { status: 415 });
  }

  const absolutePath = path.join(process.cwd(), "photo", normalized);

  try {
    const fileBuffer = await readFile(absolutePath);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return new Response("Image not found", { status: 404 });
  }
}

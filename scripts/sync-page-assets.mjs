import { execFile } from "node:child_process";
import { mkdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const destination = path.join(root, "public", "images", "pages", "divisions");

const assets = [
  {
    source: "https://cca.it.com/wp-content/uploads/2025/11/portrait-male-programmer-office-1536x1024.jpg.webp",
    file: "software-development.webp",
  },
  {
    source: "https://cca.it.com/wp-content/uploads/2025/11/html-css-collage-concept-with-person.jpg",
    file: "ai-data-science.jpg",
    resize: true,
  },
  {
    source: "https://cca.it.com/wp-content/uploads/2025/11/portrait-hacker-1536x1025.jpg.webp",
    file: "systems-engineering.webp",
  },
  {
    source: "https://cca.it.com/wp-content/uploads/2025/11/happy-man-with-laptop-computer-office-1-1536x1025.jpg.webp",
    file: "creative-media-design.webp",
  },
  {
    source: "https://cca.it.com/wp-content/uploads/2025/11/man-woman-discussing-business-project-1536x1025.jpg.webp",
    file: "marketing-business.webp",
  },
];

await mkdir(destination, { recursive: true });

for (const asset of assets) {
  const output = path.join(destination, asset.file);
  const temporary = asset.resize ? `${output}.source.jpg` : `${output}.download`;
  const response = await fetch(asset.source, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; CCA asset synchronizer/1.0)",
      referer: "https://cca.it.com/divisions/",
    },
  });

  if (!response.ok) throw new Error(`Unable to download ${asset.source}: ${response.status}`);

  await writeFile(temporary, Buffer.from(await response.arrayBuffer()));

  if (asset.resize && process.platform === "darwin") {
    await execFileAsync("sips", ["-Z", "1800", "-s", "formatOptions", "90", temporary, "--out", output]);
    await unlink(temporary);
  } else {
    await rename(temporary, output);
  }

  const result = await stat(output);
  if (result.size < 20_000) throw new Error(`Downloaded asset is unexpectedly small: ${asset.file}`);
  console.log(`${asset.file}: ${Math.round(result.size / 1024)} KB`);
}

import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

export const config = {
api: {
bodyParser: false,
},
};

function streamToString(stream: Readable): Promise<string> {
const chunks: any[] = [];
return new Promise((resolve, reject) => {
stream.on("data", (chunk) => chunks.push(chunk));
stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
stream.on("error", reject);
});
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== "POST") {
return res.status(405).send("Only POST requests allowed");
}

const fileContent = await streamToString(req);
const translated = fileContent
.split("\n")
.map((line) => {
if (/^\d+$/.test(line) || line.includes("-->")) return line;
return "– " + line + " [Монгол орчуулга]";
})
.join("\n");

res.setHeader("Content-Type", "text/plain; charset=utf-8");
res.status(200).send(translated);
}

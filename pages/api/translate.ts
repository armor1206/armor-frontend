import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== "POST") {
return res.status(405).send("Only POST requests allowed");
}

const { message } = req.body;

const apiKey = process.env.OPENAI_API_KEY;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${apiKey}`,
},
body: JSON.stringify({
model: "gpt-4",
messages: [
{
role: "system",
content: "Чи кино орчуулагч AI. Хятад киноны яриаг яг дүрийн сэтгэл хөдлөл, ярианы хэлээр монгол руу хөрвүүлдэг.",
},
{
role: "user",
content: message,
},
],
}),
});

const data = await response.json();
const translated = data.choices?.[0]?.message?.content || "Орчуулга амжилтгүй боллоо.";

res.status(200).json({ result: translated });
}

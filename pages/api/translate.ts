import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== "POST") {
return res.status(405).send("Only POST requests allowed");
}

const { message } = req.body;

try {
const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
},
body: JSON.stringify({
model: "gpt-3.5-turbo",
messages: [
{
role: "system",
content: "Чи мэргэжлийн орчуулагч. Хятад өгүүлбэрийг ярианы байдалтай монгол хэл рүү хөрвүүл.",
},
{
role: "user",
content: message,
},
],
}),
});

const data = await response.json();
console.log(">>> OpenAI API хариу:", JSON.stringify(data));
const translated = data.choices?.[0]?.message?.content || "Орчуулга олдсонгүй.";

res.status(200).json({ result: translated });
} catch (error) {
res.status(500).json({ result: "Орчуулга амжилтгүй боллоо." });
}
}

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== "POST") {
return res.status(405).send("Only POST requests allowed");
}

const { message } = req.body;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
},
body: JSON.stringify({
model: "gpt-4",
messages: [
{
role: "system",
content: "Чи хятад киноны хадмалын орчуулга хариуцдаг, маш сайн найруулгатай, сэтгэл хөдлөл илэрхийлсэн ярианы орчуулга хийх чадвартай орчуулагч байна.",
},
{
role: "user",
content: message,
},
],
}),
});

const data = await response.json();
const translated = data.choices[0].message.content;

res.status(200).json({ result: translated });
}

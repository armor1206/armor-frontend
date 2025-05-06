import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method !== "POST") {
return res.status(405).send("Only POST requests allowed");
}

const { message } = req.body;
const translated = `[Орчуулсан]: ${message}`; // Түр зуурын тест хариу

res.status(200).json({ result: translated });
}

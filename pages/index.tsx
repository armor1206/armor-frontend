import { useState } from "react";

export default function Home() {
const [input, setInput] = useState("");
const [result, setResult] = useState("");

const handleTranslate = async () => {
const res = await fetch("/api/translate", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ message: input }),
});

const data = await res.json();
setResult(data.result);
};

return (
<div style={{ padding: 20 }}>
<h1>ARMOR STUDIO Frontend</h1>
<textarea
rows={4}
cols={50}
value={input}
onChange={(e) => setInput(e.target.value)}
placeholder="Орчуулах өгүүлбэрээ бичнэ үү..."
/>
<br />
<button onClick={handleTranslate}>Орчуулах</button>
<div style={{ marginTop: 20 }}>
<strong>Хариу:</strong> {result}
</div>
</div>
);
}

import { useState } from "react";

export default function Home() {
const [file, setFile] = useState(null);
const [result, setResult] = useState("");

function handleFileChange(e) {
setFile(e.target.files[0]);
}

async function handleSubmit(e) {
e.preventDefault();
const formData = new FormData();
formData.append("file", file);

const res = await fetch("https://armor-srt-upload.vercel.app/api/translate", {
method: "POST",
body: formData,
});

const data = await res.text();
setResult(data);
}

return (
<div>
<h1>ARMOR STUDIO Frontend ажиллаж байна</h1>
<form onSubmit={handleSubmit}>
<input type="file" name="srtFile" accept=".srt" onChange={handleFileChange} />
<button type="submit">Орчуулга хийх</button>
</form>
<pre>{result}</pre>
</div>
);
}

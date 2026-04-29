const safeJson = (raw) => {
  if (!raw) throw new Error("Empty response from AI provider");

  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const firstBracket = cleaned.indexOf("[");

  let start = -1;

  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    start = firstBrace;
  } else {
    start = firstBracket;
  }

  if (start === -1) {
    throw new Error("No JSON found in AI response");
  }

  let candidate = cleaned.slice(start);

  try {
    return JSON.parse(candidate);
  } catch (err) {
    const lastObj = candidate.lastIndexOf("}");
    const lastArr = candidate.lastIndexOf("]");
    const end = Math.max(lastObj, lastArr);

    if (end !== -1) {
      candidate = candidate.slice(0, end + 1);
    }

    return JSON.parse(candidate);
  }
};

module.exports = safeJson;

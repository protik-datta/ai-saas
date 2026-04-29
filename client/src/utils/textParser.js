export const parseToPlainText = (input) => {
  if (!input) return "";

  let data = input;

  // 1. If it's a JSON string, try to parse it
  if (typeof input === "string" && (input.trim().startsWith("{") || input.trim().startsWith("["))) {
    try {
      data = JSON.parse(input);
    } catch (e) {
      data = input;
    }
  }

  // 2. Format based on type
  let text = "";
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data)) {
      text = data.map(item => typeof item === 'object' ? parseToPlainText(item) : `• ${item}`).join("\n");
    } else {
      // It's an object - format as "Key: Value"
      text = Object.entries(data)
        .map(([key, value]) => {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          if (typeof value === 'object' && value !== null) {
            return `${formattedKey}:\n${parseToPlainText(value)}`;
          }
          return `${formattedKey}: ${value}`;
        })
        .join("\n");
    }
  } else {
    text = String(data);
  }

  // 3. Remove Markdown formatting
  text = text
    .replace(/#{1,6}\s?/g, "") // Headers
    .replace(/\*\*/g, "") // Bold
    .replace(/\*/g, "") // Italics
    .replace(/_{1,2}/g, "") // Underline
    .replace(/`{1,3}[^`]*`{1,3}/g, (match) => match.replace(/`/g, "")) // Code blocks
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1") // Links
    .replace(/>\s?/g, "") // Blockquotes
    .replace(/-\s?/g, "• ") // List items

  // 4. Remove HTML tags
  text = text.replace(/<[^>]*>/g, "");

  // 5. Clean up whitespace
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  return text;
};

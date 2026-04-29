const mammoth = require("mammoth");

const parseDocx = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({
      buffer,
    });

    return result.value?.slice(0, 8000) || "";
  } catch (error) {
    console.error("DOCX parse error:", error);
    return "";
  }
};

module.exports = { parseDocx };

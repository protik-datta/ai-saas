const { parseDocx } = require("./parseDocx");
const { parsePdf } = require("./parsePdf");

const fileParse = async (file) => {
  const mime = file.mimetype;

  if (mime === "application/pdf") {
    return await parsePdf(file.buffer);
  }

  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const text = await parseDocx(file.buffer);
    return { text };
  }

  return { text: file.buffer.toString("utf-8").slice(0, 8000) };
};

module.exports = { fileParse };

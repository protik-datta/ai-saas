const pdfParse = require("pdf-parse");

const parsePdf = async (buffer) => {
  const data = await pdfParse(buffer);

  return {
    text: data.text?.slice(0, 8000) || "",
    pages: data.numpages || 0,
    info: data.info || {},
  };
};

module.exports = { parsePdf };

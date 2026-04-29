const FormData = require("form-data");
const axios = require("axios");
require('dotenv').config({path: '../../.env'})

const generateImageBuffer = async (finalPrompt) => {
  const formData = new FormData();

  formData.append("prompt", finalPrompt);

  const response = await axios.post(
    "https://clipdrop-api.co/text-to-image/v1",
    formData,
    {
      headers: {
        "x-api-key": process.env.CLIPDROP_API,
        ...formData.getHeaders(),
      },
      responseType: "arraybuffer",
      timeout: 60000,
    },
  );

  if (response.status !== 200) {
    throw new AppError("ClipDrop image generation failed", 502);
  }

  return Buffer.from(response.data);
};

module.exports = generateImageBuffer;

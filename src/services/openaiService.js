import axios from "axios";
import config from "../config/config.js";

async function generatePost(topic) {
  console.log("Calling generatePost...");
  try {
    const response = await axios.post(
      config.openaiApiUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Please always respond in Ukrainian.",
          },
          {
            role: "user",
            content: `${topic}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.AI_API_KEY}`,
        },
      }
    );
    console.log("Response from OpenAI received:", response.data);
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      "Error in generatePost:",
      error.response ? error.response.data : error.message
    );
    return "Добрий ранок, колеги! Бажаю всім гарного настрою і продуктивного робочого дня!";
  }
}

export default generatePost;

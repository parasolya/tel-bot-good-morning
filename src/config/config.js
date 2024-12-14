import dotenv from 'dotenv'


dotenv.config();

export default {
TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
AI_API_KEY: process.env.AI_API_KEY,
openaiApiUrl: "https://api.openai.com/v1/chat/completions",
}
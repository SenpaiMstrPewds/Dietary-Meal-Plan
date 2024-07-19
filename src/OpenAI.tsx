import axios from "axios";
import { OPENAI_APIKEY } from "./EnvironmentVariables";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
});

export const getChatReply = async (message: string): Promise<string> => {
  const apiKey = OPENAI_APIKEY;

  const instructions = `Your responses should focus exclusively on providing advice related to dietary and food topics. 
    For instance, if a user inquires about what to eat to address being underweight, 
    you are expected to offer a list of foods that can help them attain a healthy weight. 
    This is the sole subject you are authorized to address. 
    It's essential to remind users to consult with a dietitian for more precise advice on their individual dietary needs. This is the only subject you are authorized to address.`;

  const prompt = `${instructions}\n \n ${message}`;

  const data = {
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const response = await openai.post("", data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    let reply = response.data.choices[0].message.content.trim();

    return reply;
  } catch (error) {
    console.error("Error fetching AI reply:", error);
    return "Error fetching AI reply.";
  }
};

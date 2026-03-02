import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateQuestions = async (params: {
  subject: string;
  classLevel: string;
  topic: string;
  count: number;
  type: 'mcq' | 'written' | 'creative';
}) => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Generate ${params.count} ${params.type} questions in Bengali language for:
  Subject: ${params.subject}
  Class: ${params.classLevel}
  Topic/Chapter: ${params.topic}`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: "You are an expert educational content creator for the Bangladeshi curriculum. Always respond in standard Bengali. Ensure the JSON is valid and questions are high quality.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Only for MCQ type"
            },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["question", "answer"]
        }
      }
    }
  });

  const text = response.text;
  if (!text) return [];
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse AI response:", text);
    return [];
  }
};

export const evaluateAnswer = async (question: string, userAnswer: string, correctAnswer: string) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Question: ${question}\nCorrect Answer: ${correctAnswer}\nStudent's Answer: ${userAnswer}\nEvaluate this answer and provide a score out of 10 and feedback.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING }
        },
        required: ["score", "feedback"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

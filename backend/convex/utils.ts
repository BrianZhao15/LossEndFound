// // backend/convex/utils.ts
// const { CohereClient } = require("cohere-ai");
// import dotenv from 'dotenv';

// dotenv.config();


// const cohere = new CohereClient({
//   token: process.env.COHERE_API_KEY,
// });

// // cohere.init()


// export const detectLanguage = async (text: string): Promise<string> => {
//   const response = await cohere.detectLanguage({ texts: [text] });
//   return response.body.results[0].language_code;
// };

// export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
//   const response = await cohere.generate({
//     model: 'xlarge',
//     prompt: `Translate the following text to ${targetLanguage}:\n\n${text}`,
//     max_tokens: 500,
//     temperature: 0.3,
//   });
//   return response.body.generations[0].text.trim();
// };

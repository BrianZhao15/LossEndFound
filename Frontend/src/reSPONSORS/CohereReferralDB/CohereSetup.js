import axios from 'axios';

const API_KEY = 'z8n2w30S7Q59PTydYSfG4PHekEVo1ZvbTXNbFRfW';
const BASE_URL = 'https://dashboard.cohere.com/playground/chat?_gl=1*1minuob*_gcl_au*MTcwNzQwNDQzNC4xNzI2MzUxMDIx*_ga*MTk5NDM1Mjk3LjE3MjYzNTEwMjE.*_ga_CRGS116RZS*MTcyNjM1NDQxMi4yLjEuMTcyNjM1NzM4Ni4zMy4wLjA.';

export const generateText = async (prompt) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: 'command-xlarge-nightly',
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7,
        p: 0.9,
        stop_sequences: [],
        return_likelihoods: 'NONE',
      },
      {
        headers: {
          Authorization: `Bearer ${z8n2w30S7Q59PTydYSfG4PHekEVo1ZvbTXNbFRfW}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data.generations[0].text;
  } catch (error) {
    console.error('Error generating text:', error);
    return null;
  }
};
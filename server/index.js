import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

        if (!OPENROUTER_API_KEY) {
            console.error('OPENROUTER_API_KEY not found in environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // System prompt for Elara - Clínica context
        const systemMessage = {
            role: 'system',
            content: `Você é Elara, assistente virtual da Clínica Vida & Saúde. Seja profissional, prestativa e concisa. 
      
Sua função é ajudar pacientes com:
- Agendamento de consultas (temos clínico geral, cardiologia, dermatologia e pediatria)
- Informações sobre horários (seg-sex 8h-18h, sáb 8h-12h)
- Orientações sobre exames laboratoriais e de imagem
- Dúvidas gerais sobre a clínica

Seja sempre gentil, use emojis moderadamente e mantenha respostas curtas (2-3 frases no máximo).`
        };

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:8080',
                'X-Title': 'Clínica Vida & Saúde - Elara AI'
            },
            body: JSON.stringify({
                model: 'qwen/qwen-2-7b-instruct:free',
                messages: [systemMessage, ...messages],
                temperature: 0.7,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API error:', errorData);
            return res.status(response.status).json({
                error: 'Failed to get response from AI',
                details: errorData
            });
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            return res.status(500).json({ error: 'Invalid response from AI' });
        }

        res.json({
            message: data.choices[0].message.content
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
});

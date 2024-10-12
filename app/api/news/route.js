// app/api/news/route.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function GET() {
    const API_KEY = process.env.NEWS_API_KEY; // Ensure this is set in your Vercel environment
    const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(NEWS_API_URL);
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch news headlines' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

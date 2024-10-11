// components/News.js
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './News.module.css';

const News = () => {
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_KEY = process.env.NEWS_API_KEY; // Use environment variable
    const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const response = await axios.get(NEWS_API_URL);
                setHeadlines(response.data.articles);
            } catch (err) {
                setError('Failed to fetch news headlines. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchHeadlines();
    }, [NEWS_API_URL]); // Include NEWS_API_URL in dependencies

    return (
        <div className={styles.container}>
            <h2>Latest News Headlines</h2>
            {loading && <div className={styles.spinner}></div>}
            {error && <p className={styles.error}>{error}</p>}
            <ul className={styles.headlines}>
                {headlines.slice(0, 5).map((article) => (
                    <li key={article.url} className={styles.article}>
                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                            <h3 className={styles.link}>{article.title}</h3>
                        </Link>
                        <p>
                            <strong>Source:</strong> {article.source.name} <br />
                            <strong>Published:</strong> {new Date(article.publishedAt).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default News;

// app/components/News.js
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './News.module.css';

const News = () => {
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const response = await axios.get('/api/news'); // Call the new API route
                setHeadlines(response.data.articles);
            } catch (err) {
                console.error('Error fetching headlines:', err);
                setError('Failed to fetch news headlines. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchHeadlines();
    }, []);

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

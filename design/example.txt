import React, { useState, useEffect } from 'react';

const DailyQuote = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const today = new Date().toDateString();
        const cachedQuote = localStorage.getItem('cached_quote');
        const cachedDate = localStorage.getItem('cached_quote_date');

        // 1. Check if we already have a valid quote saved for today
        if (cachedQuote && cachedDate === today) {
          setQuoteData(JSON.parse(cachedQuote));
          setLoading(false);
          return;
        }

        // 2. Fetch from ZenQuotes if no cache exists (Using a CORS proxy for local development)
        // Note: ZenQuotes requires a CORS proxy when called directly from a browser frontend
        const response = await fetch('https://corsproxy.io');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // ZenQuotes returns an array: [{ q: "quote", a: "author", ... }]
        const pickedQuote = data[0]; 

        // 3. Save the new quote and today's date to LocalStorage
        localStorage.setItem('cached_quote', JSON.stringify(pickedQuote));
        localStorage.setItem('cached_quote_date', today);

        setQuoteData(pickedQuote);
      } catch (err) {
        setError('Could not load daily motivation. Keep pushing toward your goals!');
        console.error('Quote fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <div className="text-gray-500 italic text-sm">Loading daily motivation...</div>;
  if (error) return <div className="text-amber-600 text-sm italic">{error}</div>;

  return (
    <div className="p-4 my-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500 shadow-sm max-w-md">
      <p className="text-gray-700 italic font-medium">"{quoteData?.q}"</p>
      <p className="text-gray-500 text-right text-sm mt-2">— {quoteData?.a}</p>
    </div>
  );
};

export default DailyQuote;

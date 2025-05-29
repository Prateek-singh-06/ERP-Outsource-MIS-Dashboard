"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        const updateViewCount = async () => {
            try {
                const response = await fetch('/api/CounterIncrement', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setViews(data.views);
            } catch (error) {
                console.error('Failed to update view count:', error);
            }
        };
        const GetViewCount = async () => {
            try {
                const response = await fetch('/api/CounterIncrement', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setViews(data.views);
            } catch (error) {
                console.error('Failed to update view count:', error);
            }
        };
        const count = sessionStorage.getItem('viewed');
        if (count === null) {
            updateViewCount();
            sessionStorage.setItem('viewed', 'true');
        } else {
            GetViewCount();
        }
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg px-4 py-2 border border-gray-200">
                <div className="flex items-center justify-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-gray-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                    </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                    {views !== null ? (
                        <span className="font-semibold text-indigo-600">{views.toLocaleString()}</span>
                    ) : (
                        <span className="animate-pulse">...</span>
                    )}
                </span>
            </div>
        </div>
    );
}
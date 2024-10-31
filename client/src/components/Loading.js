import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="loader">
                <div className="spinner"></div>
                <span className="ml-2">Loading...</span>
            </div>
            <style jsx>{`
                .loader {
                    display: flex;
                    align-items: center;
                }
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-left-color: #3498db;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loading;

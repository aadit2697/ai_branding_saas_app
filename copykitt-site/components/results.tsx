import React, { useState } from 'react';
interface ResultsProps {
    snippet: string;
    keywords: string[];
    onBack: any;
    prompt: string;
}

const Results: React.FC<ResultsProps> = (props) => {

    const [copiedSnippet, setCopiedSnippet] = useState(false);
    const [copiedKeywords, setCopiedKeywords] = useState(false);

    const copyToClipboard = async (text: string, type: 'snippet' | 'keywords') => {
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'snippet') {
                setCopiedSnippet(true);
                setTimeout(() => setCopiedSnippet(false), 2000);
            } else {
                setCopiedKeywords(true);
                setTimeout(() => setCopiedKeywords(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        
        <div className="w-full max-w-4xl mx-auto p-8">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">
                <br></br> <br></br><br></br>
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Your Brand Content is Ready! 🎉</h2>
                    <p className="text-white/70">Here's your AI-generated branding content</p>
                </div>

                {/* Original Prompt */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-blue-300 text-sm">💭</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Your Prompt</h3>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-white/90 leading-relaxed">{props.prompt}</p>
                    </div>
                </div>

                {/* Generated Snippet */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-green-300 text-sm">✨</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Brand Snippet</h3>
                        </div>
                        <button
                            onClick={() => copyToClipboard(props.snippet, 'snippet')}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                                     border border-white/20 rounded-xl text-white/80 hover:text-white
                                     transition-all duration-200"
                        >
                            {copiedSnippet ? (
                                <>
                                    <span className="text-green-400">✓</span>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <span>📋</span>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl p-6">
                        <p className="text-white text-lg leading-relaxed">{props.snippet}</p>
                    </div>
                </div>

                {/* Keywords/Hashtags */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-purple-300 text-sm">#</span>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Keywords & Hashtags</h3>
                        </div>
                        <button
                            onClick={() => copyToClipboard(props.keywords.map(k => `#${k}`).join(' '), 'keywords')}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                                     border border-white/20 rounded-xl text-white/80 hover:text-white
                                     transition-all duration-200"
                        >
                            {copiedKeywords ? (
                                <>
                                    <span className="text-green-400">✓</span>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <span>📋</span>
                                    Copy All
                                </>
                            )}
                        </button>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex flex-wrap gap-3">
                            {props.keywords.map((keyword, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 
                                             border border-white/20 rounded-xl text-white/90 hover:bg-white/10 
                                             transition-colors duration-200 cursor-pointer"
                                    onClick={() => copyToClipboard(`#${keyword}`, 'keywords')}
                                >
                                    #{keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={props.onBack}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 
                                 text-white font-semibold rounded-2xl hover:-translate-y-0.5
                                 transition-all duration-300"
                    >
                        ← Create Another
                    </button>
                    <button
                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 
                                 text-white font-semibold rounded-2xl hover:-translate-y-0.5
                                 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Share Results 🚀
                    </button>
                </div>
            </div>
        </div>
    );
        

};

export default Results;
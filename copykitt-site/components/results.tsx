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
    const [copiedAll, setCopiedAll] = useState(false);

    const copyToClipboard = async (text: string, type: 'snippet' | 'keywords' | 'all') => {
        try {
            await navigator.clipboard.writeText(text);
            
            if (type === 'snippet') {
                setCopiedSnippet(true);
                setTimeout(() => setCopiedSnippet(false), 3000);
            } else if (type === 'keywords') {
                setCopiedKeywords(true);
                setTimeout(() => setCopiedKeywords(false), 3000);
            } else {
                setCopiedAll(true);
                setTimeout(() => setCopiedAll(false), 3000);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const allContent = `Brand Snippet:\n${props.snippet}\n\nHashtags:\n${props.keywords.map(k => `#${k}`).join(' ')}`;

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Success header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-blue-500/20 
                              rounded-full mb-6 text-4xl animate-bounce">
                    🎉
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Your Brand Content is Ready!
                </h2>
                <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
                    Here's your AI-generated branding content. Copy what you need and start building your brand!
                </p>
            </div>

            {/* Quick actions bar */}
            <div className="flex justify-center mb-12">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => copyToClipboard(allContent, 'all')}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 
                                     text-white font-semibold rounded-xl hover:-translate-y-0.5
                                     transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            {copiedAll ? (
                                <>
                                    <span className="text-white">✓</span>
                                    <span>Copied Everything!</span>
                                </>
                            ) : (
                                <>
                                    <span>📋</span>
                                    <span>Copy All Content</span>
                                </>
                            )}
                        </button>
                        
                        <button
                            onClick={props.onBack}
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 
                                     border border-white/20 text-white font-semibold rounded-xl
                                     hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <span>←</span>
                            <span>Create Another</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content sections */}
            <div className="space-y-8 mb-12">
                
                {/* Original Prompt */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-blue-300">💭</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Your Original Prompt</h3>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <p className="text-white/80 leading-relaxed text-base sm:text-lg">{props.prompt}</p>
                    </div>
                </div>

                {/* Generated Snippet */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-green-300">✨</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Brand Snippet</h3>
                        </div>
                        <button
                            onClick={() => copyToClipboard(props.snippet, 'snippet')}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                                     border border-white/20 rounded-xl text-white/80 hover:text-white
                                     transition-all duration-200 font-medium"
                        >
                            {copiedSnippet ? (
                                <>
                                    <span className="text-green-400">✓</span>
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <span>📋</span>
                                    <span>Copy Snippet</span>
                                </>
                            )}
                        </button>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 
                                  border border-white/20 rounded-2xl p-8">
                        <p className="text-white text-lg sm:text-xl leading-relaxed font-medium">
                            {props.snippet}
                        </p>
                    </div>
                    
                    <div className="mt-4 text-white/60 text-sm">
                        💡 This snippet is perfect for your website, social media bio, or marketing materials
                    </div>
                </div>

                {/* Keywords & Hashtags */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-purple-300">#</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Keywords & Hashtags</h3>
                        </div>
                        <button
                            onClick={() => copyToClipboard(props.keywords.map(k => `#${k}`).join(' '), 'keywords')}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                                     border border-white/20 rounded-xl text-white/80 hover:text-white
                                     transition-all duration-200 font-medium"
                        >
                            {copiedKeywords ? (
                                <>
                                    <span className="text-green-400">✓</span>
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <span>📋</span>
                                    <span>Copy All</span>
                                </>
                            )}
                        </button>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {props.keywords.map((keyword, index) => (
                                <button
                                    key={index}
                                    onClick={() => copyToClipboard(`#${keyword}`, 'keywords')}
                                    className="group flex items-center justify-center px-4 py-3 
                                             bg-gradient-to-r from-pink-500/20 to-purple-500/20 
                                             border border-white/20 rounded-xl text-white/90 
                                             hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg
                                             transition-all duration-200 cursor-pointer font-medium"
                                    title="Click to copy"
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        #{keyword}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-4 text-white/60 text-sm">
                        💡 Use these hashtags on Instagram, Twitter, LinkedIn, and other social platforms to increase visibility
                    </div>
                </div>
            </div>

            {/* Call to action */}
            <div className="text-center">
                <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                              border border-white/20 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Launch Your Brand? 🚀
                    </h3>
                    <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                        You now have everything you need to start building your brand presence. 
                        Use this content across all your marketing channels!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={props.onBack}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                                     text-white font-bold rounded-2xl hover:-translate-y-1
                                     transition-all duration-300 shadow-xl hover:shadow-2xl"
                        >
                            Create More Content ✨
                        </button>
                        <button
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 
                                     text-white font-semibold rounded-2xl hover:-translate-y-1
                                     transition-all duration-300"
                        >
                            Share This Tool 📤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
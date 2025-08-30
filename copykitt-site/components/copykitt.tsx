"use client"

import React, { useState } from "react";
import Form from "./form";
import Results from "./results";

// creates a function that runs when the submit btn is clicked


const CopyKitt: React.FC = () => {

    const ENDPOINT: string = "https://7h2itud59f.execute-api.us-east-2.amazonaws.com/prod/generate_snippet_and_keywords";
    const CHARACTER_LIMIT: number = 32;

    const [prompt, setPrompt] = React.useState(""); // savin the input to prompt
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = () => {
    console.log("Submitting: " + prompt)
    setIsLoading(true);

    // calling an external api from react
    fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onResult);
    };

    const onResult = (data: any) => {
        setSnippet(data.snippet); //setting a value to data.snippet
        setKeywords(data.keywords); //setting a value to data.keywords
        setHasResult(true);
        setIsLoading(false);
    };

    const onReset = (data: any) => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
    };

    //console.log(snippet);
    //console.log(keywords)

    //create a results elemnt that doesnt show up until we have the results

    let displayedElement= null;
    if (hasResult){

    displayedElement = 
    <Results 
    snippet={snippet} 
    keywords={keywords} 
    onBack={onReset} 
    prompt={prompt} />;
    }
    else{
    
    displayedElement = <
        Form
        prompt={prompt} 
        setPrompt={setPrompt} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        characterLimit={CHARACTER_LIMIT} /> ;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 
                       relative overflow-x-hidden">
            
            {/* Fixed animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                <div className="absolute bottom-1/3 left-20 w-48 h-48 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-6000"></div>
            </div>

            {/* Scrollable content container */}
            <div className="relative z-10 w-full">
                
                {/* Header section - always at top */}
                <header className="w-full py-12 px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4
                                 bg-gradient-to-r from-white via-blue-100 to-purple-200 
                                 bg-clip-text text-transparent leading-tight">
                        Brand Your Product With AI
                    </h1>
                    
                    {/* Floating decorative elements */}
                    <div className="relative inline-block">
                        <div className="absolute -top-8 -left-8 text-2xl opacity-60 animate-bounce animation-delay-1000">✨</div>
                        <div className="absolute -top-6 -right-8 text-xl opacity-60 animate-bounce animation-delay-3000">🚀</div>
                        <div className="absolute -bottom-4 left-0 text-lg opacity-60 animate-bounce animation-delay-5000">💫</div>
                    </div>
                </header>

                {/* Main content section */}
                <main className="w-full pb-20">
                    {hasResult ? (
                        <Results
                            snippet={snippet}
                            keywords={keywords}
                            onBack={onReset}
                            prompt={prompt}
                        />
                    ) : (
                        <Form
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onSubmit={onSubmit}
                            isLoading={isLoading}
                            characterLimit={CHARACTER_LIMIT}
                        />
                    )}
                </main>

                {/* Footer section */}
                <footer className="w-full py-8 text-center">
                    <p className="text-white/60 text-sm mb-2">
                        Powered by advanced AI • Create compelling brand content in seconds
                    </p>
                    <div className="flex justify-center gap-6 text-white/40 text-xs">
                        <span>🔒 Secure</span>
                        <span>⚡ Fast</span>
                        <span>🎯 Accurate</span>
                        <span>🌟 Professional</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};


export default CopyKitt;
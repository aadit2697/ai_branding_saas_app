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
                       flex items-center justify-center ">
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Main heading - Always visible at top */}
            <div className="text-center mb-6 sm:mb-8 relative z-10 w-full">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2
                             bg-gradient-to-r from-white via-blue-100 to-purple-200 
                             bg-clip-text text-transparent leading-tight">
                    Brand Your Product With AI
                </h1>
                
                {/* Floating decorative elements - smaller and better positioned */}
                <div className="absolute top-2 left-1/4 text-xl opacity-60 animate-bounce animation-delay-1000">✨</div>
                <div className="absolute top-0 right-1/4 text-lg opacity-60 animate-bounce animation-delay-3000">🚀</div>
                <div className="absolute -bottom-1 left-1/3 text-base opacity-60 animate-bounce animation-delay-5000">💫</div>
            </div>

            {/* Main content - flexible spacing */}
            <div className="relative z-10 w-full flex-grow flex items-center justify-center">
                {displayedElement}
            </div>

            {/* Footer - Always at bottom */}
            <div className="mt-8 text-center text-white/60 text-sm relative z-10">
                <p>Powered by advanced AI <br />• Create compelling brand content in seconds</p>
            </div>
        </div>
    );
};

export default CopyKitt;
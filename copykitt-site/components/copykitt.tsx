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
    <>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-center"> 
            Build AI Product Tagline
        </h1>

    {displayedElement}
          
    </>)
}

export default CopyKitt;
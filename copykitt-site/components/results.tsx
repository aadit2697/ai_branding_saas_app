interface ResultsProps {
    snippet: string;
    keywords: string[];
    onBack: any;
    prompt: string;
}

const Results: React.FC<ResultsProps> = (props) => {

    const keywordsElements = [];
    for (let i = 0; i < props.keywords.length; i++) {
        const element =  <div key={i}>#{props.keywords[i]}</div>;
        keywordsElements.push(element);
    }

    return <>
        <div>
            <div><b> Your Prompt: </b> </div>
            <div> {props.prompt}</div>

           <div><b> Snippet: </b> </div>
            <div> {props.snippet}</div>

            <div><b> Kewords: </b> </div>
            <div> {keywordsElements}</div>
        </div>
        
        <button onClick={props.onBack}>Back</button>
        </>;

        

}

export default Results;
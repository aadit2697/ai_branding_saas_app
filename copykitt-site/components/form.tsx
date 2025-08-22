interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any
    isLoading: boolean;
    characterLimit: number;
}



const Form: React.FC<FormProps> = (props) => {

    const isPromptValid = props.prompt.length <= props.characterLimit;
    const updatePromptValue = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPrompt(text)
        }
    }

    return <>
    <p>
        Tell me what product would like to advertise and 
        I will generate branding snippets and keywords for you!
    </p>

    <input type="text"  
    placeholder="Enter your product idea.." 
    value= {props.prompt}
    onChange={(e) => updatePromptValue(e.currentTarget.value)}/>
    <div>{props.prompt.length}/{props.characterLimit}</div> 
      
    <button 
    onClick = {props.onSubmit} 
    disabled= {props.isLoading || !isPromptValid}>
        Submit
    </button></>;

}

export default Form;
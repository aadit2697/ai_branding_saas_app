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

    return (
      
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-8">
            {/* Glass card container */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
                
                {/* Subtitle */}
                <p className="text-base sm:text-lg text-center text-white/80 mb-6 sm:mb-20 leading-relaxed">
                    Transform your ideas into compelling brand narratives with the power of artificial intelligence
                </p>

                {/* Input container */}
                <div className="relative mb-4 sm:mb-6">
                    <textarea
                        className="w-full p-4 sm:p-6 text-white placeholder-white/60 bg-white/10 border border-white/20 rounded-2xl 
                                 resize-none min-h-[100px] sm:min-h-[120px] text-base leading-relaxed
                                 focus:outline-none focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10
                                 transition-all duration-300"
                        placeholder="Describe your product, target audience, and brand vision..."
                        value={props.prompt}
                        onChange={(e) => updatePromptValue(e.currentTarget.value)}
                        maxLength={props.characterLimit}
                    />
                    
                    {/* Character counter */}
                    <div className={`absolute bottom-3 sm:bottom-4 right-4 sm:right-6 text-sm transition-colors duration-200 ${
                        props.prompt.length > props.characterLimit * 0.9 ? 'text-red-300' : 'text-white/60'
                    }`}>
                        {props.prompt.length}/{props.characterLimit}
                    </div>
                </div>

                {/* Submit button */}
                <button
                    onClick={props.onSubmit}
                    disabled={props.isLoading || !isPromptValid}
                    className="w-full py-4 sm:py-5 px-6 sm:px-8 bg-gradient-to-r from-blue-500 to-purple-600 
                             text-white font-semibold text-base sm:text-lg rounded-2xl
                             hover:from-blue-600 hover:to-purple-700 hover:-translate-y-0.5
                             focus:outline-none focus:ring-4 focus:ring-blue-500/25
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                             transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    {props.isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating Magic...
                        </div>
                    ) : (
                        'Generate Brand Magic ✨'
                    )}
                </button>

                {/* Feature highlights */}
                <div className="flex justify-center gap-4 sm:gap-8 mt-6 sm:mt-10">
                    <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-white/15 rounded-xl flex items-center justify-center text-lg sm:text-xl">
                            🎯
                        </div>
                        <div className="text-xs sm:text-sm text-white/70 font-medium">Smart Targeting</div>
                    </div>
                    <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-white/15 rounded-xl flex items-center justify-center text-lg sm:text-xl">
                            ⚡
                        </div>
                        <div className="text-xs sm:text-sm text-white/70 font-medium">Instant Results</div>
                    </div>
                    <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-white/15 rounded-xl flex items-center justify-center text-lg sm:text-xl">
                            🎨
                        </div>
                        <div className="text-xs sm:text-sm text-white/70 font-medium">Creative Content</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
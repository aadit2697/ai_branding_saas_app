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
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Introduction section */}
            <div className="text-center mb-12">
                <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                    Transform your ideas into compelling brand narratives with the power of artificial intelligence. 
                    Get professional marketing content in seconds.
                </p>
                
                {/* Trust indicators */}
                <div className="flex justify-center gap-8 text-white/60 text-sm mb-12">
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>AI-Powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Instant Results</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Professional Quality</span>
                    </div>
                </div>
            </div>

            {/* Main form card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl mb-12">
                
                {/* Form header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Describe Your Product
                    </h2>
                    <p className="text-white/70 text-base sm:text-lg">
                        Tell us about your product and we'll create amazing brand content for you
                    </p>
                </div>

                {/* Input section */}
                <div className="mb-8">
                    <label className="block text-white/80 text-sm font-medium mb-3">
                        Product Description
                    </label>
                    <div className="relative">
                        <textarea
                            className="w-full p-6 text-white placeholder-white/50 bg-white/10 border border-white/20 rounded-2xl 
                                     resize-none min-h-[160px] text-base leading-relaxed
                                     focus:outline-none focus:bg-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/10
                                     transition-all duration-300"
                            placeholder="Example: I'm launching an organic coffee brand targeting health-conscious millennials. My coffee is ethically sourced from small farms in Colombia and roasted locally. I want to emphasize sustainability, quality, and the artisanal experience..."
                            value={props.prompt}
                            onChange={(e) => updatePromptValue(e.currentTarget.value)}
                            maxLength={props.characterLimit}
                        />
                        
                        {/* Character counter */}
                        <div className={`absolute bottom-4 right-6 text-sm transition-colors duration-200 ${
                            props.prompt.length > props.characterLimit * 0.9 ? 'text-red-300' : 'text-white/60'
                        }`}>
                            {props.prompt.length}/{props.characterLimit}
                        </div>
                    </div>
                    
                    {/* Helper text */}
                    <p className="text-white/50 text-sm mt-3">
                        💡 Include details about your target audience, key benefits, and brand personality for better results
                    </p>
                </div>

                {/* Submit button */}
                <button
                    onClick={props.onSubmit}
                    disabled={props.isLoading || !isPromptValid || props.prompt.trim().length === 0}
                    className="w-full py-6 px-8 bg-gradient-to-r from-blue-500 to-purple-600 
                             text-white font-bold text-lg rounded-2xl
                             hover:from-blue-600 hover:to-purple-700 hover:-translate-y-1 hover:shadow-2xl
                             focus:outline-none focus:ring-4 focus:ring-blue-500/25
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                             transition-all duration-300 shadow-xl"
                >
                    {props.isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Generating Your Brand Magic...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-3">
                            <span>Generate Brand Magic</span>
                            <span className="text-2xl">✨</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Feature showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                                  rounded-2xl flex items-center justify-center text-3xl">
                        🎯
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Smart Targeting</h3>
                    <p className="text-white/60 text-sm">
                        AI analyzes your description to create content that resonates with your target audience
                    </p>
                </div>
                
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 
                                  rounded-2xl flex items-center justify-center text-3xl">
                        ⚡
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Lightning Fast</h3>
                    <p className="text-white/60 text-sm">
                        Get professional brand content and hashtags in seconds, not hours
                    </p>
                </div>
                
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                                  rounded-2xl flex items-center justify-center text-3xl">
                        🎨
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Creative Excellence</h3>
                    <p className="text-white/60 text-sm">
                        Unique, engaging content that captures your brand's personality and voice
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Form;
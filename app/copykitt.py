import os
import openai
from dotenv import load_dotenv
import argparse
import re

MAX_INPUT_LENGTH = 32

def main():
    dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
    load_dotenv(dotenv_path)

    #client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    # trying out the module level OPENAI API
    openai.api_key = os.getenv("OPENAI_API_KEY")
    client = openai
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type = str,required= True)
    args = parser.parse_args()
    user_input = args.input
    print(f"User input: {user_input}")
    
    if validate_length(user_input):
        generate_branding_snippet(user_input, client)
        generate_keywords(user_input, client)

    else:
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input} is of length {len(user_input)}.")

#validating the user input so that it does not exceed the credit usage

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_keywords(prompt: str) -> list[str]:
    
    enriched_prompt= f" Generate 7 relevant related branding keywords (comma-seperated) for a {prompt}"
    print(f"Enriched prompt: {enriched_prompt}")
    
# response= open_api_client.chat.completions.create(
 #       model= "gpt-3.5-turbo",
 #       messages=[

#            {"role": "user", 
#            "content": enriched_prompt}
#        ],
#        max_tokens= 32
#    )

    # trying out a version of open Ai compatible with python 3.7
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role":"user","content":enriched_prompt}],
    max_tokens=24
    )

  
    ## Extracting text out of the response object and stripping the whitespace
    keywords_text =response.choices[0].message.content.strip()
    # skipping the idea of stripping the list elements and checking if it is a blank word
    keywords_array= re.split(r"(?:\d+\.\s*)|[,\n\-\*]+", keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]
    print(f"Keywords: {keywords_array}")
    return keywords_array

def generate_branding_snippet(prompt: str) ->str:
    
    enriched_prompt= f"Generate upbeat branding snippet for {prompt}"
    print(f"Enriched prompt: {enriched_prompt}")
    #response= open_api_client.chat.completions.create(
    #     model= "gpt-3.5-turbo",
    #     messages=[
    #         {"role": "user", 
    #         "content": enriched_prompt}
    #     ],
    #     max_tokens= 32
    # )
    
    # trying out a version of open Ai compatible with python 3.7
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role":"user","content":enriched_prompt}],
    max_tokens=24
    )
    ## Extracting text out of the response object and stripping the whitespace
    branding_text =response.choices[0].message.content.strip()
    ## Add ... to truncated statements
    if branding_text[-1] not in {".", "!", "?"}:
        branding_text = branding_text + "..."
    print(f"Snippet: {branding_text}")
    return branding_text

if __name__ == "__main__":
    main()
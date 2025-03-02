from flask import Flask, request, jsonify
from openai import OpenAI
import os


from gtts import gTTS



app = Flask(__name__)
from flask_cors import CORS
CORS(app)

# Your API key
api_key = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExNDUyNDc3NTY0MTkyMjEyNjI5MSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg5NDM5MTUwMywidXVpZCI6IjkxZjIzNmYxLWY5NDEtNDk1MS04N2VhLTViZWI4ZDRhN2Y2OCIsIm5hbWUiOiJOT1NVX0FJIiwiZXhwaXJlc19hdCI6IjIwMzAtMDEtMTFUMTk6NTE6NDMrMDAwMCJ9.NslIJnDHOT-p2dduZkYxUV7noZsrP8mChEityiKeCZA"

# Initialize OpenAI client
client = OpenAI(
    base_url="https://api.studio.nebius.ai/v1/",
    api_key=api_key
)

# System prompts for different modes
MODE_PROMPTS = {
    "simplify": "You simplify text while preserving meaning and key details. You will break down complex sentences and replace difficult words with simpler alternatives and you will keep the texts short and simple.",
    "summarize": "You summarize text into concise and informative points, retaining key details.", 
    "ease": "You will make text easier to read and understand. You may add multiple emojis in between for example: 'happy 😊'."
}

def generate_ai_response(text, mode):
    """ Calls the AI model and returns transformed text based on mode """
    system_prompt = MODE_PROMPTS.get(mode, "You process text to improve accessibility.")

    completion = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct-fast",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": text}
        ],
        temperature=0.6,
        max_tokens=512,
        top_p=0.9
    )

    return completion.choices[0].message.content

@app.route("/process", methods=["POST"])
def process_text():
    """ API endpoint to process text from browser extension """
    data = request.json
    text = data.get("text", "")
    mode = data.get("mode", "simplify")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    modified_text = generate_ai_response(text, mode)
    
    return jsonify({"modified_text": modified_text})





#audio ajj shit 

# @app.route('/tts', methods=['POST'])
# def text_to_speech():
#     data = request.get_json()
#     text = data.get("text", "")

#     if not text:
#         return jsonify({"error": "No text provided"}), 400

#     # Convert text to speech
#     tts = gTTS(text)
#     audio_path = "static/output.mp3"
#     tts.save(audio_path)

#     return jsonify({"audio_url": f"http://127.0.0.1:5000/{audio_path}"})



if __name__ == "__main__":
    app.run(debug=True, port=5000)







# from flask import Flask, request, jsonify
# from openai import OpenAI
# import os
# from gtts import gTTS
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # API Key (replace with environment variable for security)
# api_key = os.getenv("OPENAI_API_KEY", "your-api-key")

# # Initialize OpenAI client
# client = OpenAI(
#     base_url="https://api.studio.nebius.ai/v1/",
#     api_key=api_key
# )

# # System prompts for different modes
# systemPrompts = {
#     "textClarity": {
#         "1": "You are helping a reader by simplifying complex text and improving readability. Rewrite text to enhance readability while keeping sophisticated elements. Focus on clearer organization and structure. Break down complex sentences when needed. Keep all proper names, places, and quotes unchanged.",
#         "2": "You are helping a reader with learning disabilities. Rewrite text using clearer structure and simpler explanations. Replace complex terms with everyday words where possible. Use shorter sentences and clear organization. Keep all names, places, and quotes unchanged.",
#         "3": "You are helping a reader with learning disabilities. Rewrite using simple, everyday language and short sentences. Break down complex ideas into smaller, clearer parts. Use familiar words while keeping important details. Keep all names, places, and quotes unchanged.",
#         "4": "You are helping a reader with learning disabilities. Rewrite to be very, very easy to understand. Use basic words and simple sentences. Break each complex idea into multiple short sentences. Add brief explanations in brackets for difficult concepts. Keep all names, places, and quotes unchanged.",
#         "5": "You are helping a 5-year-old reader with learning disabilities. Rewrite in the simplest possible way. Use only basic, everyday words. Keep sentences under 8 words. Add step-by-step explanations for complex ideas. Include definitions for any unusual terms. Keep all names, places, and quotes unchanged."
#     },
#     "focusStructure": {
#         "1": "You are helping readers with ADHD by organizing content with better visual breaks and highlights. Rewrite text with clear visual structure and frequent paragraph breaks. Organize information in a way that maintains focus. Add emphasis to key points. Keep all names, places, and quotes unchanged.",
#         "2": "You are helping readers with ADHD and attention challenges. Rewrite using distinct sections and clear headings. Break information into smaller, focused chunks. Use clear language and highlight important points. Keep all names, places, and quotes unchanged.",
#         "3": "You are helping readers with ADHD and attention challenges. Rewrite using short paragraphs and bullet points. Keep one main idea per paragraph. Use simple language and highlight key information. Keep sentences focused and direct. Keep all names, places, and quotes unchanged.",
#         "4": "You are helping readers with ADHD and attention challenges. Rewrite using very short, focused paragraphs. Create bullet points for lists. Keep sentences short and direct. Add visual markers between different ideas. Highlight important information. Keep all names, places, and quotes unchanged.",
#         "5": "You are helping a 5-year-old reader with ADHD and attention challenges. Rewrite with maximum structure and focus. Use single-idea paragraphs with frequent breaks. Create bullet points for all lists. Keep sentences under 8 words. Add clear markers between topics. Keep all names, places, and quotes unchanged."
#     },
#     "wordPattern": {
#         "1": "You are helping readers by using consistent layouts and clearer word spacing. Rewrite text using clear sentence structures and patterns. Keep sophisticated vocabulary but improve readability. Add subtle reading aids through formatting. Keep all names, places, and quotes unchanged.",
#         "2": "You are helping readers with dyslexia and processing challenges. Rewrite using consistent sentence patterns. Replace difficult words with clearer ones. Break multi-part ideas into separate sentences. Add helpful context. Keep all names, places, and quotes unchanged.",
#         "3": "You are helping readers with dyslexia and processing challenges. Rewrite using simple, predictable patterns. Keep sentences short and direct. Use familiar words and explain complex terms. Break down complicated ideas. Keep all names, places, and quotes unchanged.",
#         "4": "You are helping readers with dyslexia and processing challenges. Rewrite using basic patterns and simple words. Keep sentences very short and similar in structure. Break every complex idea into multiple simple sentences. Add clear explanations. Keep all names, places, and quotes unchanged.",
#         "5": "You are helping a 5-year-old with dyslexia and processing challenges. Rewrite using the most basic sentence patterns. Use only common, everyday words. Keep sentences under 8 words and similarly structured. Break every idea into tiny steps. Add simple explanations for unusual terms. Keep all names, places, and quotes unchanged."
#     }
# }

# def generate_ai_response(text, category, level):
#     """ Calls AI model with appropriate system prompt """
#     system_prompt = systemPrompts.get(category, {}).get(str(level), "Default prompt")
    
#     completion = client.chat.completions.create(
#         model="meta-llama/Meta-Llama-3.1-70B-Instruct-fast",
#         messages=[
#             {"role": "system", "content": system_prompt},
#             {"role": "user", "content": text}
#         ],
#         temperature=0.6,
#         max_tokens=512,
#         top_p=0.9
#     )
#     return completion.choices[0].message.content

# @app.route("/process", methods=["POST"])
# def process_text():
#     """ API endpoint to process text with specific category & level """
#     data = request.json
#     text = data.get("text", "")
#     category = data.get("category", "textClarity")
#     level = data.get("level", "1")
    
#     if not text:
#         return jsonify({"error": "No text provided"}), 400
    
#     modified_text = generate_ai_response(text, category, level)
#     return jsonify({"modified_text": modified_text})

# @app.route('/tts', methods=['POST'])
# def text_to_speech():
#     data = request.get_json()
#     text = data.get("text", "")
    
#     if not text:
#         return jsonify({"error": "No text provided"}), 400
    
#     tts = gTTS(text)
#     audio_path = "static/output.mp3"
#     tts.save(audio_path)
    
#     return jsonify({"audio_url": f"http://127.0.0.1:5000/{audio_path}"})

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

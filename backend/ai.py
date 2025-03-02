api = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExNDUyNDc3NTY0MTkyMjEyNjI5MSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg5NDM5MTUwMywidXVpZCI6IjkxZjIzNmYxLWY5NDEtNDk1MS04N2VhLTViZWI4ZDRhN2Y2OCIsIm5hbWUiOiJOT1NVX0FJIiwiZXhwaXJlc19hdCI6IjIwMzAtMDEtMTFUMTk6NTE6NDMrMDAwMCJ9.NslIJnDHOT-p2dduZkYxUV7noZsrP8mChEityiKeCZA"

import os
from openai import OpenAI

import textwrap



client = OpenAI(
    base_url="https://api.studio.nebius.ai/v1/",
    api_key=api
)

p = "give some quesetions on Data structures and algorithm."

def generate_ans(prompt): 
    completion = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct-fast",
        messages=[
            {
                "role": "system",
                "content": """You are an AI who will generate questions based on what the user gives (either piece of information/just a topic in itself), make sure it consists of two sections: 1. MCQs 2. Descriptive questions."""
            },
            {
                "role": "user",
                "content": prompt, 
            }
        ],
        temperature=0.6,
        max_tokens=512,
        top_p=0.9
    )
    return completion

completion = generate_ans(p)
#raw_content = completion.choices[0]
#print(completion)

content = completion.choices[0].message.content

#omfg this format took so long to understand 

print(content)


#fetch - from this via .then and all 
#api call to llm ->llm gives ans->flask->then n all->finally render on webpage 
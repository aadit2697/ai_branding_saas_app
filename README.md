# A Product Branding Assistant
# AI Branding App  

An **AI-powered branding assistant** that generates catchy snippets and marketing keywords for product ideas.  
Built with **OpenAI’s Python library**, deployed serverlessly using **FastAPI, AWS Lambda, and AWS CDK**, and integrated with a **Next.js frontend** for an interactive user experience.  

---

## 🚀 Features  
- **AI-powered recommendations**: Uses OpenAI to generate branding snippets and keywords.  
- **Serverless backend**: FastAPI app deployed on AWS Lambda with CDK.  
- **Custom Lambda layers**: Handles dependencies like FastAPI, Mangum, and Pydantic.  
- **Next.js UI**: A modern React-based interface for entering product ideas.  
- **Cloud-native architecture**: Scalable and lightweight deployment.  

---

## 🛠️ Tech Stack  
- **Frontend**: Next.js (React, Tailwind CSS)  
- **Backend**: FastAPI + Mangum adapter  
- **Infrastructure**: AWS Lambda, API Gateway, AWS CDK (TypeScript)  
- **AI Integration**: OpenAI Python SDK (`openai`)  
- **Packaging**: Docker + custom Lambda base layer  
- **Environment Management**: dotenv for local API key handling  

---

## 📂 Project Structure  
```
ai_saas_app/
│
├── app/                     # Python backend (FastAPI + OpenAI logic)
│   ├── copykitt.py          # Branding logic: generate_snippet + generate_keywords
│   ├── copykitt_api.py      # FastAPI app, Lambda handler with Mangum
│
├── copykitt-infra/          # AWS CDK infrastructure (TypeScript)
│   ├── lib/copykitt-infra-stack.ts
│   ├── bin/copykitt-infra.ts
│   └── lambda_base_layer/   # Docker + script for Lambda base layer packaging
│
├── requirements.txt         # Python dependencies
├── Dockerfile               # For building Lambda layer
├── generate_base_layer.sh   # Script to build & copy layer.zip
├── nextjs-frontend/         # Next.js UI project
│   ├── app/page.tsx         # Home page
│   └── components/copykitt.tsx
│
└── README.md
```

---

## ⚙️ Setup & Deployment  

### 1. Clone the Repository  
```bash
git clone https://github.com/yourusername/ai-branding-app.git
cd ai-branding-app
```

### 2. Install Dependencies  
For backend (Python):  
```bash
pip install -r requirements.txt
```

For frontend (Next.js):  
```bash
cd nextjs-frontend
npm install
```

### 3. Environment Variables  
Create a `.env` file in project root:  
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Deploy Backend with CDK  
```bash
cd copykitt-infra
cdk bootstrap aws://<account-id>/<region>
cdk deploy --app "npx ts-node bin/copykitt-infra.ts"
```

### 5. Run Frontend Locally  
```bash
cd nextjs-frontend
npm run dev
```
Access at [http://localhost:3000](http://localhost:3000)  

---

## 📖 Usage  
- Enter a product idea in the text box.  
- Click **Submit** to receive:  
  - ✅ A catchy branding snippet  
  - ✅ A set of related keywords  

---

## 🧪 Testing  
To simulate API Gateway → Lambda locally, use the JSON test event format:  
```json
{
  "version": "2.0",
  "routeKey": "GET /generate_snippet_and_keywords",
  "rawPath": "/generate_snippet_and_keywords",
  "rawQueryString": "prompt=Eco-friendly%20Reusable%20Cups",
  "headers": {
    "Host": "example.com",
    "User-Agent": "curl/7.68.0"
  },
  "requestContext": {
    "http": {
      "method": "GET",
      "path": "/generate_snippet_and_keywords",
      "protocol": "HTTP/1.1",
      "sourceIp": "127.0.0.1"
    }
  },
  "isBase64Encoded": false
}
```

---

## 🔮 Future Improvements  
- Add authentication (Cognito/NextAuth).  
- Save user history to DynamoDB or S3.  
- Expand prompt customization (tone, audience, style).  
- Deploy frontend on Vercel with CI/CD pipeline.  

---

## 📜 License  
MIT License © 2025 Aadit Malikayil  

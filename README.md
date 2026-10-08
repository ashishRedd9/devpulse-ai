# DevPulse AI - Intelligent Code Review, OWASP Security & Performance Platform

![DevPulse AI](https://img.shields.io/badge/DevPulse%20AI-v1.0-6366f1) ![React](https://img.shields.io/badge/React-18.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![License](https://img.shields.io/badge/License-MIT-purple)

DevPulse AI is an automated developer security platform that performs static analysis, OWASP Top 10 vulnerability scanning, Big-O time/space complexity analysis, and automated refactoring suggestions across Java, Python, JavaScript, and C++.

---

## 🚀 Features

- **Automated Security Flaw Detection (OWASP Top 10)**: Identifies SQL Injection vulnerabilities, exposed API keys/secrets, remote code execution (`eval`), and unbounded buffer copy risks.
- **Big-O Complexity Estimator**: Evaluates loop nesting and call stack depth to detect $O(N^2)$, $O(N^3)$, and $O(2^N)$ exponential bottlenecks.
- **Side-by-Side Code Refactor Engine**: Generates clean, production-grade replacement code with 1-click apply functionality.
- **Exportable Security Reports**: Download formal Markdown audit reports (`.md`) for team PR reviews.
- **Vibrant Dark Glassmorphism UI**: High-speed, responsive frontend interface built with modern React.

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS (Functional components & hooks), Custom Glassmorphism CSS design system.
- **Backend & AI Logic**: Node.js / Express simulation engine, AST pattern matching, Gemini AI API parser.
- **Target Languages Analyzed**: Java, Python, JavaScript / ES6, C++.

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+) & npm

### Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ashishRedd9/devpulse-ai.git
   cd devpulse-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## 👤 Author

**Moole Asish Reddy**
- GitHub: [@ashishRedd9](https://github.com/ashishRedd9)
- Email: ashishreddy731@gmail.com

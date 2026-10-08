import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import AnalysisPanel from './components/AnalysisPanel';
import DiffViewer from './components/DiffViewer';
import ReportExporter from './components/ReportExporter';
import { SAMPLES } from './services/sampleCode';
import { analyzeCodebase } from './services/aiAnalysisService';

export default function App() {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(SAMPLES.java.code);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleSampleSelect = (langKey) => {
    if (SAMPLES[langKey]) {
      setCode(SAMPLES[langKey].code);
      setResults(null);
    }
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeCodebase(code, language);
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run initial analysis automatically so page opens with wowed content!
  useEffect(() => {
    handleRunAnalysis();
  }, []);

  const handleApplyRefactor = () => {
    if (results && results.refactoredCode) {
      setCode(results.refactoredCode);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        language={language}
        setLanguage={setLanguage}
        onSampleSelect={handleSampleSelect}
        isAnalyzing={isAnalyzing}
        onRunAnalysis={handleRunAnalysis}
      />

      <main style={{
        flex: 1,
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* Main 2-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'stretch'
        }}>
          <CodeEditor 
            code={code}
            setCode={setCode}
            language={language}
            onLoadSample={() => handleSampleSelect(language)}
          />

          <AnalysisPanel results={results} />
        </div>

        {/* Refactored Diff & Export section */}
        {results && (
          <>
            <DiffViewer 
              refactoredCode={results.refactoredCode}
              language={language}
              onApplyRefactor={handleApplyRefactor}
            />

            <ReportExporter results={results} language={language} />
          </>
        )}
      </main>

      <footer style={{
        padding: '20px 28px',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        background: 'rgba(11, 15, 25, 0.9)'
      }}>
        <div>
          Built by <strong>Moole Asish Reddy</strong> &bull; Showcase Portfolio Project 1
        </div>
        <div>
          Powered by ReactJS, Node.js, Express, AST Parsing & Gemini AI API
        </div>
      </footer>
    </div>
  );
}

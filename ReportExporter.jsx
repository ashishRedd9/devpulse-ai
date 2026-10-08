import React from 'react';

export default function ReportExporter({ results, language }) {
  if (!results) return null;

  const handleDownload = () => {
    const markdownContent = `# DevPulse AI - Code Audit & Security Report
Generated At: ${results.timestamp}
Language Target: ${language.toUpperCase()}
Overall Code Health Score: ${results.overallScore} / 100
Time Complexity: ${results.timeComplexity}
Space Complexity: ${results.spaceComplexity}

---

## 1. Executive Summary
- Total Lines Analyzed: ${results.linesAnalyzed}
- Total Vulnerabilities & Flaws Identified: ${results.issues.length}

## 2. OWASP Security & Algorithmic Flaws
${results.issues.map((issue, idx) => `
### Flaw #${idx + 1}: ${issue.title} [${issue.severity}]
- Category: ${issue.category}
- Impact: ${issue.description}
- Recommendation: ${issue.recommendation}
`).join('\n')}

---

## 3. Recommended Clean Architecture Code
\`\`\`${language}
${results.refactoredCode}
\`\`\`
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DevPulse_Audit_Report_${language}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
      <div>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Export Formal Audit Report</h4>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Generate production-ready markdown report for team code reviews or portfolio evidence.</p>
      </div>

      <button onClick={handleDownload} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download Markdown Audit (.md)
      </button>
    </div>
  );
}

import React from 'react';

export default function AnalysisPanel({ results }) {
  if (!results) {
    return (
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Ready for AI Audit</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '320px' }}>
          Click "Run AI Security Audit" to perform OWASP vulnerability scanning and Big-O complexity analysis.
        </p>
      </div>
    );
  }

  const { overallScore, timeComplexity, spaceComplexity, issues, linesAnalyzed } = results;

  const scoreColor = overallScore > 80 ? '#10b981' : overallScore > 55 ? '#f59e0b' : '#f43f5e';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Overview Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Code Health Score
          </span>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: scoreColor, marginTop: '4px' }}>
            {overallScore}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Time Complexity
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#06b6d4', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            {timeComplexity}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Space Overhead
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
            {spaceComplexity}
          </div>
        </div>
      </div>

      {/* Issues & Vulnerabilities List */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#f43f5e' }}>●</span> Detected Flaws & OWASP Alerts
          </h3>
          <span className="badge badge-purple">{issues.length} Issues Found</span>
        </div>

        {issues.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#10b981', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '6px' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div style={{ fontWeight: 600 }}>Clean Code Signature!</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No critical OWASP flaws or exponential bottlenecks detected.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {issues.map((issue) => (
              <div 
                key={issue.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: issue.severity === 'HIGH' ? 'rgba(244, 63, 94, 0.06)' : 'rgba(245, 158, 11, 0.06)',
                  borderLeft: `4px solid ${issue.severity === 'HIGH' ? '#f43f5e' : '#f59e0b'}`,
                  borderTop: '1px solid var(--border-subtle)',
                  borderRight: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f3f4f6' }}>
                    {issue.title}
                  </div>
                  <span className={`badge ${issue.severity === 'HIGH' ? 'badge-high' : 'badge-medium'}`}>
                    {issue.severity}
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.4' }}>
                  {issue.description}
                </p>

                <div style={{ fontSize: '0.78rem', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '6px', fontFamily: 'var(--font-mono)', color: '#a7f3d0' }}>
                  <strong>Recommendation:</strong> {issue.recommendation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

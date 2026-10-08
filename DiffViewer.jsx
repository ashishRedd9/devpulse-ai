import React from 'react';

export default function DiffViewer({ refactoredCode, language, onApplyRefactor }) {
  if (!refactoredCode) return null;

  return (
    <div className="glass-card" style={{ padding: '20px', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-purple">AI Auto-Refactor Engine</span>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>OWASP Security & Clean Architecture Suggestion</h3>
        </div>

        <button 
          onClick={onApplyRefactor}
          className="btn btn-emerald"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Apply Clean Refactor to Editor
        </button>
      </div>

      <div style={{
        background: '#0a0d14',
        borderRadius: '10px',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        padding: '16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        overflowX: 'auto',
        color: '#e5e7eb',
        lineHeight: '1.6'
      }}>
        <pre>{refactoredCode}</pre>
      </div>
    </div>
  );
}

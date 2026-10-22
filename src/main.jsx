import React from 'react';
import {createRoot} from 'react-dom/client';
import {overview} from './data/overview';
import './style.css';

function App() {
  return (
    <main className="research-page">
      <header className="title-block">
        <h1>{overview.title}</h1>
        <div className="project-details">
          <p><strong>Проект:</strong> {overview.project}</p>
          <p><strong>{overview.organization}</strong></p>
        </div>
      </header>

      <div className="research-blocks">
        <section className="research-block block-wide" aria-labelledby="goal-heading">
          <h2 id="goal-heading">Цель исследования</h2>
          <p>{overview.goal}</p>
        </section>

        <section className="research-block" aria-labelledby="method-heading">
          <h2 id="method-heading">Метод</h2>
          <p>{overview.method}</p>
        </section>

        <section className="research-block" aria-labelledby="audience-heading">
          <h2 id="audience-heading">Целевая аудитория</h2>
          <ul>{overview.audience.map(role => <li key={role}>{role}</li>)}</ul>
        </section>

        <section className="research-block block-wide" aria-labelledby="subject-heading">
          <h2 id="subject-heading">Предмет исследования</h2>
          <p>{overview.subject}</p>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

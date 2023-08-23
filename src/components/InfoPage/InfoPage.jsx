import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="tech">
      <h1>Technologies utilized</h1>
      <p>CSS</p>
      <p>Express</p>
      <p>HTML</p>
      <p>JavaScript</p>
      <p>Material UI</p>
      <p>Node</p>
      <p>Passport</p>
      <p>PostgreSQL</p>
      <p>React: hooks, Redux, sagas</p>

    </div>
  );
}

export default InfoPage;

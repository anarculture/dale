import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // tu CSS de Tailwind

const App: React.FC = () => {
  return (
    <div>
      Hello, world!
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


import React from 'react';
import { createRoot } from 'react-dom/client';
import AutoModePage from './components/AutoModePage';

function App() {
  return (
    <div className="w-full min-h-screen h-screen overflow-hidden bg-[#f0f2f5] text-slate-800 font-sans flex flex-col" data-page-key="autoMode">
      <AutoModePage />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

export default App;

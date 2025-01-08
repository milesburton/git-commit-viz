import React from 'react';
import ContributionHeatmap from './components/ContributionHeatmap';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Git Commit Visualization</h1>
        <ContributionHeatmap />
      </div>
    </div>
  );
};

export default App;

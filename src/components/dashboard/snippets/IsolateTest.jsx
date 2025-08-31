import { useState } from 'react';
import { Plus, Github, Sparkles, Search, ArrowRight } from 'lucide-react';

// Inline QuickActionsPanel to eliminate import issues
const TestQuickActionsPanel = (props) => {
  console.log('🔍 TestQuickActionsPanel received props:', props);
  console.log('🔍 Props keys:', Object.keys(props));
  
  const { onCreateSnippet, onImportGitHub, onAIGenerate, onSearch } = props;
  
  const handleCreateClick = () => {
    console.log('🔴 Test create button clicked!');
    console.log('🔴 onCreateSnippet exists:', !!onCreateSnippet);
    console.log('🔴 onCreateSnippet type:', typeof onCreateSnippet);
    
    if (onCreateSnippet) {
      onCreateSnippet();
    } else {
      console.error('🔴 onCreateSnippet is undefined in test component!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Quick Actions</h2>
      
      <button
        onClick={handleCreateClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Create New Snippet (Test)</span>
      </button>
      
      <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
        <strong>Props Debug:</strong><br />
        onCreateSnippet: {typeof onCreateSnippet}<br />
        Props keys: {Object.keys(props).join(', ')}<br />
        Props object: {JSON.stringify(props)}
      </div>
    </div>
  );
};

// Test parent component
export default function IsolatedTest() {
  const [currentView, setCurrentView] = useState('list');
  
  const testCreateHandler = () => {
    console.log('🟢 TEST HANDLER CALLED SUCCESSFULLY!');
    setCurrentView('create');
  };

  console.log('🔍 Parent component render - testCreateHandler:', typeof testCreateHandler);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Isolated Props Test</h1>
      
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <strong>Current View:</strong> {currentView}
      </div>

      {currentView === 'list' && (
        <TestQuickActionsPanel
          onCreateSnippet={testCreateHandler}
          onImportGitHub={() => console.log('GitHub')}
          onAIGenerate={() => console.log('AI')}
          onSearch={() => console.log('Search')}
        />
      )}

      {currentView === 'create' && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-xl font-bold mb-4">🎉 SUCCESS!</h2>
          <p>The prop passing worked correctly!</p>
          <button 
            onClick={() => setCurrentView('list')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
}
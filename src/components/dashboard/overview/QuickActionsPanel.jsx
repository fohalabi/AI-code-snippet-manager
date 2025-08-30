import React, { useState } from 'react';
import { Plus, Github, Sparkles, Search, ArrowRight } from 'lucide-react';

const QuickActionsPanel = ({
  onCreateSnippet,
  onImportGitHub,
  onAIGenerate,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const actionButtons = [
    {
      id: 'create',
      title: 'Create New Snippet',
      description: 'Start building a new code snippet',
      icon: Plus,
      onClick: onCreateSnippet,
      gradient: 'from-blue-500 to-blue-600',
      isPrimary: true
    },
    {
      id: 'github',
      title: 'Import from GitHub',
      description: 'Sync repositories and gists',
      icon: Github,
      onClick: onImportGitHub,
      gradient: 'from-gray-700 to-gray-800',
      isPrimary: true
    },
    {
      id: 'ai',
      title: 'Generate with AI',
      description: 'Let AI help create snippets',
      icon: Sparkles,
      onClick: onAIGenerate,
      gradient: 'from-purple-500 to-purple-600',
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600 text-sm">Jump into your most common tasks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {actionButtons.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`
                group relative overflow-hidden rounded-lg p-4 md:p-6 text-left transition-all duration-200
                ${action.isPrimary 
                  ? 'bg-gradient-to-br ' + action.gradient + ' text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              <div className={`
                inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg mb-3 md:mb-4
                ${action.isPrimary ? 'bg-white/20' : 'bg-gray-100'}
              `}>
                <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${action.isPrimary ? 'text-white' : 'text-gray-600'}`} />
              </div>

              <div className="space-y-1">
                <h3 className={`font-semibold text-sm md:text-base ${action.isPrimary ? 'text-white' : 'text-gray-900'}`}>
                  {action.title}
                </h3>
                <p className={`text-xs md:text-sm ${action.isPrimary ? 'text-white/90' : 'text-gray-600'}`}>
                  {action.description}
                </p>
              </div>

              {!action.isPrimary && (
                <ArrowRight className="absolute top-3 md:top-4 right-3 md:right-4 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Quick search snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                className={`
                  w-full px-3 md:px-4 py-2 md:py-3 pr-10 md:pr-12 bg-gray-50 border rounded-lg text-sm md:text-base
                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                  transition-all duration-200
                  ${isSearchFocused ? 'bg-white border-black shadow-sm' : 'border-gray-200 hover:border-gray-300'}
                `}
              />
              
              <button
                onClick={handleSearchSubmit}
                disabled={!searchQuery.trim()}
                className={`
                  absolute right-2 top-1/2 transform -translate-y-1/2 p-1 md:p-2 rounded-md transition-all duration-200
                  ${searchQuery.trim() ? 'text-black hover:text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'}
                `}
              >
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 ml-11 md:ml-13">
          Press Enter or click arrow to search
        </div>
      </div>
    </div>
  );
  
  console.log('QuickActionsPanel props:', { onCreateSnippet });
};
export default QuickActionsPanel;
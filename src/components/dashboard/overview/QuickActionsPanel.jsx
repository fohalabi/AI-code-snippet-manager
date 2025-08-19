import React, { useState } from 'react';
import { Plus, Github, Sparkles, Search, ArrowRight } from 'lucide-react';

const QuickActionsPanel = ({
  onCreateSnippet = () => console.log('Create snippet clicked'),
  onImportGitHub = () => console.log('Import from GitHub clicked'),
  onAIGenerate = () => console.log('AI Generate clicked'),
  onSearch = (query) => console.log('Search:', query)
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
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
      hoverGradient: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      isPrimary: true
    },
    {
      id: 'github',
      title: 'Import from GitHub',
      description: 'Sync repositories and gists',
      icon: Github,
      onClick: onImportGitHub,
      gradient: 'from-gray-700 to-gray-800',
      hoverGradient: 'from-gray-800 to-gray-900',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700'
    },
    {
      id: 'ai',
      title: 'Generate with AI',
      description: 'Let AI help create snippets',
      icon: Sparkles,
      onClick: onAIGenerate,
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'from-purple-600 to-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Quick Actions
        </h2>
        <p className="text-gray-600 text-sm">
          Jump into your most common tasks
        </p>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {actionButtons.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`
                group relative overflow-hidden rounded-lg p-6 text-left transition-all duration-200
                ${action.isPrimary 
                  ? 'bg-gradient-to-br ' + action.gradient + ' text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              {/* Background gradient overlay on hover for non-primary buttons */}
              {!action.isPrimary && (
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 
                  group-hover:opacity-5 transition-opacity duration-200
                `} />
              )}
              
              {/* Icon */}
              <div className={`
                inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4
                ${action.isPrimary 
                  ? 'bg-white/20' 
                  : action.iconBg
                }
              `}>
                <IconComponent className={`
                  w-6 h-6 
                  ${action.isPrimary 
                    ? 'text-white' 
                    : action.iconColor
                  }
                `} />
              </div>

              {/* Content */}
              <div className="space-y-1 relative z-10">
                <h3 className={`
                  font-semibold text-base
                  ${action.isPrimary 
                    ? 'text-white' 
                    : 'text-gray-900 group-hover:text-gray-700'
                  }
                `}>
                  {action.title}
                </h3>
                <p className={`
                  text-sm
                  ${action.isPrimary 
                    ? 'text-white/90' 
                    : 'text-gray-600'
                  }
                `}>
                  {action.description}
                </p>
              </div>

              {/* Arrow icon for non-primary buttons */}
              {!action.isPrimary && (
                <ArrowRight className="
                  absolute top-4 right-4 w-4 h-4 text-gray-400 
                  opacity-0 group-hover:opacity-100 
                  transform translate-x-1 group-hover:translate-x-0 
                  transition-all duration-200
                " />
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Search Section */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Quick search snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyPress={handleSearchKeyPress}
                className={`
                  w-full px-4 py-3 pr-12 bg-gray-50 border rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                  transition-all duration-200
                  ${isSearchFocused 
                    ? 'bg-white border-black shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              />
              
              {/* Search button */}
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className={`
                  absolute right-2 top-1/2 transform -translate-y-1/2
                  p-2 rounded-md transition-all duration-200
                  ${searchQuery.trim()
                    ? 'text-black hover:black cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Search hint */}
        <div className="mt-2 text-xs text-gray-500 ml-13">
          Press Enter or click arrow to search
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
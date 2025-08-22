import React, { useState } from 'react';
import { 
    ChevronLeft, 
    ChevronRight,
    Pin,
    Clock,
    Keyboard,
    HardDrive,
    Search,
    Code,
    Star,
    Play,
    Copy,
    Eye,
    Trash2,
    ChevronDown,
    ChevronUp,
    Zap,
    Upload,
    AlertCircle
} from 'lucide-react';

const QuickAccessSidebar = ({ 
    pinnedSnippets = [], 
    recentSearches = [], 
    storageUsage = { used: 0, total: 0 }, 
    shortcuts = [],
    isCollapsed: propIsCollapsed,
    onToggleCollapse
}) => {
    const [isCollapsed, setIsCollapsed] = useState(propIsCollapsed || false);
    const [expandedSections, setExpandedSections] = useState({
        pinned: true,
        searches: true,
        shortcuts: false,
        storage: true
    });

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        if (onToggleCollapse) {
            onToggleCollapse(newState);
        }
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleAction = (actionType, item) => {
        console.log(`${actionType} action:`, item);
        // Implement actual actions:
        // - viewSnippet: Navigate to snippet
        // - copySnippet: Copy to clipboard
        // - unpinSnippet: Remove from pinned
        // - runSearch: Execute search query
        // - deleteSearch: Remove from recent searches
    };

    const getLanguageColor = (language) => {
        const colors = {
            'JavaScript': 'text-yellow-600',
            'React': 'text-blue-600',
            'Python': 'text-green-600',
            'TypeScript': 'text-blue-800',
            'CSS': 'text-purple-600',
            'HTML': 'text-orange-600',
            'Node.js': 'text-green-700',
            'PHP': 'text-indigo-600',
            'Java': 'text-red-600',
            'C++': 'text-gray-700'
        };
        return colors[language] || 'text-gray-600';
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const calculateStoragePercentage = () => {
        if (storageUsage.total === 0) return 0;
        return Math.round((storageUsage.used / storageUsage.total) * 100);
    };

    const formatStorageSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const SectionHeader = ({ title, icon: Icon, count, section, children }) => (
        <div className="mb-3">
            <button
                onClick={() => toggleSection(section)}
                className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                isCollapsed ? 'justify-center' : ''
                }`}
            >
                <div className="flex items-center space-x-2 min-w-0">
                <Icon className="h-4 w-4 text-gray-600 flex-shrink-0" />
                {!isCollapsed && (
                    <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
                )}
                {!isCollapsed && count !== undefined && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {count}
                    </span>
                )}
                </div>
                {!isCollapsed && (
                <div className="flex-shrink-0">
                    {expandedSections[section] ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                </div>
                )}
            </button>
            {!isCollapsed && expandedSections[section] && children}
        </div>
    );

    const PinnedSnippetItem = ({ snippet }) => (
        <div className="group p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-2">
                <div className={`p-1 rounded ${getLanguageColor(snippet.language)}`}>
                    <Code className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-gray-900 truncate">{snippet.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{snippet.language}</p>
                    <p className="text-xs text-gray-400">{formatTimeAgo(snippet.lastUsed)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => handleAction('viewSnippet', snippet)}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                    title="View snippet"
                >
                    <Eye className="h-3 w-3 text-gray-600" />
                </button>
                <button
                    onClick={() => handleAction('copySnippet', snippet)}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                    title="Copy snippet"
                >
                    <Copy className="h-3 w-3 text-gray-600" />
                </button>
                <button
                    onClick={() => handleAction('unpinSnippet', snippet)}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                    title="Unpin snippet"
                >
                    <Trash2 className="h-3 w-3 text-gray-600" />
                </button>
            </div>
        </div>
    );

    const RecentSearchItem = ({ search }) => (
        <div className="group p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-2">
                <Search className="h-3 w-3 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 truncate">{search.query}</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{search.results} results</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{formatTimeAgo(search.timestamp)}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => handleAction('runSearch', search)}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                    title="Run search again"
                >
                    <Play className="h-3 w-3 text-gray-600" />
                </button>
                <button
                    onClick={() => handleAction('deleteSearch', search)}
                    className="p-1 rounded hover:bg-gray-200 transition-colors"
                    title="Remove from history"
                >
                    <Trash2 className="h-3 w-3 text-gray-600" />
                </button>
            </div>
        </div>
    );

    const ShortcutItem = ({ shortcut }) => (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <span className="text-xs text-gray-700">{shortcut.description}</span>
            <div className="flex items-center space-x-1">
                {shortcut.keys.map((key, index) => (
                <React.Fragment key={index}>
                    <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 border border-gray-300 rounded">
                    {key}
                    </kbd>
                    {index < shortcut.keys.length - 1 && (
                    <span className="text-xs text-gray-400">+</span>
                    )}
                </React.Fragment>
                ))}
            </div>
        </div>
    );

    const storagePercentage = calculateStoragePercentage();
    const isStorageCritical = storagePercentage >= 90;
    const isStorageWarning = storagePercentage >= 75;

    return (
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
        } flex flex-col h-full`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isCollapsed && (
            <h2 className="text-sm font-semibold text-gray-900">Quick Access</h2>
            )}
            <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
            {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
                <ChevronLeft className="h-4 w-4 text-gray-600" />
            )}
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Pinned Snippets */}
            <SectionHeader
            title="Pinned Snippets"
            icon={Pin}
            count={pinnedSnippets.length}
            section="pinned"
            >
            <div className="space-y-2">
                {pinnedSnippets.length > 0 ? (
                pinnedSnippets.map(snippet => (
                    <PinnedSnippetItem key={snippet.id} snippet={snippet} />
                ))
                ) : (
                <div className="p-3 text-center">
                    <Star className="h-6 w-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No pinned snippets yet</p>
                    <p className="text-xs text-gray-400 mt-1">Pin frequently used snippets for quick access</p>
                </div>
                )}
            </div>
            </SectionHeader>

            {/* Recent Searches */}
            <SectionHeader
            title="Recent Searches"
            icon={Clock}
            count={recentSearches.length}
            section="searches"
            >
            <div className="space-y-2">
                {recentSearches.length > 0 ? (
                recentSearches.map(search => (
                    <RecentSearchItem key={search.id} search={search} />
                ))
                ) : (
                <div className="p-3 text-center">
                    <Search className="h-6 w-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No recent searches</p>
                    <p className="text-xs text-gray-400 mt-1">Search history will appear here</p>
                </div>
                )}
            </div>
            </SectionHeader>

            {/* Keyboard Shortcuts */}
            <SectionHeader
            title="Shortcuts"
            icon={Keyboard}
            count={shortcuts.length}
            section="shortcuts"
            >
            <div className="space-y-1">
                {shortcuts.map(shortcut => (
                <ShortcutItem key={shortcut.id} shortcut={shortcut} />
                ))}
            </div>
            </SectionHeader>

            {/* Storage Usage */}
            <SectionHeader
            title="Storage"
            icon={HardDrive}
            section="storage"
            >
            <div className="space-y-3">
                <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">
                    {formatStorageSize(storageUsage.used)} / {formatStorageSize(storageUsage.total)}
                    </span>
                    <span className={`text-xs font-medium ${
                    isStorageCritical ? 'text-red-600' :
                    isStorageWarning ? 'text-yellow-600' :
                    'text-gray-600'
                    }`}>
                    {storagePercentage}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                        isStorageCritical ? 'bg-red-500' :
                        isStorageWarning ? 'bg-yellow-500' :
                        'bg-blue-500'
                    }`}
                    style={{ width: `${storagePercentage}%` }}
                    />
                </div>
                </div>

                {(isStorageCritical || isStorageWarning) && (
                <div className={`p-3 rounded-lg border ${
                    isStorageCritical 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                    <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className={`h-4 w-4 ${
                        isStorageCritical ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                    <span className={`text-xs font-medium ${
                        isStorageCritical ? 'text-red-900' : 'text-yellow-900'
                    }`}>
                        {isStorageCritical ? 'Storage Critical' : 'Storage Warning'}
                    </span>
                    </div>
                    <p className={`text-xs ${
                    isStorageCritical ? 'text-red-700' : 'text-yellow-700'
                    } mb-3`}>
                    {isStorageCritical 
                        ? 'Your storage is almost full. Consider upgrading your plan.'
                        : 'You\'re running low on storage space.'
                    }
                    </p>
                    <button
                    onClick={() => handleAction('upgrade', null)}
                    className={`w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                        isStorageCritical
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                    >
                    <Upload className="h-3 w-3" />
                    <span>Upgrade Plan</span>
                    </button>
                </div>
                )}
            </div>
            </SectionHeader>
        </div>

        {/* Footer */}
        {!isCollapsed && (
            <div className="p-4 border-t border-gray-200">
            <button
                onClick={() => handleAction('openSettings', null)}
                className="w-full text-xs text-gray-600 hover:text-gray-900 transition-colors"
            >
                Customize Sidebar
            </button>
            </div>
        )}
        </div>
    );
};

// Example usage with mock data
const ExampleUsage = () => {
  const mockPinnedSnippets = [
    {
      id: 1,
      title: "useDebounce Hook",
      language: "React",
      lastUsed: "2024-08-22T08:30:00Z"
    },
    {
      id: 2,
      title: "API Error Handler",
      language: "JavaScript",
      lastUsed: "2024-08-21T15:45:00Z"
    }
  ];

  const mockRecentSearches = [
    {
      id: 1,
      query: "react hooks",
      results: 15,
      timestamp: "2024-08-22T10:15:00Z"
    },
    {
      id: 2,
      query: "async await",
      results: 8,
      timestamp: "2024-08-22T09:30:00Z"
    }
  ];

  const mockShortcuts = [
    { id: 1, description: "Quick search", keys: ["Ctrl", "/"] },
    { id: 2, description: "New snippet", keys: ["Ctrl", "N"] },
    { id: 3, description: "Save snippet", keys: ["Ctrl", "S"] },
    { id: 4, description: "Toggle sidebar", keys: ["Ctrl", "B"] }
  ];

  const mockStorageUsage = {
    used: 750 * 1024 * 1024, // 750MB
    total: 1024 * 1024 * 1024 // 1GB
  };

  return (
    <div className="h-screen flex">
      <QuickAccessSidebar
        pinnedSnippets={mockPinnedSnippets}
        recentSearches={mockRecentSearches}
        shortcuts={mockShortcuts}
        storageUsage={mockStorageUsage}
      />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-900">Main Content Area</h1>
        <p className="text-gray-600 mt-2">The sidebar can be collapsed and expanded.</p>
      </div>
    </div>
  );
};

export default QuickAccessSidebar;
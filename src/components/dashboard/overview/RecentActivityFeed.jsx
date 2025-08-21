import React, { useState } from 'react';
import { Eye, Edit3, Trash2, Clock, Calendar, Activity } from 'lucide-react';

const RecentActivityFeed = ({
    recentSnippets = [],
    recentlyModified = [],
    recentlyUsed = []
}) => {
    // Stake to track the active tab
    const [activeTab, setActiveTab] = useState('added');

    // Tab configuration with icons and labels
    const tabs = [
       {
            id: 'added',
            label: 'Recently Added',
            icon: Calendar,
            data: recentSnippets,
            emptyMessage: 'No recent snippets added'
       },
       {
            id: 'modified',
            label: 'Recently Modified',
            icon: Edit3,
            data: recentlyModified,
            emptyMessage: 'No recent snippets modified'
       },
       {
            id: 'used',
            label: 'Recently Used',
            icon: Clock,
            data: recentlyUsed,
            emptyMessage: 'No recent snippets used'
       }
    ];

    //Get the currently active tab's data
    const currentTab = tabs.find(tab => tab.id === activeTab);
    const currentData = currentTab ? currentTab?.data || [] : [];

    // Format timestamp to relative time
    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
        return date.toLocaleDateString();
    };

    //Get language badge color based on language
    const getLanguageBadgeColor = (language) => {
        const colors = {
            javascript: 'bg-yellow-100 text-yellow-800',
            python: 'bg-green-100 text-green-800',
            react: 'bg-blue-100 text-blue-800',
            css: 'bg-purple-100 text-purple-800',
            html: 'bg-red-100 text-red-800',
            typescript: 'bg-indigo-100 text-indigo-800',
        };
        return colors[language?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    // Truncate code preview to 2-3 lines
    const truncateCode = (code, maxLines = 3) => {
        if (!code) return '';
        const lines = code.split('\n');
        const truncated = lines.slice(0, maxLines);
        return truncated.join('\n') + (lines.length > maxLines ? '\n...' : '');  
    };

    // Activity item component for reusability
    const ActivityItem = ({ item, tabType }) => (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            {/* Header with title and language badge */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLanguageBadgeColor(item.language)}`}>
                        {item.language}
                    </span>
                </div>
                {/* Usage count for "used" tab */}
                {tabType === 'used' && item.usageCount && (
                    <span className="text-sm text-gray-500 font-medium">
                        {item.usageCount} uses
                    </span>
                )}
            </div>

            {/* Code preview */}
            <div className="mb-3">
                <pre className="bg-gray-50 rounded-md p-3 text-sm font-mono text-gray-700 overflow-x-auto whitespace-pre-wrap">
                    {truncateCode(item.code)}
                </pre>
            </div>

            {/* Footer with timestamp and actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{formatTimestamp(item.timestamp)}</span>
                </div>
        
                {/* Action buttons */}
                <div className="flex items-center gap-2">
                <button 
                    className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-150"
                    title="View snippet"
                >
                    <Eye size={16} />
                </button>
                <button 
                    className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors duration-150"
                    title="Edit snippet"
                >
                    <Edit3 size={16} />
                </button>
                <button 
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-150"
                    title="Delete snippet"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-xl p-6 h-full flex flex-col">
        {/* Component Header */}
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Recent Activity</h2>
            <p className="text-gray-600 text-sm">Track your latest snippet activities</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-6">
            {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                        <IconComponent size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                );
            })}
        </div>

        {/* Activity Content */}
        <div className="flex-1 overflow-hidden">
            {currentData.length > 0 ? (
                <div className="h-full overflow-y-auto space-y-3 pr-2">
                    {currentData.map((item, index) => (
                        <ActivityItem 
                        key={item.id || index} 
                        item={item} 
                        tabType={activeTab}
                    />
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Activity size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No Activity Yet</p>
                <p className="text-sm text-center">{currentTab?.emptyMessage}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
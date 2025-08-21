import React, { useState } from 'react';
import { 
  Brain, 
  Lightbulb, 
  AlertTriangle, 
  Copy, 
  Star, 
  FolderPlus, 
  Code, 
  Trash2, 
  ArrowRight, 
  CheckCircle,
  X,
  RefreshCw
} from 'lucide-react';

const AIInsightsPanel = ({ 
    suggestions = [], 
    organizationTips = [], 
    qualityAlerts = [], 
    duplicates = [] 
}) => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [dismissedItems, setDismissedItems] = useState(new Set());

  const tabs = [
    { id: 'suggestions', label: 'Smart Suggestions', icon: Star, count: suggestions.length },
    { id: 'organization', label: 'Organization', icon: FolderPlus, count: organizationTips.length },
    { id: 'quality', label: 'Code Quality', icon: AlertTriangle, count: qualityAlerts.length },
    { id: 'duplicates', label: 'Duplicates', icon: Copy, count: duplicates.length },
  ];

    const dismissItem = (id) => {
        setDismissedItems(prev => new Set([...prev, id]));
    };

    const handleAction = (actionType, item) => {
        console.log(`${actionType} action for item:`, item);
        // Here you would implement actual actions like:
        // - Adding to favorites
        // - Creating collections
        // - Merging duplicates
        // - Fixing quality issues
    };

    const InsightCard = ({ insight, type, onDismiss, onAction }) => {
        if (dismissedItems.has(insight.id)) return null;

        const getTypeConfig = () => {
            switch (type) {
                case 'suggestions':
                    return {
                        bgColor: 'bg-blue-50 border-blue-200',
                        iconColor: 'text-blue-600',
                        titleColor: 'text-blue-900',
                        actions: [
                            { label: 'Add to Favorites', icon: Star, action: 'favorite' },
                            { label: 'View Snippet', icon: ArrowRight, action: 'view' }
                        ]
                    };
                case 'organization':
                    return {
                        bgColor: 'bg-green-50 border-green-200',
                        iconColor: 'text-green-600',
                        titleColor: 'text-green-900',
                        actions: [
                            { label: 'Create Collection', icon: FolderPlus, action: 'create-collection' },
                            { label: 'Auto-organize', icon: RefreshCw, action: 'auto-organize' }
                        ]
                    };
                case 'quality':
                    return {
                        bgColor: 'bg-yellow-50 border-yellow-200',
                        iconColor: 'text-yellow-600',
                        titleColor: 'text-yellow-900',
                        actions: [
                            { label: 'Fix Issues', icon: Code, action: 'fix' },
                            { label: 'Review Code', icon: ArrowRight, action: 'review' }
                        ]
                    };
                case 'duplicates':
                    return {
                        bgColor: 'bg-red-50 border-red-200',
                        iconColor: 'text-red-600',
                        titleColor: 'text-red-900',
                        actions: [
                            { label: 'Merge Snippets', icon: Copy, action: 'merge' },
                            { label: 'Delete Duplicate', icon: Trash2, action: 'delete' }
                        ]
                    };
                default:
                    return {
                        bgColor: 'bg-gray-50 border-gray-200',
                        iconColor: 'text-gray-600',
                        titleColor: 'text-gray-900',
                        actions: []
                    };
                }
            };

            const config = getTypeConfig();

            return (
                <div className={`p-4 rounded-lg border ${config.bgColor} relative group`}>
                    {/* Dismiss Button */}
                    <button
                        onClick={() => onDismiss(insight.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white hover:bg-opacity-50 rounded"
                    >
                        <X className="h-4 w-4 text-gray-500" />
                    </button>

                    {/* Content */}
                    <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-white ${config.iconColor}`}>
                            <Brain className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-semibold ${config.titleColor}`}>
                                {insight.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                                {insight.description}
                            </p>
            
                            {/* Metadata */}
                            {insight.metadata && (
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                    {insight.metadata.confidence && (
                                        <span>Confidence: {Math.round(insight.metadata.confidence * 100)}%</span>
                                    )}
                                    {insight.metadata.impact && (
                                        <span>Impact: {insight.metadata.impact}</span>
                                    )}
                                    {insight.metadata.snippetCount && (
                                        <span>{insight.metadata.snippetCount} snippets affected</span>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 mt-3">
                                {config.actions.map((action, index) => {
                                    const ActionIcon = action.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => onAction(action.action, insight)}
                                            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            <ActionIcon className="h-3 w-3" />
                                            <span>{action.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        const getInsightsByType = (type) => {
            switch (type) {
                case 'suggestions':
                    return suggestions;
                case 'organization':
                    return organizationTips;
                case 'quality':
                    return qualityAlerts;
                case 'duplicates':
                    return duplicates;
            default:
                 return [];
        }
    };

    const insights = getInsightsByType(activeTab);
    const visibleInsights = insights.filter(insight => !dismissedItems.has(insight.id));

    return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                    <p className="text-sm text-gray-600">Smart recommendations for your code snippets</p>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                            isActive
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <TabIcon className="h-4 w-4" />
                        <span>{tab.label}</span>
                        {tab.count > 0 && (
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                isActive 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-gray-100 text-gray-600'
                            }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>
      </div>

        {/* Content */}
        <div className="p-6">
            {visibleInsights.length > 0 ? (
                <div className="space-y-4">
                    {visibleInsights.map((insight) => (
                        <InsightCard
                            key={insight.id}
                            insight={insight}
                            type={activeTab}
                            onDismiss={dismissItem}
                            onAction={handleAction}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h4>
                    <p className="text-gray-600">
                        {dismissedItems.size > 0 
                            ? "You've dismissed all insights in this category." 
                            : "No insights available in this category right now."}
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};

// Example usage with mock data
const ExampleUsage = () => {
    const mockSuggestions = [
        {
            id: 1,
            title: "Trending React Hook Pattern",
            description: "Based on your recent activity, you might find useCallback optimization patterns useful.",
            metadata: { confidence: 0.85, impact: "High" }
        },
        {
            id: 2,
            title: "API Integration Template",
            description: "You've been working with APIs lately. Here's a reusable fetch wrapper that could save time.",
            metadata: { confidence: 0.92, impact: "Medium" }
        }
    ];

    const mockOrganizationTips = [
        {
            id: 3,
            title: "Create React Components Collection",
            description: "You have 12 React components that could be organized into a dedicated collection.",
            metadata: { snippetCount: 12, impact: "Medium" }
        }
    ];

    const mockQualityAlerts = [
        {
            id: 4,
            title: "Update Deprecated Methods",
            description: "3 snippets contain deprecated React lifecycle methods that should be updated.",
            metadata: { snippetCount: 3, impact: "High" }
        }
    ];

    const mockDuplicates = [
        {
            id: 5,
            title: "Similar API Functions Detected",
            description: "Found 2 snippets with very similar API call patterns that could be merged.",
            metadata: { confidence: 0.78, snippetCount: 2 }
        }
    ];

    return (
        <AIInsightsPanel
            suggestions={mockSuggestions}
            organizationTips={mockOrganizationTips}
            qualityAlerts={mockQualityAlerts}
            duplicates={mockDuplicates}
        />
    );
};

export default AIInsightsPanel;
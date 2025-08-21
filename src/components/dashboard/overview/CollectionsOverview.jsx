import React, { useState } from 'react';
import { 
    FolderOpen, 
    Code, 
    Star, 
    Clock, 
    Users, 
    Edit3, 
    Share2, 
    ArrowRight,
    Plus,
    Heart,
    Zap,
    Eye,
    MoreHorizontal
} from 'lucide-react';

const CollectionsOverview = ({ 
    favoriteCollections = [], 
    recentCollections = [], 
    suggestedCollections = [] 
}) => {
    const [activeSection, setActiveSection] = useState('favorites');

    const sections = [
        { 
            id: 'favorites', 
            label: 'Favorites', 
            icon: Heart, 
            data: favoriteCollections,
            description: 'Your starred collections'
        },
        { 
            id: 'recent', 
            label: 'Recent', 
            icon: Clock, 
            data: recentCollections,
            description: 'Recently accessed collections'
        },
        { 
            id: 'suggested', 
            label: 'Suggested', 
            icon: Zap, 
            data: suggestedCollections,
            description: 'AI-recommended collections'
        }
    ];

    const getLanguageColor = (language) => {
        const colors = {
            'JavaScript': 'bg-yellow-100 text-yellow-800',
            'React': 'bg-blue-100 text-blue-800',
            'Python': 'bg-green-100 text-green-800',
            'TypeScript': 'bg-blue-100 text-blue-900',
            'CSS': 'bg-purple-100 text-purple-800',
            'HTML': 'bg-orange-100 text-orange-800',
            'Node.js': 'bg-green-100 text-green-900',
            'PHP': 'bg-indigo-100 text-indigo-800',
            'Java': 'bg-red-100 text-red-800',
            'C++': 'bg-gray-100 text-gray-800'
        };
        return colors[language] || 'bg-gray-100 text-gray-800';
    };

    const formatTimestamp = (timestamp) => {
        const now = new Date();
        const date = new Date(timestamp);
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    };

    const handleAction = (actionType, collection) => {
        console.log(`${actionType} action for collection:`, collection);
        // Implement actual actions here:
        // - open: Navigate to collection page
        // - edit: Open edit modal
        // - share: Open share dialog
        // - favorite: Toggle favorite status
    };

    const CollectionCard = ({ collection, showSuggestionBadge = false }) => {
        const totalSnippets = collection.snippetCount || 0;
        const languages = collection.languages || [];
        const topLanguages = languages.slice(0, 3); // Show top 3 languages

    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
            {/* Card Header */}
            <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <FolderOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {collection.name}
                            </h3>
                            {collection.isFavorite && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                            )}
                            {showSuggestionBadge && (
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex-shrink-0">
                                    Suggested
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {collection.description}
                        </p>
                    </div>
                </div>
                
                {/* Quick Actions Menu */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 rounded-md hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                <Code className="h-4 w-4" />
                <span>{totalSnippets} snippet{totalSnippets !== 1 ? 's' : ''}</span>
                </div>
                {collection.isShared && (
                <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Shared</span>
                </div>
                )}
                <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatTimestamp(collection.lastActivity)}</span>
                </div>
            </div>

            {/* Language Tags */}
            {topLanguages.length > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xs text-gray-500">Languages:</span>
                    <div className="flex flex-wrap gap-1">
                        {topLanguages.map((lang, index) => (
                        <span
                            key={index}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getLanguageColor(lang.name)}`}
                        >
                            {lang.name} ({lang.count})
                        </span>
                        ))}
                        {languages.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            +{languages.length - 3} more
                        </span>
                        )}
                    </div>
                </div>
            )}

            {/* Activity Indicator */}
            {collection.activityLevel && (
                <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Activity</span>
                        <span className="capitalize">{collection.activityLevel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                            className={`h-1.5 rounded-full ${
                                collection.activityLevel === 'high' ? 'bg-green-500' :
                                collection.activityLevel === 'medium' ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}
                            style={{ 
                                width: collection.activityLevel === 'high' ? '80%' :
                                    collection.activityLevel === 'medium' ? '50%' : '20%'
                            }}
                        />
                    </div>
                </div>
            )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleAction('open', collection)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                    <Eye className="h-3 w-3" />
                    <span>Open</span>
                    </button>
                <button
                    onClick={() => handleAction('edit', collection)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit</span>
                </button>
            </div>
          
            <button
                onClick={() => handleAction('share', collection)}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
                <Share2 className="h-3 w-3" />
                <span>Share</span>
            </button>
        </div>
      </div>
    );
  };

    const CreateCollectionCard = () => (
        <div className="bg-white items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200 group cursor-pointer">
            <div className="p-6 text-center">
                <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Plus className="h-8 w-8 text-blue-600" />
                </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Collection</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Organize your snippets into custom collections
                    </p>
                <button
                    onClick={() => handleAction('create', null)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    <span>Create Collection</span>
                </button>
            </div>
        </div>
    );

    const activeData = sections.find(section => section.id === activeSection)?.data || [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
                    <p className="text-gray-600">Organize and manage your code snippet collections</p>
                </div>
                <button
                    onClick={() => handleAction('create', null)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    <span>New Collection</span>
                </button>
            </div>

            {/* Section Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                    {sections.map((section) => {
                        const SectionIcon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                                isActive
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <SectionIcon className="h-4 w-4" />
                                <span>{section.label}</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                isActive 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                {section.data.length}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Section Description */}
            <div className="text-sm text-gray-600">
                {sections.find(section => section.id === activeSection)?.description}
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Collection Card (only show in favorites) */}
                {activeSection === 'favorites' && <CreateCollectionCard />}
                
                {/* Collection Cards */}
                {activeData.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                        showSuggestionBadge={activeSection === 'suggested'}
                    />
                ))}
            </div>

            {/* Empty State */}
            {activeData.length === 0 && (
                <div className="text-center py-12">
                    <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FolderOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No {activeSection} collections yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {activeSection === 'favorites' && "Star collections to see them here"}
                        {activeSection === 'recent' && "Collections you access will appear here"}
                        {activeSection === 'suggested' && "AI suggestions will appear here when available"}
                    </p>
                    {activeSection === 'favorites' && (
                        <button
                        onClick={() => handleAction('create', null)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                        <Plus className="h-4 w-4" />
                        <span>Create Your First Collection</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

// Example usage with mock data
const ExampleUsage = () => {
    const mockFavorites = [
        {
            id: 1,
            name: "React Hooks Collection",
            description: "Custom hooks and patterns for React development",
            snippetCount: 24,
            languages: [
                { name: "React", count: 15 },
                { name: "JavaScript", count: 9 }
            ],
            lastActivity: "2024-08-20T10:30:00Z",
            isFavorite: true,
            isShared: true,
            activityLevel: "high"
        },
        {
            id: 2,
            name: "API Utilities",
            description: "Reusable functions for API integration and data fetching",
            snippetCount: 12,
            languages: [
                { name: "JavaScript", count: 8 },
                { name: "TypeScript", count: 4 }
            ],
            lastActivity: "2024-08-19T15:45:00Z",
            isFavorite: true,
            isShared: false,
            activityLevel: "medium"
        }
    ];

    const mockRecent = [
        {
            id: 3,
            name: "CSS Animations",
            description: "Collection of smooth CSS animations and transitions",
            snippetCount: 18,
            languages: [
                { name: "CSS", count: 15 },
                { name: "JavaScript", count: 3 }
            ],
            lastActivity: "2024-08-21T09:15:00Z",
            isFavorite: false,
            isShared: false,
            activityLevel: "low"
        }
    ];

    const mockSuggested = [
        {
            id: 4,
            name: "Python Data Science",
            description: "Data analysis and machine learning snippets",
            snippetCount: 31,
            languages: [
                { name: "Python", count: 25 },
                { name: "JavaScript", count: 6 }
            ],
            lastActivity: "2024-08-18T12:00:00Z",
            isFavorite: false,
            isShared: true,
            activityLevel: "high"
        }
    ];

    return (
        <CollectionsOverview
            favoriteCollections={mockFavorites}
            recentCollections={mockRecent}
            suggestedCollections={mockSuggested}
        />
    );
};

export default CollectionsOverview;
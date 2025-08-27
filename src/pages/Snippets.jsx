import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/dashboard/layout/DashboardLayout';
import QuickActionsPanel from '../components/dashboard/snippets/QuickActionsPanel';
import SnippetForm from '../components/dashboard/Snippets/SnippetForm';
import SnippeList from '../components/dashboard/Snippets/SnippetList';

export default function Snippets() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // State management
    const [snippets, setSnippets] = useState([]);
    const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
    const [editingSnippet, setEditingSnippet] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    //Load user's snippets from localStorage on mount
    useEffect(() => {
        const savedSnippets = localStorage.getItem(`codeSnippets_${user.uid}`);
        if (savedSnippets) {
            setSnippets(JSON.parse(savedSnippets));
        }
    }, [user.uid]);

    // Save snippets to localStorage whenever snippets change
    useEffect(() => {
        if (user?.uid) {
            localStorage.setItem(`codeSnippets_${user.uid}`, JSON.stringify(snippets));
        }
    }, [snippets, user?.uid]);

    // Authentication check
    if (loading) return <div>loading...</div>;
    if (!user) return <Navigate to="/auth" />;

    // Event handlers
    const handleCreateSnippet = () => {
        setCurrentView('create');
        setEditingSnippet(null);
    };

    const handleEditSnippet = (snippet) => {
        setEditingSnippet(snippet);
        setCurrentView('edit');
    };

    const handleSaveSnippet = (snippetData) => {
        if (currentView === 'edit') {
            setSnippets(prev => prev.map(s => s.id === snippetData.id ? snippetData : s));
        } else {
            setSnippets(prev => [snippetData, ...prev]);
        }
        setCurrentView('list');
        setEditingSnippet(null);
    };

    const handleDeleteSnippet = (snippetId) => {
        if (window.confirm('Are you sure you want to delete this snippet?')) {
            setSnippets(prev => prev.filter(s => s.id !== snippetId));
        }
    };

    const handleCopySnippet = (snippetId) => {
        console.log('Snippet copied:', snippetId);
        // Could add toast notification here
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
    };

    const handleImportGitHub = () => {
        alert('GitHub import feature coming soon!');
    };

    const handleAIGenerate = () => {
        alert('AI generation feature coming soon!');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setEditingSnippet(null);
    };

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Code Snippets
                    </h1>
                    <p className="text-gray-600">
                        Organize and manage your code snippets efficiently
                    </p>
                </div>
                
                <div className="flex items-center space-x-3">
                    {currentView !== 'list' && (
                    <button
                        onClick={handleBackToList}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to List</span>
                    </button>
                    )}
                    
                    <button
                        onClick={handleBackToDashboard}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                    </button>
                </div>
                </div>

                {/* Content based on current view */}
                {currentView === 'list' && (
                <>
                    <QuickActionsPanel
                        onCreateSnippet={handleCreateSnippet}
                        onImportGitHub={handleImportGitHub}
                        onAIGenerate={handleAIGenerate}
                        onSearch={handleSearch}
                    />
                    
                    {searchTerm && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800 text-sm">
                                Showing results for: <span className="font-medium">"{searchTerm}"</span>
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                                >
                                    Clear
                                </button>
                            </p>
                        </div>
                    )}

                    <SnippetsList
                        snippets={snippets}
                        onEdit={handleEditSnippet}
                        onDelete={handleDeleteSnippet}
                        onCopy={handleCopySnippet}
                        searchTerm={searchTerm}
                    />
                </>
                )}

                {currentView === 'create' && (
                <SnippetForm
                    onSave={handleSaveSnippet}
                    onCancel={handleBackToList}
                />
                )}

                {currentView === 'edit' && editingSnippet && (
                <SnippetForm
                    snippet={editingSnippet}
                    onSave={handleSaveSnippet}
                    onCancel={handleBackToList}
                    isEditing={true}
                />
                )}
            </div>
        </DashboardLayout>
    );
}
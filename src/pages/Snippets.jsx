import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/dashboard/layout/DashboardLayout';
// import QuickActionsPanel from '../components/dashboard/overview/QuickActionsPanel';
import IsolatedTest from '../components/dashboard/snippets/IsolateTest';
import SnippetForm from '../components/dashboard/snippets/SnippetForm';
import SnippetList from '../components/dashboard/snippets/SnippetList';

export default function Snippets() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // State management
    const [snippets, setSnippets] = useState([]);
    const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'edit'
    const [editingSnippet, setEditingSnippet] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Authentication check FIRST
    if (loading) return <div>loading...</div>;
    if (!user) return <Navigate to="/auth" />;

    // Load user's snippets from localStorage on mount
    useEffect(() => {
        if (!user?.uid) return;
        const savedSnippets = localStorage.getItem(`codeSnippets_${user.uid}`);
        if (savedSnippets) {
            setSnippets(JSON.parse(savedSnippets));
        }
    }, [user.uid]);

    // Save snippets to localStorage whenever snippets change
    useEffect(() => {
        if (!user?.uid) return;
        localStorage.setItem(`codeSnippets_${user.uid}`, JSON.stringify(snippets));
    }, [snippets, user.uid]);

    // Event handlers - define them as object properties to ensure they exist
    const handlers = {
        createSnippet: () => {
            console.log('🟢 CREATE HANDLER CALLED');
            setCurrentView('create');
            setEditingSnippet(null);
        },
        editSnippet: (snippet) => {
            setEditingSnippet(snippet);
            setCurrentView('edit');
        },
        saveSnippet: (snippetData) => {
            console.log('🟢 SAVING SNIPPET:', snippetData);
            if (currentView === 'edit') {
                setSnippets(prev => prev.map(s => s.id === snippetData.id ? snippetData : s));
            } else {
                setSnippets(prev => [snippetData, ...prev]);
            }
            setCurrentView('list');
            setEditingSnippet(null);
        },
        deleteSnippet: (snippetId) => {
            if (window.confirm('Are you sure you want to delete this snippet?')) {
                setSnippets(prev => prev.filter(s => s.id !== snippetId));
            }
        },
        copySnippet: (snippetId) => {
            console.log('Snippet copied:', snippetId);
        },
        search: (query) => {
            setSearchTerm(query);
        },
        importGitHub: () => {
            alert('GitHub import feature coming soon!');
        },
        aiGenerate: () => {
            alert('AI generation feature coming soon!');
        },
        backToList: () => {
            setCurrentView('list');
            setEditingSnippet(null);
        },
        backToDashboard: () => {
            navigate('/dashboard');
        }
    };

    // Debug handlers
    console.log('🔍 Handlers object:', handlers);
    console.log('🔍 createSnippet function:', typeof handlers.createSnippet);

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

                {/* Debug info */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm">
                        <strong>Debug:</strong> Current view: {currentView} | 
                        Function exists: {typeof handleCreateSnippet === 'function' ? '✅' : '❌'} |
                        Snippets: {snippets.length}
                    </p>
                </div>

                {/* Content based on current view */}
                {currentView === 'list' && (
                <>
                    <IsolatedTest
                        onCreateSnippet={handlers.createSnippet}
                        onImportGitHub={handlers.importGitHub}
                        onAIGenerate={handlers.aiGenerate}
                        onSearch={handlers.search}
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

                    <SnippetList
                        snippets={snippets}
                        onEdit={handlers.editSnippet}
                        onDelete={handlers.deleteSnippet}
                        onCopy={handlers.copySnippet}
                        searchTerm={searchTerm}
                    />
                </>
                )}

                {currentView === 'create' && (
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">🎉 Create Mode Active!</h2>
                    <p className="mb-4">The handleCreateSnippet function worked! Now showing create form:</p>
                    <SnippetForm
                        onSave={handlers.saveSnippet}
                        onCancel={handlers.backToList}
                    />
                </div>
                )}

                {currentView === 'edit' && editingSnippet && (
                <SnippetForm
                    snippet={editingSnippet}
                    onSave={handlers.saveSnippet}
                    onCancel={handlers.backToList}
                    isEditing={true}
                />
                )}
            </div>
        </DashboardLayout>
    );
}
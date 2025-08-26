import React from 'react';
import { Code } from 'lucide-react';
import SnippetCard from './SnippetCard';

const SnippetList = ({ snippets, onEdit, onDelete, onCopy, searchTerm }) => {
    const filteredSnippets = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCases()) || 
        snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ); 

    if (filteredSnippets.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? 'No snippets found' : 'No snippets yet'}
                </h3>
                <p className="text-gray-600">
                    {searchTerm 
                        ? 'Try adjusting your search terms' 
                        : 'Create your first code snippet to get started'
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredSnippets.map(snippet => (
                <SnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCopy={onCopy}
                />
            ))}
        </div>
    );
};

export default SnippetList;
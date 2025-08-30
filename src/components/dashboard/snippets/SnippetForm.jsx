import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { generateId } from '../../../utils/helpers';

const SnippetForm = ({ snippet, onSave, onCancel, isEditing = false }) => {
    const [formData, setFormData] = useState({
        title: snippet?.title || '',
        description: snippet?.description || '',
        code: snippet?.code || '',
        language: snippet?.language || 'javascript',
        tags: snippet?.tags?.join(', ') || ''
    });

    const [errors, setErrors] = useState({});

    const languages = [
        'javascript', 'python', 'java', 'csharp', 'ruby', 'go', 'php', 'typescript',
        'html', 'css', 'sql', 'bash', 'json', 'yaml', 'markdown', 'other'
    ];

    const handleSubmit = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.code.trim()) newErrors.code = 'Code is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const snippetData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            updatedAt: Date.now()
        };

        if (isEditing) {
            snippetData.id = snippet.id;
            snippetData.createdAt = snippet.createdAt;
        } else {
            snippetData.id = generateId();
            snippetData.createdAt = Date.now();
        }

        onSave(snippetData);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                {isEditing ? 'Edit Snippet' : 'Create New Snippet'}
                </h2>
                <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter snippet title..."
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional description..."
                    rows="3"
                />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tag1, tag2, tag3..."
                    />
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.code ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Enter your code here..."
                    rows="12"
                />
                {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                    <Save className="w-4 h-4" />
                    <span>{isEditing ? 'Update' : 'Create'} Snippet</span>
                </button>
                </div>
            </div>
        </div>
    )
}

export default SnippetForm;
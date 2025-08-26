import React, { useState } from 'react';
import { Edit3, Trash2, Copy, Check } from 'lucide-react';

const SnippetCard = ({ snippet, onEdit, onDelete, onCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.code);
        onCopy(snippet.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 truncate">{snippet.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{snippet.language}</span>
              <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 ml-2">
            <button
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onEdit(snippet)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit snippet"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(snippet.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete snippet"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {snippet.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{snippet.description}</p>
        )}

        <div className="bg-gray-50 rounded border p-3 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap break-words text-gray-800">
            {snippet.code.length > 200 ? `${snippet.code.substring(0, 200)}...` : snippet.code}
          </pre>
        </div>

        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {snippet.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnippetCard;
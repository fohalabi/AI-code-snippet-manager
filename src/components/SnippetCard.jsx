import React, { useState } from "react";
import prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import AIAssistant from './AIAssistant';

function SnippetCard({ snippet }) {
    const [showAI, setShowAI] = useState(false);

    return (
        <div className="snippet-card">
            <h3 className="text-xl font-semibold">{snippet.title}</h3>
            <p className="text-gray-400 mb-2">{snippet.language}</p>
            <pre className="rounded bg-gray-900 p-4 overflow-auto">
                <code 
                    className={`language-${snippet.language.toLoerCase}`}
                    dangerouslySetInnerHTML={{
                        __HTML: prism.highlight(snippet.code, prism.languages[snippet.language.toLowerCase()], snippet.language.toLowerCase())
                    }}
                />
            </pre>
            <div className="flex flex-wrap gap-2 mt-2">
                    {snippet.tags.map(tag => (
                        <span key={tag} className="bg-gray-700 text-sm px-2 py-1 rounded">{tag}</span>
                    ))}
            </div>
            <button
                className="btn-primary mt-4"
                onClick={() => setShowAI(!showAI)}
            >
                {showAI ? "Hide AI Assistant" : "Show AI Assistant"}
            </button>
            {showAI && <AIAssistant snippet={snippet} />}
        </div>
    )
}

export default SnippetCard;
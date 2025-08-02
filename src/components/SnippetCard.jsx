import React, { useState } from "react";
import prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { motion } from 'framer-motion';
import AIAssistant from './AIAssistant';
import { Tooltip } from 'react-tooltip';

function SnippetCard({ snippet }) {
    const [showAI, setShowAI] = useState(false);

    return (
        <motion.div
            className="snippet-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className="text-xl font-semibold">{snippet.title}</h3>
            <p className="text-gray-400 mb-2">{snippet.language}</p>
            <pre className="rounded bg-gray-900 p-4 overflow-auto">
                <code
                className={`language-${snippet.language.toLowerCase()}`}
                dangerouslySetInnerHTML={{ __html: prism.highlight(snippet.code, prism.languages[snippet.language.toLowerCase()], snippet.language.toLowerCase()) }}
            />
            </pre>
            <div className="flex flex-wrap gap-2 mt-2">
                {snippet.tags.map(tag => <span key={tag} className="bg-gray-700 text-sm px-2 py-1 rounded">{tag}</span>)}
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-tooltip-id="ai-tooltip"
                data-tooltip-content="Get AI-powered code explanations, refactoring, or translation"
                className="btn-primary mt-4"
                onClick={() => setShowAI(!showAI)}
            >
                {showAI ? 'Hide AI Assistant' : 'Show AI Assistant'}
            </motion.button>
            {showAI && <AIAssistant snippet={snippet} />}
            <Tooltip id="ai-tooltip" />
        </motion.div>
    );
}

export default SnippetCard;
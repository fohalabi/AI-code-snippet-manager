import React from 'react';
import axios from 'axios';

function AIAssistant({ snippet }) {
    const [action, setAction] = useState('explain');
    const [aiResponse, setAIResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAIRequest = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://localhost:5000/api/ai', {
                code: snippet.code,
                language: snippet.language,
                action,
            });
            setAIResponse(response.data.result);
        } catch (err) {
            setAIResponse('Error processing request');
        }
        setLoading(false);
    };

    return (
        <div className='mt-4 p-4 bg-gray-900 rounded-lg'>
            <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className='p-2 mb-4 bg-gray-800 rounded border border-gray-700'
            >
                <option value="explain">Explain Code</option>
                <option value="refactor">Refactor Code</option>
                <option value="translate">Translate to Another Language</option>
            </select>
            <button
                onClick={handleAIRequest}
                className='btn-primary mb-4'
                disabled={loading}
            >
                {loading ? 'processing...' : 'Run AI'}
            </button>
            {aiResponse && (
                <pre className='bg-gray-800 p-4 rounded overflow-auto'>
                    <code>{aiResponse}</code>
                </pre>
            )}
        </div>
    );
}

export default AIAssistant;
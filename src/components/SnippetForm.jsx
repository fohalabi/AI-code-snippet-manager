import React, { useState } from 'react';

function SnippetForm({ addSnippet }) {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('JavaScript');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSnippet = {
            title,
            code,
            language,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        };
        addSnippet(newSnippet);
        setTitle('');
        setCode('');
        setLanguage('JavaScript');
        setTags('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-800 p-6 rounded-lg">
            <input 
                type="text" 
                placeholder='Snippet Title'
                value={title}
                onChange={(e) => setCode(e.target.value)}
                className="w-full mb-4 p-2 rounded bg-gray-900 rounded border border-gray-700"
                rows="6"
            />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-900 rounded border border-gray-700"
            >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
            </select>
            <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-900 rounded border border-gray-700"
            />
            <button type="submit" className="btn-primary">Save Snippet</button>
        </form>
    )
}

export default SnippetForm;
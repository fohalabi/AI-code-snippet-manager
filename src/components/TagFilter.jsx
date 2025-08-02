import React from 'react';

function TagFilter({ tags, selectedTag, onTagselect }) {
    return (
        <div className='mb-6'>
            <span className='mr-2'>Filter by tag</span>
            <button
                onClick={() => onTagselect('')}
                className={`px-3 py-1 mr-2 rounded ${selectedTag === '' ? 'bg-blue-600' : 'bg-gray-700'}`} 
            >
                All
            </button>
            {tags.map(tag => (
                <button
                    key={tag}
                    onClick={() => onTagselect(tag)}
                    className={`px-3 py-1 mr-2 rounded ${selectedTag === tag ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

export default TagFilter;
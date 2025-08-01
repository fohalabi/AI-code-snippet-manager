import React, { useState, useEffect } from "react";
import SnippetCard from "../components/SnippetCard";
import SnippetForm from "../components/SnippetForm";
import TagFilter from "../components/TagFilter";
import axios from "axios";

function Home() {
    const [snippets, setSnippets] = useState([]);
    const [filterSnippets, setFilterSnippets] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    useEffect(() => {
        // fectch snippets from the server
        axios.get('http://localhost:5000/api/snippets')
            .then(res => {
                setSnippets(res.data);
                setFilterSnippets(res.data);
                // Extract unique tags from snippets
                const allTags = [...new Set(res.data.flatMap(snippet => snippet.tags))]
                setTags(allTags);
            })
            .catch(err => console.error(err));
    });

    const handleTagFilter = (tag) => {
        setSelectedTag(tag);
        if (tag === '') {
            setFilterSnippets(snippets);
        } else {
            setFilterSnippets(snippets.filter(snippet => snippet.tags.includes(tag)))
        }
    };

    const addSnippet = (snippet) => {
        axios.post('http://localhost:5000/api/snippets', snippet)
            .then(res => {
                setSnippets([...snippets, res.data]);
                setFilterSnippets([...snippets, res.data]);
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Code Snippet Manager</h1>
            <SnippetForm addSnippet={addSnippet} />
            <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={handleTagFilter} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterSnippets.map(snippet => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                ))}
            </div>
        </div>
    );
}

export default Home;
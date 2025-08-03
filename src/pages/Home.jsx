import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useHotkeys } from 'react-hotkeys-hook';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import SnippetCard from "../components/SnippetCard";
import SnippetForm from "../components/SnippetForm";
import TagFilter from "../components/TagFilter";
import ClipLoader from 'react-spinners/ClipLoader';
import { db } from '../firebase';

function Home() {
    const [snippets, setSnippets] = useState([]);
    const [filteredSnippets, setFilteredSnippets] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        const fetchSnippets = async () => {
            setLoading(true);
            const q = query(collection(db, 'snippets'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const snippetData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSnippets(snippetData);
            setFilteredSnippets(snippetData);
            setTags([...new Set(snippetData.flatMap(snippet => snippet.tags))]);
            setLoading(false);
        };
        if (user) fetchSnippets();
    }, [user]);

    const handleTagFilter = (tag) => {
        setSelectedTag(tag);
        applyFilters();
    };

    const applyFilters = () => {
        let result = snippets;
        if (selectedTag) result = result.filter(snippet => snippet.tags.includes(selectedTag));
        if (searchTerm) {
            result = result.filter(snippet =>
                snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                snippet.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        setFilteredSnippets(result);
    };

    const addSnippet = async (snippet) => {
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, 'snippets'), {
                ...snippet,
                userId: user.uid,
                createdAt: new Date().toISOString()
            });
            const newSnippet = { id: docRef.id, ...snippet, userId: user.uid };
            setSnippets([...snippets, newSnippet]);
            applyFilters();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(filteredSnippets);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFilteredSnippets(items);
    };

    useHotkeys('ctrl+s', () => document.querySelector('form button[type="submit"]')?.click());
    useHotkeys('ctrl+f', () => document.querySelector('input[placeholder="Search snippets..."]')?.focus());

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Code Snippet Manager</h1>
            {loading && <div className="text-center"><ClipLoader color="#4B5EAA" /></div>}
            {!loading && user && (
                <>
                    <input
                        type="text"
                        placeholder="Search snippets..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); applyFilters(); }}
                        className="w-full p-2 mb-4 bg-gray-800 rounded border border-gray-700"
                    />
                    <SnippetForm addSnippet={addSnippet} />
                    <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={handleTagFilter} />
                    <button onClick={() => setShowChart(!showChart)} className="btn-primary mt-4">
                        Toggle Analytics
                    </button>
                    {showChart && (
                        <div className="mt-4">
                            {/* ChartJS component should go here */}
                        </div>
                    )}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="snippets">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {filteredSnippets.map((snippet, index) => (
                                        <Draggable key={snippet.id} draggableId={snippet.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <SnippetCard snippet={snippet} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </>
            )}
        </div>
    );
}

export default Home;
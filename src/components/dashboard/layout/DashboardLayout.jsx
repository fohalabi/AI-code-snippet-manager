import React, { useState } from 'react';
import Navbar from './DashboardNavbar'; // Your existing navbar
import QuickAccessSidebar from './QuickAccessSidebar';

const DashboardLayout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Mock data for QuickAccessSidebar - replace with real data from your app
    const mockPinnedSnippets = [
        {
            id: 1,
            title: "useDebounce Hook",
            language: "React",
            lastUsed: "2024-08-22T08:30:00Z"
        },
        {
            id: 2,
            title: "API Error Handler",
            language: "JavaScript",
            lastUsed: "2024-08-21T15:45:00Z"
        }
    ];

    const mockRecentSearches = [
        {
            id: 1,
            query: "react hooks",
            results: 15,
            timestamp: "2024-08-22T10:15:00Z"
        },
        {
            id: 2,
            query: "async await",
            results: 8,
            timestamp: "2024-08-22T09:30:00Z"
        }
    ];

    const mockShortcuts = [
        { id: 1, description: "Quick search", keys: ["Ctrl", "/"] },
        { id: 2, description: "New snippet", keys: ["Ctrl", "N"] },
        { id: 3, description: "Save snippet", keys: ["Ctrl", "S"] },
        { id: 4, description: "Toggle sidebar", keys: ["Ctrl", "B"] }
    ];

    const mockStorageUsage = {
        used: 750 * 1024 * 1024, // 750MB
        total: 1024 * 1024 * 1024 // 1GB
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* QuickAccess Sidebar - Hidden on mobile */}
            <div className="hidden md:block">
                <QuickAccessSidebar
                pinnedSnippets={mockPinnedSnippets}
                recentSearches={mockRecentSearches}
                shortcuts={mockShortcuts}
                storageUsage={mockStorageUsage}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={setSidebarCollapsed}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Your existing navbar */}
                <Navbar />
            
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="space-y-6">
                            {children}
                        </div>
                    </div>
                </main>     
            </div>
        </div>
    );
};

export default DashboardLayout;
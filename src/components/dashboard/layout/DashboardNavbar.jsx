import React, { useState } from 'react';
import { Bell, User, Search, Plus, Bot, FolderOpen, LayoutDashboard, Library, Menu, X, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { signOut, user } = useAuth();
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const navigationItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '#' },
        { name: 'Library', icon: Library, href: '#' },
        { name: 'Search', icon: Search, href: '#' },
        { name: 'Create', icon: Plus, href: '#' },
        { name: 'AI Assistant', icon: Bot, href: '#' },
        { name: 'Collections', icon: FolderOpen, href: '#' },
    ];

    const notifications = [
        { id: 1, message: 'New snippet shared with you', time: '2m ago', unread: true },
        { id: 2, message: 'Collection updated successfully', time: '1h ago', unread: true },
        { id: 3, message: 'Weekly backup completed', time: '3h ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
        setIsProfileMenuOpen(false);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
        setIsNotificationOpen(false);
    };

    const handleLogout = async() => {
        const { error } = await signOut();

        if (!error) {
            //Force navigate to landing  page after successful logout
            navigate('/', { replace: true });
        }
    };

    return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <span className="ml-2 text-lg font-semibold text-gray-900">CodeSnap</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeItem === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleItemClick(item.name)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                                        isActive
                                            ? 'bg-blue-100 text-blue-700 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={toggleNotifications}
                            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                    {/* Notifications Dropdown */}
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 ${
                                            notification.unread ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <p className="text-sm text-gray-900">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        {notification.unread && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-100">
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    View all notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Menu */}
                <div className="relative">
                    <button
                        onClick={toggleProfileMenu}
                        className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-black" />
                        </div>
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 min-w-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 mr-2 sm:mr-0">
                        <div className="p-4 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">
                                {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                            </p>
                            <p className="text-xs text-gray-500">{user?.email || 'No email'}</p>
                        </div>
                        <div className="py-2">
                            <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <Settings className="w-4 h-4" />
                                <span>Settings</span>
                            </button>
                            <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <HelpCircle className="w-4 h-4" />
                                <span>Help & Support</span>
                            </button>
                        </div>
                        <div className="border-t border-gray-100 py-2">
                            <button  
                                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50" 
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile menu button */}
            <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
                <div className="flex flex-col space-y-2">
                    {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.name;
                    return (
                        <button
                            key={item.name}
                            onClick={() => handleItemClick(item.name)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </button>
                    );
                })}
            </div>
          </div>
        )}
        </div>
        {/* Click outside to close dropdowns */}
        {(isNotificationOpen || isProfileMenuOpen) && (
            <div
                className="fixed inset-0 z-40"
                onClick={() => {
                    setIsNotificationOpen(false);
                    setIsProfileMenuOpen(false);
                }}
            />
        )}
    </nav>
    );
};

export default Navbar;
import React from 'react';
import { Code2, Languages, Calendar, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';

const DashboardHeader = ({ 
  user = { name: 'Developer' }, 
  stats = {
    totalSnippets: 0,
    languagesCount: 0,
    weeklyCount: 0,
    aiSuggestions: 0,
    weeklyTrend: 0 // percentage change from last week
  }
}) => {
  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Get trend indicator
  const getTrendIndicator = (trend) => {
    if (trend > 0) {
      return (
        <div className="flex items-center text-green-600 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+{trend}%</span>
        </div>
      );
    } else if (trend < 0) {
      return (
        <div className="flex items-center text-red-600 text-sm">
          <TrendingDown className="w-4 h-4 mr-1" />
          <span>{trend}%</span>
        </div>
      );
    }
    return (
      <div className="flex items-center text-gray-500 text-sm">
        <span>No change</span>
      </div>
    );
  };

  const statsCards = [
    {
      title: 'Total Snippets',
      value: stats.totalSnippets,
      icon: Code2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Code snippets saved'
    },
    {
      title: 'Languages',
      value: stats.languagesCount,
      icon: Languages,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Programming languages'
    },
    {
      title: 'This Week',
      value: stats.weeklyCount,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Snippets created',
      trend: stats.weeklyTrend
    },
    {
      title: 'AI Suggestions',
      value: stats.aiSuggestions,
      icon: Lightbulb,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Available suggestions',
      badge: stats.aiSuggestions > 0
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getTimeBasedGreeting()}, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Welcome back to your code snippet dashboard
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div
                key={index}
                className="relative bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Badge for AI suggestions */}
                {stat.badge && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      New
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  
                  {/* Trend indicator for weekly count */}
                  {stat.trend !== undefined && (
                    <div className="hidden sm:block">
                      {getTrendIndicator(stat.trend)}
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stat.value.toLocaleString()}
                    </h3>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    {stat.description}
                  </p>
                  
                  {/* Mobile trend indicator */}
                  {stat.trend !== undefined && (
                    <div className="sm:hidden mt-2">
                      {getTrendIndicator(stat.trend)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Bar */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
            <div className="mb-2 sm:mb-0">
              <span className="font-medium">Quick Summary:</span> You've been productive this week!
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              {stats.aiSuggestions > 0 && (
                <span className="text-orange-600 font-medium">
                  • {stats.aiSuggestions} AI suggestions waiting
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
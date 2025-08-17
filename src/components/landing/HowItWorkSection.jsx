import { Upload, Sparkles, Search } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: "Import or create your first snippets",
      description: "Start by uploading your existing code snippets or create new ones directly in our editor with syntax highlighting."
    },
    {
      number: 2,
      icon: Sparkles,
      title: "Let AI organize and tag automatically",
      description: "Our intelligent AI analyzes your code, automatically categorizes it, and adds relevant tags for easy discovery."
    },
    {
      number: 3,
      icon: Search,
      title: "Find and generate code instantly",
      description: "Search using natural language or generate new snippets from descriptions. Your organized library is always at your fingertips."
    }
  ];

  return (
        <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            <div 
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    animation: 'gridMove 30s linear infinite'
                }}
            ></div>
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
                        Get Organized in Minutes
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Transform your code management workflow with our simple three-step process
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Connecting Line - Hidden on mobile, visible on desktop */}
                    <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 z-0"></div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="text-center group">
                                    {/* Step Number and Icon Container */}
                                    <div className="relative mx-auto w-24 h-24 mb-6">
                                        {/* Background Circle */}
                                        <div className="absolute inset-0 bg-white rounded-full shadow-lg border-4 border-gray-200 group-hover:border-gray-300 transition-colors duration-300"></div>
                        
                                        {/* Step Number */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-white text-sm font-bold">{step.number}</span>
                                        </div>

                                        {/* Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow Connector - Only between steps on desktop */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-24 -right-6 z-20">
                                            <div className="w-12 h-0.5 bg-gradient-to-r from-gray-400 to-gray-500 relative">
                                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-600 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-black group-hover:text-gray-800 transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Mobile Arrow - Only visible on mobile between steps */}
                                    {index < steps.length - 1 && (
                                        <div className="md:hidden flex justify-center mt-8 mb-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-gray-500"></div>
                                                <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call-to-action */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center space-x-3 bg-black rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group hover:bg-gray-800">
                        <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-white font-semibold">Start Organizing Today</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
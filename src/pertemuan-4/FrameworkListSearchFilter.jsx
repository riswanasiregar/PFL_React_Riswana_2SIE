import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");

    const allTags = [...new Set(frameworkData.flatMap(item => item.tags))];


    const _searchTerm = searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name.toLowerCase().includes(_searchTerm) ||
            framework.description.toLowerCase().includes(_searchTerm);
            framework.details.developer.toLowerCase().includes(_searchTerm);
        const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                Modern Frameworks
            </h1>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search framework..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full md:w-60 p-2 border border-gray-300 rounded"
                >
                    <option value="">All Tags</option>
                    {allTags.map((tag, index) => (
                        <option key={index} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

        
            {filteredFrameworks.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No frameworks found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFrameworks.map((item, index) => (
                        <div
                            key={item.id}
                            className="group flex flex-col justify-between border border-gray-100 p-6 rounded-2xl shadow-sm bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div>
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </h2>
                                    <span className="text-[10px] uppercase tracking-wider font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                        {item.details.developer}
                                    </span>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {item.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-600 px-3 py-1 text-[11px] font-medium rounded-full border border-gray-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Link */}
                            <a
                                href={item.details.officialWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Visit Website
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight, Car, Bike } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Focus input when overlay opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // Search results filtered by query
    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return vehicles.filter(
            (v) =>
                v.title.toLowerCase().includes(q) ||
                v.make.toLowerCase().includes(q) ||
                v.model.toLowerCase().includes(q) ||
                v.type.toLowerCase().includes(q) ||
                v.fuel.toLowerCase().includes(q) ||
                v.color.toLowerCase().includes(q)
        );
    }, [query]);

    // Quick suggestions when no query
    const suggestions = [
        { label: "All Cars", params: "?type=car" },
        { label: "All Motorbikes", params: "?type=motorbike" },
        { label: "Mercedes-Benz", params: "?make=Mercedes-Benz" },
        { label: "BMW", params: "?make=BMW" },
        { label: "Porsche", params: "?make=Porsche" },
        { label: "Under ₹50,000", params: "?priceMax=50000" },
    ];

    const handleResultClick = (vehicleId: string) => {
        setQuery("");
        onClose();
        navigate(`/vehicle/${vehicleId}`);
    };

    const handleSuggestionClick = (params: string) => {
        setQuery("");
        onClose();
        navigate(`/search${params}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onClose();
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery("");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Search Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed top-0 left-0 right-0 z-[70] pt-4 px-4"
                    >
                        <div className="max-w-2xl mx-auto">
                            {/* Search Input Card */}
                            <div className="bg-[#0a2a1e] border border-[#C9A14A]/30 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
                                <form onSubmit={handleSubmit} className="relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A14A]" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search vehicles by name, make, model..."
                                        className="w-full h-14 bg-transparent text-white placeholder-white/40 pl-14 pr-14 text-base focus:outline-none"
                                        autoComplete="off"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (query) setQuery("");
                                            else onClose();
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                        aria-label="Close search"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </form>

                                {/* Results / Suggestions */}
                                <div className="border-t border-[#C9A14A]/15 max-h-[60vh] overflow-y-auto">
                                    {query.trim() ? (
                                        // Search Results
                                        results.length > 0 ? (
                                            <div className="py-2">
                                                <p className="px-5 py-2 text-xs font-medium text-white/40 uppercase tracking-wider">
                                                    {results.length} result{results.length !== 1 ? "s" : ""} found
                                                </p>
                                                {results.map((v) => (
                                                    <button
                                                        key={v.id}
                                                        onClick={() => handleResultClick(v.id)}
                                                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-[#C9A14A]/10 transition-colors text-left group"
                                                    >
                                                        {/* Thumbnail */}
                                                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                                                            <img
                                                                src={v.images[0]}
                                                                alt={v.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        {/* Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-white truncate group-hover:text-[#C9A14A] transition-colors">
                                                                {v.title}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="text-xs text-[#C9A14A] font-semibold">
                                                                    ₹{v.price.toLocaleString()}
                                                                </span>
                                                                <span className="text-xs text-white/30">•</span>
                                                                <span className="text-xs text-white/40">
                                                                    {v.mileage.toLocaleString()} mi
                                                                </span>
                                                                <span className="text-xs text-white/30">•</span>
                                                                <span className="text-xs text-white/40 capitalize">{v.type}</span>
                                                            </div>
                                                        </div>
                                                        {/* Arrow */}
                                                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#C9A14A] transition-colors shrink-0" />
                                                    </button>
                                                ))}
                                                {/* View all link */}
                                                <button
                                                    onClick={handleSubmit}
                                                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#C9A14A] hover:bg-[#C9A14A]/10 transition-colors border-t border-[#C9A14A]/10"
                                                >
                                                    View all results for "{query}"
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="py-10 text-center">
                                                <p className="text-white/50 text-sm">
                                                    No vehicles found for "<span className="text-white/70">{query}</span>"
                                                </p>
                                                <p className="text-white/30 text-xs mt-1">Try a different make or model</p>
                                            </div>
                                        )
                                    ) : (
                                        // Quick Suggestions
                                        <div className="py-3">
                                            <p className="px-5 py-2 text-xs font-medium text-white/40 uppercase tracking-wider">
                                                Quick Search
                                            </p>
                                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                                {suggestions.map((s) => (
                                                    <button
                                                        key={s.label}
                                                        onClick={() => handleSuggestionClick(s.params)}
                                                        className="px-4 py-2 rounded-full text-xs font-medium border border-[#C9A14A]/25 text-white/70 hover:text-[#C9A14A] hover:border-[#C9A14A]/50 hover:bg-[#C9A14A]/5 transition-all"
                                                    >
                                                        {s.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Keyboard hint */}
                            <p className="text-center text-xs text-white/30 mt-3">
                                Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 text-[10px] font-mono">ESC</kbd> to close
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;

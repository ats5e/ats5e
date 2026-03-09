"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Lock,
    User,
    LayoutDashboard,
    FileText,
    Briefcase,
    Users,
    Settings,
    LogOut,
    Save,
    Plus
} from "lucide-react";
import { fadeUp } from "@/lib/motion";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState("dashboard");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername("");
        setPassword("");
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden text-white">
                {/* Background Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#148be6]/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10">
                        <Image src="/logo.png" alt="ATS5E" width={180} height={50} className="mx-auto mb-8 opacity-90" />
                        <h1 className="text-2xl font-black uppercase tracking-widest text-zinc-200">System Access</h1>
                        <p className="text-sm text-zinc-500 mt-2 font-medium">Restricted Area</p>
                    </div>

                    <form onSubmit={handleLogin} className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] shadow-2xl">
                        {error && (
                            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 pl-1">Username</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-black/40 border border-white/[0.06] rounded-xl px-11 py-3 text-sm text-white focus:outline-none focus:border-[#148be6]/50 focus:bg-white/[0.04] transition-all"
                                        placeholder="Enter username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 pl-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/[0.06] rounded-xl px-11 py-3 text-sm text-white focus:outline-none focus:border-[#148be6]/50 focus:bg-white/[0.04] transition-all"
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-[#148be6] hover:bg-[#1f96ee] text-white py-3.5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase transition-all hover:shadow-[0_0_20px_rgba(20,139,230,0.4)]"
                        >
                            Authenticate <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // ── Authenticated CMS Dashboard ──
    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 border-r border-white/[0.06] bg-[#080808] flex flex-col z-20">
                <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
                    <Image src="/logo.png" alt="ATS5E" width={120} height={30} className="opacity-90" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#148be6] px-2 py-0.5 rounded bg-[#148be6]/10">CMS</span>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <button onClick={() => setActiveTab("dashboard")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "dashboard" ? "bg-white/[0.06] text-white" : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"}`}>
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab("pages")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "pages" ? "bg-white/[0.06] text-white" : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"}`}>
                        <FileText className="w-4 h-4" /> Pages
                    </button>
                    <button onClick={() => setActiveTab("work")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "work" ? "bg-white/[0.06] text-white" : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"}`}>
                        <Briefcase className="w-4 h-4" /> Our Work
                    </button>
                    <button onClick={() => setActiveTab("team")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "team" ? "bg-white/[0.06] text-white" : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"}`}>
                        <Users className="w-4 h-4" /> Team
                    </button>
                    <button onClick={() => setActiveTab("settings")} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "settings" ? "bg-white/[0.06] text-white" : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"}`}>
                        <Settings className="w-4 h-4" /> Settings
                    </button>
                </nav>

                <div className="p-4 border-t border-white/[0.06]">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 transition-all">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.06] px-8 py-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold capitalize">{activeTab.replace("-", " ")}</h2>
                        <p className="text-xs text-zinc-500 font-medium mt-1">Manage your website content</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" /> System Online
                        </span>
                    </div>
                </header>

                {/* Dynamic Content Views */}
                <div className="p-8 max-w-6xl mx-auto">
                    {activeTab === "dashboard" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                            {/* Alert */}
                            <div className="p-4 rounded-xl bg-[#148be6]/10 border border-[#148be6]/20 flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-[#148be6]/20 text-[#148be6]">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Development Mode Active</h4>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        This CMS interface is currently a frontend shell. To persist content changes permanently, a database connected to server actions/APIs will need to be configured.
                                    </p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Total Projects", value: "14", trend: "+2 this month" },
                                    { label: "Team Members", value: "5", trend: "+1 this month" },
                                    { label: "Partners", value: "6", trend: "Active" },
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                                        <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-4">{stat.label}</p>
                                        <div className="flex items-end justify-between">
                                            <span className="text-4xl font-black">{stat.value}</span>
                                            <span className="text-xs font-medium text-[#148be6]">{stat.trend}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "work" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold">Manage "Our Work"</h3>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors">
                                    <Plus className="w-3.5 h-3.5" /> Add Project
                                </button>
                            </div>

                            <div className="border border-white/[0.06] rounded-2xl bg-white/[0.01] overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/[0.03] border-b border-white/[0.06] text-xs uppercase tracking-wider text-zinc-500 font-bold">
                                        <tr>
                                            <th className="px-6 py-4">Project Title</th>
                                            <th className="px-6 py-4">Client</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.06]">
                                        {[
                                            { title: "AI-Enabled Transformation", client: "Tier 1 UAE Bank" },
                                            { title: "Enterprise PMO", client: "Leading Saudi Bank" },
                                            { title: "Cloud-Native KSA Stack", client: "Regional Card Acquirer" },
                                            { title: "IT & Operations Offshoring", client: "Abu Dhabi Bank" },
                                        ].map((item, i) => (
                                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 font-medium">{item.title}</td>
                                                <td className="px-6 py-4 text-zinc-400">{item.client}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-[#148be6] hover:text-white text-xs font-bold transition-colors">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "team" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold">Manage Team Members</h3>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#148be6] text-white text-xs font-bold hover:bg-[#1f96ee] transition-colors">
                                    <Save className="w-3.5 h-3.5" /> Save Changes
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: "William Higgins", role: "Founder & CEO" },
                                    { name: "Kumar Jaisingh", role: "Chief Product & Delivery Officer" },
                                    { name: "Gaurav Diwan", role: "Chief Technology Officer" },
                                    { name: "Jack Donaldson", role: "Head of Marketing & Communications" },
                                ].map((person, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h4 className="font-bold">{person.name}</h4>
                                                <p className="text-xs text-[#148be6] font-medium mt-0.5">{person.role}</p>
                                            </div>
                                            <button className="text-xs font-medium text-zinc-500 hover:text-white">Edit</button>
                                        </div>
                                        <textarea
                                            className="w-full bg-black/40 border border-white/[0.06] rounded-xl p-3 text-xs text-zinc-300 focus:outline-none focus:border-zinc-500 min-h-[80px]"
                                            placeholder="Biography..."
                                            defaultValue="Biography content..."
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {(activeTab === "pages" || activeTab === "settings") && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-32 text-center text-zinc-500">
                            <Settings className="w-12 h-12 opacity-20 mb-4" />
                            <p className="text-sm font-medium">Module under active development.</p>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}

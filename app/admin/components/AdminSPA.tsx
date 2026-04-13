"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Lock, User, LayoutDashboard, FileText, Briefcase, Users, LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { CMS_API_BASE_URL } from "@/lib/cms";

const MODEL_LABELS = {
    solutions: "Solutions",
    "case-studies": "Case Studies",
    insights: "Insights",
    "team-members": "Team",
    partners: "Partners",
    "home-page": "Home Page",
} as const;

type ModelKey = keyof typeof MODEL_LABELS;
type AdminTab = "dashboard" | ModelKey;
type FieldType = "text" | "textarea" | "image" | "file" | "number" | "checkbox" | "date";

type FieldConfig = {
    key: string;
    type?: FieldType;
    label?: string;
    placeholder?: string;
    section?: string;
    helperText?: string;
    required?: boolean;
    accept?: string;
    defaultValue?: AdminFieldValue;
};

type AdminFieldValue = string | number | boolean | null | undefined;

type AdminRecord = {
    _id?: string;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
} & Record<string, AdminFieldValue>;

type ApiResponse = {
    msg?: string;
    token?: string;
    url?: string;
    valid?: boolean;
};

type BackendStatus = "checking" | "online" | "offline";

type TabButtonProps = {
    label: string;
    icon: ReactNode;
    tab: AdminTab;
    active: AdminTab;
    set: (tab: AdminTab) => void;
};

const SYSTEM_FIELD_KEYS = new Set(["_id", "__v", "createdAt", "updatedAt"]);
const BACKEND_POLL_INTERVAL_MS = 5000;

const MODEL_FIELDS: Record<ModelKey, FieldConfig[]> = {
    solutions: [
        { key: "title", required: true, section: "Content" },
        { key: "slug", required: true, section: "Content" },
        { key: "category", section: "Content" },
        { key: "description", type: "textarea", required: true, section: "Content" },
        { key: "detailedContent", type: "textarea", label: "Detailed Content", section: "Content" },
        { key: "icon", section: "Presentation" },
        { key: "image", type: "image", section: "Presentation", accept: "image/*" },
        { key: "displayOrder", type: "number", label: "Display Order", section: "Presentation" },
    ],
    "case-studies": [
        { key: "title", required: true, section: "Content" },
        { key: "slug", required: true, section: "Content" },
        { key: "clientName", label: "Client Name", required: true, section: "Content" },
        { key: "industry", section: "Content" },
        { key: "challenge", type: "textarea", required: true, section: "Story" },
        { key: "solution", type: "textarea", required: true, section: "Story" },
        { key: "outcome", type: "textarea", required: true, section: "Story" },
        { key: "image", type: "image", section: "Presentation", accept: "image/*" },
        { key: "featured", type: "checkbox", section: "Presentation" },
    ],
    insights: [
        { key: "title", required: true, section: "Content" },
        { key: "slug", required: true, section: "Content" },
        { key: "author", section: "Content" },
        { key: "date", type: "date", section: "Content" },
        { key: "category", section: "Content" },
        { key: "summary", type: "textarea", section: "Content", helperText: "Used as the subtitle and listing summary." },
        { key: "bodyContent", type: "textarea", label: "Body Content", required: true, section: "Content", helperText: "Supports plain paragraphs separated by blank lines." },
        { key: "image", type: "image", section: "Presentation", accept: "image/*" },
        { key: "showcaseOnHome", type: "checkbox", label: "Showcase On Home Page", section: "Homepage Showcase", helperText: "Turn this on to allow the homepage insights section to feature this insight." },
        { key: "showcaseOrder", type: "number", label: "Showcase Order", section: "Homepage Showcase", helperText: "Lower numbers appear first when multiple insights are showcased." },
        { key: "downloadFileUrl", type: "file", label: "Download PDF", required: true, section: "Download", accept: "application/pdf,.pdf", helperText: "Upload the downloadable PDF shown on the insight detail page." },
        { key: "published", type: "checkbox", section: "Presentation" },
    ],
    "team-members": [
        { key: "name", required: true, section: "Profile" },
        { key: "role", required: true, section: "Profile" },
        { key: "bio", type: "textarea", section: "Profile" },
        { key: "photoUrl", type: "image", label: "Photo URL", section: "Profile", accept: "image/*" },
        { key: "displayOrder", type: "number", label: "Display Order", section: "Profile" },
    ],
    partners: [
        { key: "name", required: true, section: "Content" },
        { key: "category", section: "Content" },
        { key: "description", type: "textarea", section: "Content" },
        { key: "logoUrl", type: "image", label: "Logo URL", required: true, section: "Branding", accept: "image/*" },
        { key: "website", section: "Branding" },
        { key: "displayOrder", type: "number", label: "Display Order", section: "Branding" },
    ],
    "home-page": [
        { key: "heroHeadline", type: "textarea", label: "Hero Headline", section: "Hero", defaultValue: "INTELLIGENCE.\nAPPLIED." },
        { key: "heroSubheadline", type: "textarea", label: "Hero Subheadline", section: "Hero", defaultValue: "We are a specialist execution partner for forward-thinking\nenterprises in the GCC & South Pacific." },
        { key: "heroPrimaryCtaLabel", label: "Primary Button Label", section: "Hero", defaultValue: "Explore The 5Es" },
        { key: "heroSecondaryCtaLabel", label: "Secondary Button Label", section: "Hero", defaultValue: "Contact Us" },
        { key: "stat1Value", label: "Stat 1 Value", section: "Stats Bar", defaultValue: "25–50%" },
        { key: "stat1Label", label: "Stat 1 Label", section: "Stats Bar", defaultValue: "Lower Operating Costs" },
        { key: "stat2Value", label: "Stat 2 Value", section: "Stats Bar", defaultValue: "248%" },
        { key: "stat2Label", label: "Stat 2 Label", section: "Stats Bar", defaultValue: "ROI on Enterprise Automation" },
        { key: "stat3Value", label: "Stat 3 Value", section: "Stats Bar", defaultValue: "+30%" },
        { key: "stat3Label", label: "Stat 3 Label", section: "Stats Bar", defaultValue: "Increase in Productivity" },
        { key: "fiveESectionEyebrow", label: "Section Eyebrow", section: "5E Section", defaultValue: "Core Framework" },
        { key: "fiveEHeadline", label: "5E Headline", section: "5E Section", defaultValue: "THE 5E FRAMEWORK." },
        { key: "fiveESubheadline", type: "textarea", label: "5E Subheadline", section: "5E Section", defaultValue: "Our 5E Framework is our commitment to holistic, de-risked transformation. It ensures that technology, process, and people evolve together — turning ambition into a sustainable reality of improved operations and better customer experiences." },
        { key: "fiveESectionCtaLabel", label: "Section Button Label", section: "5E Section", defaultValue: "View Full Framework" },
        { key: "fiveECard1Tag", label: "Card 1 Tag", section: "5E Cards", defaultValue: "Experience" },
        { key: "fiveECard1Headline", type: "textarea", label: "Card 1 Headline", section: "5E Cards", defaultValue: "HUMAN.\nCENTERED." },
        { key: "fiveECard1Tagline", type: "textarea", label: "Card 1 Tagline", section: "5E Cards", defaultValue: "Human-centered digital experiences that are intuitive and engaging for both employees and customers." },
        { key: "fiveECard2Tag", label: "Card 2 Tag", section: "5E Cards", defaultValue: "Empowerment" },
        { key: "fiveECard2Headline", type: "textarea", label: "Card 2 Headline", section: "5E Cards", defaultValue: "DECIDE.\nSMARTER." },
        { key: "fiveECard2Tagline", type: "textarea", label: "Card 2 Tagline", section: "5E Cards", defaultValue: "AI-driven solutions providing actionable intelligence at every level for smarter decisions and higher customer satisfaction." },
        { key: "fiveECard3Tag", label: "Card 3 Tag", section: "5E Cards", defaultValue: "Efficiency" },
        { key: "fiveECard3Headline", type: "textarea", label: "Card 3 Headline", section: "5E Cards", defaultValue: "AUTOMATE.\nEVERYTHING." },
        { key: "fiveECard3Tagline", type: "textarea", label: "Card 3 Tagline", section: "5E Cards", defaultValue: "Intelligent automation to do more, faster and smarter, with less wasted effort—so you can focus on what matters most: your customer." },
        { key: "fiveECard4Tag", label: "Card 4 Tag", section: "5E Cards", defaultValue: "Execution" },
        { key: "fiveECard4Headline", type: "textarea", label: "Card 4 Headline", section: "5E Cards", defaultValue: "VISION.\nDELIVERED." },
        { key: "fiveECard4Tagline", type: "textarea", label: "Card 4 Tagline", section: "5E Cards", defaultValue: "From strategy to delivery, flawlessly executed, ensuring the vision turns into real results that your customers will feel." },
        { key: "fiveECard5Tag", label: "Card 5 Tag", section: "5E Cards", defaultValue: "Evolution" },
        { key: "fiveECard5Headline", type: "textarea", label: "Card 5 Headline", section: "5E Cards", defaultValue: "MODERNISE.\nFEARLESSLY." },
        { key: "fiveECard5Tagline", type: "textarea", label: "Card 5 Tagline", section: "5E Cards", defaultValue: "Legacy modernization without the downtime, so you can scale up without disruption to your business or your customers." },
        { key: "solutionsEyebrow", label: "Section Eyebrow", section: "Solutions Section", defaultValue: "What We Do" },
        { key: "solutionsHeadline", label: "Solutions Headline", section: "Solutions Section", defaultValue: "OUR SOLUTIONS." },
        { key: "solutionsSubheadline", type: "textarea", label: "Solutions Subheadline", section: "Solutions Section", defaultValue: "We don't just advise; we embed, execute, and guarantee the outcome — ensuring your strategic investment translates into a strategic advantage and better experiences for your customers, delivered seamlessly, securely, and at scale." },
        { key: "solutionsCtaLabel", label: "Section Button Label", section: "Solutions Section", defaultValue: "View All Solutions" },
        { key: "testimonialQuote", type: "textarea", label: "Testimonial Quote", section: "Testimonial", defaultValue: "In a sector where large-scale transformation is synonymous with disruption, ATS5E delivered the opposite. Their deep banking DNA meant they understood our risks from day one, and their team provided flawless execution from start to finish. They turned a complex roadmap into a stable, scalable reality — without the usual headaches. They are the execution partner you can trust." },
        { key: "testimonialAuthor", label: "Testimonial Author", section: "Testimonial", defaultValue: "CIO, Leading UAE Bank" },
        { key: "testimonialCtaLabel", label: "Testimonial Button Label", section: "Testimonial", defaultValue: "View Our Work" },
        { key: "eduflowEyebrow", label: "Section Eyebrow", section: "EduFlow Section", defaultValue: "Our Education Intelligence Layer" },
        { key: "eduflowHeadline", type: "textarea", label: "EduFlow Headline", section: "EduFlow Section", defaultValue: "EDUCATION.\nORCHESTRATED." },
        { key: "eduflowSubheadline", type: "textarea", label: "EduFlow Subheadline", section: "EduFlow Section", defaultValue: "EduFlow360 turns disconnected SIS, LMS, and ERP platforms into one coordinated operating layer, giving institutions sharper financial visibility, smoother student journeys, and modern automation without replacing the systems they already trust." },
        { key: "eduflowCtaLabel", label: "Section Button Label", section: "EduFlow Section", defaultValue: "Explore" },
        { key: "ctaEyebrow", label: "Section Eyebrow", section: "Final CTA", defaultValue: "Partner With Us" },
        { key: "ctaHeadline", label: "CTA Headline", section: "Final CTA", defaultValue: "LET'S BUILD." },
        { key: "ctaSubheadline", type: "textarea", label: "CTA Subheadline", section: "Final CTA", defaultValue: "Partner with us to unlock new possibilities with our exclusive solutions. Transformation begins with a single conversation." },
        { key: "ctaButtonLabel", label: "CTA Button Label", section: "Final CTA", defaultValue: "Start the Conversation" },
    ],
};

async function readResponseData(response: Response): Promise<ApiResponse> {
    return (await response.json().catch(() => ({}))) as ApiResponse;
}

async function fetchModelData(model: ModelKey): Promise<AdminRecord[]> {
    const response = await fetch(`${CMS_API_BASE_URL}/api/crud/${model}`);

    if (!response.ok) {
        const data = await readResponseData(response);
        throw new Error(data.msg || `Unable to load ${MODEL_LABELS[model].toLowerCase()}.`);
    }

    const data = (await response.json().catch(() => [])) as unknown;
    return Array.isArray(data) ? (data as AdminRecord[]).map(normalizeAdminRecord) : [];
}

function getErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

function formatFieldLabel(field: FieldConfig): string {
    if (field.label) return field.label;

    return field.key
        .replace(/([A-Z])/g, " $1")
        .replace(/-/g, " ")
        .replace(/^./, (character) => character.toUpperCase());
}

function normalizeEscapedNewlines(value: string): string {
    return value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n");
}

function normalizeAdminRecord(record: AdminRecord): AdminRecord {
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [
            key,
            typeof value === "string" ? normalizeEscapedNewlines(value) : value,
        ]),
    ) as AdminRecord;
}

function createEmptyRecord(model: ModelKey): AdminRecord {
    return MODEL_FIELDS[model].reduce<AdminRecord>((record, field) => {
        if (field.defaultValue !== undefined) {
            record[field.key] = field.defaultValue;
        } else if (field.type === "checkbox") {
            record[field.key] = false;
        } else if (field.type === "number") {
            record[field.key] = 0;
        } else {
            record[field.key] = "";
        }

        return record;
    }, {});
}

function prepareEditingItem(model: ModelKey, item: AdminRecord): AdminRecord {
    return {
        ...createEmptyRecord(model),
        ...normalizeAdminRecord(item),
    };
}

function sanitizeRecord(model: ModelKey, record: AdminRecord): Record<string, string | number | boolean | null> {
    const preservedFields = Object.fromEntries(
        Object.entries(record).filter(([key, value]) => {
            const isConfiguredField = MODEL_FIELDS[model].some((field) => field.key === key);
            return !SYSTEM_FIELD_KEYS.has(key) && !isConfiguredField && value !== undefined;
        }),
    ) as Record<string, string | number | boolean | null>;

    return MODEL_FIELDS[model].reduce<Record<string, string | number | boolean | null>>((payload, field) => {
        const value = record[field.key];

        if (field.type === "checkbox") {
            payload[field.key] = Boolean(value);
            return payload;
        }

        if (field.type === "number") {
            payload[field.key] = value === "" || value === null || value === undefined ? 0 : Number(value);
            return payload;
        }

        if (field.type === "date") {
            payload[field.key] = typeof value === "string" && value ? value : null;
            return payload;
        }

        payload[field.key] = typeof value === "string" ? value : value === null || value === undefined ? "" : String(value);
        return payload;
    }, preservedFields);
}

function getPrimaryIdentifier(item: AdminRecord): string {
    return (
        (typeof item.title === "string" && item.title) ||
        (typeof item.name === "string" && item.name) ||
        (typeof item.slug === "string" && item.slug) ||
        (typeof item.heroHeadline === "string" && item.heroHeadline) ||
        (typeof item.clientName === "string" && item.clientName) ||
        "Record Data"
    );
}

function getTextValue(value: AdminFieldValue): string {
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    return "";
}

function getDateValue(value: AdminFieldValue): string {
    return typeof value === "string" ? value.slice(0, 10) : "";
}

function validateRecord(model: ModelKey, record: AdminRecord): string | null {
    for (const field of MODEL_FIELDS[model]) {
        if (!field.required) continue;

        const value = record[field.key];

        if (field.type === "checkbox") {
            if (!value) {
                return `${formatFieldLabel(field)} is required.`;
            }
            continue;
        }

        if (field.type === "number") {
            if (value === "" || value === null || value === undefined) {
                return `${formatFieldLabel(field)} is required.`;
            }
            continue;
        }

        if (typeof value !== "string" || !value.trim()) {
            return `${formatFieldLabel(field)} is required.`;
        }
    }

    return null;
}

function getFieldSections(fields: FieldConfig[]): { title: string; fields: FieldConfig[] }[] {
    const sections = new Map<string, FieldConfig[]>();

    for (const field of fields) {
        const title = field.section || "Content";
        const existing = sections.get(title) || [];
        existing.push(field);
        sections.set(title, existing);
    }

    return Array.from(sections.entries()).map(([title, sectionFields]) => ({ title, fields: sectionFields }));
}

async function checkBackendAvailability(signal?: AbortSignal): Promise<boolean> {
    const response = await fetch(`${CMS_API_BASE_URL}/api/crud/home-page`, {
        cache: "no-store",
        signal,
    });

    return response.ok;
}

function isUnauthorizedResponse(response: Response, data?: ApiResponse): boolean {
    return response.status === 401 || data?.msg === "Token is not valid" || data?.msg === "No token, authorization denied";
}

export default function AdminSPA() {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
    const [backendStatus, setBackendStatus] = useState<BackendStatus>("checking");
    const [sessionChecking, setSessionChecking] = useState(false);

    // Check token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("admin_token");
        if (storedToken) setToken(storedToken);
    }, []);

    const handleSessionExpired = (message = "Your admin session expired. Please sign in again.") => {
        localStorage.removeItem("admin_token");
        setToken(null);
        setPassword("");
        setError(message);
    };

    useEffect(() => {
        let isMounted = true;
        let activeController: AbortController | null = null;

        async function verifyBackend(showCheckingState: boolean) {
            const controller = new AbortController();
            activeController?.abort();
            activeController = controller;
            const timeout = window.setTimeout(() => controller.abort(), 4000);

            if (showCheckingState) {
                setBackendStatus((current) => (current === "online" ? current : "checking"));
            }

            try {
                const available = await checkBackendAvailability(controller.signal);

                if (!isMounted || activeController !== controller) return;
                setBackendStatus(available ? "online" : "offline");
            } catch {
                if (!isMounted || activeController !== controller) return;
                setBackendStatus("offline");
            } finally {
                window.clearTimeout(timeout);
            }
        }

        void verifyBackend(true);
        const interval = window.setInterval(() => {
            void verifyBackend(false);
        }, BACKEND_POLL_INTERVAL_MS);

        return () => {
            isMounted = false;
            window.clearInterval(interval);
            activeController?.abort();
        };
    }, []);

    useEffect(() => {
        if (backendStatus !== "online") return;

        setError((current) => {
            if (
                current === "Cannot connect to backend server" ||
                current.includes("CMS backend is unavailable") ||
                current.includes(CMS_API_BASE_URL)
            ) {
                return "";
            }

            return current;
        });
    }, [backendStatus]);

    useEffect(() => {
        if (!token || backendStatus !== "online") return;

        let isCancelled = false;
        const controller = new AbortController();

        async function verifyStoredSession() {
            setSessionChecking(true);

            try {
                const response = await fetch(`${CMS_API_BASE_URL}/api/auth/verify`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal,
                });
                const data = await readResponseData(response);

                if (isCancelled) return;

                if (!response.ok || !data.valid) {
                    handleSessionExpired("Your previous admin session is no longer valid. Please sign in again.");
                }
            } catch {
                if (isCancelled) return;
            } finally {
                if (!isCancelled) {
                    setSessionChecking(false);
                }
            }
        }

        void verifyStoredSession();

        return () => {
            isCancelled = true;
            controller.abort();
        };
    }, [backendStatus, token]);

    const backendUnavailable = backendStatus === "offline";
    const backendChecking = backendStatus === "checking";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (backendUnavailable) {
            setError(`CMS backend is unavailable at ${CMS_API_BASE_URL}. Start it with npm run dev or npm --prefix backend run dev.`);
            return;
        }

        try {
            const res = await fetch(`${CMS_API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await readResponseData(res);

            if (res.ok && data.token) {
                localStorage.setItem("admin_token", data.token);
                setToken(data.token);
                setError("");
            } else {
                setError(data.msg || "Invalid credentials");
            }
        } catch {
            setError("Cannot connect to backend server");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
        setUsername("");
        setPassword("");
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden text-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#148be6]/10 rounded-full blur-[120px] pointer-events-none" />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <Image src="/logo.png" alt="ATS5E" width={180} height={50} className="mx-auto mb-8 opacity-90" />
                        <h1 className="text-2xl font-black uppercase tracking-widest text-zinc-200">System Access</h1>
                        <p className="text-sm text-zinc-500 mt-2 font-medium">Restricted Area</p>
                    </div>

                    <form onSubmit={handleLogin} className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] shadow-2xl">
                        <div className="mb-6 rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-xs leading-relaxed text-zinc-400">
                            <p className="font-semibold uppercase tracking-[0.16em] text-zinc-300">CMS Backend</p>
                            <p className="mt-2">
                                {backendChecking
                                    ? "Checking backend availability..."
                                    : backendUnavailable
                                        ? `Offline at ${CMS_API_BASE_URL}. Retrying automatically every 5 seconds. Start it with npm run dev or npm --prefix backend run dev.`
                                        : `Connected to ${CMS_API_BASE_URL}.`}
                            </p>
                        </div>
                        {error && <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">{error}</div>}
                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 pl-1">Admin Email</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/40 border border-white/[0.06] rounded-xl px-11 py-3 text-sm text-white focus:outline-none focus:border-[#148be6]/50 focus:bg-white/[0.04] transition-all" placeholder="Enter admin email" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 pl-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/[0.06] rounded-xl px-11 py-3 text-sm text-white focus:outline-none focus:border-[#148be6]/50 focus:bg-white/[0.04] transition-all" placeholder="Enter password" />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={backendUnavailable || backendChecking || sessionChecking}
                            className="w-full flex items-center justify-center gap-2 bg-[#148be6] hover:bg-[#1f96ee] disabled:bg-zinc-700/70 disabled:text-zinc-300 text-white py-3.5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase transition-all hover:shadow-[0_0_20px_rgba(20,139,230,0.4)] disabled:hover:shadow-none"
                        >
                            {sessionChecking ? "Checking Session" : "Authenticate"} <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
            <aside className="w-64 border-r border-white/[0.06] bg-[#080808] flex flex-col z-20">
                <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
                    <Image src="/logo.png" alt="ATS5E" width={120} height={30} className="opacity-90" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#148be6] px-2 py-0.5 rounded bg-[#148be6]/10">CMS</span>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <TabBtn label="Dashboard" icon={<LayoutDashboard className="w-4 h-4" />} tab="dashboard" active={activeTab} set={setActiveTab} />
                    <TabBtn label="Solutions" icon={<Briefcase className="w-4 h-4" />} tab="solutions" active={activeTab} set={setActiveTab} />
                    <TabBtn label="Case Studies" icon={<FileText className="w-4 h-4" />} tab="case-studies" active={activeTab} set={setActiveTab} />
                    <TabBtn label="Insights" icon={<FileText className="w-4 h-4" />} tab="insights" active={activeTab} set={setActiveTab} />
                    <TabBtn label="Team" icon={<Users className="w-4 h-4" />} tab="team-members" active={activeTab} set={setActiveTab} />
                    <TabBtn label="Partners" icon={<Users className="w-4 h-4" />} tab="partners" active={activeTab} set={setActiveTab} />
                    <TabBtn label="Home Page" icon={<LayoutDashboard className="w-4 h-4" />} tab="home-page" active={activeTab} set={setActiveTab} />
                </nav>
                <div className="p-4 border-t border-white/[0.06]">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 transition-all">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto relative">
                <header className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.06] px-8 py-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">{activeTab === "dashboard" ? "Dashboard" : MODEL_LABELS[activeTab]}</h2>
                        <p className="text-xs text-zinc-500 font-medium mt-1">Manage your website content dynamically</p>
                    </div>
                </header>
                <div className="p-8 max-w-6xl mx-auto">
                    {backendUnavailable && (
                        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                            CMS backend is unavailable at <span className="font-semibold text-white">{CMS_API_BASE_URL}</span>. Start it with <span className="font-semibold text-white">npm run dev</span> from the repo root or <span className="font-semibold text-white">npm --prefix backend run dev</span>.
                        </div>
                    )}
                    {activeTab === "dashboard" ? (
                        <div className="p-8 rounded-2xl bg-[#148be6]/10 border border-[#148be6]/20">
                            <h3 className="text-xl font-bold mb-2">Welcome to the Headless CMS</h3>
                            <p className="text-zinc-400 text-sm">Select a collection from the sidebar to manage your database securely.</p>
                        </div>
                    ) : (
                        <ModelManager model={activeTab} token={token} backendStatus={backendStatus} onAuthInvalid={handleSessionExpired} />
                    )}
                </div>
            </main>
        </div>
    );
}

function TabBtn({ label, icon, tab, active, set }: TabButtonProps) {
    return (
        <button onClick={() => set(tab)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active === tab ? "bg-white/[0.06] text-white" : "text-zinc-400 hover:text-white hover:bg-white/[0.02]"}`}>
            {icon} {label}
        </button>
    );
}

// Sub-component to manage CRUD for a specific model
function ModelManager({
    model,
    token,
    backendStatus,
    onAuthInvalid,
}: {
    model: ModelKey;
    token: string;
    backendStatus: BackendStatus;
    onAuthInvalid: (message?: string) => void;
}) {
    const [data, setData] = useState<AdminRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [editingItem, setEditingItem] = useState<AdminRecord | null>(null);
    const isSingletonModel = model === "home-page";
    const backendUnavailable = backendStatus === "offline";
    const backendChecking = backendStatus === "checking";

    useEffect(() => {
        let isCancelled = false;

        async function loadData() {
            if (backendStatus !== "online") {
                if (!isCancelled) {
                    setLoading(backendChecking);

                    if (backendUnavailable) {
                        setData([]);
                        setError(`CMS backend is unavailable at ${CMS_API_BASE_URL}. Waiting for automatic reconnection...`);
                    }
                }

                return;
            }

            setLoading(true);
            setError("");
            setEditingItem(null);

            try {
                const result = await fetchModelData(model);

                if (!isCancelled) {
                    setData(result);
                }
            } catch (fetchError) {
                if (!isCancelled) {
                    setData([]);
                    setError(getErrorMessage(fetchError, "Unable to load records."));
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        void loadData();

        return () => {
            isCancelled = true;
        };
    }, [backendChecking, backendStatus, backendUnavailable, model]);

    const refreshData = async () => {
        if (backendStatus !== "online") {
            setLoading(false);
            setError(`CMS backend is unavailable at ${CMS_API_BASE_URL}. Waiting for automatic reconnection...`);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await fetchModelData(model);
            setData(result);
        } catch (fetchError) {
            setData([]);
            setError(getErrorMessage(fetchError, "Unable to load records."));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id?: string) => {
        if (!confirm("Are you sure?")) return;
        if (!id) {
            setError("Missing record identifier.");
            return;
        }
        if (backendStatus !== "online") {
            setError(`CMS backend is unavailable at ${CMS_API_BASE_URL}. Waiting for automatic reconnection...`);
            return;
        }

        try {
            setError("");

            const res = await fetch(`${CMS_API_BASE_URL}/api/crud/${model}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await readResponseData(res);

            if (isUnauthorizedResponse(res, data)) {
                onAuthInvalid();
                return;
            }

            if (!res.ok) {
                throw new Error(data.msg || "Unable to delete record.");
            }

            await refreshData();
        } catch (deleteError) {
            setError(getErrorMessage(deleteError, "Unable to delete record."));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingItem) return;

        if (backendStatus !== "online") {
            setError(`CMS backend is unavailable at ${CMS_API_BASE_URL}. Waiting for automatic reconnection...`);
            return;
        }

        setSaving(true);
        setError("");

        const validationError = validateRecord(model, editingItem);
        if (validationError) {
            setError(validationError);
            setSaving(false);
            return;
        }

        const isNew = !editingItem._id;
        const url = `${CMS_API_BASE_URL}/api/crud/${model}${isNew ? "" : `/${editingItem._id}`}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(sanitizeRecord(model, editingItem)),
            });

            const data = await readResponseData(res);

            if (isUnauthorizedResponse(res, data)) {
                onAuthInvalid();
                return;
            }

            if (!res.ok) {
                throw new Error(data.msg || "Unable to save record.");
            }

            setEditingItem(null);
            await refreshData();
        } catch (saveError) {
            setError(getErrorMessage(saveError, "Unable to save record."));
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        if (backendStatus !== "online") {
            setError(`CMS backend is unavailable at ${CMS_API_BASE_URL}. Waiting for automatic reconnection...`);
            e.target.value = "";
            return;
        }

        try {
            setError("");

            const res = await fetch(`${CMS_API_BASE_URL}/api/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const data = await readResponseData(res);

            if (isUnauthorizedResponse(res, data)) {
                onAuthInvalid();
                return;
            }

            if (res.ok && data.url) {
                setEditingItem((current) => {
                    if (!current) return current;
                    return { ...current, [key]: data.url };
                });
            } else {
                setError(data.msg || "Upload failed.");
            }
        } catch (uploadError) {
            setError(getErrorMessage(uploadError, "Cannot connect to upload server."));
        }

        e.target.value = "";
    };

    const updateEditingItem = (key: string, value: AdminFieldValue) => {
        setEditingItem((current) => {
            if (!current) return current;
            return { ...current, [key]: value };
        });
    };

    if (loading) return <div className="text-zinc-500 animate-pulse">Loading model securely...</div>;

    if (editingItem) {
        return (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">{editingItem._id ? `Edit ${MODEL_LABELS[model]}` : `Create New ${MODEL_LABELS[model]}`}</h3>
                    <button onClick={() => setEditingItem(null)} className="text-sm font-medium text-zinc-500 hover:text-white">Cancel</button>
                </div>

                {error && <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

                <form onSubmit={handleSave} className="space-y-4">
                    {getFieldSections(MODEL_FIELDS[model]).map((section) => (
                        <section key={section.title} className="space-y-4 rounded-2xl border border-white/[0.06] bg-black/20 p-5">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-300">{section.title}</h4>
                                <div className="mt-2 h-px w-full bg-white/[0.06]" />
                            </div>

                            {section.fields.map((field) => {
                                const fieldType = field.type ?? "text";
                                const fieldValue = editingItem[field.key];
                                const label = `${formatFieldLabel(field)}${field.required ? " *" : ""}`;

                                return (
                                    <div key={field.key}>
                                        <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1">{label}</label>
                                        {fieldType === "textarea" ? (
                                            <textarea
                                                value={getTextValue(fieldValue)}
                                                onChange={(event) => updateEditingItem(field.key, event.target.value)}
                                                className="w-full bg-black/40 border border-white/[0.06] rounded-lg p-3 text-sm focus:border-[#148be6]/50 min-h-[120px]"
                                            />
                                        ) : fieldType === "image" || fieldType === "file" ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={getTextValue(fieldValue)}
                                                    onChange={(event) => updateEditingItem(field.key, event.target.value)}
                                                    className="flex-1 bg-black/40 border border-white/[0.06] rounded-lg p-3 text-sm focus:border-[#148be6]/50"
                                                    placeholder={field.placeholder || "/uploads/..."}
                                                />
                                                <label className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] px-4 py-3 rounded-lg cursor-pointer text-sm font-medium transition-colors whitespace-nowrap">
                                                    {fieldType === "file" ? "Upload PDF" : "Upload Image"}
                                                    <input type="file" className="hidden" accept={field.accept} onChange={(event) => handleFileUpload(event, field.key)} />
                                                </label>
                                            </div>
                                        ) : fieldType === "checkbox" ? (
                                            <label className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-black/40 px-4 py-3 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(fieldValue)}
                                                    onChange={(event) => updateEditingItem(field.key, event.target.checked)}
                                                    className="h-4 w-4 rounded border-white/[0.2] bg-black/40 text-[#148be6] focus:ring-[#148be6]"
                                                />
                                                <span className="text-zinc-300">Enabled</span>
                                            </label>
                                        ) : fieldType === "number" ? (
                                            <input
                                                type="number"
                                                value={getTextValue(fieldValue)}
                                                onChange={(event) => updateEditingItem(field.key, event.target.value)}
                                                className="w-full bg-black/40 border border-white/[0.06] rounded-lg p-3 text-sm focus:border-[#148be6]/50"
                                            />
                                        ) : fieldType === "date" ? (
                                            <input
                                                type="date"
                                                value={getDateValue(fieldValue)}
                                                onChange={(event) => updateEditingItem(field.key, event.target.value)}
                                                className="w-full bg-black/40 border border-white/[0.06] rounded-lg p-3 text-sm focus:border-[#148be6]/50"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={getTextValue(fieldValue)}
                                                onChange={(event) => updateEditingItem(field.key, event.target.value)}
                                                className="w-full bg-black/40 border border-white/[0.06] rounded-lg p-3 text-sm focus:border-[#148be6]/50"
                                            />
                                        )}

                                        {field.helperText && <p className="mt-2 text-xs text-zinc-500">{field.helperText}</p>}
                                    </div>
                                );
                            })}
                        </section>
                    ))}

                    <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={saving} className="bg-[#148be6] px-6 py-2 rounded-lg text-sm font-bold shadow-lg disabled:cursor-not-allowed disabled:opacity-60">
                            {saving ? "Saving..." : "Save Record"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">{MODEL_LABELS[model]} Database</h3>
                    {isSingletonModel && <p className="mt-1 text-xs text-zinc-500">This collection should only contain a single record.</p>}
                </div>
                <button
                    onClick={() => setEditingItem(prepareEditingItem(model, createEmptyRecord(model)))}
                    disabled={backendUnavailable || backendChecking || (isSingletonModel && data.length > 0)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Plus className="w-4 h-4" /> Add Record
                </button>
            </div>

            {error && <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

            <div className="border border-white/[0.06] rounded-2xl bg-white/[0.01] overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/[0.03] border-b border-white/[0.06] text-xs uppercase tracking-wider text-zinc-500 font-bold">
                        <tr>
                            <th className="px-6 py-4">Primary Identifier</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                        {data.map((item, i) => (
                            <tr key={i} className="hover:bg-white/[0.02]">
                                <td className="px-6 py-4 font-medium">{getPrimaryIdentifier(item)}</td>
                                <td className="px-6 py-4 text-right flex items-center justify-end gap-4">
                                    <button onClick={() => setEditingItem(prepareEditingItem(model, item))} className="text-[#148be6] hover:text-white transition-colors"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr><td colSpan={2} className="px-6 py-10 text-center text-zinc-500">No records found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

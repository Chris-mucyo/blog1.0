import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EyeIcon = ({ open }: { open: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {open ? (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ) : (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
            </>
        )}
    </svg>
);

type PasswordStrength = {
    label: string;
    color: string;
    width: string;
    score: number;
};

function getPasswordStrength(password: string): PasswordStrength | null {
    if (!password) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels: PasswordStrength[] = [
        { score: 1, label: "Weak", color: "#E24B4A", width: "25%" },
        { score: 2, label: "Fair", color: "#EF9F27", width: "50%" },
        { score: 3, label: "Good", color: "#378ADD", width: "75%" },
        { score: 4, label: "Strong", color: "#1D9E75", width: "100%" },
    ];
    return levels[score - 1] ?? levels[0];
}

export default function SignUpForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmError, setConfirmError] = useState("");

    const strength = getPasswordStrength(password);
    const passwordsMatch = confirm === "" || password === confirm;

    useEffect(() => {
        if (confirm && password !== confirm) {
            setConfirmError("Passwords do not match");
        } else {
            setConfirmError("");
        }
    }, [password, confirm]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) return alert("Please accept the terms to continue.");
        if (password !== confirm) return alert("Passwords do not match.");
        setLoading(true);
        setTimeout(() => setLoading(false), 1800);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-sm bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-7">

                    {/* Header */}
                    <div className="mb-5">
                        <h1 className="text-foreground text-lg font-medium mb-1">Join As A Blogger</h1>
                        <p className="text-muted-foreground text-sm">Create an account to start uploading.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="fullName" className="text-muted-foreground text-sm">First name</label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Enter full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="h-10 px-3 rounded-md bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-muted-foreground text-sm">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-10 px-3 rounded-md bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-muted-foreground text-sm">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-10 pl-3 pr-10 rounded-md bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>
                            {strength && (
                                <div className="mt-1">
                                    <div className="h-[3px] w-full bg-border rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{ width: strength.width, background: strength.color }}
                                        />
                                    </div>
                                    <span className="text-xs mt-1 block" style={{ color: strength.color }}>
                                        {strength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="confirm" className="text-muted-foreground text-sm">Confirm password</label>
                            <div className="relative">
                                <input
                                    id="confirm"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Repeat your password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                    className={`w-full h-10 pl-3 pr-10 rounded-md bg-input border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150 ${!passwordsMatch ? "border-destructive" : "border-border"}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <EyeIcon open={showConfirm} />
                                </button>
                            </div>
                            {confirmError && (
                                <span className="text-xs text-destructive">{confirmError}</span>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2.5 mt-1">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-border accent-primary cursor-pointer flex-shrink-0"
                            />
                            <label htmlFor="terms" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                                I agree to the{" "}
                                <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
                                and{" "}
                                <a href="#" className="text-primary hover:underline">Privacy Policy</a>{" "}
                                of Trendx
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !agreed}
                            className="mt-1 w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
                        >
                            {loading ? <Spinner light /> : "Create account"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-muted-foreground text-sm mt-5">
                        Already have an account?{" "}
                        <Link to="/Auth/signin" className="text-primary hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

function Spinner({ light = false }: { light?: boolean }) {
    return (
        <svg
            className={`animate-spin h-4 w-4 ${light ? "text-primary-foreground" : "text-muted-foreground"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
    );
}
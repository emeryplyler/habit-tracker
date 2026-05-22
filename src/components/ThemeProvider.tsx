import { cookies } from "next/headers";

export default async function ThemeProvider({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const cookieStore = await cookies();
    const mode = cookieStore.get("mode")?.value || "light";
    // ...apply theme logic
    return <div data-theme={mode}>
        {children}
    </div>;
}

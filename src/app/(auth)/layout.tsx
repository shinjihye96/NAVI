export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="max-w-[414rem] m-auto">
            {children}
        </main>
    );
}

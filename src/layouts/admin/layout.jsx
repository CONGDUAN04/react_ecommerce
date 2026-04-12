export function Content({ children }) {
    return <div className="p-8 flex-1">{children}</div>;
}

export function ContentCard({ children, className = '' }) {
    return <div className={`bg-white rounded-xl border border-gray-200 p-8 ${className}`}>{children}</div>;
}

export function WelcomeSection({ title, description }) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 m-0 mb-2">{title}</h1>
            <p className="text-base text-gray-500 leading-relaxed m-0">{description}</p>
        </div>
    );
}

export function StatsGrid({ children }) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{children}</div>;
}
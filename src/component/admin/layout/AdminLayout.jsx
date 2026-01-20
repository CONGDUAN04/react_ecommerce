const AdminLayout = ({ children }) => {
    return (
        <div
            style={{
                padding: "24px",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",   // ⭐ QUAN TRỌNG

            }}
        >
            {children}
        </div>
    );
};

export default AdminLayout;

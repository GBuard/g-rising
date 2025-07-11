import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 text-white bg-[#1D1D1D]">{children}</main>
        </div>
    );
}

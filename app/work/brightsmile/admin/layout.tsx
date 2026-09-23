import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminHeader />

        <main
          className="
            w-full
            [&>div]:!ml-0
            [&>div]:!mr-0
            [&>div]:!max-w-none
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
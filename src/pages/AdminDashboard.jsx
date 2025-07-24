import React, { useState } from "react";
import Sidebar from "../components/admin/layout/Sidebar";
import Topbar from "../components/admin/layout/Topbar";
import Dashboard from "../components/admin/pages/Dashboard";
import ReviewManagement from "../components/admin/pages/ReviewManagement";
import PageManagement from "../components/admin/pages/PageManagement";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;

      case "pages":
        return <PageManagement />;
      case "reviews":
        return <ReviewManagement />;
      case "analytics":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p>Coming soon...</p>
          </div>
        );
      case "users":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">User Management</h1>
            <p>Coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p>Coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

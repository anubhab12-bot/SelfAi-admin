import React from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/layout/ToastContainer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { WeeklyUsage } from './pages/WeeklyUsage';
import { FeatureControl } from './pages/FeatureControl';
import { RbacUsers } from './pages/RbacUsers';
import { SystemMonitoring } from './pages/SystemMonitoring';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';

const AppContent: React.FC = () => {
  const { activeTab } = useAdmin();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'weekly-usage':
        return <WeeklyUsage />;
      case 'feature-control':
        return <FeatureControl />;
      case 'rbac-users':
        return <RbacUsers />;
      case 'monitoring':
        return <SystemMonitoring />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Notification Toasts */}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;

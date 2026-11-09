import React from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/layout/ToastContainer';

// All Rich & Intuitive Pages
import { Dashboard } from './pages/Dashboard';
import { FeatureControl } from './pages/FeatureControl';
import { RbacUsers } from './pages/RbacUsers';
import { SystemMonitoring } from './pages/SystemMonitoring';
import { AuditLogs } from './pages/AuditLogs';
import { Settings } from './pages/Settings';
import { AcceptInvite } from './pages/AcceptInvite';
import { UserTracking } from './pages/UserTracking';
import { PaywallBilling } from './pages/PaywallBilling';

const AppContent: React.FC = () => {
  const { activeTab } = useAdmin();
  const [isAcceptInviteRoute, setIsAcceptInviteRoute] = React.useState(() => {
    return window.location.hash.includes('accept-invite') || window.location.search.includes('accept-invite');
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      setIsAcceptInviteRoute(
        window.location.hash.includes('accept-invite') || window.location.search.includes('accept-invite')
      );
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAcceptInviteRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center selection:bg-indigo-500 selection:text-white">
        <AcceptInvite />
        <ToastContainer />
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'telemetry':
        return <UserTracking />;
      case 'billing':
        return <PaywallBilling />;
      case 'features':
        return <FeatureControl />;
      case 'team':
        return <RbacUsers />;
      case 'monitoring':
        return <SystemMonitoring />;
      case 'audit':
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
        
        <main className="flex-1 p-6 lg:p-8 max-w-6xl w-full mx-auto">
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

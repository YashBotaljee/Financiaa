import React, { useState, useEffect } from 'react';
import { NavSection, Transaction, Invoice, Employee, Client, NotificationItem } from './types';
import { ToastProvider, useToast } from './components/common/Toast';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';
import { HelpModal } from './components/layout/HelpModal';

// Modals
import { AddTransactionModal } from './components/finance/AddTransactionModal';
import { AddInvoiceModal } from './components/finance/AddInvoiceModal';
import { InvoiceDetailModal } from './components/finance/InvoiceDetailModal';
import { EmployeeProfileModal } from './components/employees/EmployeeProfileModal';
import { ClientDetailModal } from './components/clients/ClientDetailModal';

// Pages
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { FinancialOverviewPage } from './pages/Finance/FinancialOverviewPage';
import { TransactionsPage } from './pages/Finance/TransactionsPage';
import { IncomePage } from './pages/Finance/IncomePage';
import { ExpensesPage } from './pages/Finance/ExpensesPage';
import { InvoicesPage } from './pages/Finance/InvoicesPage';
import { PaymentsPage } from './pages/Finance/PaymentsPage';

import { EmployeesPage } from './pages/Employees/EmployeesPage';
import { DepartmentsPage } from './pages/Employees/DepartmentsPage';
import { AttendancePage } from './pages/Employees/AttendancePage';
import { LeavePage } from './pages/Employees/LeavePage';

import { ClientsPage } from './pages/Clients/ClientsPage';
import { ClientActivityPage } from './pages/Clients/ClientActivityPage';
import { ClientPaymentsPage } from './pages/Clients/ClientPaymentsPage';

import { ReportsPage } from './pages/Reports/ReportsPage';

import { AIAssistantPage } from './pages/AI/AIAssistantPage';
import { BusinessInsightsPage } from './pages/AI/BusinessInsightsPage';
import { BusinessWatchPage } from './pages/AI/BusinessWatchPage';

import { SettingsPage } from './pages/Settings/SettingsPage';

// Initial Mock Data
import { INITIAL_TRANSACTIONS } from './data/mock/transactions';
import { INITIAL_INVOICES } from './data/mock/invoices';
import { EMPLOYEES } from './data/mock/employees';
import { CLIENTS } from './data/mock/clients';
import { INITIAL_NOTIFICATIONS } from './data/mock/notifications';

function MainApp() {
  const { showToast } = useToast();

  // Navigation State
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  // Data States
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [employees] = useState<Employee[]>(EMPLOYEES);
  const [clients] = useState<Client[]>(CLIENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Dialog & Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [isAddTxnOpen, setIsAddTxnOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Unread notifications counter
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Add Transaction Handler
  const handleAddTransaction = (newTxn: Omit<Transaction, 'id'>) => {
    const nextId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullTxn: Transaction = {
      ...newTxn,
      id: nextId,
    };
    setTransactions((prev) => [fullTxn, ...prev]);
    showToast(`Transaction ${nextId} added to ledger!`, 'success');
  };

  // Add Invoice Handler
  const handleAddInvoice = (newInv: Omit<Invoice, 'id'>) => {
    const nextId = `INV-${Math.floor(1046 + Math.random() * 50)}`;
    const fullInv: Invoice = {
      ...newInv,
      id: nextId,
    };
    setInvoices((prev) => [fullInv, ...prev]);
    showToast(`Invoice ${nextId} generated for ${newInv.client}!`, 'success');
  };

  // Delete Transaction Handler
  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Quick Add from TopNavbar
  const handleQuickAdd = (type: 'transaction' | 'invoice') => {
    if (type === 'transaction') {
      setIsAddTxnOpen(true);
    } else {
      setIsCreateInvoiceOpen(true);
    }
  };

  // Render Current Content View
  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <DashboardPage
            transactions={transactions}
            onNavigate={setCurrentSection}
            onOpenAddTransaction={() => setIsAddTxnOpen(true)}
            onViewInvoice={(invoiceId) => {
              const inv = invoices.find((i) => i.id === invoiceId) || invoices[0];
              setSelectedInvoice(inv);
            }}
            invoices={invoices}
          />
        );

      // FINANCE
      case 'finance-overview':
        return (
          <FinancialOverviewPage
            transactions={transactions}
            onNavigate={setCurrentSection}
            onOpenAddTransaction={() => setIsAddTxnOpen(true)}
          />
        );
      case 'transactions':
        return (
          <TransactionsPage
            transactions={transactions}
            onOpenAddTransaction={() => setIsAddTxnOpen(true)}
            onDeleteTransaction={handleDeleteTransaction}
          />
        );
      case 'income':
        return (
          <IncomePage
            transactions={transactions}
            onOpenAddTransaction={() => setIsAddTxnOpen(true)}
          />
        );
      case 'expenses':
        return (
          <ExpensesPage
            transactions={transactions}
            onOpenAddTransaction={() => setIsAddTxnOpen(true)}
          />
        );
      case 'invoices':
        return (
          <InvoicesPage
            invoices={invoices}
            onOpenCreateInvoice={() => setIsCreateInvoiceOpen(true)}
            onViewInvoice={(inv) => setSelectedInvoice(inv)}
          />
        );
      case 'payments':
        return <PaymentsPage />;

      // PEOPLE
      case 'employees':
        return (
          <EmployeesPage
            employees={employees}
            onSelectEmployee={(emp) => setSelectedEmployee(emp)}
            onOpenAddEmployee={() => showToast('Staff hiring request modal open', 'info')}
          />
        );
      case 'departments':
        return <DepartmentsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'leave':
        return <LeavePage />;

      // CLIENTS
      case 'clients':
        return (
          <ClientsPage
            clients={clients}
            onSelectClient={(c) => setSelectedClient(c)}
            onOpenAddClient={() => showToast('New enterprise client onboarding modal', 'info')}
          />
        );
      case 'client-activity':
        return <ClientActivityPage />;
      case 'client-payments':
        return <ClientPaymentsPage />;

      // REPORTS
      case 'financial-reports':
        return <ReportsPage initialTab="financial" />;
      case 'employee-reports':
        return <ReportsPage initialTab="employee" />;
      case 'client-reports':
        return <ReportsPage initialTab="client" />;
      case 'business-analytics':
        return <ReportsPage initialTab="analytics" />;

      // AI INTELLIGENCE
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'business-insights':
        return <BusinessInsightsPage />;
      case 'business-watch':
        return <BusinessWatchPage onNavigate={setCurrentSection} />;

      // SETTINGS
      case 'settings':
        return <SettingsPage />;

      default:
        return (
          <DashboardPage
            transactions={transactions}
            onNavigate={setCurrentSection}
            onOpenAddTransaction={() => setIsAddTxnOpen(true)}
            onViewInvoice={(invoiceId) => {
              const inv = invoices.find((i) => i.id === invoiceId) || invoices[0];
              setSelectedInvoice(inv);
            }}
            invoices={invoices}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        {/* Top Sticky Navigation */}
        <TopNavbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          unreadNotificationsCount={unreadCount}
          onNavigate={setCurrentSection}
          onOpenQuickAdd={handleQuickAdd}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Modals & Overlays */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setCurrentSection}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllRead}
        onNavigate={setCurrentSection}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <AddTransactionModal
        isOpen={isAddTxnOpen}
        onClose={() => setIsAddTxnOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      <AddInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        onAddInvoice={handleAddInvoice}
      />

      <InvoiceDetailModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />

      <EmployeeProfileModal
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        employee={selectedEmployee}
      />

      <ClientDetailModal
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        client={selectedClient}
        onViewInvoice={(invoiceId) => {
          const inv = invoices.find((i) => i.id === invoiceId) || invoices[0];
          setSelectedInvoice(inv);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}

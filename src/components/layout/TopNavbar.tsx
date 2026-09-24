import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  ChevronDown,
  Building,
  Plus,
  Check,
  User,
  Shield,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { WORKSPACES } from '../../data/mock/businessData';
import { Workspace, NavSection } from '../../types';

export interface TopNavbarProps {
  onOpenMobileSidebar: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenHelp: () => void;
  unreadNotificationsCount: number;
  onNavigate: (section: NavSection) => void;
  onOpenQuickAdd: (type: 'transaction' | 'invoice') => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenMobileSidebar,
  onOpenSearch,
  onOpenNotifications,
  onOpenHelp,
  unreadNotificationsCount,
  onNavigate,
  onOpenQuickAdd,
}) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>(WORKSPACES[0]);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between transition-all">
      {/* Left side: Hamburger + Workspace Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Business Workspace Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen);
              setIsQuickAddOpen(false);
              setIsUserMenuOpen(false);
            }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-100/80 text-left transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              <Building className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                {selectedWorkspace.name}
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <span>GST: {selectedWorkspace.gstin.substring(0, 10)}...</span>
                <span>•</span>
                <span>FY 25-26</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {/* Workspace dropdown menu */}
          {isWorkspaceMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsWorkspaceMenuOpen(false)}
              />
              <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Select Business Workspace
                </div>
                <div className="space-y-1">
                  {WORKSPACES.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => {
                        setSelectedWorkspace(ws);
                        setIsWorkspaceMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        selectedWorkspace.id === ws.id
                          ? 'bg-indigo-50/80 text-indigo-900 font-medium'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{ws.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {ws.entityType} • {ws.gstin}
                        </div>
                      </div>
                      {selectedWorkspace.id === ws.id && (
                        <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 px-2 py-1">
                  <span className="text-[11px] text-slate-400">
                    Switching workspaces updates all ledger charts & records.
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-100/80 hover:bg-slate-100 text-slate-400 hover:text-slate-600 border border-slate-200/80 rounded-xl text-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span className="font-normal text-slate-500">
              Search employees, clients, transactions...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right actions: Quick Add + Notifications + Help + Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Mobile search icon */}
        <button
          onClick={onOpenSearch}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg md:hidden cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Quick Add Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsQuickAddOpen(!isQuickAddOpen);
              setIsWorkspaceMenuOpen(false);
              setIsUserMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
            <ChevronDown className="w-3 h-3 text-indigo-200" />
          </button>

          {isQuickAddOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsQuickAddOpen(false)}
              />
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setIsQuickAddOpen(false);
                    onOpenQuickAdd('transaction');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-600" />
                  <span>New Transaction</span>
                </button>
                <button
                  onClick={() => {
                    setIsQuickAddOpen(false);
                    onOpenQuickAdd('invoice');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>New Invoice</span>
                </button>
                <button
                  onClick={() => {
                    setIsQuickAddOpen(false);
                    onNavigate('ai-assistant');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-left cursor-pointer border-t border-slate-100 mt-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications Icon with Badge */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Help Modal Trigger */}
        <button
          onClick={onOpenHelp}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Prototype Architecture & Teacher Demo Guide"
          aria-label="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsWorkspaceMenuOpen(false);
              setIsQuickAddOpen(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-xs shadow-xs ring-2 ring-indigo-100">
              YB
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">Yash B.</div>
              <div className="text-[10px] text-slate-500">Business Owner</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {isUserMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-semibold text-slate-900">Yash B.</p>
                  <p className="text-[11px] text-slate-500">owner@apexnova.in</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Administrator
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Security & Access</span>
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onOpenHelp();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors text-left cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Project Scope Guide</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

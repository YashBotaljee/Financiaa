import React, { useState } from 'react';
import { X, Check, Bell, Sparkles, Briefcase, Users, Wallet, Activity } from 'lucide-react';
import { NotificationItem, NavSection } from '../../types';

export interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNavigate: (section: NavSection) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Finance', 'Clients', 'Employees', 'Business', 'AI Insights'];

  const filtered = selectedCategory === 'All'
    ? notifications
    : notifications.filter((n) => n.category === selectedCategory);

  const getCategoryIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'Finance':
        return <Wallet className="w-4 h-4 text-emerald-600" />;
      case 'Clients':
        return <Briefcase className="w-4 h-4 text-sky-600" />;
      case 'Employees':
        return <Users className="w-4 h-4 text-amber-600" />;
      case 'Business':
        return <Activity className="w-4 h-4 text-indigo-600" />;
      case 'AI Insights':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
    }
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    if (notif.actionRoute) {
      onNavigate(notif.actionRoute);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Notifications</h3>
                <p className="text-xs text-slate-500">Business activity & system alerts</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllAsRead}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 p-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer flex items-center gap-1"
                title="Mark all as read"
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark all read</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/60 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs">
                No notifications in this category.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 rounded-xl transition-all cursor-pointer hover:bg-slate-50 relative ${
                    !item.read ? 'bg-indigo-50/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs shrink-0 mt-0.5">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        {item.actionRoute && (
                          <span className="text-[11px] font-medium text-indigo-600 hover:underline">
                            View details →
                          </span>
                        )}
                      </div>
                    </div>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
            Realtime notifications powered by Financiaa Event Hub
          </div>
        </div>
      </div>
    </div>
  );
};

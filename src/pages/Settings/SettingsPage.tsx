import React, { useState } from 'react';
import {
  User,
  Building,
  Bell,
  Palette,
  Shield,
  Sliders,
  Check,
  Save,
  Lock,
  Smartphone,
  Globe,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../components/common/Toast';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'notifications' | 'appearance' | 'security' | 'preferences'>('profile');

  // Form states
  const [profileName, setProfileName] = useState('Yash B.');
  const [profileEmail, setProfileEmail] = useState('owner@apexnova.in');
  const [profilePhone, setProfilePhone] = useState('+91 98200 11223');

  const [businessName, setBusinessName] = useState('Apex Nova Tech Pvt Ltd');
  const [gstin, setGstin] = useState('29ABCDE1234F1Z5');
  const [pan, setPan] = useState('ABCDE1234F');
  const [address, setAddress] = useState('Indiranagar 100ft Road, Bengaluru, Karnataka - 560038');

  // Toggle states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [overdueSms, setOverdueSms] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [compactTables, setCompactTables] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoGst, setAutoGst] = useState(true);

  const handleSave = (section: string) => {
    showToast(`Saved ${section} settings successfully!`, 'success');
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'business' as const, label: 'Business Information', icon: Building },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'preferences' as const, label: 'Preferences', icon: Sliders },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Platform & Company Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure business entity information, tax parameters, communication, and access control
        </p>
      </div>

      {/* Main Settings Layout with Left Tab Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-1 bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs h-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3">
          {/* PROFILE */}
          {activeTab === 'profile' && (
            <Card
              title="Personal Profile & Account"
              subtitle="Primary administrator credentials and contact card"
              footer={
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSave('Profile')}
                    icon={<Save className="w-3.5 h-3.5" />}
                  >
                    Save Changes
                  </Button>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white font-bold text-xl flex items-center justify-center ring-4 ring-indigo-50 shadow-xs">
                    YB
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{profileName}</h4>
                    <p className="text-xs text-slate-500">Business Owner & Administrator</p>
                    <button
                      onClick={() => showToast('Avatar file uploader ready in production release', 'info')}
                      className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Primary Email</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Direct Contact Phone</label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Account Role</label>
                    <input
                      type="text"
                      disabled
                      value="Owner / Managing Director (Full Access)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* BUSINESS INFORMATION */}
          {activeTab === 'business' && (
            <Card
              title="Business Entity & Tax Information"
              subtitle="Company details displayed on official tax invoices and financial statements"
              footer={
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSave('Business')}
                    icon={<Save className="w-3.5 h-3.5" />}
                  >
                    Save Business Profile
                  </Button>
                </div>
              }
            >
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Registered Entity Name</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Entity Structure</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700">
                      <option>Private Limited Company (Pvt Ltd)</option>
                      <option>Limited Liability Partnership (LLP)</option>
                      <option>Public Limited</option>
                      <option>Proprietorship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">GSTIN Number (Goods & Services Tax)</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Permanent Account Number (PAN)</label>
                    <input
                      type="text"
                      value={pan}
                      onChange={(e) => setPan(e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Registered Corporate Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Primary Operating Currency</label>
                    <input
                      type="text"
                      disabled
                      value="Indian Rupee (INR ₹)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Current Fiscal Accounting Period</label>
                    <input
                      type="text"
                      disabled
                      value="FY 2025-2026 (Apr 1 - Mar 31)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <Card
              title="Notification Channels & Rules"
              subtitle="Choose what events trigger alert emails, SMS notices, and dashboard badges"
              footer={
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSave('Notifications')}
                    icon={<Save className="w-3.5 h-3.5" />}
                  >
                    Save Preferences
                  </Button>
                </div>
              }
            >
              <div className="space-y-4 text-xs">
                {[
                  { title: 'Immediate Email Alert on Overdue Invoices', desc: 'Notify finance team immediately when a client invoice passes credit terms', state: overdueSms, set: setOverdueSms },
                  { title: 'Employee Leave Request Notifications', desc: 'Send manager alerts when pending time-off applications are submitted', state: emailAlerts, set: setEmailAlerts },
                  { title: 'Executive Weekly Financial Digest', desc: 'Deliver Monday morning P&L and burn rate recap to founders', state: weeklyDigest, set: setWeeklyDigest },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div>
                      <span className="font-bold text-slate-900 block">{item.title}</span>
                      <span className="text-[11px] text-slate-500">{item.desc}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.set(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* APPEARANCE */}
          {activeTab === 'appearance' && (
            <Card title="Interface & Display" subtitle="Customize the theme and density for your business dashboard">
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <span className="font-bold text-slate-900 block">Theme Scheme</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border-2 border-indigo-600 bg-slate-50 text-indigo-900 font-bold flex items-center justify-between">
                      <span>Enterprise Light (Neutral)</span>
                      <Check className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div
                      onClick={() => showToast('Dark mode will be available upon production release approval', 'info')}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-900 text-slate-300 font-semibold flex items-center justify-between cursor-pointer hover:border-slate-400"
                    >
                      <span>Midnight SaaS (Dark)</span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Preview</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div>
                    <span className="font-bold text-slate-900 block">Compact Table Density</span>
                    <span className="text-[11px] text-slate-500">Render more ledger rows simultaneously</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={compactTables}
                    onChange={(e) => {
                      setCompactTables(e.target.checked);
                      showToast('Toggled compact row mode', 'info');
                    }}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <Card title="Authentication & Access Security" subtitle="Protect corporate ledger data and financial credentials">
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Two-Factor Authentication (2FA)</span>
                      <span className="text-[11px] text-slate-500">Mandatory TOTP authenticator prompt upon login</span>
                    </div>
                  </div>
                  <Badge variant="success" size="sm" dot>Enforced</Badge>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Session Inactivity Timeout</span>
                      <span className="text-[11px] text-slate-500">Automatically locks workspace after 30 minutes</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-700">30 Minutes</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="font-bold text-slate-900 block mb-2">Active Authorized Devices</span>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1 text-slate-600">
                      <span>Windows 11 • Chrome 128 (Bengaluru, India)</span>
                      <Badge variant="success" size="sm">Current Session</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1 text-slate-600 border-t border-slate-100">
                      <span>iPhone 15 Pro • Safari Mobile</span>
                      <span className="text-[11px] text-slate-400">Active 4 hrs ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* PREFERENCES */}
          {activeTab === 'preferences' && (
            <Card
              title="Business Rules & Defaults"
              subtitle="Default invoice terms, numbering sequences, and tax automations"
              footer={
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSave('Preferences')}
                    icon={<Save className="w-3.5 h-3.5" />}
                  >
                    Save Defaults
                  </Button>
                </div>
              }
            >
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Default Invoice Credit Terms</label>
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700">
                      <option>Net 15 Days (Standard)</option>
                      <option>Net 30 Days (Enterprise)</option>
                      <option>Due on Receipt</option>
                      <option>Net 45 Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Invoice Prefix Sequence</label>
                    <input
                      type="text"
                      defaultValue="INV-2026-"
                      className="w-full px-3 py-2 font-mono border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div>
                    <span className="font-bold text-slate-900 block">Automated 18% GST Calculation</span>
                    <span className="text-[11px] text-slate-500">Automatically computes CGST + SGST (or IGST) on all generated bills</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoGst}
                    onChange={(e) => setAutoGst(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

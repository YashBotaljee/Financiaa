import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Eye,
  Download,
  Mail,
  Phone,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Client } from '../../types';
import { formatINR } from '../../utils/formatters';
import { useToast } from '../../components/common/Toast';

export interface ClientsPageProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onOpenAddClient?: () => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({
  clients,
  onSelectClient,
  onOpenAddClient,
}) => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const activeCount = clients.filter((c) => c.status === 'Active').length;
  const totalOutstanding = clients.reduce((acc, c) => acc + c.outstanding, 0);

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Client Accounts & Portfolios
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Corporate accounts, enterprise contracts, billing histories, and key stakeholder contacts
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast('Exporting clients roster to CSV', 'success')}
            icon={<Download className="w-4 h-4" />}
          >
            Export Clients
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (onOpenAddClient) onOpenAddClient();
              else showToast('Onboard Client modal ready for testing', 'info');
            }}
            icon={<Plus className="w-4 h-4" />}
          >
            + Onboard Client
          </Button>
        </div>
      </div>

      {/* 4 Client Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Clients"
          value="42 Accounts"
          subtitle="Corporate engagements"
          trend="up"
          trendPositive={true}
          icon={<Briefcase className="w-5 h-5" />}
          iconBgColor="bg-slate-100 text-slate-600"
        />
        <StatCard
          title="Active Clients"
          value={`${activeCount} Active`}
          subtitle="Active billing retainers"
          trend="up"
          trendPositive={true}
          icon={<Users className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="New This Month"
          value="5 Accounts"
          subtitle="Enterprise growth"
          trend="up"
          trendPositive={true}
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Outstanding Payments"
          value={formatINR(totalOutstanding)}
          subtitle="3 Accounts past terms"
          badge="Follow-up needed"
          trend="down"
          trendPositive={false}
          icon={<AlertCircle className="w-5 h-5" />}
          iconBgColor="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Client Table Card */}
      <Card
        title="Enterprise Clients"
        subtitle={`Showing ${filtered.length} corporate relationships`}
        headerAction={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search company, city, contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg w-44 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Onboarding">Onboarding</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Client ID</th>
                <th className="py-3 px-4">Client / Company</th>
                <th className="py-3 px-4">Key Contact</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 text-center">Projects</th>
                <th className="py-3 px-4 text-right">Outstanding</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{client.id}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{client.name}</span>
                    <span className="text-[10px] text-slate-500">{client.company} • {client.city}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{client.contactPerson}</td>
                  <td className="py-3 px-4 text-indigo-600">{client.email}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800 font-sans">
                    {client.projectsCount}
                  </td>
                  <td className="py-3 px-4 text-right font-bold font-sans">
                    <span className={client.outstanding > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                      {client.outstanding > 0 ? formatINR(client.outstanding) : 'Cleared'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={
                        client.status === 'Active'
                          ? 'success'
                          : client.status === 'Pending Onboarding'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                      dot
                    >
                      {client.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<Eye className="w-3.5 h-3.5" />}
                      onClick={() => onSelectClient(client)}
                    >
                      Dossier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

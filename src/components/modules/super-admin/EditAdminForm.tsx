/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Loader2, Save, ShieldCheck, Mail, User, Calendar, Fingerprint, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { updateAdmin } from '@/actions/super-admin.actions';
import { Badge } from '@/components/ui/badge';

interface EditAdminFormProps {
  admin: any;
}

export function EditAdminForm({ admin }: EditAdminFormProps) {
  const router = useRouter();
  const adminData = admin?.data || admin;

  const [name, setName] = useState<string>(adminData?.name || '');
  const [email, setEmail] = useState<string>(adminData?.email || '');
  const [status, setStatus] = useState<string>(adminData?.status || 'ACTIVE');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { name, email, status };
      const res = await updateAdmin(adminData.id, payload);

      if (res.success) {
        toast.success('Admin updated successfully!');
        setTimeout(() => {
          router.push('/dashboard/super-admin/admins');
          router.refresh();
        }, 1000);
      } else {
        toast.error(res.error?.message || 'Failed to update admin');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 py-4 animate-in fade-in duration-500">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-500 font-bold h-10"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Admin Panel
      </Button>

      <Card className="border-none shadow-2xl shadow-slate-200/50 bg-white/90 backdrop-blur-md rounded-[2rem] overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600" />
        <CardHeader className="px-8 py-6 text-center border-b border-slate-50">
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <img
                src={adminData?.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(adminData?.name || 'Admin')}&background=16a34a&color=fff&bold=true&size=128`}
                alt={adminData?.name}
                className="relative h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-xl"
              />
              <div className="absolute bottom-0 right-0 h-6 w-6 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100">
                 <div className={`h-2 w-2 rounded-full ${status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight leading-tight">Admin Profile</CardTitle>
          <CardDescription className="text-slate-500 font-medium text-xs">
            Review and update administrative credentials
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 py-6 space-y-6">
          {/* Section: Read-only Account Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5 group hover:bg-white hover:shadow-md transition-all">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                <Fingerprint className="h-2.5 w-2.5" />
                System ID
              </div>
              <p className="text-[10px] font-mono text-slate-600 break-all leading-tight">{adminData?.id}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5 group hover:bg-white hover:shadow-md transition-all">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                <ShieldCheck className="h-2.5 w-2.5" />
                Platform Role
              </div>
              <Badge className="bg-slate-900 text-white rounded-md px-1.5 py-0 h-4 text-[9px] uppercase font-black border-none">
                {adminData?.role || 'ADMIN'}
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5 group hover:bg-white hover:shadow-md transition-all">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                <Calendar className="h-2.5 w-2.5" />
                Member Since
              </div>
              <p className="text-xs font-bold text-slate-700">
                {adminData?.createdAt ? new Date(adminData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold text-slate-700 flex items-center gap-2 px-0.5">
                  <User className="h-3.5 w-3.5 text-green-500" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. John Doe"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all px-4 text-sm font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-2 px-0.5">
                  <Mail className="h-3.5 w-3.5 text-green-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@greenpulse.com"
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all px-4 text-sm font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-xs font-bold text-slate-700 flex items-center gap-2 px-0.5">
                  <Activity className="h-3.5 w-3.5 text-green-500" />
                  Account Status
                </Label>
                <Select value={status} onValueChange={(v) => v && setStatus(v)}>
                  <SelectTrigger id="status" className="h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all px-4 text-sm font-bold">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-2xl p-1">
                    <SelectItem value="ACTIVE" className="rounded-lg py-2 px-3 focus:bg-green-50 focus:text-green-700 text-xs font-bold transition-colors cursor-pointer mb-0.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                        ACTIVE
                      </div>
                    </SelectItem>
                    <SelectItem value="BLOCKED" className="rounded-lg py-2 px-3 focus:bg-red-50 focus:text-red-700 text-xs font-bold transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                        BLOCKED
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-50">
              <Button
                type="button"
                variant="ghost"
                className="h-11 px-6 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-sm"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="h-11 px-8 rounded-xl font-black bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 text-sm" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

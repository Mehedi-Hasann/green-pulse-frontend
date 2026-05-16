'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, Edit, Trash2, Mail, Calendar, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { deleteAdmin } from '@/actions/super-admin.actions';
import { toast } from 'sonner';

export function SuperAdminAdminsModule({ admins }: { admins: any }) {
  const [adminList, setAdminList] = useState<any[]>(
    admins?.data?.data || (Array.isArray(admins?.data) ? admins.data : [])
  );
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(id);
    try {
      const res = await deleteAdmin(id);
      if (res.success) {
        setAdminList(prev => prev.filter(admin => admin.id !== id));
        toast.success('Admin deleted successfully');
      } else {
        toast.error(res.error?.message || 'Failed to delete admin');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the admin');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Admin Management</h1>
          <p className="text-slate-500 mt-1">Configure and manage administrative access across the platform.</p>
        </div>

      </div>

      <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Active Administrators
            </CardTitle>
            <Badge variant="outline" className="rounded-lg px-3 py-1 font-bold text-slate-500">
              {adminList.length} Total
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/30">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="px-8 py-4 font-bold text-slate-600">Admin</TableHead>
                  <TableHead className="py-4 font-bold text-slate-600">Contact</TableHead>
                  <TableHead className="py-4 font-bold text-slate-600">Status</TableHead>
                  <TableHead className="py-4 font-bold text-slate-600">Joined Date</TableHead>
                  <TableHead className="px-8 py-4 text-right font-bold text-slate-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminList.length > 0 ? (
                  adminList.map((admin: any) => (
                    <TableRow key={admin.id} className="group hover:bg-slate-50/50 transition-colors border-slate-50">
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={admin.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.name || 'Admin')}&background=16a34a&color=fff&bold=true`}
                              alt={admin.name}
                              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white shadow-md"
                            />
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-green-600 transition-colors">{admin.name}</p>
                            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-black py-0 px-1.5 h-4 mt-1 bg-slate-100 text-slate-500">
                              Admin
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-500">
                          <Mail className="h-4 w-4 opacity-70" />
                          <span className="text-sm font-medium">{admin.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`rounded-xl px-3 py-0.5 font-bold ${admin.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`} variant="outline">
                          {admin.status || 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="h-4 w-4 opacity-70" />
                          <span className="text-sm font-medium">
                            {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all" asChild title="Edit Admin">
                            <Link href={`/dashboard/super-admin/admins/${admin.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                            onClick={() => handleDelete(admin.id)}
                            disabled={isDeleting === admin.id}
                            title="Delete Admin"
                          >
                            {isDeleting === admin.id ? (
                              <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center">
                          <ShieldCheck className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-bold">No administrators found</p>
                        <Button variant="link" className="text-green-600 font-bold" asChild>
                          <Link href="/dashboard/super-admin/admins/new">Create the first one</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

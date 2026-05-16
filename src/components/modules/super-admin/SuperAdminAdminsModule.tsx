'use client';

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
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export function SuperAdminAdminsModule({ admins }: { admins: any }) {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Manage Admins</h1>
          <p className="text-slate-500">Create and manage admin accounts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-slate-900 hover:bg-slate-800 h-11 px-6 rounded-xl font-bold" asChild>
            <Link href="/dashboard/super-admin/admins/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Admin
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">All Admins</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(admins?.data?.data || (Array.isArray(admins?.data) ? admins.data : []))?.map((admin: any) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={admin.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.name || '')}&background=16a34a&color=fff`}
                        alt={admin.name}
                        className="h-8 w-8 rounded-full"
                      />
                      {admin.name}
                    </div>
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                  <TableCell>
                    {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/super-admin/admins/${admin.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
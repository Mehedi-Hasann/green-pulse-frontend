'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, CheckCircle2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

export function PaymentsModule({ payments }: { payments: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments & Subscriptions</h1>
        <p className="text-muted-foreground">Review your transaction history and contributions.</p>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-slate-900 text-white pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-green-400" />
                Transaction History
              </CardTitle>
              <CardDescription className="text-slate-400">
                A list of all your challenge-related payments.
              </CardDescription>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {payments?.data && payments.data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b">
                  <TableHead className="font-bold">Transaction ID</TableHead>
                  <TableHead className="font-bold">Challenge</TableHead>
                  <TableHead className="font-bold text-center">Amount</TableHead>
                  <TableHead className="font-bold text-center">Date</TableHead>
                  <TableHead className="font-bold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.data.map((payment: any) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-mono text-xs text-slate-500 uppercase">
                      {payment.id.substring(0, 12)}...
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {payment.memberChallenge?.challenge?.title || 'Eco Contribution'}
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-900">
                      ${payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center text-xs text-slate-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-0.5 rounded-full text-[10px] font-bold">
                        SUCCESSFUL
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-slate-100 p-4 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold">No payments found</h3>
              <p className="text-slate-500 text-sm max-w-xs mt-1">
                You haven&apos;t made any contributions or challenge-related payments yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Summary Stat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Total Invested</p>
                <p className="text-2xl font-black text-green-900 mt-1">
                  ${payments?.data?.reduce((acc: number, curr: any) => acc + curr.amount, 0).toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="bg-green-200/50 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

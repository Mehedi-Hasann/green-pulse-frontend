'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Leaf, Loader2 } from 'lucide-react';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Chrome = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '@/actions/auth.actions';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import { Separator } from '@/components/ui/separator';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await login(values);
      if (response.success) {
        // Handle both flat and nested response structures
        const responseData = response.data?.data || response.data;
        const user = responseData?.user;
        const accessToken = responseData?.accessToken;
        const sessionToken = responseData?.token;

        if (!user || (!accessToken && !sessionToken)) {
          throw new Error('Invalid response from server');
        }

        // Set state for client-side usage if needed
        setUser(user);
        setToken(accessToken || sessionToken);
        
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        
        toast.success(`Login successful! Welcome back, ${user.name}`);

        // Small delay to ensure cookies are flushed before redirect
        setTimeout(() => {
          // Redirect based on role
          const target = user.role === 'SUPER_ADMIN' 
            ? '/dashboard/super-admin' 
            : (user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member');
          
          router.push(target);
          
          // Absolute fallback if router.push fails to trigger navigation
          setTimeout(() => {
            if (window.location.pathname === '/login') {
              window.location.href = target;
            }
          }, 3000);
        }, 100);
      } else {
        toast.error(response.error?.message || 'Login failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred. Please try again later.');
      setIsLoading(false);
    } finally {
      // Note: We don't set isLoading(false) here on success because the redirect should happen.
      // If redirect fails, the fallback timer above will handle it or user can try again if we reset it.
      // Actually, it's better to reset it if navigation takes too long.
    }
  };

  const fillDemoCredentials = (role: 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER') => {
    const creds = {
      SUPER_ADMIN: { email: 'superadmin@gmail.com', password: 'password1234' },
      ADMIN: { email: 'admin@gmail.com', password: 'password1234' },
      MEMBER: { email: 'member@gmail.com', password: 'password1234' },
    };
    form.setValue('email', creds[role].email);
    form.setValue('password', creds[role].password);
    toast.info(`Auto-filled ${role.replace('_', ' ')} credentials`);
  };

  return (
    <div className="container relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-12 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-green-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Leaf className="mr-2 h-6 w-6" />
          Green Pulse
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Being part of Green Pulse has allowed me to track my environmental impact 
              and connect with a community that actually cares about the future.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, Eco-Warrior</footer>
          </blockquote>
        </div>
      </div>
      
      <div className="lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>

          <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 bg-slate-50/50">
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>Enter your credentials to continue</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} disabled={isLoading} className="h-11 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link href="/forgot-password" className="text-xs text-green-600 hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} className="h-11 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-11 bg-green-600 hover:bg-green-700 rounded-xl font-bold" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-11 rounded-xl"
                  onClick={() => authService.googleLogin()}
                >
                  <Chrome className="mr-2 h-4 w-4" /> Google
                </Button>
                <Button variant="outline" className="h-11 rounded-xl">
                  <Github className="mr-2 h-4 w-4" /> Github
                </Button>
              </div>

              <div className="mt-8 space-y-3">
                <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Demo Accounts</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="secondary" size="sm" className="text-[10px] rounded-lg" onClick={() => fillDemoCredentials('SUPER_ADMIN')}>
                    Super Admin
                  </Button>
                  <Button variant="secondary" size="sm" className="text-[10px] rounded-lg" onClick={() => fillDemoCredentials('ADMIN')}>
                    Admin
                  </Button>
                  <Button variant="secondary" size="sm" className="text-[10px] rounded-lg" onClick={() => fillDemoCredentials('MEMBER')}>
                    Member
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 py-4 flex justify-center border-t">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-bold text-green-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


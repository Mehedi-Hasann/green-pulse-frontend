'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Camera, Save, User, Mail, Shield, Loader2, Lock, Phone, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from '@/store/useAuthStore';
import { UpdateSuperAdminBySuperAdmin, } from '@/actions/user.actions';
import { changePassword } from '@/actions/auth.actions';
import { useRouter } from 'next/navigation';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function SuperAdminProfile({ initialUser }: { initialUser: any }) {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialUser?.profileImage || initialUser?.image || null);
  const [user, setCurrentUser] = useState(initialUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || user?.contactNumber || user?.phone || '',
      gender: (user?.gender as any) || '',
    },
  });

  // For debugging and user feedback
  const { errors } = form.formState;
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      console.log('Form Validation Errors:', errors);
      const firstError = errors[errorKeys[0] as keyof typeof errors]?.message;
      toast.error(`Validation Error: ${firstError || 'Please check all fields'}`, { id: 'validation-error' });
    }
  }, [errors]);

  const onSubmit = async (values: ProfileFormValues) => {
    console.log('Form values passed to onSubmit:', values);
    const userId = user.id || user.userId || user._id;
    console.log('Submitting profile update for ID:', userId);
    
    if (!userId) {
      toast.error('User ID is missing. Please log in again.');
      return;
    }

    toast.loading('Updating profile...', { id: 'profile-update' });
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Append fields directly to FormData as requested
      if (user?.role === 'MEMBER') {
        formData.append('name', values.name);
      } else {
        formData.append('name', values.name);
        if (values.phoneNumber) formData.append('phoneNumber', values.phoneNumber);
        if (values.gender) formData.append('gender', values.gender);
      }
      
      if (imageFile) {
        formData.append('file', imageFile);
      }

      // Log FormData contents (for debugging in browser)
      for (let pair of (formData as any).entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const result = await UpdateSuperAdminBySuperAdmin(userId, formData);
      console.log('Update result:', result);
      
      if (result.success) {
        toast.success('Profile updated successfully!', { id: 'profile-update' });
        const updatedUser = { 
          ...user, 
          ...values, 
          profileImage: result.data?.data?.profileImage || result.data?.data?.image || imagePreview 
        };
        setCurrentUser(updatedUser);
        setUser(updatedUser);
        router.refresh();
      } else {
        toast.error(result.error?.message || 'Failed to update profile.', { id: 'profile-update' });
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('An unexpected error occurred.', { id: 'profile-update' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    toast.success('Image selected! Click "Save Profile" to upload.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Profile Settings</h1>
          <p className="text-slate-500">Manage your personal information and account preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="relative inline-block group">
                <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-xl ring-2 ring-slate-100 ring-offset-4">
                  <AvatarImage src={imagePreview || ''} alt={user?.name} />
                  <AvatarFallback className="text-3xl font-black bg-green-100 text-green-700">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-1 right-1 h-10 w-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110">
                  <Camera className="h-5 w-5" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-6">{user?.name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{user?.role}</p>
              

            </CardContent>
          </Card>
          
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
              <Shield className="h-40 w-40" />
            </div>
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2">Account Security</h4>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Your account is protected with role-based access and secure session management.
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white hover:text-slate-900 font-bold h-11">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and a new password to update your security.
                    </DialogDescription>
                  </DialogHeader>
                  <ChangePasswordForm />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md bg-white rounded-[2rem]">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>Update your name and email address here.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <Input {...field} className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50/50" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <Input {...field} disabled className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50/50 cursor-not-allowed opacity-70" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {user?.role !== 'MEMBER' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                  <Input {...field} placeholder="+1 (555) 000-0000" className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50/50" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Gender</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                                <FormControl>
                                  <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
                                    <SelectTrigger className="h-14 pl-12 rounded-2xl border-2 focus-visible:ring-green-500 bg-slate-50/50">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </div>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="MALE">Male</SelectItem>
                                  <SelectItem value="FEMALE">Female</SelectItem>
                                  <SelectItem value="OTHER">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="h-14 px-10 rounded-2xl bg-green-600 hover:bg-green-700 font-bold text-lg shadow-xl shadow-green-200 transition-all hover:scale-[1.02]" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving Changes
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-5 w-5" /> Save Profile
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-none shadow-sm bg-blue-50 rounded-[2rem]">
              <CardContent className="p-8">
                <h4 className="font-bold text-blue-900 mb-2">Member Since</h4>
                <p className="text-2xl font-black text-blue-900">Oct 2023</p>
                <p className="text-xs text-blue-600 mt-1 uppercase font-bold tracking-widest">Active Member</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-purple-50 rounded-[2rem]">
              <CardContent className="p-8">
                <h4 className="font-bold text-purple-900 mb-2">Account Role</h4>
                <p className="text-2xl font-black text-purple-900">{user?.role?.replace('_', ' ')}</p>
                <p className="text-xs text-purple-600 mt-1 uppercase font-bold tracking-widest">Standard Access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const passwordSchema = z.object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const result = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      if (result.success) {
        toast.success('Password changed successfully!');
        form.reset();
      } else {
        toast.error(result.error?.message || 'Failed to change password.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input {...field} type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input {...field} type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input {...field} type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-slate-900" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Update Password
        </Button>
      </form>
    </Form>
  );
}

'use client';

import { Toaster as SonnerToaster } from '@/components/ui/sonner';

export default function ToastProvider() {
  return <SonnerToaster position="top-right" richColors closeButton />;
}

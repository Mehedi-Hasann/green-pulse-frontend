import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-green-600" />
        <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-green-100 opacity-20" />
      </div>
      <p className="animate-pulse text-lg font-medium text-green-800">Growing something green...</p>
    </div>
  );
}

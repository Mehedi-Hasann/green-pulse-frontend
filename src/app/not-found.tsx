import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-6 px-4 text-center">
      <div className="rounded-full bg-green-50 p-6">
        <Leaf className="h-16 w-16 text-green-600" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 - Path Not Found</h1>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
          Oops! It seems you&apos;ve wandered off the trail. The page you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/challenges">Explore Challenges</Link>
        </Button>
      </div>
    </div>
  );
}

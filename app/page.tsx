'use client';
import { Button } from '@/components/ui/button'

export default function Page() {
  const handleClick = () => {
    alert('Button clicked')
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <div className="text-sm">
          Get started by editing{' '}
          <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
            app/page.tsx asasda
          </code>
        </div>
        <Button size="sm" className="mt-4" onClick={handleClick}>
          Button
        </Button>
      </div>
    </div>
  )
}

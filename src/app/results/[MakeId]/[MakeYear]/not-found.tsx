import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-9xl">404</h1>
      <p className="text-red-400">No models found for this brand and year.</p>
      <Link href="/">
        <button className="bg-white h-10 w-28 text-black rounded-lg">
          Go Home
        </button>
      </Link>
    </div>
  );
}

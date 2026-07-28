import { notFound } from "next/navigation";

async function fetchFromUrl(url: string) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export default async function DashboardPage({ searchParams }: { searchParams: { url?: string } }) {
  const url = searchParams.url;

  if (!url) {
    notFound();
  }

  const data = await fetchFromUrl(url);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-zinc-200 bg-white/95 p-10 shadow-2xl shadow-zinc-950/10 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Showing data fetched from:
        </p>
        <pre className="mt-3 break-words rounded-3xl bg-zinc-950/5 p-4 text-sm text-zinc-900 dark:bg-zinc-100/5 dark:text-zinc-100">
          {url}
        </pre>

        <div className="mt-8 space-y-6">
          <h2 className="text-xl font-semibold">Fetched Result</h2>
          {typeof data === "string" ? (
            <pre className="rounded-3xl bg-zinc-950/5 p-4 text-sm text-zinc-900 dark:bg-zinc-100/5 dark:text-zinc-100">
              {data}
            </pre>
          ) : (
            <pre className="rounded-3xl bg-zinc-950/5 p-4 text-sm text-zinc-900 dark:bg-zinc-100/5 dark:text-zinc-100">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

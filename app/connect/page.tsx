"use client"
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url.trim()) return;
    router.push(`/dashboard/${encodeURIComponent(url.trim())}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6 py-10 dark:bg-black">
      <main className="w-full max-w-md rounded-[32px] border border-zinc-200 bg-white/95 p-10 shadow-2xl shadow-zinc-950/10 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95">
        <form onSubmit={handleSubmit}>
          <Field>
            <FieldLabel className="text-2xl">Drop your Github</FieldLabel>
            <Input
              id="input-demo-api-key"
              type="text"
              placeholder="Github URL"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <FieldDescription>
              Drop your Github Link to make the template.
            </FieldDescription>
            <Button type="submit" className="mt-4 w-full">
              Connect
            </Button>
            {url ? (
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Current URL: {url}
              </p>
            ) : null}
          </Field>
        </form>
      </main>
    </div>
  );
}

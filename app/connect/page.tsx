"use client"
import Link from "next/link";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";
// export const metadata = {
//   title: "Login | Portfolio Builder",
//   description: "Sign in to your Portfolio Builder account.",
// };

export default function LoginPage() {
  const [url, setUrl] = useState("");
console.log(url)
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6 py-10 dark:bg-black">
      <main className="w-full max-w-md rounded-[32px] border border-zinc-200 bg-white/95 p-10 shadow-2xl shadow-zinc-950/10 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95">
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
          <Button>Connect</Button>
          {url ? (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Current URL: {url}
            </p>
          ) : null}
        </Field>
      </main>
    </div>
  );
}

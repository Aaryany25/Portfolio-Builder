import Link from "next/link";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
export const metadata = {
  title: "Login | Portfolio Builder",
  description: "Sign in to your Portfolio Builder account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6 py-10 dark:bg-black">
      <main className="w-full max-w-md rounded-[32px] border border-zinc-200 bg-white/95 p-10 shadow-2xl shadow-zinc-950/10 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95">
       <Field>
      <FieldLabel className="text-2xl">Drop your Github</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="Github" />
      <FieldDescription>
        Drop your Github Link to Make the Template
      </FieldDescription>
      <Button>Connect</Button>
    </Field>
      </main>
    </div>
  );
}

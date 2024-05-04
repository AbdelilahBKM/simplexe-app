/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FBccZ0IWtW0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 text-base">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 hidden lg:flex" href="#">
          <h1 className="text-xl font-semibold">Simplexe App</h1>
        </Link>
        <div className="ml-auto flex gap-2">
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/"
          >
            Home Page
          </Link>
          <Link href={"/simplexe"}>
            <Button className="justify-self-end px-2 py-1">
              Get Started
            </Button>
          </Link>
        </div>
      </header>
    </div>
  );
}


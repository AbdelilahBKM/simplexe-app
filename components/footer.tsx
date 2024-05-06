/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8GkW21KhZdX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-100 py-6 w-full dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p id="ownership" className="text-sm text-gray-500 dark:text-gray-400"> 2024 Boukhatem Abdelilah.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" target="_blank" href="https://github.com/AbdelilahBKM/simplexe-app">
            <GithubIcon className="w-5 h-5" />
            <span className="sr-only">Acme Inc on GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
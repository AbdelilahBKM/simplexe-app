/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZbMN1dAC2k7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function ProgressBar() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-4 rounded-full bg-gray-900 dark:bg-gray-50"
            style={{
              width: "75%",
            }}
          />
        </div>
      </div>
    )
  }
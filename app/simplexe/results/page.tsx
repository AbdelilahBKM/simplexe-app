"use client"
import { SimplexeContext } from "@/components/context/simplexeProvider"
import { useContext } from "react"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/If8ewt4cZX5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Results() {
  const {Products, nbrProducts, Constraint, nbrConstraint} = useContext(SimplexeContext);
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-12 md:py-20">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Results number of products {nbrProducts}</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-[700px]">
            Here are the results for your query. The table below displays key metrics and data points.
          </p>
        </div>
        <div className="w-full mt-8 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  scope="col"
                >
                  Metric
                </th>
                <th
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  scope="col"
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Total Impressions
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  2,456,789
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Click-Through Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">3.14%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Conversion Rate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">1.87%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Average Order Value
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  $49.99
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Total Revenue
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  $123,456.78
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
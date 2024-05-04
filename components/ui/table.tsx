/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tLEdTPiHMWz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function TableComponent() {
    return (
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Role</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">John Doe</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">john@example.com</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Admin</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Active</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Jane Smith</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">jane@example.com</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">User</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Inactive</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Bob Johnson</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">bob@example.com</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Editor</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Active</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Sarah Lee</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">sarah@example.com</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">User</td>
              <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
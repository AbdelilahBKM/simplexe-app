import { useContext } from "react";
import { SimplexeContext } from "./context/simplexeProvider";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iqhuITYWYnz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function ResultTable() {
  const { Constraint, Products } = useContext(SimplexeContext);
  return (
    <div className="px-4 md:px-6 py-2 md:py-2">
      <div className="w-full text-center py-4">
        <h1 className="text-2xl font-bold">The result Table</h1>
        <p>
          click "Finish" to optimize your business, or go back to modify your
          data.
        </p>
      </div>
      <div className="mx-auto max-w-4xl">
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full border-collapse text-base">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="py-3 px-4 font-medium text-left">Resources</th>
                {Products.map((product) => (
                  <th key={product.id} className="py-3 px-4 font-medium text-left">
                    {product.name}
                  </th>
                ))}
                <th className="py-3 px-4 font-medium text-center">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {Constraint.map((constraint) => (
                <tr key={constraint.id} className="border-b dark:border-gray-700">
                  <td className="py-3 px-4 font-medium">{constraint.name}</td>
                  {Products.map((product) => (
                    <td className="py-3 px-4">{constraint.productProductionRates[product.name]} product/hour</td>
                  ))}
                  <td className="py-3 px-4 text-right">{constraint.weeklyCapacityHours} hours/week</td>
                </tr>
              ))}

              <tr className="border-b dark:border-gray-700">
                <td className="py-3 px-4 font-medium">Margins</td>
                {Products.map((product) => (
                  <td key={product.id} className="py-3 px-4 text-left">MAD {product.margin}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

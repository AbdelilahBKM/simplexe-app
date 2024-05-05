"use client";
import { SimplexeContext } from "@/components/context/simplexeProvider";
import { ProductI, solve_simplexe } from "@/math/simplexe";
import React from "react";
import { useContext } from "react";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/If8ewt4cZX5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
interface ProductResultsI extends ProductI {
  quantity: number;
}

export default function Results() {
 
  const { Products, nbrProducts, Constraint, nbrConstraint, setProducts, setConstraint } =
    useContext(SimplexeContext);
  const resolution = solve_simplexe(Products, Constraint);
  console.log(resolution);
  const [resultProducts, setResultProducts] = React.useState<ProductResultsI[]>(
    []
  );
  const [gain, setGain] = React.useState<number>(0);
  React.useEffect(() => {
    console.log("entered use effect");
    let value = 0;
    const updatedResultProducts = Products.map((product) => {
      const quantity = resolution.filter((res) => res.id === product.id)[0]?.quantity || 0;
      value += product.margin * quantity;
      return {
        id: product.id,
        name: product.name,
        margin: product.margin,
        quantity: quantity,
      };
    });
    setResultProducts(updatedResultProducts);
    setGain(value);
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-12 md:py-20">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Results
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-[700px]">
          Here are the results for your problem. The table below displays the
          quantity for each product to maximize your gain.
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
                Elements
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
            {resultProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                  Quantity for {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                  {product.quantity}
                </td>
              </tr>
            ))}

            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                Total Revenue
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                MAD{gain}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

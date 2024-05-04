"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/C7RRUYf0Xmv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductI } from "@/math/simplexe";
import { useContext, useRef } from "react";
import { JSX, SVGProps } from "react";
import { SimplexeContext } from "./context/simplexeProvider";

export default function AddProduct() {
  const { setProducts, Products, nbrProducts, setConstraint } = useContext(SimplexeContext);
  const productNameRef = useRef<HTMLInputElement>(null);
  const productPriceRef = useRef<HTMLInputElement>(null);

  function handleAddProduct(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault(); 
    const name: string = productNameRef.current?.value || "";
    const price: number = parseFloat(productPriceRef.current?.value || "0");
    if (name && price > 0) {
      const newProduct: ProductI = {
        id: nbrProducts + 1,
        name: name,
        margin: price,
      };
      setProducts([...Products, newProduct]);
      setConstraint([]);
      if (productNameRef.current) productNameRef.current.value = "";
      if (productPriceRef.current) productPriceRef.current.value = "";
    }
  }

  function handleDelete(id: number): void {
    setProducts(Products.filter((product) => product.id !== id));
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Your Products</CardTitle>
          <p>At least two products</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleAddProduct}>
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                ref={productNameRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="Enter price"
                type="number"
                ref={productPriceRef}
                min="1"
                required
              />
            </div>
            <Button className="w-full" type="submit">
              Save Product
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="lg:flex items-center justify-center w-full">
        {Products.map((product) => (
          <div
            className="flex justify-center items-center mt-2"
            key={product.id}
          >
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <Button
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(product.id)}
                >
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
              <div className="flex items-center justify-between lg:gap-10">
                <p className="text-4xl font-bold">MAD{product.margin}</p>
                <div className="flex gap-2">
                  <Button onClick={() => handleDelete(product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

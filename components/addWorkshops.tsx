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
import { ProductI, WorkshopI } from "@/math/simplexe";
import { useContext, useRef, useState } from "react";
import { JSX, SVGProps } from "react";
import { SimplexeContext } from "./context/simplexeProvider";

export default function AddWorkshop() {
  const { Products, Constraint, setConstraint } = useContext(SimplexeContext);
  const constNameRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);

  function handleAddConstraint(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const constName = constNameRef.current?.value || "";
    const capacity = parseFloat(capacityRef.current?.value || "0");

    if (constName && capacity > 0) {
      const newConstraint: WorkshopI = {
        id: Constraint.length + 1,
        name: constName,
        weeklyCapacityHours: capacity,
        productProductionRates: {},
      };

      Products.forEach((product) => {
        const rateInput = document.getElementById(`capacity-${product.name}`) as HTMLInputElement;
        const rate = parseFloat(rateInput.value || "0");
        console.log("rate: " + rate);
        newConstraint.productProductionRates[product.name] = rate;
      });
      

      setConstraint([...Constraint, newConstraint]);

      if (constNameRef.current) constNameRef.current.value = "";
      if (capacityRef.current) capacityRef.current.value = "";
    }
  }

  function handleDelete(id: number): void {
    setConstraint(Constraint.filter((constraint) => constraint.id != id));
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Add the resources</CardTitle>
          <p>{"e.g. Machines or Workshops (at least two constraints)"}</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleAddConstraint}>
            <div className="grid gap-2">
              <Label htmlFor="name">Resource Name</Label>
              <Input
                id="name"
                placeholder="Enter resource constraint name"
                ref={constNameRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="capacity">the maximum capacity</Label>
              <Input
                id="capacity"
                placeholder="enter capacity (hours per week)"
                min="1"
                type="number"
                ref={capacityRef}
                required
              />
            </div>
            {Products.map((product) => (
              <div className="grid gap-2" key={product.id}>
                <Label htmlFor="rate">Production rate for {product.name}</Label>
                <Input
                  id={`capacity-${product.name}`}
                  min="0"
                  placeholder="enter production rate (products per hour)"
                  type="number"
                  required
                />
              </div>
            ))}
            <Button className="w-full" type="submit">
              Save Resource
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="lg:flex items-center justify-center w-full">
      {Constraint.map((constraint) => (
        <div
        className="lg:flex justify-center items-center mt-2"
        key={constraint.id}
        >
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 lg:w-[400px] lg:gap-6 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{constraint.name}</h2>
              <Button
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(constraint.id)}
                >
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
            <div>
              {Products.map((product) => (
                <div key={product.id} className="flex w-full items-center justify-between">
                  <div className="font-semibold">{product.name}</div>
                  <p>{constraint.productProductionRates[product.name]} per hour</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-lg font-bold">
                {constraint.weeklyCapacityHours} hours/week
              </p>
              <div className="flex gap-2">
                <Button onClick={() => handleDelete(constraint.id)}>
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

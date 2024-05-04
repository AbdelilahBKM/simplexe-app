"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LEybnecOn78
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import AddProduct from "@/components/addProduct"
import AddWorkshop from "@/components/addWorkshops";
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { SimplexeContext } from "@/components/context/simplexeProvider";
import ResultTable from "@/components/resultTable";
import Link from "next/link";

export default function Component() {
  const {Products, nbrProducts, Constraint, nbrConstraint} = useContext(SimplexeContext);
  console.log("Number of products:", nbrProducts);
  const [step, setStep] = useState<number>(1);
  const [errorMessage, setError] = useState<string>("");
  function handleNextStep(): void {
    setStep(prev => {
      if(prev == 1 && nbrProducts < 2){
        setError("please insert at least 2 products!");
        return 1;
      }
      if(prev == 2 && nbrConstraint < 2){
        setError("please insert at least 2 constraint!");
        return 2;
      }
      setError("");
      return prev + 1;
    })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-12 md:py-16 lg:py-20 h-[100%]">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Started</h1>
        <p className="text-gray-500 dark:text-gray-400">Follow these steps to optimize.</p>
        <p className="text-gray-500 dark:text-gray-400">step {step} out of 3</p>
      </div>
      <div className="flex gap-6 items-center justify-center">
        <Button size="sm" variant="outline" onClick={() => setStep(prev => prev > 1 ? prev - 1 : 1)}>
          Previous
        </Button>
        {step < 3 ? 
        (<Button onClick={handleNextStep} size="sm">Next</Button>) : 
        (<Link href="/simplexe/results"><Button size="sm">Finish</Button></Link>)}
      </div>
      <div className="flex items-center justify-center text-red-400">
        <p>{errorMessage}</p>
      </div>
      <div>
        {step == 1 && <AddProduct />}
        {step == 2 && <AddWorkshop />}
        {step == 3 && <ResultTable />}
        
      </div>
    </div>
  )
}
"use client";
import { createContext, useState } from "react";
import { ProductI, WorkshopI } from "@/math/simplexe";

export interface SimplexeContextI {
  Products: ProductI[];
  nbrProducts: number;
  setProducts: (products: ProductI[]) => void;
  Constraint: WorkshopI[];
  nbrConstraint: number;
  setConstraint: (constraint: WorkshopI[]) => void;
}

// Create initial context values
const initialSimplexeContextValue: SimplexeContextI = {
  Products: [],
  nbrProducts: 0,
  setProducts: () => {},
  Constraint: [],
  nbrConstraint: 0,
  setConstraint: () => {},
};

// Create the context
export const SimplexeContext = createContext(initialSimplexeContextValue);

export default function SimplexeContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [Products, setProducts] = useState<ProductI[]>([]);
  const [nbrProducts, setNbrProducts] = useState<number>(0);
  const [Constraint, setConstraint] = useState<WorkshopI[]>([]);
  const [nbrConstraint, setNbrConstraint] = useState<number>(0);

  // Function to update Products and nbrProducts
  const updateProducts = (newProducts: ProductI[]) => {
    setProducts(newProducts);
    setNbrProducts(newProducts.length);
  };

  // Function to update Constraint and nbrConstraint
  const updateConstraint = (newConstraint: WorkshopI[]) => {
    setConstraint(newConstraint);
    setNbrConstraint(newConstraint.length);
  };

  return (
    <SimplexeContext.Provider
      value={{
        Products,
        nbrProducts,
        setProducts: updateProducts,
        Constraint,
        nbrConstraint,
        setConstraint: updateConstraint
      }}
    >
      {children}
    </SimplexeContext.Provider>
  );
}

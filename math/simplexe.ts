export interface ProductI {
  id: number;
  name: string;
  margin: number;
}

export interface WorkshopI {
  id: number;
  name: string;
  productProductionRates: { [productName: string]: number | 0 };
  weeklyCapacityHours: number;
}
type Matrix = number[][];

//  matrice simplexe = [
//     [1, -margA   , -margB   , 0, 0, 0] L0
//     [0, n11      , n12      , 1, 0, 0] L1
//     [0, n21      , n22      , 0, 1, 0] L2
//     [0, n31      , n32      , 0, 0, 1] L3
//     ]

function simplexeMatrice(
  Products: ProductI[],
  Constraints: WorkshopI[]
): Matrix {
  const numProducts = Products.length;
  const numConstraints = Constraints.length;

  const matrix: Matrix = [];

  const equation_max: number[] = [1];

  Products.forEach((product) => {
    equation_max.push(product.margin * -1);
  });
  Constraints.forEach((_) => {
    equation_max.push(0);
  });
  matrix.push(equation_max);

  Constraints.forEach((constraint, i) => {
    const row: number[] = new Array(numProducts + numConstraints + 1).fill(0);

    Products.forEach((product, j) => {
      row[j + 1] = constraint.productProductionRates[product.name];
    });

    row[numProducts + i + 1] = 1;

    matrix.push(row);
  });

  return matrix;
}

function constraints_capacity(Constraints: WorkshopI[]): number[] {
  const capacities: number[] = [0];
  Constraints.forEach((constraint) => {
    capacities.push(constraint.weeklyCapacityHours);
  });
  return capacities;
}

function iteration(
  matrice: Matrix,
  capacities: number[]
): { matrix: Matrix; updatedCapacities: number[] } {
  // selection colonne Pivote
  let min = matrice[0][0];
  let col_pivot = 0;
  for (let i = 0; i < matrice[0].length; i++) {
    if (matrice[0][i] < min) {
      min = matrice[0][i];
      col_pivot = i;
    }
  }
  // selection ligne Pivote
  min = Infinity;
  let ligne_pivot = 0;
  for (let i = 1; i < matrice.length; i++) {
    const result = capacities[i] / matrice[i][col_pivot];
    if (result < min) {
      min = result;
      ligne_pivot = i;
    }
  }
  const valeur_pivot = matrice[ligne_pivot][col_pivot];
  // ====> GAUSS:
  // etape1: ligne_ivot = Ligne_pivot / valeur_pivote
  for (let i = 0; i < matrice[ligne_pivot].length; i++) {
    matrice[ligne_pivot][i] /= valeur_pivot;
  }
  capacities[ligne_pivot] /= valeur_pivot;
  // etape2: Lx = Lx - Va.Lp
  for (let i = 0; i < matrice.length; i++) {
    if (i == ligne_pivot) continue;

    const Va = matrice[i][col_pivot];
    for (let j = 0; j < matrice[i].length; j++) {
      matrice[i][j] = matrice[i][j] - Va * matrice[ligne_pivot][j];
    }
    capacities[i] = capacities[i] - Va * capacities[ligne_pivot];
  }
  return { matrix: matrice, updatedCapacities: capacities };
}

function checkMatrixResolved(matrice: Matrix): boolean {
  for (let i = 0; i < matrice[0].length; i++) {
    if (matrice[0][i] < 0) {
      return false;
    }
  }
  return true;
}

function solve_simplexe(
  products: ProductI[],
  constraints: WorkshopI[]
): number[] {
  let matrice = simplexeMatrice(products, constraints);
  let capacities = constraints_capacity(constraints);
  let i = 0;
  while (!checkMatrixResolved(matrice)) {
    i++;
    let { matrix: updatedMatrice, updatedCapacities } = iteration(
      matrice,
      capacities
    );
    matrice = updatedMatrice;
    capacities = updatedCapacities;

    console.log("Iteration: " + i 
    ,"matrice: \n" + matrice
    ,"capacities: \n" + capacities);
  }
  return capacities;
}

// ================ main ==================
function main(): void {
  const products = [
    { id: 1, name: "Product A", margin: 3 },
    { id: 2, name: "Product B", margin: 5 },
  ];

  const constraints = [
    {
      id: 1,
      name: "Constraint 1",
      productProductionRates: { "Product A": 1, "Product B": 0 },
      weeklyCapacityHours: 4,
    },
    {
      id: 2,
      name: "Constraint 2",
      productProductionRates: { "Product A": 0, "Product B": 2 },
      weeklyCapacityHours: 12,
    },
    {
      id: 3,
      name: "Constraint 3",
      productProductionRates: { "Product A": 3, "Product B": 2 },
      weeklyCapacityHours: 18,
    },
  ];

  const results = solve_simplexe(products, constraints);
  console.log("results: ", results)
}

main();

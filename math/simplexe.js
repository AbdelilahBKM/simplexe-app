"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  matrice simplexe = [
//     [1, -margA   , -margB   , 0, 0, 0] L0
//     [0, n11      , n12      , 1, 0, 0] L1
//     [0, n21      , n22      , 0, 1, 0] L2
//     [0, n31      , n32      , 0, 0, 1] L3
//     ]
function simplexeMatrice(Products, Constraints) {
    var numProducts = Products.length;
    var numConstraints = Constraints.length;
    var matrix = [];
    var equation_max = [1];
    Products.forEach(function (product) {
        equation_max.push(product.margin * -1);
    });
    Constraints.forEach(function (_) {
        equation_max.push(0);
    });
    matrix.push(equation_max);
    Constraints.forEach(function (constraint, i) {
        var row = new Array(numProducts + numConstraints + 1).fill(0);
        Products.forEach(function (product, j) {
            row[j + 1] = constraint.productProductionRates[product.name];
        });
        row[numProducts + i + 1] = 1;
        matrix.push(row);
    });
    return matrix;
}
function constraints_capacity(Constraints) {
    var capacities = [0];
    Constraints.forEach(function (constraint) {
        capacities.push(constraint.weeklyCapacityHours);
    });
    return capacities;
}
function iteration(matrice, capacities) {
    // selection colonne Pivote
    var min = matrice[0][0];
    var col_pivot = 0;
    for (var i = 0; i < matrice[0].length; i++) {
        if (matrice[0][i] < min) {
            min = matrice[0][i];
            col_pivot = i;
        }
    }
    // selection ligne Pivote
    min = Infinity;
    var ligne_pivot = 0;
    for (var i = 1; i < matrice.length; i++) {
        var result = capacities[i] / matrice[i][col_pivot];
        if (result < min) {
            min = result;
            ligne_pivot = i;
        }
    }
    var valeur_pivot = matrice[ligne_pivot][col_pivot];
    // ====> GAUSS:
    // etape1: ligne_ivot = Ligne_pivot / valeur_pivote
    for (var i = 0; i < matrice[ligne_pivot].length; i++) {
        matrice[ligne_pivot][i] /= valeur_pivot;
    }
    capacities[ligne_pivot] /= valeur_pivot;
    // etape2: Lx = Lx - Va.Lp
    for (var i = 0; i < matrice.length; i++) {
        if (i == ligne_pivot)
            continue;
        var Va = matrice[i][col_pivot];
        for (var j = 0; j < matrice[i].length; j++) {
            matrice[i][j] = matrice[i][j] - Va * matrice[ligne_pivot][j];
        }
        capacities[i] = capacities[i] - Va * capacities[ligne_pivot];
    }
    return { matrix: matrice, updatedCapacities: capacities };
}
function checkMatrixResolved(matrice) {
    for (var i = 0; i < matrice[0].length; i++) {
        if (matrice[0][i] < 0) {
            return false;
        }
    }
    return true;
}
function solve_simplexe(products, constraints) {
    var matrice = simplexeMatrice(products, constraints);
    var capacities = constraints_capacity(constraints);
    var i = 0;
    while (!checkMatrixResolved(matrice)) {
        i++;
        var _a = iteration(matrice, capacities), updatedMatrice = _a.matrix, updatedCapacities = _a.updatedCapacities;
        matrice = updatedMatrice;
        capacities = updatedCapacities;
        console.log("Iteration: " + i, "matrice: \n" + matrice, "capacities: \n" + capacities);
    }
    return capacities;
}
// ================ main ==================
function main() {
    var products = [
        { id: 1, name: "Product A", margin: 3 },
        { id: 2, name: "Product B", margin: 5 },
    ];
    var constraints = [
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
    var results = solve_simplexe(products, constraints);
    console.log("results: ", results);
}
main();

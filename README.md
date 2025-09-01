# Hashira Placements Assignment - Shamir's Secret Sharing Solver

## Overview

This project implements a solver for Shamir's Secret Sharing scheme using polynomial reconstruction. The algorithm uses Lagrange interpolation to find the secret from a set of coordinate points encoded in different number bases.

## Problem Description

Given:
- `n`: Total number of coordinate points
- `k`: Minimum number of points needed to reconstruct the polynomial
- Points in format: `"x": {"base": "base", "value": "y_value"}`

The goal is to:
1. Convert all y-values from their respective bases to decimal
2. Use any `k` points to reconstruct a polynomial of degree `k-1`
3. Find the secret, which is the constant term (f(0))

## Algorithm

### Shamir's Secret Sharing
- **Polynomial Degree**: `m = k - 1`
- **Points Required**: At least `k` points
- **Method**: Lagrange interpolation
- **Secret**: The constant term when x = 0

### Lagrange Interpolation Formula
```
f(x) = Σ(i=0 to k-1) yi * Li(x)

where Li(x) = Π(j=0 to k-1, j≠i) (x - xj) / (xi - xj)

For the secret f(0):
Li(0) = Π(j=0 to k-1, j≠i) (0 - xj) / (xi - xj)
```

## Project Structure

```
hasira/
├── package.json          # Node.js project configuration
├── secretSolver.js       # Main solver implementation
├── testCases.js          # Test case data
├── index.js             # Main entry point
├── test.js              # Comprehensive test suite
└── README.md            # This documentation
```

## Files Description

### `secretSolver.js`
Core implementation containing:
- **`convertToDecimal(value, base)`**: Converts numbers from any base (2-36) to decimal
- **`parseInput(input)`**: Parses JSON input and extracts coordinate points
- **`lagrangeInterpolation(points, k)`**: Implements Lagrange interpolation to find f(0)
- **`solve(input)`**: Main solver function

### `testCases.js`
Contains the two test cases provided in the assignment:
- **Test Case 1**: 4 points, need 3 (polynomial degree 2)
- **Test Case 2**: 10 points, need 7 (polynomial degree 6)

### `index.js`
Main execution file that runs both test cases and displays results.

### `test.js`
Comprehensive test suite including:
- Base conversion validation
- Manual verification calculations
- Detailed step-by-step output

## Installation & Usage

### Prerequisites
- Node.js version 14.0.0 or higher

### Running the Solution
```bash
# Run main solver
node index.js

# Run comprehensive tests
node test.js

# Or use npm scripts
npm start    # Runs index.js
npm test     # Runs test.js
```

## Test Cases

### Test Case 1
```json
{
    "keys": {"n": 4, "k": 3},
    "1": {"base": "10", "value": "4"},
    "2": {"base": "2", "value": "111"},
    "3": {"base": "10", "value": "12"},
    "6": {"base": "4", "value": "213"}
}
```

**Coordinate Points**:
- (1, 4): 4 in base 10 = 4
- (2, 7): 111 in base 2 = 7
- (3, 12): 12 in base 10 = 12  
- (6, 39): 213 in base 4 = 39

**Solution**: Using any 3 points with Lagrange interpolation

### Test Case 2
```json
{
    "keys": {"n": 10, "k": 7},
    "1": {"base": "6", "value": "13444211440455345511"},
    "2": {"base": "15", "value": "aed7015a346d635"},
    // ... 8 more points
}
```

**Solution**: Using any 7 points with Lagrange interpolation

## Key Features

1. **Multi-base Support**: Handles bases 2-36 with automatic digit validation
2. **Robust Error Handling**: Validates input format, base ranges, and point sufficiency
3. **Detailed Logging**: Shows conversion steps, point selection, and interpolation process
4. **Manual Verification**: Includes step-by-step calculations for verification
5. **Modular Design**: Separate classes and functions for easy testing and maintenance

## Algorithm Complexity

- **Time Complexity**: O(k²) for Lagrange interpolation
- **Space Complexity**: O(n) for storing points
- **Base Conversion**: O(d) where d is number of digits

## Example Output

```
=============================================================
SHAMIR'S SECRET SHARING SOLVER
=============================================================

Problem Parameters:
n (total points): 4
k (minimum points needed): 3
Polynomial degree: 2

Point: x=1, y=4 (converted from base 10 value '4')
Point: x=2, y=7 (converted from base 2 value '111')
Point: x=3, y=12 (converted from base 10 value '12')
Point: x=6, y=39 (converted from base 4 value '213')

Using 3 points for interpolation:
(1, 4)
(2, 7)
(3, 12)

Point 1: y=4, Li(0)=3, contribution=12
Point 2: y=7, Li(0)=-3, contribution=-21
Point 3: y=12, Li(0)=1, contribution=12

==============================
SECRET FOUND: 3
==============================
```

## Manual Verification (Test Case 1)

Using points (1,4), (2,7), (3,12):

```
f(0) = 4 * (0-2)(0-3)/((1-2)(1-3)) + 7 * (0-1)(0-3)/((2-1)(2-3)) + 12 * (0-1)(0-2)/((3-1)(3-2))
f(0) = 4 * 6/2 + 7 * 3/(-1) + 12 * 2/2
f(0) = 12 - 21 + 12 = 3
```

## Notes

- The solution uses JavaScript (Node.js) as Python was not allowed
- All calculations use exact arithmetic for precision
- The algorithm automatically selects the first k points (sorted by x-coordinate)
- Base conversion supports both numeric and alphabetic digits (0-9, a-z)

## Author
**Utkarsh Shukla**  
**Student ID:** 229301763  
Solution implemented for Hashira Placements Assignment


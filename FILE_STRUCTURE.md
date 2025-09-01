# Hashira Assignment - Project File Structure

## 📁 Complete File Explanation

### **Core Implementation Files**

#### 🎯 `secretSolver.js` - Main Algorithm Implementation
- **Purpose**: Core class containing the Shamir's Secret Sharing algorithm
- **Key Functions**:
  - `convertToDecimal(value, base)` - Converts numbers from any base (2-36) to decimal
  - `parseInput(input)` - Parses JSON input and extracts coordinate points
  - `lagrangeInterpolation(points, k)` - Implements Lagrange interpolation to find f(0)
  - `solve(input)` - Main solver function that orchestrates the entire process
- **Algorithm**: Uses polynomial reconstruction via Lagrange interpolation
- **Input**: JSON with coordinate points in various bases
- **Output**: The secret (constant term of polynomial)

#### 🧪 `testCases.js` - Test Data
- **Purpose**: Contains both test cases provided in the assignment
- **Test Case 1**: 4 points, requires 3 (polynomial degree 2) → Secret: **3**
- **Test Case 2**: 10 points, requires 7 (polynomial degree 6) → Secret: **-6290016743746478000**
- **Format**: Exported JavaScript objects with JSON structure

#### ⚡ `index.js` - Main Entry Point
- **Purpose**: Main execution file that runs both test cases
- **Features**:
  - Displays author information (Utkarsh Shukla - 229301763)
  - Runs both test cases sequentially
  - Shows formatted output with results summary
  - Handles error management
- **Usage**: `node index.js` to run the complete solution

#### 🔬 `test.js` - Comprehensive Test Suite
- **Purpose**: Detailed testing and verification system
- **Features**:
  - Base conversion validation tests
  - Manual mathematical verification
  - Step-by-step calculation display
  - Multiple test scenarios for edge cases
- **Usage**: `node test.js` to run comprehensive tests

### **Configuration & Documentation Files**

#### 📦 `package.json` - Node.js Project Configuration
- **Purpose**: Defines project metadata and dependencies
- **Contents**:
  - Project name: "hashira-secret-sharing"
  - Author: "Utkarsh Shukla (229301763)"
  - Scripts: `npm start` and `npm test`
  - Node.js version requirement: ≥14.0.0
  - Keywords for search optimization

#### 📚 `README.md` - Complete Documentation
- **Purpose**: Comprehensive project documentation
- **Sections**:
  - Algorithm explanation (Shamir's Secret Sharing)
  - Mathematical formulas (Lagrange interpolation)
  - Installation and usage instructions
  - Test case details with manual verification
  - File structure overview
  - Author information and academic details

#### 📊 `OUTPUT_RESULTS.md` - Detailed Results Documentation
- **Purpose**: Complete output documentation for assignment submission
- **Contents**:
  - Test case results with step-by-step solutions
  - Algorithm implementation details
  - Manual verification calculations
  - Final summary with both secret values
  - Author attribution and assignment completion status

### **File Dependencies & Flow**

```
index.js (Main Entry)
    ├── secretSolver.js (Core Algorithm)
    ├── testCases.js (Test Data)
    └── Outputs results using both test cases

test.js (Test Suite)
    ├── secretSolver.js (Algorithm Testing)
    ├── testCases.js (Test Data)
    └── Validates base conversion & manual calculations

README.md ← References all files for documentation
OUTPUT_RESULTS.md ← Contains final results from execution
package.json ← Defines project configuration
```

### **Execution Commands**

| Command | Purpose | Output |
|---------|---------|---------|
| `node index.js` | Run main solution | Both test case results |
| `node test.js` | Run test suite | Validation and verification |
| `npm start` | Alternative to index.js | Same as node index.js |
| `npm test` | Alternative to test.js | Same as node test.js |

### **Algorithm Summary**

1. **Input Processing**: Parse JSON, extract points, convert bases to decimal
2. **Point Selection**: Choose first k points (sorted by x-coordinate)
3. **Lagrange Interpolation**: Calculate f(0) using polynomial reconstruction
4. **Secret Extraction**: Return the constant term as the secret

### **Key Features Implemented**

- ✅ Multi-base number conversion (bases 2-36)
- ✅ Lagrange interpolation algorithm
- ✅ JSON input parsing and validation
- ✅ Comprehensive error handling
- ✅ Detailed logging and step-by-step output
- ✅ Mathematical verification and manual calculations
- ✅ Complete documentation and test coverage

---
**Author**: Utkarsh Shukla (Student ID: 229301763)  
**Assignment**: Hashira Placements - Shamir's Secret Sharing  
**Language**: JavaScript (Node.js)  
**Status**: Completed Successfully ✅

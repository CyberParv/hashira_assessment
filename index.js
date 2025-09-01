/**
 * Main entry point for Shamir's Secret Sharing solver
 */

const SecretSolver = require('./secretSolver');
const { testCase1, testCase2 } = require('./testCases');

function main() {
    const solver = new SecretSolver();
    
    console.log("HASHIRA PLACEMENTS ASSIGNMENT - SHAMIR'S SECRET SHARING");
    console.log("Author: Utkarsh Shukla (Student ID: 229301763)");
    console.log("Language: JavaScript (Node.js)");
    console.log("Algorithm: Lagrange Interpolation\n");
    
    try {
        // Test Case 1
        console.log("🧪 RUNNING TEST CASE 1");
        console.log("-".repeat(40));
        const secret1 = solver.solve(testCase1);
        
        console.log("\n");
        
        // Test Case 2
        console.log("🧪 RUNNING TEST CASE 2");
        console.log("-".repeat(40));
        const secret2 = solver.solve(testCase2);
        
        // Summary
        console.log("\n" + "🎉 FINAL RESULTS".padStart(35));
        console.log("=".repeat(60));
        console.log(`Test Case 1 Secret: ${secret1}`);
        console.log(`Test Case 2 Secret: ${secret2}`);
        console.log("=".repeat(60));
        
        return { testCase1: secret1, testCase2: secret2 };
        
    } catch (error) {
        console.error('❌ Execution failed:', error.message);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = main;

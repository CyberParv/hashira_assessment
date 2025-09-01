/**
 * Test suite for Shamir's Secret Sharing solver
 */

const SecretSolver = require('./secretSolver');
const { testCase1, testCase2 } = require('./testCases');

function validateBaseConversion() {
    console.log("🔍 Testing Base Conversion Function");
    console.log("-".repeat(40));
    
    const solver = new SecretSolver();
    
    const tests = [
        { value: "111", base: "2", expected: 7 },
        { value: "213", base: "4", expected: 39 },
        { value: "4", base: "10", expected: 4 },
        { value: "12", base: "10", expected: 12 },
        { value: "abc", base: "16", expected: 2748 },
        { value: "123", base: "8", expected: 83 }
    ];
    
    let passed = 0;
    
    tests.forEach((test, index) => {
        try {
            const result = solver.convertToDecimal(test.value, test.base);
            if (result === test.expected) {
                console.log(`✅ Test ${index + 1}: ${test.value} (base ${test.base}) = ${result}`);
                passed++;
            } else {
                console.log(`❌ Test ${index + 1}: Expected ${test.expected}, got ${result}`);
            }
        } catch (error) {
            console.log(`❌ Test ${index + 1}: Error - ${error.message}`);
        }
    });
    
    console.log(`\nBase conversion tests: ${passed}/${tests.length} passed\n`);
    return passed === tests.length;
}

function runTestCases() {
    console.log("🧪 Running Main Test Cases");
    console.log("-".repeat(40));
    
    const solver = new SecretSolver();
    const results = {};
    
    try {
        console.log("Test Case 1:");
        results.testCase1 = solver.solve(testCase1);
        console.log("\n");
        
        console.log("Test Case 2:");
        results.testCase2 = solver.solve(testCase2);
        
        return results;
    } catch (error) {
        console.error('Test execution failed:', error.message);
        return null;
    }
}

function manualVerificationTestCase1() {
    console.log("\n📊 Manual Verification for Test Case 1");
    console.log("-".repeat(40));
    
    // Convert values to decimal
    console.log("Converting values to decimal:");
    console.log("Point (1, 4): x=1, y=4 (base 10)");
    console.log("Point (2, 7): x=2, y=7 (111 in base 2)");
    console.log("Point (3, 12): x=3, y=12 (base 10)");
    console.log("Point (6, 39): x=6, y=39 (213 in base 4)");
    
    // For a polynomial of degree 2 (k-1 = 3-1 = 2), we need 3 points
    // Using points (1,4), (2,7), (3,12)
    console.log("\nUsing Lagrange interpolation with points (1,4), (2,7), (3,12):");
    
    // f(0) = 4 * (0-2)(0-3)/((1-2)(1-3)) + 7 * (0-1)(0-3)/((2-1)(2-3)) + 12 * (0-1)(0-2)/((3-1)(3-2))
    // f(0) = 4 * (6)/(2) + 7 * (3)/(-1) + 12 * (2)/(2)
    // f(0) = 4 * 3 + 7 * (-3) + 12 * 1
    // f(0) = 12 - 21 + 12 = 3
    
    console.log("Expected calculation:");
    console.log("f(0) = 4 * (0-2)(0-3)/((1-2)(1-3)) + 7 * (0-1)(0-3)/((2-1)(2-3)) + 12 * (0-1)(0-2)/((3-1)(3-2))");
    console.log("f(0) = 4 * 6/2 + 7 * 3/(-1) + 12 * 2/2");
    console.log("f(0) = 12 - 21 + 12 = 3");
}

function main() {
    console.log("HASHIRA SECRET SHARING - COMPREHENSIVE TEST SUITE");
    console.log("=".repeat(60));
    
    // Test base conversion
    const baseConversionPassed = validateBaseConversion();
    
    // Run main test cases
    const results = runTestCases();
    
    if (results) {
        console.log("\n" + "📋 FINAL TEST RESULTS".padStart(35));
        console.log("=".repeat(60));
        console.log(`Test Case 1 Secret: ${results.testCase1}`);
        console.log(`Test Case 2 Secret: ${results.testCase2}`);
        console.log(`Base Conversion Tests: ${baseConversionPassed ? 'PASSED' : 'FAILED'}`);
        console.log("=".repeat(60));
        
        // Manual verification for test case 1
        manualVerificationTestCase1();
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { validateBaseConversion, runTestCases, manualVerificationTestCase1 };

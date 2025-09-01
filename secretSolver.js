/**
 * Shamir's Secret Sharing Solver
 * Reconstructs polynomial and finds the secret using Lagrange interpolation
 */

class SecretSolver {
    /**
     * Convert a number from any base to decimal
     * @param {string} value - The value in the given base
     * @param {string} base - The base as a string
     * @returns {number} - The decimal representation
     */
    convertToDecimal(value, base) {
        const baseNum = parseInt(base, 10);
        if (baseNum < 2 || baseNum > 36) {
            throw new Error(`Invalid base: ${base}. Base must be between 2 and 36.`);
        }
        
        let result = 0;
        const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
        
        for (let i = 0; i < value.length; i++) {
            const char = value[i].toLowerCase();
            const digitValue = digits.indexOf(char);
            
            if (digitValue === -1 || digitValue >= baseNum) {
                throw new Error(`Invalid character '${value[i]}' for base ${base}`);
            }
            
            result = result * baseNum + digitValue;
        }
        
        return result;
    }

    /**
     * Parse the input JSON and extract coordinate points
     * @param {Object} input - The JSON input
     * @returns {Object} - Parsed data with points array and metadata
     */
    parseInput(input) {
        const { keys } = input;
        const n = keys.n;
        const k = keys.k;
        
        const points = [];
        
        // Extract all points except the 'keys' object
        for (const key in input) {
            if (key !== 'keys') {
                const x = parseInt(key, 10);
                const y = this.convertToDecimal(input[key].value, input[key].base);
                points.push({ x, y });
                
                console.log(`Point: x=${x}, y=${y} (converted from base ${input[key].base} value '${input[key].value}')`);
            }
        }
        
        // Sort points by x coordinate for consistency
        points.sort((a, b) => a.x - b.x);
        
        return { points, n, k };
    }

    /**
     * Calculate the secret using Lagrange interpolation
     * We need to find f(0) where f(x) is the polynomial that passes through the given points
     * @param {Array} points - Array of {x, y} coordinate pairs
     * @param {number} k - Number of points needed (degree + 1)
     * @returns {number} - The secret (constant term, f(0))
     */
    lagrangeInterpolation(points, k) {
        // We only need k points to reconstruct the polynomial
        const selectedPoints = points.slice(0, k);
        
        console.log(`\nUsing ${k} points for interpolation:`);
        selectedPoints.forEach(p => console.log(`(${p.x}, ${p.y})`));
        
        // Calculate f(0) using Lagrange interpolation
        let secret = 0;
        
        for (let i = 0; i < selectedPoints.length; i++) {
            const xi = selectedPoints[i].x;
            const yi = selectedPoints[i].y;
            
            // Calculate the Lagrange basis polynomial Li(0)
            let li = 1;
            for (let j = 0; j < selectedPoints.length; j++) {
                if (i !== j) {
                    const xj = selectedPoints[j].x;
                    // Li(0) = product of (0 - xj) / (xi - xj) for all j != i
                    li *= (0 - xj) / (xi - xj);
                }
            }
            
            secret += yi * li;
            console.log(`Point ${i + 1}: y=${yi}, Li(0)=${li}, contribution=${yi * li}`);
        }
        
        return Math.round(secret);
    }

    /**
     * Solve the secret sharing problem
     * @param {Object} input - The JSON input
     * @returns {number} - The secret
     */
    solve(input) {
        console.log("=".repeat(60));
        console.log("SHAMIR'S SECRET SHARING SOLVER");
        console.log("=".repeat(60));
        
        try {
            // Parse input and extract points
            const { points, n, k } = this.parseInput(input);
            
            console.log(`\nProblem Parameters:`);
            console.log(`n (total points): ${n}`);
            console.log(`k (minimum points needed): ${k}`);
            console.log(`Polynomial degree: ${k - 1}`);
            
            if (points.length < k) {
                throw new Error(`Insufficient points: need at least ${k}, got ${points.length}`);
            }
            
            // Calculate the secret using Lagrange interpolation
            const secret = this.lagrangeInterpolation(points, k);
            
            console.log(`\n${"=".repeat(30)}`);
            console.log(`SECRET FOUND: ${secret}`);
            console.log(`${"=".repeat(30)}`);
            
            return secret;
            
        } catch (error) {
            console.error('Error solving secret:', error.message);
            throw error;
        }
    }
}

module.exports = SecretSolver;

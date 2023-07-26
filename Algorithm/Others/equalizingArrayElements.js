/*
 * Complete the 'minOperations' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER threshold
 *  3. INTEGER d
 */

function minOperations(arr, threshold, d) {
    // Write your code here
    // Will need to sort the array element
    // Create an array to store all possible combination of divisions we need to do to reach a value
    // index: value, value: array of divisions count
    const divisionCounts= [];
    
    // Traverse through the given array
    for (let num of arr){
        let count = 0;
        // Push the value before division
        divisionCounts[num] = divisionCounts[num]??[];
        divisionCounts[num].push(count);
        
        // Perform the divsion till the cur element get to zero
        while(num){
            num = Math.floor(num/d);
            count++;
        // Push the number of division to divisionCount
            divisionCounts[num] = divisionCounts[num]??[];
            divisionCounts[num].push(count);
        }
    }
    // console.log(divisionCounts)
    let minDivision = Infinity;
    for (const divisionCount of divisionCounts){
        if (divisionCount && divisionCount.length>=threshold){
            // Sort count accendingly
            divisionCount.sort((a,b)=> a-b);
            let tot = 0;
            for (let i=0; i<threshold; i++){
                tot+=divisionCount[i];
            }
            minDivision = Math.min(minDivision,tot)
        }
    }
    return minDivision;
}

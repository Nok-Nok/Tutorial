// Total Distance Traveled

/**
 * A truck has two fuel tanks. You are given two integers, mainTank representing the fuel present in the main tank in liters and additionalTank representing the fuel present in the additional tank in liters.

The truck has a mileage of 10 km per liter. Whenever 5 liters of fuel get used up in the main tank, if the additional tank has at least 1 liters of fuel, 1 liters of fuel will be transferred from the additional tank to the main tank.

Return the maximum distance which can be traveled.

Note: Injection from the additional tank is not continuous. It happens suddenly and immediately for every 5 liters consumed.

 
 */

var distanceTraveled = function (mainTank, additionalTank) {
  // find max refill (refill every 5 L run)
  const maxRefill = Math.floor(mainTank / 5);
  // max travel = main tank * 10km/L + max refill (min(maxRefill, additionalTank))
  let total = 0;
  while (mainTank > 0) {
    // Update total
    total += Math.min(mainTank, 5);
    // Update maintank
    mainTank -= 5;
    // If mainTank just get empty, refill
    if (mainTank >= 0 && additionalTank) {
      mainTank++;
      additionalTank--;
    }
  }
  return total * 10;
};
(mainTank = 5), (additionalTank = 10);
console.log(distanceTraveled(mainTank, additionalTank));
(mainTank = 1), (additionalTank = 2);
console.log(distanceTraveled(mainTank, additionalTank));

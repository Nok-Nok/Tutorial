/**
 * A laboratory is testing how atoms react in ionic state during nuclear fusion. They introduce different elements with Hydrogen in high temperature and pressurized chamber. Due to unknown reason the chamber lost its power and the elements in it started precipitating
Given the number of atoms of Carbon [C],Hydrogen[H] and Oxygen[O] in the chamber. Calculate how many molecules of Water [H2O], Carbon Dioxide [CO2] and Methane [CH4] will be produced following the order of reaction affinity below

1. Hydrogen reacts with Oxygen   = H2O
2. Carbon   reacts with Oxygen   = CO2
3. Carbon   reacts with Hydrogen = CH4
FOR EXAMPLE:
(C,H,O) = (45,11,100)
return no. of water, carbon dioxide and methane molecules
Output should be like:
(5,45,0)
 * @param {*} c : max c
 * @param {*} h : max h
 * @param {*} o : max o
 * @returns 
 */
function burner(c, h, o) {
  // Assume we will only have 1 element
  let h2o = Math.floor(h / 2);
  let co2 = Math.min(Math.floor((o - h2o) / 2), c);
  while (co2 < 0) {
    h2o -= 2;
    co2++;
  }
  let ch4 = Math.min(Math.floor((h - 2 * h2o) / 4), c - co2);
  while (ch4 < 0) {
    co2--;
    ch4 = Math.min(Math.floor((h - 2 * h2o) / 4), ch4++);
  }
  return [h2o, co2, ch4];
}

console.log(burner(45, 11, 100));

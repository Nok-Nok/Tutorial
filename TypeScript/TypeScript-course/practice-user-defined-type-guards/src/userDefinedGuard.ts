/* eslint-disable @typescript-eslint/no-unused-vars */
interface Fruit {
  name: string;
  sweetness: number;
  color: unknown;
}

// Add the necessary return types and implementation for these
// user-defined type guards
function isString(maybeString: unknown): maybeString is string {
  return typeof maybeString === 'string';
}
function isFruit(maybeFruit: unknown): maybeFruit is Fruit {
  if (maybeFruit && typeof maybeFruit === 'object') {
    if (
      'name' in maybeFruit &&
      'sweetness' in maybeFruit &&
      'color' in maybeFruit
    ) {
      const actualFruit: Fruit = maybeFruit as Fruit;
      return (
        typeof actualFruit.name === 'string' &&
        typeof actualFruit.sweetness === 'number'
      );
    }
  }
  return false;
}
function assertIsFruit(maybeFruit: unknown): asserts maybeFruit is Fruit {
  if (maybeFruit && typeof maybeFruit === 'object') {
    if (
      'name' in maybeFruit &&
      'sweetness' in maybeFruit &&
      'color' in maybeFruit
    ) {
      const actualFruit: Fruit = maybeFruit as Fruit;
      if (
        typeof actualFruit.name === 'string' &&
        typeof actualFruit.sweetness === 'number'
      )
        return;
    }
  }
  throw new Error();
}

// Don't change anything in this function
function checkFruit(fruit: unknown) {
  if (isFruit(fruit)) {
    if (isString(fruit.color)) {
      console.log(fruit.color.toUpperCase());
    }
  }
  assertIsFruit(fruit);

  console.log(`This fruit is ${fruit.name}`);
}


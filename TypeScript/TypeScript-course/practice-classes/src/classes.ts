export class Fruit {
  private isEdible = true;
  constructor(public name: string, protected sweetness: number = 50) {
    this.name = name;
    this.sweetness = sweetness;
  }

  get tasty() {
    return this.sweetness > 60;
  }

  static cook = (fruit: Fruit) => `Cooked ${fruit.name}`;
}

export class Apple extends Fruit {
  constructor(public variety: string) {
    super('Apple');
    this.variety = variety;
  }
}

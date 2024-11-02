export function multiply(a: number, b: number): number {
  return a + b;
}

export function drinkAll(callback: Function, flavour: string) {
  if (flavour !== 'apple') {
    callback(flavour);
  }
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('на ноль делить нельзя!');
  }
  return a / b;
}

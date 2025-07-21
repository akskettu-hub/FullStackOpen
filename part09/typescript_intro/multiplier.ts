type Operation = "mul" | "add" | "div";

const multiplicator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "mul":
      return a * b;
    case "add":
      return a + b;
    case "div":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    default:
      throw new Error("Operation is not multiply, add, or divide");
  }
};

console.log(multiplicator(2, 4, "mul"));
console.log(multiplicator(2, 4, "add"));
console.log(multiplicator(2, 4, "div"));
console.log(multiplicator(2, 0, "div"));

console.log(process.argv);

interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.

let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

interface NumberArray {
  [index: number]: number;
}

let arr3: NumberArray = [1, 2, 3];

function sum() {
  let args: number[] = arguments;
}

function sum2() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}

function sum3() {
  let args: IArguments = arguments;
}

let list: any[] = [1, "2", true];

let mysum = function (x: number, y: number): number {
  return x + y;
};

let mysum2: (x: number, y: number) => number = function (
  x: number,
  y: number,
): number {
  return x + y;
};

let mysum3: (x: number, y: number) => number = function (
  x: number,
  y: number,
): number {
  return x + y;
};

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (
  source: string,
  subString: string,
): boolean {
  return source.search(subString) !== -1;
};

function buildName(firstName: string, lastName: string = "cat") {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else {
    return x.split("").reverse().join("");
  }
}

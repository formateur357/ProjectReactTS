// -----------------
/* Types primitifs :
- string : représente une chaîne de caractères.
- number : représente un nombre (entier, flottant, etc.).
- boolean : représente un booléen (true ou false).
- null et undefined : représentent l’absence de valeur.
- any : type "fourre-tout" à éviter si possible, car il annule la vérification de type.
*/
let message: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;

// ------------
/* Interfaces :
Une interface permet de décrire la forme d’un objet.
Elle définit les propriétés, leurs types, et éventuellement si elles sont optionnelles.
*/
interface Person {
  name: string;
  age: number;
  isActive?: boolean; // le "?" signifie que cette propriété est optionnelle
}

const alice: Person = {
  name: "Alice",
  age: 25,
}; // alice.isActive n’est pas obligatoire, elle peut exister ou non

/* Commentaires :
Les interfaces sont très utiles pour typer les props d’un composant React, en décrivant clairement quelles props sont attendues, et de quel type.
*/

// ---------------------
/* Types vs Interfaces :
Les type et les interface ont des rôles très similaires, mais interface est souvent préféré pour décrire les props et les objets liés à React, car elle est extensible et plus directement compréhensible.
type est souvent utilisé pour des alias de types, combinaisons, unions, etc.
*/
type ID = number | string; // Définir un alias de type : ID peut être un nombre ou une chaîne.

// ------------------
/* Generics simples :
Les generics permettent de créer des composants réutilisables de type paramétré.
Par exemple, une fonction générique qui prend un tableau de type T et renvoie la première valeur de ce tableau :
*/
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const numbers = [1, 2, 3];
const firstNumber = getFirstElement(numbers); // T = number, firstNumber est un number

const names = ["Alice", "Bob"];
const firstName = getFirstElement(names); // T = string, firstName est un string

/* Commentaires :
Les generics sont moins critiques à connaître au tout début, mais ils sont très utiles dès que l’on souhaite construire des abstractions plus complexes (par exemple, des hooks génériques, des utilitaires pour gérer l’état, etc.).
*/

// ------------------
/* Fonctions Typées :
On peut typer les arguments et la valeur de retour d’une fonction.
*/
function sum(a: number, b: number): number {
  return a + b;
}

const result = sum(5, 10); // result est un number

// --------------------------------------
/* Exemple concret pour React (à venir) :
Quand nous créerons un composant, nous pourrons définir une interface pour ses props, par exemple :
*/
// interface GreetingProps {
//   name: string;
// }

// function Greeting({ name }: GreetingProps) {
//   return <h1>Bonjour {name}!</h1>;
// }
// Ici, Greeting accepte un objet props contenant une clé name de type string.
// Toute autre clé ou un type différent pour name déclencherait une erreur TypeScript.

// -----------------------------
/* Bonnes pratiques et astuces :

- Toujours décrire un minimum de types, en commençant par les props de vos composants et les valeurs de retour de vos fonctions.

- Éviter au maximum le type any, privilégier unknown si nécessaire, ou affiner le type pour que TypeScript vous apporte une réelle sécurité.

- Utiliser les interfaces pour décrire la structure des objets, surtout pour les props.

- Ne pas hésiter à ajouter des commentaires dans le code pour expliquer la logique métier associée aux types complexes.
*/

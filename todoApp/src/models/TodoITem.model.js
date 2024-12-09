"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// On crée une variable myTask qui suit la structure définie par TodoItem
var myTask = {
    id: 0,
    title: 'Apprendre Typescript',
    completed: false,
};
// La fonction toggleTodo prend en paramètre une tâche (todo)
// et retourne un nouvel objet TodoItem où completed est inversé.
function toggleTodo(todo) {
    // On utilise l’opérateur de décomposition (...) pour créer une copie de todo
    // puis on modifie la propriété completed.
    return __assign(__assign({}, todo), { completed: !todo.completed });
}
// Exemple d’utilisation
var updatedTask = toggleTodo(myTask);
console.log(updatedTask);
// Affichera : { id: 1, title: "Apprendre TypeScript", completed: true }

import { ChangeEvent, FormEvent, useState } from 'react';
import { useTodoDispatch } from '../Context/TodoDispatchContext';

interface AddTodoProps {}

function AddTodo() {
  const { addTodo } = useTodoDispatch();
  const [inputValue, setInputValue] = useState<string>('');

  // Declaration de l'etat pour les erreurs
  const [error, setError] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputValue(value);

    // Validation simple : l'entree ne doit pas etre vide
    if (value.trim() === '') {
      setError('Le champ ne peut pas etre vide');
    } else {
      setError('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      setError('Veuillez rentrer une valeur avant de soumettre.');
    } else {
      alert(`Vous avez saisi : ${inputValue}`);
      // reinitialiser l'input apres soumission
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userInput">Entrer votre texte :</label>
        <input
          type="text"
          id="userInput"
          value={inputValue}
          onChange={handleChange}
          placeholder="Tapez quelque chose..."
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={inputValue.trim() === ''}>
        Soumettre
      </button>
    </form>
  );
}

export default AddTodo;

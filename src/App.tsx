import { useCallback, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:8000/todos';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [count, setCount] = useState(5);
  const [todos, setTodos] = useState<Todo[]>([]);

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();

    console.log('making req to', `${API_BASE}/${count}`);

    const res = await fetch(`${API_BASE}/${count}`)
    const todos = await res.json();
    console.log(todos);
    setTodos(todos);
  }, [count])

  const totalComplete = todos.reduce(
    (sum, todo) => sum + (todo.completed ? 1 : 0),
    0
  )
  const totalIncomplete = todos.length - totalComplete

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>How many TO-DOs to show?</label>
        <input type="text" value={count} onChange={(event) => {
          console.log('updating', event.target.value)
          setCount(Number(event.target.value))
        }}></input>
        <input type="submit" value="Show" />
      </form>

      <div>
        Complete - {totalComplete}
        Incomplete - {totalIncomplete}
      </div>


      <ul>
      {todos.map(todo => 
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>{todo.title}</li>
      )}
      </ul>
    </div>
  );
}

export default App;

src/App.jsx
import { useState, useEffect } from "react";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");

  // Carrega tarefas do backend ao iniciar
  useEffect(() => {
    fetch("http://localhost:3001/tarefas")
      .then(res => res.json())
      .then(data => setTarefas(data));
  }, []);

  // Adiciona tarefa
  function adicionarTarefa() {
    if (input.trim() === "") return;

    fetch("http://localhost:3001/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: input })
    })
    .then(res => res.json())
    .then(data => {
      setTarefas(data.tarefas);
      setInput("");
    });
  }

  // Remove tarefa
  function removerTarefa(index) {
    fetch(`http://localhost:3001/tarefas/${index}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      setTarefas(data.tarefas);
    });
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="text-center mb-4">Minha Lista de Tarefas</h1>
          <div className="input-group mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nova tarefa"
              className="form-control"
            />
            <button onClick={adicionarTarefa} className="btn btn-primary">
              Adicionar
            </button>
          </div>
          <ul className="list-group">
            {tarefas.map((tarefa, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                {tarefa}
                <button className="btn btn-danger btn-sm" onClick={() => removerTarefa(index)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

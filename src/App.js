import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data))
      .catch(err => console.log(err));
  }, []);



  async function handleAddRepository() {
    api.post('/repositories', {
      title: 'Repositório' + Date.now(),
      url: 'hhtp://repository/' + Date.now(),
      techs: ['tec1', 'tec2']
    })
      .then(response => setRepositories([...repositories, response.data]))
      .catch(err => console.log(err));
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      .then(() => setRepositories(repositories.filter(repository => repository.id !== id)))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <span>{repository.title}</span>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

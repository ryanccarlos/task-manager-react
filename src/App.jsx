import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    /*
    // SE QUISER, VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    const fetchTasks = async () => {
      // CHAMAR A API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();
      // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      setTasks(data)
    } 
    fetchTasks();
    */
  }, []);
  // QUANDO CRIAR UM USEEFFECT E PASSA UMA LISTA VAZIA COMO SEGUNDO PARÂMETRO
  // ESSA FUNÇÃO SÓ É EXECEUTADA UMA ÚNICA VEZ, E ESSA VEZ É QUANDO O
  // USUÁRIO ACABA DE ACESSAR A APLICAÇÃO

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    // MANTEREI NA LISTA TODAS AS TAREFAS QUE TEM O ID DIFERENTE DA TAREFA
    // QUE EU ESTOU TENTANDO DELETAR
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    // ADICIONO UMA NOVA TASK
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    // COLOCO TUDO QUE JÁ TINHA LÁ E ADICIONA A NOVA TASK
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;

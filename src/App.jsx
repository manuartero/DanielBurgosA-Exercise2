import { useEffect, useState } from 'react';
import './App.css'; 

import Colors from './assets/Colors'; 

export default function App() {
  const colorsArray = ["#2455D9", "#24D94E", "#D92424", "#D9D424", "#9424D9", "#D97E24"];
  const [list, setList] = useState([]);
  const [name, setName] = useState("To Do List");
  const [color, setColor] = useState("#2455D9");
  const [id, setId] = useState(1);
  const [taskTitle, setTaskTitle] = useState('');

  const taskCount = list.length;
  const completedCount = list.reduce((count, task) => task.completed ? count + 1 : count, 0);

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleChangeName = (text) => {
    setName(text);
  };

  const handleAddTask = () => {
    if (/^\s*$/.test(taskTitle) !== false) return;
    const newTask = { title: taskTitle, completed: false, id: id };
    setList([...list, newTask]);
    setId(id+1);
    setTaskTitle('');
  };

  const handleCheckTask = (taskId) => {
    setList(list.map(task => {
      if (task.id === taskId) return { ...task, completed: !task.completed };
      return task;
    }));
  };

  const handleDeleteTask = (taskId) => {
    setList(list.filter(task => task.id !== taskId));
  };

  useEffect(() => {

  }, [list]);

  return (
    <div className="container">
      <div className="sectionheader" style={{ borderColor: color }}>
        <div>
          <input type="text" className="input" style={{ borderColor: color }} value={name} onChange={(e) => handleChangeName(e.target.value)} />
          <div className="colorContainer">
            {colorsArray.map(c => (
              <div key={c} className="colorSelector" style={{ backgroundColor: c }} onClick={() => handleColorChange(c)}></div>
            ))}
          </div>
          <span className="taskCount">{completedCount} of {taskCount} tasks</span>
        </div>
      </div>

      <div className="section" style={{ flex: 3 }}>
        <ul className="taskList">
          {list.map(item => (
            <li key={item.id} className="taskContainer" >
              <button onClick={() => handleCheckTask(item.id)}>{item.completed ? "✔️" : "⬜"}</button>
              <span className="task" style={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? Colors.gray : Colors.black }}>{item.title}</span>
              <button className="deleteButton" onClick={() => handleDeleteTask(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="section footer">
        <input type="text" className="input" style={{ borderColor: color }} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <button className="addButton" style={{ backgroundColor: color }} onClick={handleAddTask}>+</button>
      </div>
    </div>
  );
}
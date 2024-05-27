import React from "react";
import { useEffect, useState } from "react";
import {Circles} from 'react-loading-icons'
import Error from "./components/Error/Error";
import TodoItem from "./components/TodoItem/TodoItem";
import axios from 'axios'
import './App.scss'

function App() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({
    inputErrLong: false,
    inputErrEmpty: false,
    loadErr: false
  })
  const [input, setInput] = useState('')

    useEffect(() => {
      let data = axios.get('http://localhost:8080/')
      data
      .then(({data}) => {
        setTodos(data)
        setIsLoading(true)
      })
      .catch(err => {
        console.log(err)
        setIsError({
          ...isError,
          loadErr: true
        })
        setIsLoading(true)
      })
    }, [todos])

    let handleInputChange = (e) => {
      let {value} = e.target

      setInput(value)

      if (value.length > 50) {
          setIsError({
            ...isError,
            inputErrLong: true
          })
          return
      }

      setIsError({
          ...isError,
          inputErrLong: false
      })
    }

    function handleTodoPost() {
      if (input.length === 0) {
        setIsError({
          ...isError,
          inputErrEmpty: true
        })
        return
      }
      if (isError.inputErrLong) {
        return
      }

      setIsError({
        ...isError,
        inputErrEmpty: false
      })
      let post = axios.post('http://localhost:8080/', {
        id: null,
        task: input,
        isDone: 0
      })
      setInput('')
    }

    let handleTodoDelete = (id) => {
      let deleteTodo = axios.delete(`http://localhost:8080/${id}`)
      deleteTodo
        .then(res => {
          console.log('delete ', res.data)
        })
        .catch(err => {
          console.log('Error ', err)
        })
    }

    let handleTodoChange = (id, isDone) => {
      isDone === 1 ? isDone = 0 : isDone = 1
      let changeTodo = axios.put(`http://localhost:8080/${id}/${isDone}`)
      changeTodo
        .then(res => {
          console.log('update ', res.data)
        })
        .catch(err => {
          console.log('Error ', err)
        })
    }

  return ( 
    <div className="container">
      <div className="app">
        <h1 className="app__title">Список Задач</h1>
        <div className="app__new-task">
          <input type="text" className="app__input" placeholder="Введи задачу!" value={input} onChange={(e) => handleInputChange(e)}/>
          <button className="app__button-add" onClick={handleTodoPost}>Добавить</button>
        </div>
 
        {isError.inputErrLong && <Error textError={'Задача должна быть меньше 50 символов'}/>}
        {isError.inputErrEmpty && <Error textError={'Сначала введите задачу!'}/>}
        {isError.loadErr && <Error textError={'Ошибка загрузки'}/>}

        {!isLoading && (<Circles style={{width: '30px'}}/>)}

        {isLoading &&
          <div className="app__todo-list">
          {todos.map(todo => {
            return (
              <TodoItem
                key={todo.id}
                title={todo.task}
                isDone={todo.isDone === 1 ? true : false}
                onClickBtn={() => handleTodoDelete(todo.id)}
                onToggle={() => handleTodoChange(todo.id, todo.isDone)}
              />)
          })}
        </div>
        }
      </div>
    </div>
   );
}

export default App;
function TodoItem({title, isDone, onClickBtn, onToggle}) {
    return ( 
        <div className="app__todo-item">
            <input type="checkbox" checked={isDone} onChange={onToggle}/>
            <p>{title}</p>
            <i className="fa-solid fa-xmark app__todo-close" onClick={onClickBtn}></i>
        </div>
     );
}

export default TodoItem;
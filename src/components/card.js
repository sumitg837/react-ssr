import React from 'react';
import { Link } from 'react-router-dom'

const Card = ({
    id,
    text,
    executor,
    onChangeClick,
    onRemoveClick
})=>{
    return (
        <div className="project-card">
            <p className="card-text">{text}</p>
            <span className="card-executor">{executor}</span>
            <span className="card-remove" onClick={() => onRemoveClick({ type: "REMOVE_TASK", data: { id: id } })}>-</span>
            <span className="card-move" onClick={() => onChangeClick({ type: "CHANGE_TASK_STATUS", data: { id: id } })}>&#10149;</span>
            <span className="card-view"><Link to={`/todo/${id}`} >view</Link></span>
        </div>
    )
}

export default Card;
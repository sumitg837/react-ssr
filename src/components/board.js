import React from 'react';
import List from '../containers/list'

const Board = ({})=>{
    return (
        <div>
        <List status="TODO">Todo Task</List>
        <List status="DOING">Todo Doing</List>
        <List status="DONE">Todo Done</List>
        </div>
    )
}

export default Board;
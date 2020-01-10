let nextTaskId = 0;

const addTask = ({ text, executor }) => {
    return {
        type: 'ADD_TASK',
        id: (nextTaskId++).toString(),
        text,
        executor
    };
};

const removeTask = (data) => {
    return {
        type: 'REMOVE_TASK',
        id : data.id
    };
};

const changeTaskStatus = (data) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        id: data.id
    };
};
const fetchTaskStatus = (data) => {
    return {
        type: 'FETCH_TASK',
        data: data
    };
};

export const todoActions = data =>{
    return function(dispatch){
        if (data.type == 'ADD_TASK'){
            dispatch(addTask(data.data))
        } else if (data.type == 'REMOVE_TASK'){
            dispatch(removeTask(data.data))
        } else if (data.type == 'CHANGE_TASK_STATUS'){
            dispatch(changeTaskStatus(data.data))
        } else if (data.type == 'FETCH_TASK') {
            dispatch(fetchTaskStatus(data.data))
        }
    }
}
export const todoAction = data => {
     if (data.type == 'FETCH_TASK') {
         return [{ "id": "01", "executor": "Jason", "text": "Buy milk", "status": "TODO" }]
    }
}
const initialState = {
    taskList: [],
    completedList: []
}

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const COMPLETE_TASK = 'COMPLETE_TASK';

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            console.log('Add_task is working', action.payload)
            return Object.assign(
                {},
                state,
                {taskList: [...state.taskList, action.payload]}
             );
        case DELETE_TASK:
             console.log('Delete_task is working', action.payload)
             return Object.assign(
                {},
                state,
                {taskList: state.taskList.filter(task => task.id !== action.payload)}
             );
        case COMPLETE_TASK:
             console.log('Complete_task is working', action.payload)
             return Object.assign(
                {},
                state,
                {completedList: [...state.completedList, action.payload]}
             )
        default:
            return state;
    }
}


export function addTask(task) {
    console.log(task);
    return {
        type: ADD_TASK,
        payload: task
    }
}

export function deleteTask(taskId){
    return {
        type: DELETE_TASK,
        payload: taskId
    }
}

export function completeTask(task){
    return {
        type: COMPLETE_TASK,
        payload: task
    }
}
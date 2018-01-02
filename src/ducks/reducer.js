import axios from 'axios';

const SUBMIT_TASK = 'SUBMIT_TASK';
const SUBMIT_TASK_FULFILLED = 'SUBMIT_TASK_FULFILLED';
const GET_TASKS = 'GET_TASKS';
const GET_TASKS_PENDING = 'GET_TASKS_PENDING';
const GET_TASKS_FULFILLED = 'GET_TASKS_FULFILLED';
const GET_TASK_BY_ID = 'GET_TASK_BY_ID';
const GET_TASK_BY_ID_FULFILLED = 'GET_TASK_BY_ID_FULFILLED';
const HANDLE_TITLE_CHANGE = 'HANDLE_TITLE_CHANGE';
const HANDLE_DESC_CHANGE = 'HANDLE_DESC_CHANGE';
const HANDLE_SUBMIT = 'HANDLE_SUBMIT';
const HANDLE_SUBMIT_FULFILLED = 'HANDLE_SUBMIT_FULFILLED';
const CANCEL = 'CANCEL';
const DELETE_TASK = 'DELETE_TASK';
const DELETE_TASK_FULFILLED = 'DELETE_TASK_FULFILLED';
const COMPLETE_TASK = 'COMPLETE_TASK';
const COMPLETE_TASK_FULFILLED = 'COMPLETE_TASK_FULFILLED';

const initialState = {
    tasks: [],
    newTask: '',
    loading: false,
    currentTask: {},
    newTitle: '',
    newDesc: '',
    todo: [],
    completed: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case SUBMIT_TASK_FULFILLED:
            console.log('SUBMIT_TASK', action)
            return Object.assign({}, state, {tasks: action.payload, newTask: ''})
        case GET_TASKS_PENDING:
            return Object.assign({}, state, {loading: true})

        case GET_TASKS_FULFILLED:
            return Object.assign({}, state, {loading: false, tasks: action.payload})
        case GET_TASK_BY_ID_FULFILLED:
            let current = {}
            action.payload[0].map((e, i)=>{ return e.id == action.payload[1] ? current = e : null})
            return Object.assign({}, state, {currentTask: current})
        case HANDLE_TITLE_CHANGE:
            // console.log(action.payload.target.value)
            return Object.assign({}, state, {newTitle: action.payload.target.value})
        case HANDLE_DESC_CHANGE:
            return Object.assign({},state,{newDesc: action.payload.target.value})
        case HANDLE_SUBMIT_FULFILLED:
            console.log(action)
            let todo = [];
            let completed = [];
            action.payload.map( (e) => { return e.completed ? completed.push(e) : todo.push(e)})
            return Object.assign({}, state, {tasks: action.payload, todo: todo, completed: completed, newTitle: '', newDesc: ''})
        case CANCEL:
            console.log('cancel', action)
            return Object.assign({}, state, {newTitle: '', newDesc: ''})
        case DELETE_TASK_FULFILLED:
            console.log('delete_task', action)
            return Object.assign({}, state, {tasks: action.payload})
        case COMPLETE_TASK_FULFILLED:
            console.log('complete_task', action)
            return Object.assign({}, state, {tasks: action.payload})
        default: return state
    }
}

export function submitTask(taskTitle){
    console.log(taskTitle);
    return {
        type: SUBMIT_TASK,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks/', { title: taskTitle, description: '' })
            .then(response => response.data),
        taskTitle
    }
}

export function getTasks(){
    return {
        type: GET_TASKS,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks/')
            .then( response => response.data)
    }
}

export function getTaskByID(id){
    // console.log('getTaskByID', id)
    return {
        type: GET_TASK_BY_ID,
        payload: axios.get(`https://practiceapi.devmountain.com/api/tasks/`)
            .then( response => [response.data, id])
    }
}

export function handleTitleChange(input){
    // console.log('input', input);
    return {
        type: HANDLE_TITLE_CHANGE,
        payload: input
    }
}

export function handleDescChange(input){
    return {
        type: HANDLE_DESC_CHANGE,
        payload: input
    }
}

export function handleSubmit(id, title, description){
    return {
        type: HANDLE_SUBMIT,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {title: title, description: description})
            .then( response => response.data),
    }
}

export function cancel(){
    return {
        type: CANCEL
    }
}

export function deleteTask(id){
    return {
        type: DELETE_TASK,
        payload: axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
            .then(response => response.data),    
        id: id,
    }
}

export function completeTask(id){
    return {
        type: COMPLETE_TASK,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {completed: true})
            .then(response => response.data)
    }
}

// const initialState = {
//     taskList: [],
//     completedList: []
// }

// const ADD_TASK = 'ADD_TASK';
// const DELETE_TASK = 'DELETE_TASK';
// const COMPLETE_TASK = 'COMPLETE_TASK';

// export default function reducer(state=initialState, action) {
//     switch (action.type) {
//         case ADD_TASK:
//             console.log('Add_task is working', action.payload)
//             return Object.assign(
//                 {},
//                 state,
//                 {taskList: [...state.taskList, action.payload]}
//              );
//         case DELETE_TASK:
//              console.log('Delete_task is working', action.payload)
//              return Object.assign(
//                 {},
//                 state,
//                 {taskList: state.taskList.filter(task => task.id !== action.payload)}
//              );
//         case COMPLETE_TASK:
//              console.log('Complete_task is working', action.payload)
//              return Object.assign(
//                 {},
//                 state,
//                 {completedList: [...state.completedList, action.payload]}
//              )
//         default:
//             return state;
//     }
// }


// export function addTask(task) {
//     console.log(task);
//     return {
//         type: ADD_TASK,
//         payload: task
//     }
// }

// export function deleteTask(taskId){
//     return {
//         type: DELETE_TASK,
//         payload: taskId
//     }
// }

// export function completeTask(task){
//     return {
//         type: COMPLETE_TASK,
//         payload: task
//     }
// }
import React, { Component } from 'react';
import './App.css';
import CompletedList from './CompletedList.js';
import { connect } from 'react-redux';
import { addTask, deleteTask, completeTask } from './ducks/reducer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTask: '',
      inputExists: false,
      taskList: [
        // {
        //   task: 'test1',
        //   color: 'black',
        //   isComplete: false
        // }
      ],
      completedList: []
    }
    this.completeTask = this.completeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  completeTask(task, index) {
    task.color = 'green';
    task.isComplete = true;
    this.setState({
        completedList: [...this.props.completedList, this.props.taskList[index]]
    })
    this.props.completeTask(task)
  }

  deleteTask(task, index) {
    task.isComplete = true;
    var list = this.props.taskList
    list.splice(index, 1)
    this.setState({
      taskList: list
    })

    this.props.deleteTask(index)
  }


  onChange = (event) => {
    this.setState({ 
      newTask: event.target.value,
      inputExists: true
    });
    // console.log('second', this.state.newTask)
  }
  
  onSubmit = (event) => {
    event.preventDefault()
    // this.setState({
    //   taskList: [...this.state.taskList, {
    //     task: this.state.newTask,
    //     color: 'black',
    //     isComplete: false
    //   }],
    //   newTask: '',
    //   inputExists: false
    // });
    // console.log('third', this.state.newTask)
    if(this.state.newTask){
      let submittedTask = {
        task: this.state.newTask
      };
      this.props.addTask(submittedTask);
    }
    this.setState({
      newTask: ''
    })
  }

  render() {
    // console.log('tasklist', this.state.taskList)
    return (
      <div className='App'>

        <div>
          <form onSubmit={this.onSubmit}>
          <input value={this.state.newTask} onChange={this.onChange} />
          <button disabled={!this.state.inputExists} >Submit</button>
          </form>
        </div>

        <div>
          {this.props.taskList.map( (task, index) => {
          return <div style={ {color: task.color } }   key={index}>
            <b>Task:</b> {task.task}
            <button onClick={ () => {this.completeTask(task, index) } } hidden={task.isComplete} >Complete</button>
            <button onClick={ () => {this.deleteTask(task, index) } } hidden={task.isComplete} >Delete</button>
          </div>
          })}
        </div>

          <CompletedList completedList={this.props.completedList} />

      </div>
    );
  }
}

function mapStateToProps(state){
  console.log('map state', state)
  return state;
}

export default connect(mapStateToProps, { addTask, deleteTask, completeTask })(App);

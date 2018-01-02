import React, { Component } from 'react';
import './App.css';
// import CompletedList from './CompletedList.js';
import { connect } from 'react-redux';
// import { addTask, deleteTask, completeTask } from './ducks/reducer';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { getTasks, submitTask } from './ducks/reducer';

class App extends Component {
  constructor(){
    super();
    this.state = {
      newTask: {},
      submittedTask: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    this.props.getTasks();
  }

  handleChange(event){
    // console.log('hi', event.target.value)
    this.setState({
      newTask: {
        title: event.target.value
      }
    })
  }

  handleClick(){
    this.props.submitTask(this.state.newTask.title);
    this.setState({
      submittedTask: true
    })
  }

  render() {
    // console.log('props', this.props);
    // console.log('state', this.state)
    

    const tasks = this.props.tasks.tasks.map( (task, index) => {
      return <div key={index} style={{border: '1px solid black'}}>
        <Link to={`./Task/${task.id}`}>{task.title}</Link>
        <p>Completed: {task.completed.toString()}</p>
      </div>
    })

    return (
      <div className='App'>

        <div hidden={this.state.submittedTask} style={{border: '1px solid gray'}}>
          <h1>Add New Task</h1>
          <input onChange={(event) => this.handleChange(event) } placeholder='Task Name' />
          <button onClick={ () => this.handleClick() } disabled={!this.state.newTask.title}>Add new task</button>
        </div>

        <h1>Task List</h1>
        {this.props.tasks ? tasks : 'fetching'}
      </div>
    );
  }
}

function mapStateToProps(state){
  // console.log('map state', state)
  return {
    tasks: state.tasks,
    loading: state.tasks.loading,
    newTask: state.tasks.newTask
  }
}

export default connect(mapStateToProps, {getTasks, submitTask})(App);

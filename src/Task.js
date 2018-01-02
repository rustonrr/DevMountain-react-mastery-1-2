import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    getTaskByID,
    handleTitleChange,
    handleDescChange,
    handleSubmit,
    cancel,
    deleteTask,
    completeTask
} from './ducks/reducer';
import './Task.css';

class Task extends Component {
    componentDidMount() {
        this
            .props
            .getTaskByID(this.props.match.params.id)
    }
    render() {
        if (!this.props.tasks.currentTask.title) {
            return <h1>LOADING LEAVE ME ALONE</h1>
        }
        // console.log('props', this.props)
        return (
            <div>
                <div>
                    <Link to='/'>
                        <button>Back to Home</button>
                    </Link>
                    <div>
                        <h1>A detailed view of the task you just clicked
                        </h1>
                    </div>
                    <div>
                        <div>Title: {this.props.tasks.currentTask.title}</div>
                        <input
                            onChange={(e) => {
                            this
                                .props
                                .handleTitleChange(e)
                        }}
                            placeholder='Change Title Here'
                            value={this.props.tasks.newTitle}/>
                    </div>
                    <div>
                        <div>Description: {this.props.tasks.currentTask.description}</div>
                        <input
                            onChange={(e) => {
                            this
                                .props
                                .handleDescChange(e)
                        }}
                            placeholder='Edit description'
                            value={this.props.tasks.newDesc}/>
                    </div>
                    <div>
                        <Link
                            to="/"
                            onClick={() => this.props.handleSubmit(this.props.tasks.currentTask.id, this.props.tasks.newTitle
                            ? this.props.tasks.newTitle
                            : this.props.tasks.currentTask.title, this.props.tasks.newDesc
                            ? this.props.tasks.newDesc
                            : this.props.tasks.currentTask.description)}>
                            <button disabled={!this.props.tasks.newTitle && !this.props.tasks.newDesc}>Submit</button>
                        </Link>
                        <button
                            onClick={() => {
                            this
                                .props
                                .cancel()
                        }}>Cancel</button>
                        <Link
                            to="/"
                            onClick={() => this.props.deleteTask(this.props.tasks.currentTask.id)}>
                            <button>Delete Task</button>
                        </Link>
                    </div>
                    <div>
                        <div>Completed: {this
                                .props
                                .tasks
                                .currentTask
                                .completed
                                .toString()}
                        </div>
                        <Link to='/'>
                            <button
                                onClick={() => this.props.completeTask(this.props.tasks.currentTask.id)}>Complete Task</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    // console.log('map state', state)
    return state
}

export default connect(mapStateToProps, {
    getTaskByID,
    handleTitleChange,
    handleDescChange,
    handleSubmit,
    cancel,
    deleteTask,
    completeTask
})(Task);
import React, { Component } from 'react';

class CompletedList extends Component {
    render() {
        return (
            <div>
                <h4>Completed tasks Below:</h4>
                
                <div>
                {this.props.completedList.map( (task, index) => {
                  return <div key={index}>
                    <b>Complete:</b> {task.task}
                  </div>
                })}
              </div>
            </div>
        )
    }
}

export default CompletedList;
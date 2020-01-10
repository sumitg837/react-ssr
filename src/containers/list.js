import React from 'react';
import { connect } from 'react-redux';
import { todoActions } from '../actions';

import Card from '../components/card'

const List = ({
        status,
        children,
        tasks,
        todoActions
    }) => (
        <div className={`list ${status.toLowerCase()}-list`}>
            <h5>{children} <span>{tasks.length}</span></h5>

            {tasks && tasks.map((task) =>{
                return(<Card
                    key={task.id}
                    {...task}
                    onChangeClick={todoActions}
                    onRemoveClick={todoActions}
                />)
            }
            )}
        </div>
    )

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.filter(t => t.status === ownProps.status)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        todoActions: (data) => {
            dispatch(todoActions(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

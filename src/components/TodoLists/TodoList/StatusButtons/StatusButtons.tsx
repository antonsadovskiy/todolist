import React, {FC} from 'react';
import {FilterType} from "../TodoList";

type StatusButtonsPropsType = {
    changeFilter: (value: FilterType) => void
}

const StatusButtons:FC<StatusButtonsPropsType> = (props) => {
    return (
        <div>
            <button onClick={() => {props.changeFilter('all')}}>All</button>
            <button onClick={() => {props.changeFilter('active')}}>Active</button>
            <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
        </div>
    );
};

export default StatusButtons;
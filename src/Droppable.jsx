import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        border: isOver ? '2px solid green' : '2px solid transparent',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
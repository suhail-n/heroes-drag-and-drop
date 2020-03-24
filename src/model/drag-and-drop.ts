export interface Draggable {
    // the user starts dragging an item
    dragStartHandler(event: DragEvent): void;
    // a drag operation ends (such as releasing a mouse button or hitting the Esc key
    dragEndHandler(event: DragEvent): void;
}


export interface DragTarget {
    // signal browser the thing dragging over is a valid target.
    // permit the drop
    dragOverHandler(event: DragEvent): void

    // handle the drop like update the data
    dropHandler(event: DragEvent): void

    // visual feedback
    dragLeaveHandler(event: DragEvent): void
}
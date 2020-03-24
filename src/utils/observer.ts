export interface Listener <T> {
    (t: T[]): void;
}

export interface Observer {
    notify(): void;
}

export interface Subject<T> {
    listeners: Listener<T>[];
    addListener(listener: Listener<T>): void;
}
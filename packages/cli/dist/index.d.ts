import { Accessor, Component } from 'solid-js';

declare function createHello(): [Accessor<string>, (to: string) => void];
declare const Hello: Component<{
    to?: string;
}>;

export { Hello, createHello };

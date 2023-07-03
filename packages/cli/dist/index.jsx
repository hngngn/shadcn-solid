// src/index.tsx
import { createComputed, createSignal } from "solid-js";
function createHello() {
  const [hello, setHello] = createSignal("Hello World!");
  return [hello, (to) => setHello(`Hello ${to}!`)];
}
var Hello = (props) => {
  const [hello, setHello] = createHello();
  createComputed(() => {
    if (typeof props.to === "string")
      setHello(props.to);
  });
  return <><div>{hello()}</div></>;
};
export {
  Hello,
  createHello
};

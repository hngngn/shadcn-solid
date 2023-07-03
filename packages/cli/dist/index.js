import { insert, template } from 'solid-js/web';
import { createSignal, createComputed } from 'solid-js';

// src/index.tsx
var _tmpl$ = /* @__PURE__ */ template(`<div>`);
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
  return (() => {
    const _el$ = _tmpl$();
    insert(_el$, hello);
    return _el$;
  })();
};

export { Hello, createHello };

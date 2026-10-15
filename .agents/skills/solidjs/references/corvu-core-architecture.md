# Corvu Core Architecture & State Mechanics

> Sources cited:
> - Corvu Official Documentation: https://corvu.dev
> - Corvu GitHub Repository: https://github.com/corvudev/corvu
> - Corvu State Guide: https://corvu.dev/docs/state/

- Touch & gesture physics, snap points, velocity tracking.
- 4 State models: Uncontrolled, Controlled, Children render callback, Context hook (`Dialog.useContext()`).
- Keyed Context (`contextId`): Solves nested dialog/drawer collisions.
- Dynamic components: `as` prop.
- Presence lifecycle: `@corvu/presence` coordinates CSS exit animations before unmount.

import { For, lazy, Suspense } from "solid-js";

const Item = (props: { src: string }) => {
  const Component = lazy(
    () =>
      import(
        /* @vite-ignore */
        props.src
      )
  );

  return <Component />;
};

const contents = /*#__PURE__*/ import.meta.glob<true, string, string>("./examples/*.tsx", {
  eager: true
});

const App = () => {
  return (
    <div class="grid grid-cols-3 gap-4 p-4">
      <For each={Object.keys(contents)}>
        {item => (
          <Suspense
            fallback={
              <div class="flex justify-center items-center min-h-350px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
                  />
                </svg>
              </div>
            }
          >
            <div class="flex justify-center items-center border p-10 rounded-md min-h-350px">
              <Item src={item} />
            </div>
          </Suspense>
        )}
      </For>
    </div>
  );
};

export default App;

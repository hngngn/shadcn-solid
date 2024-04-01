import { createSignal, onCleanup } from "solid-js";
import { Progress } from "../ui/progress";

const ProgressDemo = () => {
  const [progress, setProgress] = createSignal(0);
  const timer = setInterval(
    () =>
      setProgress(i => {
        if (i === 100) {
          clearInterval(timer);
          return i;
        }
        return i + 10;
      }),
    400
  );
  onCleanup(() => clearInterval(timer));

  return <Progress value={progress()} class="w-60%" />;
};

export default ProgressDemo;

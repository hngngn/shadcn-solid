import { Contents } from "@/contents";
import { useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";

const DocumentContent = () => {
  const location = useLocation();

  const Component = createMemo(() => {
    const Temp = Contents[location.pathname].component;
    return <Temp />;
  });

  return <>{Component()}</>;
};

export default DocumentContent;

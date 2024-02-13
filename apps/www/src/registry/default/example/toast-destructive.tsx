import { toaster } from "@kobalte/core";
import { Button } from "../ui/button";
import {
  Toast,
  ToastContent,
  ToastDescription,
  ToastList,
  ToastProgress,
  ToastRegion,
  ToastTitle
} from "../ui/toast";

const ToastDestructive = () => {
  const showToast = () =>
    toaster.show(props => (
      <Toast toastId={props.toastId} variant="destructive">
        <ToastContent>
          <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
          <ToastDescription>There was a problem with your request.</ToastDescription>
        </ToastContent>
        <ToastProgress />
      </Toast>
    ));

  return (
    <>
      <Button variant="outline" onClick={showToast}>
        Add to calendar
      </Button>
      <ToastRegion>
        <ToastList />
      </ToastRegion>
    </>
  );
};

export default ToastDestructive;

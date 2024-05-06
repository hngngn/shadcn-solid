import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";

const AlertDialogDemo = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger as={() => <Button variant="outline">Show Dialog</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>Cancel</AlertDialogClose>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDemo;

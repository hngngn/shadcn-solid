import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const AlertDemo = () => {
  return (
    <Alert>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m5 7l5 5l-5 5m7 2h7"
        />
      </svg>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can not add components to your app using the cli, yet.
      </AlertDescription>
    </Alert>
  );
};

export default AlertDemo;

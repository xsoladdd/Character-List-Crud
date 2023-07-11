import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Homepage from "../../Homepage";

export const renderHomepage = () => {
  const queryClient = new QueryClient();
   render(
    <QueryClientProvider client={queryClient}>
      <Homepage />
    </QueryClientProvider>
  );
}
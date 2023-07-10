'use client'
import { queryClient } from "@/config/react-query-config";
import React from "react";
import { QueryClientProvider } from "react-query";

const RQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
export default RQProvider;

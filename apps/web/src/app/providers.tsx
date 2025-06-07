import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, Spin } from "antd";
import { FC, Suspense } from "react";
import { queryClient } from "../shared/api";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spin />}>
      {/* Перенести theme в config */}
      <ConfigProvider
        theme={{
          token: {
            colorBgLayout: "white"
          }
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConfigProvider>
    </Suspense>
  );
};

export default Providers;

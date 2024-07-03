import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center dark:bg-black/80">
      {children}
    </div>
  );
};

export default AuthLayout;

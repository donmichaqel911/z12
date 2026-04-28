"use client";

import { toast } from "sonner";

export default function ToastButton({
  action,
  children,
  className,
  as = "button",
  type = "button",
}: {
  action: string;
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  type?: "button" | "submit" | "reset";
}) {
  const Comp = as as any;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast(action);
  };

  return (
    <Comp
      className={className}
      onClick={handleClick}
      {...(as === "a" ? { href: "#" } : { type })}
    >
      {children}
    </Comp>
  );
}

import React from "react";
import type { FC, ReactNode } from "react";

// Define props for the Button component
interface ButtonProps {
  id?: string;
  title: string;
  rightIcon?: ReactNode;
  containerClass?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ id, title, rightIcon, containerClass, onClick }) => (
  <button
    id={id}
    onClick={onClick}
    // Using default classes and combining with containerClass prop
    className={`px-4 py-2 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-sm ${containerClass}`}
  >
    <span>{title}</span>
    {rightIcon && <span className="ml-1">{rightIcon}</span>}
  </button>
);

export default Button;

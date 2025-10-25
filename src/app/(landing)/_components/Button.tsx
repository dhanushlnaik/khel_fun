"use client";

interface ButtonProps {
  title: string;
  containerClass?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  containerClass = "", 
  leftIcon, 
  rightIcon,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black transition-all duration-500 hover:scale-105 hover:bg-violet-300 ${containerClass}`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-300 via-violet-400 to-violet-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2">
        {leftIcon && <span className="transition-transform duration-300 group-hover:scale-110">{leftIcon}</span>}
        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
          <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
            {title}
          </div>
          <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
            {title}
          </div>
        </span>
        {rightIcon && <span className="transition-transform duration-300 group-hover:scale-110">{rightIcon}</span>}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 rounded-full bg-violet-400/50 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
    </button>
  );
};

export default Button;

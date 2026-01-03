import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean; // Kept for backward compatibility, though we are text-only now
}

const Logo = ({ size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const subSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  return (
    <Link to="/dashboard" className="flex flex-col items-start hover:opacity-90 transition-opacity no-underline">
      <h1 className={`${sizeClasses[size]} font-black tracking-tighter leading-none m-0`}>
        <span className="bg-gradient-to-r from-[#0ea5e9] to-[#ea580c] bg-clip-text text-transparent">
          GlobeTrotter
        </span>
      </h1>
      <span className={`${subSizeClasses[size]} font-bold tracking-[0.2em] uppercase text-foreground/80 ml-0.5 leading-none`}>
        ODYSSEY
      </span>
    </Link>
  );
};

export default Logo;

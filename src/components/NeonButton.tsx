import React from "react";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "pink" | "cyan";
  children: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  color = "pink",
  children,
  className = "",
  ...props
}) => {
  const isPink = color === "pink";
  const glowTextClass = isPink ? "text-glow-pink text-neon-pink" : "text-glow-cyan text-neon-cyan";
  const bgClass = isPink ? "border-neon-pink" : "border-neon-cyan";
  const hoverClass = isPink ? "hover:bg-neon-pink/10 hover:box-glow-pink" : "hover:bg-neon-cyan/10 hover:box-glow-cyan";

  return (
    <button
      className={`relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold tracking-wider uppercase border-2 rounded-full transition-all duration-300 ${bgClass} ${glowTextClass} ${hoverClass} active:scale-95 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className={`block absolute inset-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isPink ? 'box-glow-pink' : 'box-glow-cyan'}`} />
    </button>
  );
};

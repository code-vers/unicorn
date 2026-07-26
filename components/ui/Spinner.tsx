import React from 'react';

interface SpinnerProps {
  /** Size of the spinner. 'sm' for buttons, 'md' for cards/tables, 'lg' for full page */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant of the spinner */
  variant?: 'primary' | 'white' | 'gray';
  /** If true, wraps the spinner in a flex container that centers it horizontally and vertically */
  centered?: boolean;
  /** If true, wraps the spinner in a container that takes up the full screen height (minus header) */
  fullScreen?: boolean;
  /** Optional custom CSS classes for the wrapper */
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  centered = false,
  fullScreen = false,
  className = '',
}) => {
  // Map sizes to Tailwind classes for width/height and border thickness
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-10 h-10 border-4',
    xl: 'w-12 h-12 border-4',
  };

  // Map variants to Tailwind border color classes
  // We use `border-t-transparent` to create the spinning gap
  const variantMap = {
    primary: 'border-[#3FA34D] border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  const spinner = (
    <div
      className={`rounded-full animate-spin ${sizeMap[size]} ${variantMap[variant]}`}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullScreen) {
    return (
      <div className={`flex items-center justify-center min-h-[calc(100vh-200px)] w-full ${className}`}>
        {spinner}
      </div>
    );
  }

  if (centered) {
    return (
      <div className={`flex items-center justify-center w-full p-8 ${className}`}>
        {spinner}
      </div>
    );
  }

  // If no wrapper is requested, just return the raw spinner (useful inside buttons)
  return spinner;
};

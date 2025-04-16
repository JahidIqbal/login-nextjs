import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ClickOutsideDropdownProps {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
}

const ClickOutsideDropdown: React.FC<ClickOutsideDropdownProps> = ({
  children,
  trigger,
  className = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div onClick={() => setIsDropdownOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 z-10">{children}</div>
      )}
    </div>
  );
};

export default ClickOutsideDropdown;

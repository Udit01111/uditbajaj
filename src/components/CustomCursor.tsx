import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outlinePosition, setOutlinePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOutlinePosition(prev => ({
        x: e.clientX - (isHovering ? 15 : 0),
        y: e.clientY - (isHovering ? 15 : 0)
      }));
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const isClickable = e.target.matches('button, input, a') ||
          e.target.closest('button, input, a');
        setIsHovering(!!isClickable);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isHovering]);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${position.x - 2.5}px, ${position.y - 2.5}px)`
        }}
      />
      <div
        className="cursor-outline"
        style={{
          transform: `translate(${outlinePosition.x - 15}px, ${outlinePosition.y - 15}px) scale(${isHovering ? 1.5 : 1})`
        }}
      />
    </>
  );
};

export default CustomCursor;
"use client"

interface ToggleButtonProps {
  blogId: number | null;
  onClick: (id: number | null) => Promise<void>;
}

const ToggleButton = ({ blogId, onClick}: ToggleButtonProps) => {
    return (
         <button data-testid="mark-read-" onClick={() => onClick(blogId)} className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded cursor-pointer">mark as read</button>
    )
}

export default ToggleButton;
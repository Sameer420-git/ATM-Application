
import React from 'react';

interface KeypadProps {
    onKeyPress: (key: string) => void;
    onClear: () => void;
    onEnter: () => void;
    showEnter?: boolean;
    showClear?: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onClear, onEnter, showEnter = true, showClear = true }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];
    
    return (
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto mt-auto">
            {keys.map(key => (
                <button
                    key={key}
                    onClick={() => onKeyPress(key)}
                    className="aspect-square text-3xl font-bold bg-gray-600/50 hover:bg-gray-500/50 rounded-full transition-colors duration-200 shadow-md border-2 border-gray-500/80 active:translate-y-px"
                >
                    {key}
                </button>
            ))}
             {showClear ? (
                <button
                    onClick={onClear}
                    className="aspect-square text-2xl font-bold bg-yellow-600/80 hover:bg-yellow-500/80 text-black rounded-full transition-colors duration-200 shadow-md border-2 border-yellow-400/80 active:translate-y-px"
                >
                    CLR
                </button>
            ) : <div />}
            {showEnter ? (
                 <button
                    onClick={onEnter}
                    className="col-span-3 h-16 text-2xl font-bold bg-green-600/80 hover:bg-green-500/80 text-black rounded-full transition-colors duration-200 shadow-md border-2 border-green-400/80 active:translate-y-px"
                >
                    ENTER
                </button>
            ) : <div className="col-span-2" />}
        </div>
    );
};

export default Keypad;

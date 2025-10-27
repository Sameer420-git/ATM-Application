
import React from 'react';
import { ScreenView } from '../types';

interface BalanceScreenProps {
    balance: number;
    setScreen: (screen: ScreenView) => void;
}

const BalanceScreen: React.FC<BalanceScreenProps> = ({ balance, setScreen }) => {
    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <h2 className="text-2xl font-orbitron text-gray-300 mb-4">Current Balance</h2>
            <p className="text-6xl font-orbitron font-bold text-cyan-400 mb-12">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <button
                onClick={() => setScreen(ScreenView.MainMenu)}
                className="w-full max-w-xs mt-auto p-4 text-2xl font-bold bg-gray-700/60 hover:bg-cyan-500/40 rounded-lg transition-all duration-200 border-2 border-gray-600 hover:border-cyan-400 shadow-md active:translate-y-px"
            >
                Back to Menu
            </button>
        </div>
    );
};

export default BalanceScreen;

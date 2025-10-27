
import React from 'react';
import { ScreenView } from '../types';

interface MainMenuScreenProps {
    setScreen: (screen: ScreenView) => void;
    onLogout: () => void;
    message: string | null;
}

const MenuButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="w-full text-left p-4 text-2xl font-bold bg-gray-700/60 hover:bg-cyan-500/40 rounded-lg transition-all duration-200 border-2 border-gray-600 hover:border-cyan-400 shadow-md active:translate-y-px"
    >
        {children}
    </button>
);

const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ setScreen, onLogout, message }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <h2 className="text-3xl font-orbitron text-cyan-300 mb-8">Main Menu</h2>
            <div className="space-y-4 flex-grow">
                <MenuButton onClick={() => setScreen(ScreenView.Balance)}>Check Balance</MenuButton>
                <MenuButton onClick={() => setScreen(ScreenView.Withdraw)}>Withdraw</MenuButton>
                <MenuButton onClick={() => setScreen(ScreenView.Deposit)}>Deposit</MenuButton>
                <MenuButton onClick={() => setScreen(ScreenView.History)}>Transaction History</MenuButton>
            </div>
            {message && <p className="text-green-400 mb-4 text-lg text-center">{message}</p>}
            <button
                onClick={onLogout}
                className="w-full p-4 text-2xl font-bold bg-red-800/80 hover:bg-red-700/80 text-white rounded-lg transition-colors duration-200 border-2 border-red-600 active:translate-y-px"
            >
                Logout & Remove Card
            </button>
        </div>
    );
};

export default MainMenuScreen;

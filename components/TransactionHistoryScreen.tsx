
import React from 'react';
import { ScreenView, Transaction } from '../types';

interface TransactionHistoryScreenProps {
    transactions: Transaction[];
    setScreen: (screen: ScreenView) => void;
}

const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({ transactions, setScreen }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <h2 className="text-3xl font-orbitron text-cyan-300 mb-4">Transaction History</h2>
            <div className="flex-grow bg-black/30 rounded-lg p-2 overflow-y-auto">
                <ul className="space-y-2">
                    {transactions.map(tx => (
                        <li key={tx.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
                            <div>
                                <p className={`font-bold ${tx.type === 'DEPOSIT' ? 'text-green-400' : 'text-red-400'}`}>
                                    {tx.type}
                                </p>
                                <p className="text-sm text-gray-400">{tx.date}</p>
                            </div>
                            <p className="text-xl font-bold">
                                {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                onClick={() => setScreen(ScreenView.MainMenu)}
                className="w-full mt-4 p-4 text-2xl font-bold bg-gray-700/60 hover:bg-cyan-500/40 rounded-lg transition-all duration-200 border-2 border-gray-600 hover:border-cyan-400 shadow-md active:translate-y-px"
            >
                Back to Menu
            </button>
        </div>
    );
};

export default TransactionHistoryScreen;

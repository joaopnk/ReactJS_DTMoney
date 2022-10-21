import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
}


interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps){
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Buscando na API
    async function loadTransactions(){
        const response = await fetch('http://localhost:3000/transactions');
        const data = await response.json();

        // Atualizando..
        setTransactions(data);
    }

    // Para executar apenas uma unica vez
    useEffect(() => {
        loadTransactions();
    }, []); 

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}
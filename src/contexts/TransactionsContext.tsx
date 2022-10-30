import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
    fetchTransactions: (query?: string) => Promise<void>
}


interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps){
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Buscando na API
    async function fetchTransactions(query?: string){
    
        const response = await api.get('transactions', {
            params: {
                q: query
            }
        });

        // Atualizando..
        setTransactions(response.data);
    }

    // Para executar apenas uma unica vez
    useEffect(() => {
        fetchTransactions();
    }, []); 

    return (
        <TransactionsContext.Provider 
            value={{ transactions, fetchTransactions }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}
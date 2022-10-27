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
        const url = new URL('http://localhost:3000/transactions');

        // Se estiver recebendo algum valor (query), considera ele na url
        if(query){
            url.searchParams.append('q', query);
        }
        const response = await fetch(url);
        const data = await response.json();

        // Atualizando..
        setTransactions(data);
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
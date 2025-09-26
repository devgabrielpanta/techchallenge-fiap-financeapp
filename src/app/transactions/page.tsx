"use client";
import { transactionList } from "@/utils/transactionsData";
import { columns } from "@/components/transactions-table/TransactionsColumn";
import { DataTable } from "@/components/transactions-table/TransactionsTable";
import TransactionsFilters from "@/components/transactions-table/TransactionsFilters";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const [openFilters, setOpenFilters] = useState(false);
  const [transactions, setTransactions] = useState(transactionList);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionList);

  return (
    <>
      <div className="relative container mx-auto py-10">
        <Button
          variant="secondary"
          size="icon"
          className="size-8 absolute right-0 top-0"
          onClick={() => setOpenFilters(true)}
        >
          <SlidersHorizontal />
        </Button>
        <DataTable columns={columns} data={filteredTransactions} />
      </div>
      {openFilters && (
        <TransactionsFilters
          transactions={transactions}
          filteredTransactions={filteredTransactions}
          setFilteredTransactions={setFilteredTransactions}
          openFilters={openFilters}
          setOpenFilters={setOpenFilters}
        />
      )}
    </>
  );
}

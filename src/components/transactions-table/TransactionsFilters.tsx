"use client";

import * as React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { TransactionType } from "@/schemas/dataSchema";

type FilterSchema = {
  bank: string[];
  type: string[];
  operation: string[];
};

function generateFilters(transactionsList: TransactionType[]) {
  const bank = new Set<string>();
  const type = new Set<string>();
  const operation = new Set<string>();

  transactionsList.forEach((tx) => {
    bank.add(tx.bank);
    type.add(
      tx.type.replace("entradas", "Entradas").replace("saidas", "Saídas")
    );
    operation.add(tx.operation);
  });

  const filters: FilterSchema = {
    type: Array.from(type),
    bank: Array.from(bank),
    operation: Array.from(operation),
  };

  return filters;
}

export default function TransactionsFilters({
  transactions,
  filteredTransactions,
  setFilteredTransactions,
  openFilters,
  setOpenFilters,
}: {
  transactions: TransactionType[];
  filteredTransactions: TransactionType[];
  setFilteredTransactions: React.Dispatch<
    React.SetStateAction<TransactionType[]>
  >;
  openFilters: boolean;
  setOpenFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const filters = generateFilters(transactions);

  const handleCheckboxChange = (
    value: string,
    checked: boolean | "indeterminate",
    filterType: "bank" | "type" | "operation"
  ) => {
    let updatedFilters: TransactionType[] = [];
    if (checked) {
      updatedFilters = [
        ...filteredTransactions,
        ...transactions.filter(
          (transaction) => transaction[filterType] === value
        ),
      ];
    } else {
      updatedFilters = filteredTransactions.filter(
        (transaction) => transaction[filterType] !== value
      );
    }
    setFilteredTransactions(updatedFilters);
  };

  return (
    <Drawer open={openFilters} onOpenChange={setOpenFilters} direction="right">
      <DrawerContent className="overflow-y-auto overflow-x-hidden">
        <DrawerHeader className="text-left">
          <DrawerTitle>Filtros</DrawerTitle>
          <DrawerDescription>Selecione os campos desejados</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 px-4">
          {Object.keys(filters).map((obj) => {
            const group =
              obj === "bank"
                ? "Nome/Instituição"
                : obj === "type"
                ? "Tipo de pagamento"
                : "Tipo de pagamento";
            return (
              <div key={obj}>
                <h4 className="text-lg font-bold text-[var(--color-text-muted)] ">
                  {group}
                </h4>
                <hr className="mb-2 border-primary" />
                <ul className="flex flex-col gap-2">
                  {filters[obj as keyof FilterSchema].map((filter) => {
                    const transactionFilter = filter
                      .replace("Entradas", "entradas")
                      .replace("Saídas", "saidas");
                    return (
                      <li
                        key={filter}
                        className="flex flex-row justify-start items-center gap-2"
                      >
                        <Checkbox
                          className=""
                          id={filter}
                          checked={filteredTransactions.some((transaction) =>
                            transaction[obj as keyof FilterSchema].includes(
                              transactionFilter
                            )
                          )}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              transactionFilter,
                              checked,
                              obj as "bank" | "type" | "operation"
                            )
                          }
                        />
                        <Label className="text-sm font-normal" htmlFor={filter}>
                          {filter}
                        </Label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="default"
              className="w-full flex items-center justify-center gap-2"
            >
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

import { transactionList } from "@/utils/transactionsData";
import { columns } from "@/components/ui/transactions-table/TransactionsColumn";
import { DataTable } from "@/components/ui/transactions-table/TransactionsTable";

export default async function DemoPage() {
  const data = transactionList;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

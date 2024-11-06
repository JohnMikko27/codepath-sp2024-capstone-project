import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncate } from "@/utils/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  statFilter: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  statFilter
}: DataTableProps<TData, TValue> ) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const sortedData = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((row: any) => {
      const perGame = (stat: number) => truncate(stat / row.GP, 1);
      const per36 = (stat: number) => truncate((stat * 36) / row.MIN, 1);
      return {
        ...row,
        AST: statFilter === "totals" ? row.AST : statFilter === "per36" ? per36(row.AST) : perGame(row.AST),
        BLK: statFilter === "totals" ? row.AST : statFilter === "per36" ? per36(row.BLK) : perGame(row.BLK),
        DREB: statFilter === "totals" ? row.DREB : statFilter === "per36" ? per36(row.DREB) : perGame(row.DREB),
        FG3A: statFilter === "totals" ? row.FG3A : statFilter === "per36" ? per36(row.FG3A) : perGame(row.FG3A),
        FG3M: statFilter === "totals" ? row.FG3M : statFilter === "per36" ? per36(row.FG3M) : perGame(row.FG3M),
        FGA: statFilter === "totals" ? row.FGA : statFilter === "per36" ? per36(row.FGA) : perGame(row.FGA),
        FGM: statFilter === "totals" ? row.FGM : statFilter === "per36" ? per36(row.FGM) : perGame(row.FGM),
        FTA: statFilter === "totals" ? row.FTA : statFilter === "per36" ? per36(row.FTA) : perGame(row.FTA),
        FTM: statFilter === "totals" ? row.FTM : statFilter === "per36" ? per36(row.FTM) : perGame(row.FTM),
        OREB: statFilter === "totals" ? row.OREB : statFilter === "per36" ? per36(row.OREB) : perGame(row.OREB),
        PF: statFilter === "totals" ? row.PF : statFilter === "per36" ? per36(row.PF) : perGame(row.PF),
        PTS: statFilter === "totals" ? row.PTS : statFilter === "per36" ? per36(row.PTS) : perGame(row.PTS),
        REB: statFilter === "totals" ? row.REB : statFilter === "per36" ? per36(row.REB) : perGame(row.REB),
        STL: statFilter === "totals" ? row.STL : statFilter === "per36" ? per36(row.STL) : perGame(row.STL),
        TOV: statFilter === "totals" ? row.TOV : statFilter === "per36" ? per36(row.TOV) : perGame(row.TOV),
        TS_PCT: row.TS_PCT.toFixed(1),
        FT_PCT: row.FT_PCT.toFixed(1),
        FG_PCT: row.FG_PCT.toFixed(1),
        FG3_PCT: row.FG3_PCT.toFixed(1),
      };
    });
  }, [data, statFilter]);

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    }
  });

  return (
    <div className=" overflow-hidden overflow-x-scroll">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

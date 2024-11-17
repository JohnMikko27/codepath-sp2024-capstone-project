import { YearlyStats, } from "@/utils/types";
import { DataTable } from "@/components/ui/datatable";
import { ColumnDef, Column, Row } from "@tanstack/react-table";

export default function StatsDashboard(
  { playerStats, postSeason, statFilter }: 
  { playerStats: YearlyStats[], postSeason: boolean, statFilter: string }) {

  const columns: ColumnDef<YearlyStats>[] = [
    {
      accessorKey: "year",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Season
          </div>
        );
      },
    },
    {
      accessorKey: "GP",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              GP
          </div>
        );
      },
      cell: ({ row }: { row: Row<YearlyStats>}) => {
        return <div>{row.getValue("GP")}</div>;
      }
    },
    {
      accessorKey: "MIN",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                MIN
          </div>
        );
      },
    },
    {
      accessorKey: "PTS",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                PTS
          </div>
        );
      },
    }, 
    {
      accessorKey: "REB",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                REB
          </div>
        );
      },
    },
    {
      accessorKey: "AST",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                AST
          </div>
        );
      },
    },
    {
      accessorKey: "STL",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                STL
          </div>
        );
      },
    },
    {
      accessorKey: "BLK",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                BLK
          </div>
        );
      },
    },
    {
      accessorKey: "FGM",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                FGM
          </div>
        );
      },
    },
    {
      accessorKey: "FGA",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                FGA
          </div>
        );
      },
    },
    {
      accessorKey: "FG_PCT",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                FG%
          </div>
        );
      },
      cell: ({ row }: {row: Row<YearlyStats>}) => {
        return <div>{row.getValue("FG_PCT")}%</div>;
      }
    },
    {
      accessorKey: "FG3M",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                3PM
          </div>
        );
      },
    },
    {
      accessorKey: "FG3A",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                3PA
          </div>
        );
      },
    },
    {
      accessorKey: "FG3_PCT",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                3P%
          </div>
        );
      },
      cell: ({ row }: { row: Row<YearlyStats> }) => {
        return <div>{row.getValue("FG3_PCT")}%</div>;
      }
    },
    {
      accessorKey: "FTM",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                FTM
          </div>
        );
      },
    },
    {
      accessorKey: "FTA",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                FTA
          </div>
        );
      },
    },
    {
      accessorKey: "FT_PCT",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                FT%
          </div>
        );
      },
      cell: ({ row }: {row: Row<YearlyStats>}) => {
        return <div>{row.getValue("FT_PCT")}%</div>;
      }
    },
    {
      accessorKey: "TS_PCT",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                TS%
          </div>
        );
      },
      cell: ({ row }: {row: Row<YearlyStats>}) => {
        return <div>{row.getValue("TS_PCT")}%</div>;
      }
    },
    {
      accessorKey: "OREB",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                OREB
          </div>
        );
      },
    },
    {
      accessorKey: "DREB",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                DREB
          </div>
        );
      },
    },
    {
      accessorKey: "TOV",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                TOV
          </div>
        );
      },
    },
    {
      accessorKey: "PF",
      header: ({ column }: { column: Column<YearlyStats> }) => {
        return (
          <div className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                PF
          </div>
        );
      },
    }
  ];
  
  return (
    <div className="px-10">
      <div className="font-bold">
        { postSeason ? "Playoffs": "Regular Season" }
      </div>
      <div>
        <DataTable columns={columns} data={playerStats} statFilter={statFilter}/>
      </div>
    </div>
  );
}
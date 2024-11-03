/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { YearlyStats } from "@/utils/types";
import { useLoaderData } from "react-router-dom";
import { DataTable } from "@/components/ui/datatable";
// import { ArrowUpDown } from "lucide-react";
// import { ColumnDef } from "@tanstack/react-table"
// import { Button } from "@/components/ui/button";


const columns = [
  {
    accessorKey: "year",
    header: ({ column }: {column: any}) => {
      return (
        <div className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Season
          {/* <ArrowUpDown className=" m-0 h-4 w-4"/> */}
        </div>
      );
    },
  },
  {
    accessorKey: "GP",
    header: ({ column }: {column: any}) => {
      return (
        <div className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              GP
        </div>
      );
    },
    cell: ({ row }: { row: any}) => {
      // console.log(row.getValue)
      return <div>{row.getValue("GP")}</div>;
    }
  },
  {
    accessorKey: "MIN",
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
      return (
        <div className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            FG%
        </div>
      );
    },
    cell: ({ row }: {row: any}) => {
      return <div>{row.getValue("FG_PCT")}%</div>;
    }
  },
  {
    accessorKey: "FG3M",
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
      return (
        <div className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            3P%
        </div>
      );
    },
    cell: ({ row }: {row: any}) => {
      return <div>{row.getValue("FG3_PCT")}%</div>;
    }
  },
  {
    accessorKey: "FTM",
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
      return (
        <div className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            FT%
        </div>
      );
    },
    cell: ({ row }: {row: any}) => {
      return <div>{row.getValue("FT_PCT")}%</div>;
    }
  },
  {
    accessorKey: "TS_PCT",
    header: ({ column }: {column: any}) => {
      return (
        <div className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            TS%
        </div>
      );
    },
    cell: ({ row }: {row: any}) => {
      return <div>{row.getValue("TS_PCT")}%</div>;
    }
  },
  {
    accessorKey: "OREB",
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
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
    header: ({ column }: {column: any}) => {
      return (
        <div className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            PF
        </div>
      );
    },
  }
];

export default function Stats() {
  const { stats: playerStats } = useLoaderData() as { stats: YearlyStats[] };
  const [input, setInput] = useState("");
   
  const [data, setData] = useState<any[]>([...playerStats]);
  console.log("data");
  console.log(playerStats);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`submitted: ${input}`);

    const response = await fetch(`http://localhost:8000/stats/${input}`);
    const data = await response.json();
    console.log(data);
    setData([...data.stats]);
  };
  
  return (
    <div className="px-10">
      <div className="">
        <form onSubmit={handleSubmit} className="flex justify-self-center w-1/3">
          <Input value={input} onChange={handleChange}
            placeholder="Search for a player's stats..."/>
        </form>
      </div>
      <div>
        <DataTable columns={columns} data={data}/>
      </div>
    </div>
  );
}
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ErrorLog = {
  date: Date;
  url: string;
  userId: string;
  message: string;
};

export const columns: ColumnDef<ErrorLog>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "userId",
    header: "User",
  },
  {
    accessorKey: "message",
    header: "Details",
  },
];

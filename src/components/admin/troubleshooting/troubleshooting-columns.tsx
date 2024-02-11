import { type ColumnDef } from "@tanstack/react-table";
import { LinkIcon } from "lucide-react";

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
    cell: ({ row }) => {
      const url: string = row.getValue("url");
      const trimmedUrl = trimStringToLength(url, 60);

      return (
        <a className="flex gap-1 items-center hover:underline" href={row.getValue("url")}>
          {trimmedUrl} <LinkIcon className="h-3 w-3" />
        </a>
      );
    },
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

function trimStringToLength(inputString: string, maxLength: number) {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    const trimLength = maxLength - 3; // Length of the trimmed part
    const startTrim = Math.ceil(trimLength / 2); // Characters to trim from the beginning
    const endTrim = trimLength - startTrim; // Characters to trim from the end
    return (
      inputString.slice(0, startTrim) + "..." + inputString.slice(-endTrim)
    );
  }
}

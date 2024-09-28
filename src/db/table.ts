import { documentClient } from "@/db/client";
import { Table } from "dynamodb-toolbox/table";

export const mediaTable = new Table({
  documentClient,
  name: "mediaBackup",
  partitionKey: {
    name: "PK",
    type: "string",
  },
  sortKey: {
    name: "SK",
    type: "string",
  },
  indexes: {
    yearMonthPK: {
      type: "global",
      partitionKey: {
        name: "yearMonth",
        type: "string",
      },
      sortKey: {
        name: "PK",
        type: "string",
      },
    },
    isFavouritePK: {
      type: "global",
      partitionKey: {
        name: "isFavourite",
        type: "string",
      },
      sortKey: {
        name: "PK",
        type: "string",
      },
    },
    isAlbumPK: {
      type: "global",
      partitionKey: {
        name: "isAlbum",
        type: "string",
      },
      sortKey: {
        name: "PK",
        type: "string",
      },
    },
  },
});

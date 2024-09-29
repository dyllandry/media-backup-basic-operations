import { documentClient } from "@/db/client";
import { Table } from "dynamodb-toolbox/table";

export const mediaTable = new Table({
  documentClient,
  name: "mediaBackup",
  partitionKey: {
    name: "pk",
    type: "string",
  },
  sortKey: {
    name: "sk",
    type: "string",
  },
  indexes: {
    yearMonthPk: {
      type: "global",
      partitionKey: {
        name: "yearMonth",
        type: "string",
      },
      sortKey: {
        name: "pk",
        type: "string",
      },
    },
    isFavouritePk: {
      type: "global",
      partitionKey: {
        name: "isFavourite",
        type: "string",
      },
      sortKey: {
        name: "pk",
        type: "string",
      },
    },
    isAlbumPk: {
      type: "global",
      partitionKey: {
        name: "isAlbum",
        type: "string",
      },
      sortKey: {
        name: "pk",
        type: "string",
      },
    },
  },
});

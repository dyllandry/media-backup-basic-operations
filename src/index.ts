import { Table } from "dynamodb-toolbox/table";
import { Entity } from "dynamodb-toolbox/entity";
import { schema } from "dynamodb-toolbox/schema";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { number, record, string } from "dynamodb-toolbox";

const dynamoDBClient = new DynamoDBClient();

const documentClient = DynamoDBDocumentClient.from(
  dynamoDBClient,
  // // DYLAN: I want to try no options for now to see what it is like without them.
  // {
  //   marshallOptions: {
  //     // Specify your client options as usual
  //     // removeUndefinedValues: true,
  //     // convertEmptyValues: false
  //   }
  // }
);

// Define a Table
const mediaTable = new Table({
  documentClient,
  name: "mediaBackup",
  partitionKey: {
    // TODO: Once this is working, consider renaming PK and SK to lowercase.
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

// TODO: Try writing queries for the photoCount before moving onto other
// entities. I don't want to make them all wrong before finding out.
// Define an entity
const photoCountEntity = new Entity({
  name: "photoCount",
  // Assign it to a table
  table: mediaTable,
  // Specify its schema
  schema: schema({
    PK: string().key(),
    SK: string().key(),
    data: record(
      string().validate((year) => {
        const typeofYear = typeof year;
        if (typeofYear !== "string") {
          return `The year should be a string. We got value ${year} with type ${typeofYear}.`;
        }
        const yearInt = parseInt(year);
        if (yearInt < 2000) {
          return `I'm pretty sure I will not have any photos taken before the year 2000. We got the value ${yearInt}`;
        }
        return true;
      }),
      record(
        string().enum(
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ),
        number().validate((numPhotosInMonth) => {
          if (numPhotosInMonth >= 0) {
            return true;
          }
          return `Number of photos in month must be greater than or equal to 0. Got ${numPhotosInMonth}.`;
        }),
      ),
    ).required("always"),
  }),
});

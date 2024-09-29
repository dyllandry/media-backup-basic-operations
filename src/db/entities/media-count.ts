import assert from "node:assert/strict";
import { Entity } from "dynamodb-toolbox/entity";
import { schema } from "dynamodb-toolbox/schema";
import { number, record, string } from "dynamodb-toolbox/attributes";

import { mediaTable } from "@/db/table";
import { GetItemCommand, PutItemCommand } from "dynamodb-toolbox";

export const mediaCountEntity = new Entity({
  name: "mediaCount",
  table: mediaTable,
  schema: schema({
    pk: string().key().default("mediaCount"),
    sk: string().key().default("info"),
    data: record(
      string().validate((year) => {
        const typeofYear = typeof year;
        if (typeofYear !== "string") {
          return `The year should be a string. We got value ${year} with type ${typeofYear}.`;
        }
        const yearInt = parseInt(year);
        if (yearInt < 2000) {
          return `I'm pretty sure I will not have any media from before the year 2000. We got the value ${yearInt}`;
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
        number().validate((numMediaInMonth) => {
          if (numMediaInMonth >= 0) {
            return true;
          }
          return `Number of media in month must be greater than or equal to 0. Got ${numMediaInMonth}.`;
        }),
      ),
    ).required("always"),
  }),
});

export async function seedMediaCount() {
  await mediaCountEntity
    .build(PutItemCommand)
    .item({
      data: {
        "2024": {
          "9": 1,
        },
      },
    })
    .send();
}

export async function getMediaCount() {
  const response = await mediaCountEntity
    .build(GetItemCommand)
    .key({ pk: "mediaCount", sk: "info" })
    .send();
  const mediaCount = response.Item;
  assert(mediaCount, "Cannot get media count, the media count is missing.");
  return response.Item;
}

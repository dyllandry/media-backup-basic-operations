import assert from "node:assert/strict";
import { Entity } from "dynamodb-toolbox/entity";
import { schema } from "dynamodb-toolbox/schema";
import { boolean, string } from "dynamodb-toolbox/attributes";
import { GetItemCommand, prefix, PutItemCommand } from "dynamodb-toolbox";

import { mediaTable } from "@/db/table";

export const mediaEntity = new Entity({
  name: "media",
  table: mediaTable,
  schema: schema({
    id: string().key().savedAs("pk").transform(prefix("media")),
    sk: string().key().default("info"),
    dateTaken: string().required(),
    // TODO: generate based off of dateTaken using link https://www.dynamodbtoolbox.com/docs/schemas/defaults-and-links#links
    yearMonth: string().required(),
    filename: string().required(),
    url: string().required(),
    isFavourite: boolean().optional(),
  }),
});

export async function seedMedia() {
  const randomId = "a1b2c3";
  await mediaEntity
    .build(PutItemCommand)
    .item({
      id: randomId,
      dateTaken: "2024-09-29T10:58:00Z",
      yearMonth: "2024-09",
      filename: "my-media.jpg",
      url: "www.s3.com/my-media.jpg",
    })
    .send();
  return getMedia(randomId);
}

export async function getMedia(id: string) {
  const response = await mediaEntity.build(GetItemCommand).key({ id }).send();
  const media = response.Item;
  assert(media, `Cannot get media with id ${id}, media does not exist.`);
  return media;
}

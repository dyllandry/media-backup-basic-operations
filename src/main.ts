import { GetItemCommand, PutItemCommand } from "dynamodb-toolbox";
import {
  getMediaCount,
  mediaCountEntity,
  seedMediaCount,
} from "./db/entities/media-count";

main()
  .then(() => {
    console.log("Program done, no error.");
  })
  .catch((error) => {
    console.error("Program stopped, got error!");
    console.error(error);
  });

async function main() {
  const seedTestData = async () => {
    console.log("Seeding test data...");
    // TODO: seed photos
    // TODO: seed album
    await seedMediaCount();
    console.log("Seeding done.");
  };

  await seedTestData();

  const mediaCount = await getMediaCount();
  console.log(mediaCount);
}

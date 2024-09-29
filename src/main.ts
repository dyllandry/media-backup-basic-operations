import { seedMediaCount } from "./db/entities/media-count";
import { seedMedia } from "./db/entities/media";

main()
  .then(() => {
    console.log("Program done, no error.");
  })
  .catch((error) => {
    console.error("Program stopped, got error!");
    console.error(error);
  });

async function main() {
  const { media, mediaCount } = await seedTestData();
  console.log(mediaCount);
  console.log(media);
}

async function seedTestData() {
  console.log("Seeding test data...");
  const mediaCount = await seedMediaCount();
  const media = await seedMedia();
  console.log("Seeding done.");
  return { mediaCount, media };
}

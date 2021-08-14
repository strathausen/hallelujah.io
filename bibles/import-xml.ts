import cheerio from "cheerio";
import fs from "fs";

const content = fs.readFileSync("./eng-kjv.osis.xml", "utf8");

const $ = cheerio.load(content);

$("[type=bookgroup]>[type=book] p").each((i, p) => {
  const verses = $("verse", p);
  verses.each((j, verse) => {
    const osisID = $(verse).attr("osisid");
    if (osisID !== undefined) console.log(i, osisID);
  });
});

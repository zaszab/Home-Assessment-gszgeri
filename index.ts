import * as crypto from "crypto";
import * as nodeFs from "fs";

class FS {
  private rootDirectory: string;
  constructor(directory: string) {
    this.rootDirectory = directory;
  }
  private async Hashales(content: string): Promise<string> {
    const hash = crypto.createHash("md5");
    hash.update(content);
    return hash.digest("hex");
  }
  async store(filename: string, content: string): Promise<void> {
    const hash = await this.Hashales(content);

    const filePath = `${this.rootDirectory}/${filename}.txt`;
    if (!nodeFs.existsSync(filePath)) {
      nodeFs.writeFileSync(filePath, content);
    }
  }
  async get(filename: string): Promise<string | null> {
    const filePath = `${this.rootDirectory}/${filename}.txt`;
    try {
      return await nodeFs.readFileSync(filePath, "utf8");
    } catch (error) {
      return null;
    }
  }
}
const fs = new FS("./topdir");

fs.store("elso", "a very long string1");
fs.store("masodik", "a very long string1");
fs.store("harmadik", "a very long string3");
fs.get("elso").then((result1) => {
  console.log(result1);
});

fs.get("masodik").then((result2) => {
  console.log(result2);
});

fs.get("harmadik").then((result3) => {
  console.log(result3);
});

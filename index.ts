import * as crypto from "crypto";
import * as nodeFs from "fs";

class FS {
  private rootDirectory: string;

  private hashMapDirectory = './hashmaps';

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

    const filePath = this.getFilePath(hash);
    if (!nodeFs.existsSync(filePath)) {
      nodeFs.writeFileSync(filePath, content);
    }
    const hashPath = this.getHashPath(filename);
    nodeFs.writeFileSync(hashPath, hash);
  }
  
  async get(filename: string): Promise<string | null> {
    const hashPath = this.getHashPath(filename);

    try {
      const hash = nodeFs.readFileSync(hashPath, "utf8");
      const filePath = this.getFilePath(hash);
      return nodeFs.readFileSync(filePath, "utf8");
    } catch (error) {
      return null;
    }
  }

  private getFilePath(str: string): string {
    return `${this.rootDirectory}/${str}`;
  }

  private getHashPath(str: string): string {
    return `${this.hashMapDirectory}/${str}`;
  }
}
const fs = new FS("./topdir");

(async() => {
  fs.store("elso", "a very long string1");
  fs.store("masodik", "a very long string1");
  fs.store("harmadik", "a very long string3");
  const result1 = await fs.get("elso");
  console.log(result1);
  
  const result2 = await fs.get("masodik");
  console.log(result2);
  
  const result3 = await fs.get("harmadik")
  console.log(result3);
})()

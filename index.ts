import * as crypto from "crypto";
import * as nodeFs from "fs";

class FS {
  private rootDirectory: string;

  private hashMapDirectory = './hashmaps';

  constructor(directory: string) {
    this.rootDirectory = directory;
    this.createDirIfNotExists(this.hashMapDirectory);
    this.createDirIfNotExists(this.rootDirectory);
  }

  public async store(filename: string, content: string): Promise<void> {
    const hash = this.getHash(content);

    const filePath = this.getFilePath(hash);
    if (!nodeFs.existsSync(filePath)) {
      nodeFs.writeFileSync(filePath, content);
    }
    const hashPath = this.getHashPath(filename);
    nodeFs.writeFileSync(hashPath, hash);
  }

  public async get(filename: string): Promise<string | null> {
    const hashPath = this.getHashPath(filename);

    try {
      const hash = nodeFs.readFileSync(hashPath, "utf8");
      const filePath = this.getFilePath(hash);
      return nodeFs.readFileSync(filePath, "utf8");
    } catch (error) {
      return null;
    }
  }

  private createDirIfNotExists(directory: string): void {
    if (!nodeFs.existsSync(directory)) {
      nodeFs.mkdirSync(directory);
    }
  }

  private getHash(content: string): string {
    return crypto.createHash("md5").update(content).digest("hex");
  }

  private getFilePath(str: string): string {
    return `${this.rootDirectory}/${str}`;
  }

  private getHashPath(str: string): string {
    return `${this.hashMapDirectory}/${str}`;
  }
}
const fs = new FS("./topdir2");

(async() => {
  fs.store("elso", "a very long string1");
  fs.store("masodik", "a very long string1");
  fs.store("harmadik", "a very long string3");
  fs.store("elso", "a very long string3");
  const result1 = await fs.get("elso");
  console.log(result1);
  
  const result2 = await fs.get("masodik");
  console.log(result2);
  
  const result3 = await fs.get("harmadik")
  console.log(result3);
})()

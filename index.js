"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const nodeFs = __importStar(require("fs"));
class FS {
    rootDirectory;
    constructor(directory) {
        this.rootDirectory = directory;
    }
    async Hashales(content) {
        const hash = crypto.createHash("md5");
        hash.update(content);
        return hash.digest("hex");
    }
    async store(filename, content) {
        const hash = await this.Hashales(content);
        const filePath = `${this.rootDirectory}/${filename}.txt`;
        if (!nodeFs.existsSync(filePath)) {
            nodeFs.writeFileSync(filePath, content);
        }
    }
    async get(filename) {
        const filePath = `${this.rootDirectory}/${filename}.txt`;
        try {
            return await nodeFs.readFileSync(filePath, "utf8");
        }
        catch (error) {
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

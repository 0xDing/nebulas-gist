/// <reference path="./types.d.ts" />

class GistItem {
  version: number;
  title: string;
  content: string;
  encrypted: boolean;
  author: string;
  createdAt: string;

  constructor(data="{}") {
    const {version, title, content, encrypted, author, createdAt} = JSON.parse(data);
    this.version = version || 1;
    this.title = title;
    this.content = content;
    this.encrypted = encrypted;
    this.author = author;
    this.createdAt = createdAt || Date.now().toString()
  }

  toString() {
    return JSON.stringify(this)
  }
}

class NebulasGistContract {

  constructor() {
    LocalContractStorage.defineMapProperty(this, "repo", {
      parse(text) {
        return new GistItem(text);
      },
      stringify(o) {
        return o.toString();
      }
    });
  }

  init() {

    // nothing

  }

  create(key: string, value: string) {

    key = key.trim();
    value = value.trim();
    if (key === "" || value === ""){
      throw new Error("empty filename or content");
    }
    if (key.length > 255){
      throw new Error("filename exceed limit length")
    }

    const {title, content, encrypted} = JSON.parse(value);

    const gist = this.repo.get(key);
    if (gist){
      throw new Error("gist has been occupied");
    }

    const from = Blockchain.transaction.from;
    let gistItem = new GistItem();
    gistItem.author = from;
    gistItem.title = title;
    gistItem.content = content;
    gistItem.encrypted = encrypted;
    this.repo.put(key, gistItem);
  }

  update(key: string, value: string){
    key = key.trim();
    value = value.trim();
    if (key === "" || value === ""){
      throw new Error("empty filename or content");
    }
    const GistItem = this.repo.get(key);
    if (!GistItem){
      throw new Error("gist hasn't been occupied");
    }
    let gistItem = new GistItem(GistItem);
    gistItem.version = gistItem.version+1;
    gistItem.createAt = Date.now().toString();
    this.repo.put(key, gistItem);
  }



  get(key: string) {
    key = key.trim();
    if (key === "") {
      throw new Error("empty key")
    }
    return this.repo.get(key);
  }

}

module.exports = NebulasGistContract;

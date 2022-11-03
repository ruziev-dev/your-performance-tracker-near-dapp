import { Web3Storage, Filelike } from "web3.storage/dist/bundle.esm.min";
//import { Web3Storage } from "web3.storage";

const IPFS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc4OEE4ZjU5NGViMkUyOWM1QWNCNkNlN2Q2ODk4YTZkREQ1NzY3QWQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjczODg5MzkzOTMsIm5hbWUiOiJwZXJmb3JtYW5jZS10cmFja2VyLW5lYXItZGFwcCJ9.luXW4LMSQPMtL7IcmX_pyTHFWCjrhMqsj6L47UOeMI4";

class Ipfs {
  private client = new Web3Storage({ token: IPFS_API_KEY });

  async getFile(cid: string): Promise<File> {
    const resp = await this.client.get(cid);
    const files = await resp.files();
    return files?.[0];
  }

  async addFile(data: Filelike) {
    const result = await this.client.put([data], {
      name: data.name,
      maxRetries: 3,
    });
    return result;
  }
}

export const ipfs = new Ipfs();

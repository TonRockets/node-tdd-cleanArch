import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect('localhost:27017/test')
  },

  async disconnect(): Promise<void> {
    this.client.close()
  }
}

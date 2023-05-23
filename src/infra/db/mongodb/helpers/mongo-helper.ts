import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect(): Promise<void> {
    this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },

  // N/A
  // map: (collection: any): any => {
  //   const { _id, ...collectionWithoutId } = collection
  //   return Object.assign({}, collectionWithoutId, { id: _id })
  // }
}

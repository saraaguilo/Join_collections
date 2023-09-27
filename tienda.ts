import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IStore {
  name: string;
  location: string;
  price_disk_song: number; //prices comparison between different stores
  
}
// 2. Create a Schema corresponding to the document interface.
const storeSchema = new Schema<IStore>({
    name: { type: String, required: true, unique : true },
    location: { type: String, required: true },
    price_disk_song: { type: Number, required: true },
    
});

// 3. Create a Model.
const Store = model<IStore>('Store', storeSchema);

run().catch(err => console.log(err));

async function run() {
    // 4. Connect to MongoDB
    await connect('mongodb://127.0.0.1:27017/test');
  
    // CREATE
  const storeNameToCreate = 'Boutique';
  const existingStore = await Store.findOne({ name: storeNameToCreate });

  if (!existingStore) {
    // La tienda con el mismo nombre no existe, crea una nueva tienda
    const store = new Store({
      name: storeNameToCreate,
      location: 'Boulevard Street',
      price_disk_song: 30,
    });
    await store.save();
    console.log('Store created:', store);
  } else {
    console.log('Store with the same name already exists:', existingStore);
  }

  
    // READ
    const storeFromDB = await Store.findOne({ name: 'Boutique' });
    if (storeFromDB) {
      console.log('Store found:', storeFromDB);
    } else {
      console.log('Store not found.');
    }
  
    // UPDATE (si los documentos se encontraron)
    if (storeFromDB) {
      storeFromDB.price_disk_song = 35;
      await storeFromDB.save();
      console.log('Store price updated:', storeFromDB.price_disk_song);
    }
  /*
    // DELETE (si los documentos se encontraron)
    if (storeFromDB) {
      await Store.deleteOne({ _id: storeFromDB._id });
      console.log('Store deleted');
    } 
  */
    
  }
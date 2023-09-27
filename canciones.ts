import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface ISong {
  name: string;
  duration: number;
  artist: string;
  
}
// 2. Create a Schema corresponding to the document interface.
const songSchema = new Schema<ISong>({
    name: { type: String, required: true, unique : true },
    duration: { type: Number, required: true },
    artist: String,
    
});

// 3. Create a Model.
const Song = model<ISong>('Song', songSchema);

run().catch(err => console.log(err));

async function run() {
    // 4. Connect to MongoDB
    await connect('mongodb://127.0.0.1:27017/test');
  
    // CREATE
  const songNameToCreate = 'Marianela';
  const existingSong = await Song.findOne({ name: songNameToCreate });

  if (!existingSong) {
    // La canción con el mismo nombre no existe, crea una nueva canción
    const song = new Song({
      name: songNameToCreate,
      duration: 157,
      artist: 'Sara'
    });
    await song.save();
    console.log('Song created:', song);
  } else {
    console.log('Song with the same name already exists:', existingSong);
  }
    /* la song2 daria error, porque tiene el mismo name que la primera y hemos puesto unique en esquema
    const song2 = new Song({
        name: 'Marianela',
        duration: 157,
        artist: 'dfgdfg'
      });
      await song.save();
      console.log('Song created:', song);
  */
    // READ
    const songFromDB = await Song.findOne({ name: 'Marianela' });
    if (songFromDB) {
      console.log('Song found:', songFromDB);
    } else {
      console.log('Song not found.');
    }
  
    // UPDATE (si los documentos se encontraron)
    if (songFromDB) {
      songFromDB.duration = 180;
      await songFromDB.save();
      console.log('Song updated:', songFromDB);
    }
  /*
    // DELETE (si los documentos se encontraron)
    if (songFromDB) {
      await Song.deleteOne({ _id: songFromDB._id });
      console.log('Song deleted');
    } 
  */
    
  }
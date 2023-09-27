import { Schema, model, connect } from "mongoose";

// Definir el esquema de las canciones
const songSchema = new Schema({
  name: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  artist: String,
});

// Definir el esquema de las tiendas
const storeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  price_disk_song: { type: Number, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }], // Lista de canciones disponibles en la tienda
});

// Crear los modelos para las canciones y las tiendas
const Song = model("Song", songSchema);
const Store = model("Store", storeSchema);

async function run() {
  // Conectar a MongoDB
  await connect("mongodb://127.0.0.1:27017/test");

  // Crear canciones
  const song1 = new Song({
    name: "Hola",
    duration: 156,
    artist: "Mario Star",
  });
  await song1.save();

  const song2 = new Song({
    name: "Another Love",
    duration: 180,
    artist: "Mike",
  });
  await song2.save();

  // Crear una tienda con las canciones disponibles
  const store = new Store({
    name: "Blessed",
    location: "Elm Street",
    price_disk_song: 30,
    songs: [song1._id, song2._id], // Agregar las canciones disponibles aquí
  });
  await store.save();

  console.log("Store created:", store);
}

run().catch((err) => console.log(err));

//utilitzar populate

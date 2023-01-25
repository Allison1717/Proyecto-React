/* -------------- BACK-END (API, database, servicio) -------------- */
const databaseItems = [
  {
    id: 1,
    title: "Dímelo Bajito",
    price: 89,
    gender: "Libros juveniles",
    author: "Mercedes Ron, 2020",
    imgurl: "/assets/dimeloBajito.webp",
    reseña:
      "Kamila Hamilton lo tenía todo bajo control... o eso creía: no entraba en sus planes que los hermanos Di Bianco volviesen de nuevo para poner su mundo al revés. Thiago fue quien le dio su primer beso. Taylor el que siempre la protegió. El regreso de los hermanos hace que la vida aparentemente perfecta de Kami se tambalee. Ella ya no es la niña inocente que conocieron: desde que se fueron, parece que nadie puede acceder realmente a ella... nadie excepto ellos. ¿Podrá resistirse Kami a la simple presencia de Thiago? ¿Qué sucederá cuando Taylor comience a mirarla diferente? ¿Estallará todo en mil pedazos una vez más?",
  },
  {
    title: "Manual del Terror",
    price: 41,
    gender: "Terror",
    author: "Paul Van Loon, 2018",
    imgurl: "/assets/manualDelTerror.webp",
  },
  {
    id: 3,
    title: "Aoha Ride",
    price: 52,
    gender: "Manga",
    author: "Ao Sakisaka, 2015",
    imgurl: "/assets/aohaRide.webp",
  },
  {
    id: 4,
    title: "Crisis Infinita (3er Edición)",
    price: 197,
    gender: "Cómic",
    author: "Geoff Johns , 2021",
    imgurl: "/assets/crisisInfinita.webp",
  },
  {
    id: 5,
    title: "Guardianes de la noche 1",
    price: 53,
    gender: "Manga",
    author: "Koyoharu Gotouge , 2019",
    imgurl: "/assets/guardianesDeLaNoche1.webp",
  },
  {
    id: 6,
    title: "La química del amor",
    price: 98,
    gender: "Libros juveniles",
    author: "Ali Hazelwood , 2022",
    imgurl: "/assets/laQuimicaDelAmor.webp",
  },
  {
    id: 7,
    title: "Kingdome Come",
    price: 162,
    gender: "Cómic",
    author: "Mark Waid, Alex Ross , 2020",
    imgurl: "/assets/kingdomeCome.webp",
  },
  {
    id: 8,
    title: "Jocker: Quien rie último",
    price: 59,
    gender: "Cómic",
    author: "Varios autores , 2018",
    imgurl: "/assets/jocker.webp",
  },
  {
    id: 9,
    title: "La Guerra Infinito 7",
    price: 45.9,
    gender: "Cómic",
    author: "Varios autores , 2018",
    imgurl: "/assets/laGuerraInfinito7.webp",
  },
  {
    id: 10,
    title: "Saga La Selección",
    price: 199,
    gender: "Libros juveniles",
    author: "Kiera Cass , 2022",
    imgurl: "/assets/sagaLaSeleccion.webp",
  },
  {
    id: 11,
    title: "Como el Hielo",
    price: 50,
    gender: "Libros juveniles",
    author: "Jennifer L. Armentrout , 2022",
    imgurl: "/assets/comoElHielo.webp",
  },
  {
    id: 12,
    title: "Isis:Inside The Aarmy of Terror",
    price: 46,
    gender: "Terror",
    author: "Michael Weiss , 2016",
    imgurl: "/assets/isis.webp",
  },
  {
    id: 13,
    title: "Cujo",
    price: 59,
    gender: "Terror",
    author: "King Stephen , 2015",
    imgurl: "/assets/cujo.jpg",
  },
  {
    id: 14,
    title: "Justice League VOL 01",
    price: 120,
    gender: "Cómic",
    author: "Geoff Johns, 2013",
    imgurl: "/assets/justiceLeagueVOL1.webp",
  },
  {
    id: 15,
    title: "Inuyasha",
    price: 45.3,
    gender: "Manga",
    author: "Rumiko Takahashi, 2014",
    imgurl: "/assets/inuyasha.webp",
  },
  {
    id: 16,
    title: "Vengadores:La Era de Ultrón",
    price: 120,
    gender: "Cómic",
    author: "Brina Michael Bendis, 2015",
    imgurl: "/assets/vengadoresLaEraDeUltron.webp",
  },
  {
    id: 17,
    title: "It (eso)",
    price: 89,
    gender: "Terror",
    author: "King Stephen , 2022",
    imgurl: "/assets/it.webp",
  },
  {
    id: 18,
    title: "Relatos cortos de terror",
    price: 63.8,
    gender: "Terror",
    author: "Martin Mateos Carlos , 2021",
    imgurl: "/assets/relatosCortosDeTerror.jpg",
  },
  {
    id: 19,
    title: "Miradas Azucaradas",
    price: 68,
    gender: "Libros juveniles",
    author: "Zelá Brambillé, 2018",
    imgurl: "/assets/miradasAzucaradas.webp",
  },
  {
    id: 20,
    title: "Dragon Ball Super, VOL 04",
    price: 98,
    gender: "Manga",
    author: "Akira Toriyama , 2019",
    imgurl: "/assets/dragonBallSuperVOL04.webp",
  },
];

function getItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(databaseItems);
    }, 1);
  });
}

export function getSingleItem(itemid) {
  // 3. Usamos find para encontrar el producto deseado
  let itemReq = databaseItems.find((item) => {
    //console.log(item, itemid);
    return item.id === parseInt(itemid);
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (itemReq !== undefined) resolve(itemReq);
      else reject("Libro no encontrado en la base de datos.");
    }, 200);
  });
}

export function getItemsByGender(genderid) {
  let itemsCat = databaseItems.filter((item) => item.gender === genderid);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(itemsCat);
    }, 200);
  });
}
export default getItems;

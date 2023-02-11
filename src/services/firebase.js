// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
  addDoc,
  limit,
  orderBy,
  writeBatch,
} from "firebase/firestore";
//1. Iniciar la conexión a firestore
const firebaseConfig = {
  apiKey: "AIzaSyDve4ECCijn18qnRsr2tHRztKsjQgzklCo",
  authDomain: "la-casa-del-libro.firebaseapp.com",
  projectId: "la-casa-del-libro",
  storageBucket: "la-casa-del-libro.appspot.com",
  messagingSenderId: "169767342293",
  appId: "1:169767342293:web:90a4f33d1485fbf790125c",
  measurementId: "G-TY65D6RC9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funcion que retorna todos los items de la colección "Libros"
export async function getItems() {

  const librosCollection = collection(db, "libros");
  const q = query(
    librosCollection,
    orderBy("index"),
    orderBy("price"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);

  const dataDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return dataDocs;
}
export function getItemsPromise() {
  return new Promise((resolve, reject) => {
    const librosCollectionRef = collection(db, "libros");
    const q = query(librosCollectionRef, orderBy("index"), limit(10));

    getDocs(q).then((querySnapshot) => {
      const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      resolve(dataDocs);
    });
  });
}
// Funcion que retorna un documento segun su ID
export  async function getSingleItem(itemid) {
  // 1. Necesito una referencia a la colección
  const librosCollectionRef = collection(db, "productos");

  // 2. Referencia al documento
  const librosRef = doc(librosCollectionRef, itemid);

  // 3. Recibimos el snap del doc con getDoc(referencia)
  const snapshot = await getDoc(librosRef);

  return { ...snapshot.data(), id: snapshot.id };
}

//Funcion que retorna docs de una colección segun una Query o "consulta"
export  async function getItemsByGender(genderid) {
  
  const librosCollectionRef = collection(db, "libros");
  const q = query(librosCollectionRef, where("gender", "==", genderid));
  const querySnapshot = await getDocs(q);
  const dataDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(dataDocs);
}
export async function createBuyOrder(order) {
  const ordersCollection = collection(db, "orders");

  const orderDoc = await addDoc(ordersCollection, order);
  return orderDoc.id;
  // resolve(orderDoc.id)
}
export async function exportData() {
  const librosCollectionRef = collection(db, "products");
  
  const libros = [
    {
      id: 1,
      title: "Dímelo Bajito",
      price: 89,
      gender: "Libros-Juveniles",
      author: "Mercedes Ron, 2020",
      imgurl: "/assets/dimeloBajito.webp",
      stock: 20,
      discount: 15,
      reseña:
        "Kamila Hamilton lo tenía todo bajo control... o eso creía: no entraba en sus planes que los hermanos Di Bianco volviesen de nuevo para poner su mundo al revés. Thiago fue quien le dio su primer beso. Taylor el que siempre la protegió. El regreso de los hermanos hace que la vida aparentemente perfecta de Kami se tambalee. Ella ya no es la niña inocente que conocieron: desde que se fueron, parece que nadie puede acceder realmente a ella... nadie excepto ellos. ¿Podrá resistirse Kami a la simple presencia de Thiago? ¿Qué sucederá cuando Taylor comience a mirarla diferente? ¿Estallará todo en mil pedazos una vez más?",
    },
    {
      id:2,
      title: "Manual del Terror",
      price: 41,
      gender: "Terror",
      author: "Paul Van Loon, 2018",
      imgurl: "/assets/manualDelTerror.webp",
      stock: 20,
      reseña: "¿Cómo saber si alguien es un vampiro? ¿Existen los zombis de verdad... Y las brujas? ¿Cómo se convierte alguien en hombre lobo? ¿Dónde están las casas encantadas más famosas del mundo? Si te gustan las historias de terror y estremecerte de miedo con sus protagonistas, ¡este libro es para ti! En él encontrarás información sobre el origen de las criaturas más espeluznantes, sus hábitos, las formas que adoptan y cómo luchar contra ellas. Con las singulares ilustraciones de Axel Scheffler, en este Manual del terror hallarás también anécdotas o recomendaciones de libros y películas para convertirte en todo un experto del terror.",
    },
    {
      id: 3,
      title: "Aoha Ride",
      price: 52,
      gender: "Mangas",
      author: "Ao Sakisaka, 2015",
      imgurl: "/assets/aohaRide.webp",
      stock: 20,
      reseña: "Ao Haru Ride muestra las vicisitudes de la vida en el instituto: la amistad, la dificultad de entablar relaciones con otros compañeros con personalidades distintas, el primer amor… mediante la emotiva historia que protagonizan Futaba y Kou. En la preparatoria, Futaba decide torcer su imagen de chica tímida y marginada en clase, pero tendrá que superar nuevos obstáculos ante la oportunidad de conquistar a Kou, quien pudo haber sido su romance de secundaria pero no pudo ser.",
    },
    {
      id: 4,
      title: "Crisis Infinita (3er Edición)",
      price: 197,
      gender: "Cómics",
      author: "Geoff Johns , 2021",
      imgurl: "/assets/crisisInfinita.webp",
      stock: 20,
      discount: 10,
      reseña:"Los robots OMAC están arrasándolo todo, la magia muere, los villanos se unen y la guerra causa estragos en todo el espacio. En ese momento crítico, los tres héroes más grandes de la Tierra, Superman, Batman y Wonder Woman, andan divididos. Pero otros héroes del pasado, a los que habíamos perdido de vista hace mucho tiempo, han vuelto para poner las cosas en su sitio... a cualquier precio. Algunos héroes vivirán, otros morirán ¡y el Universo DC nunca volverá a ser el mismo! Tras narrar el regreso de Hal Jordan en la serie limitada Green Lantern: Renacimiento (Green Lantern de Geoff Johns núm. 1), Geoff Johns se embarcó en el desarrollo de Crisis Infinita, secuela de la mítica Crisis en Tierras Infinitas. Todos los personajes del Universo DC, liderados por iconos de la talla de Batman, Superman y Wonder Woman, participan en un evento de proporciones colosales, clave para el desarrollo moderno de nuestros héroes y villanos favoritos. ¡Con el arte de Phil Jiménez e Ivan Reis y la colaboración especial del mismísimo George Pérez, uno de los responsables de la saga original!",
    },
    {
      id: 5,
      title: "Guardianes de la noche 1",
      price: 53,
      gender: "Mangas",
      author: "Koyoharu Gotouge , 2019",
      imgurl: "/assets/guardianesDeLaNoche1.webp",
      stock: 20,
      reseña: "¡Shonen fantástico ambientado en el Japón feudal! Tanjirou Kamado es un chico alegre y trabajador que vive feliz mente junto a su familia, hasta que un fatídico día un demonio llamado Muzan irrumpe en su vida matando a sus padres y maldiciendo a su hermana pequeña convirtiéndola en demonio. Tras el incidente, y con el propósito de vengar a sus padres y devolver a su hermana Nezuko a la normalidad, decide convertirse en un asesino de demonios. Para ello, acude en ayuda de Sakonji Urokodaki, uno de los asesinos de demonios más fuertes del mundo...Entre samuráis, afiladas katanas, demonios y otros seres mitológicos del folklore japonés, este manga es una apuesta segura para los amantes del género.",
    },
    {
      id: 6,
      title: "La química del amor",
      price: 98,
      gender: "Libros-Juveniles",
      author: "Ali Hazelwood , 2022",
      imgurl: "/assets/laQuimicaDelAmor.webp",
      stock: 20,
      reseña:"Una nueva comedia romántica situada en la NASA en la que una científica se ve obligada a trabajar en un proyecto junto a su archienemigo... con resultados explosivos. Bee Königswasser se rige siempre por un código muy sencillo: ¿qué haría Marie Curie? Si la NASA le ofreciera liderar un proyecto de neuroingeniería, un sueño hecho realidad después de pasarse años malviviendo con las migajas del mundo académico, Marie aceptaría sin dudarlo. Obvio. Pero la madre de la física moderna nunca tuvo que codirigir ningún proyecto con Levi Ward. A ver, Levi no está nada mal: es alto, moreno y tiene una mirada de lo más penetrante. Pero Levi dejó muy claros sus sentimientos por Bee en la universidad: es mejor que dos enemigos trabajen cada uno en su propia galaxia muy muy lejana. De pronto, Bee se encuentra con que su material ha desaparecido, el personal pasa de ella y su maltrecha carrera profesional pende de un hilo. Puede que su lóbulo occipital esté jugándole una mala pasada, pero juraría que Levi empieza a convertirse en su aliado, apoyando sus decisiones, secundando sus ideas... devorándola con esa mirada suya. Y las diferentes posibilidades traen a sus neuronas de cabeza. Sin embargo, cuando llega el momento de jugársela y arriesgar el corazón, solo hay una pregunta que importe: ¿Qué hará Bee Königswasser?",
    },
    {
      id: 7,
      title: "Kingdome Come",
      price: 162,
      gender: "Cómics",
      author: "Mark Waid, Alex Ross , 2020",
      imgurl: "/assets/kingdomeCome.webp",
      stock: 20,
      reseña: "Superman se ha retirado y, sin su influencia, el mundo ha aceptado a una nueva generación de héroes, encabezados por un controvertido vigilante llamado Magog, que recurren a la violencia y a la barbarie para impartir su particular visión de la justicia. No obstante, la amenaza de un futuro apocalíptico fuerza el regreso del Hombre de Acero... y el choque con los recién llegados será inevitable."
    },
    {
      id: 8,
      title: "Jocker: Quien rie último",
      price: 59,
      gender: "Cómics",
      author: "Varios autores , 2018",
      imgurl: "/assets/jocker.webp",
      stock: 20,
      discount: 15,
      reseña: "El Joker acaba de recibir malas noticias del médico. Encerrado en la Losa, una cárcel especialmente diseñada para retener a delincuentes con superpoderes, instiga un motín que tan solo es la primera parte de un plan que pasa por preservar a toda costa su legado de terror.",
    },
    {
      id: 9,
      title: "La Guerra Infinito 7",
      price: 45.9,
      gender: "Cómics",
      author: "Varios autores , 2018",
      imgurl: "/assets/laGuerraInfinito7.webp",
      stock: 20,
      discount: 15,
      reseña:"Llega la segunda gran saga dentro del proyecto de Jim Starlin en los años noventa. ¡Adam Warlock ha vuelto, pero el Magus, su lado oscuro personificado, tampoco se ha quedado atrás! Es entonces cuando se desata la lucha por el mayor poder del universo.",
    },
    {
      id: 10,
      title: "Saga La Selección",
      price: 199,
      gender: "Libros-Juveniles",
      author: "Kiera Cass, 2022",
      imgurl: "/assets/sagaLaSeleccion.webp",
      stock: 20,
      reseña:"Las cinco novelas de la maravillosa serie La Selección de Kiera Cass reunidas por primera vez en un maravilloso estuche.Para treinta y cinco chicas, La Selección es una oportunidad que solo se presenta una vez en la vida. La oportunidad de escapar de la vida que les ha tocado por nacer en una determinada familia. La oportunidad de que las trasladen a un mundo de trajes preciosos y joyas que no tienen precio. La oportunidad de vivir en un palacio y de competir por el corazón del guapísimo príncipe Maxon.Sin embargo, para America Singer, ser seleccionada es una pesadilla porque significa alejarse de su amor secreto, Aspen, quien pertenece a una casta inferior a la de ella; y también abandonar su hogar para pelear por una corona que no desea y vivir en un palacio que está bajo la constante amenaza de ataques violentos por parte de los rebeldes.En La heredera y La corona, la Princesa Eadlyn se conviertirá en la primera princesa en encargarse de su propia selección, pero ella no cree que ninguno de los treinta y cinco pretendientes sea capaz de conquistar su corazón.Este maravilloso estuche incluye los cinco libros de la serie best seller mundial que ha conquistado los corazones de más de cinco millones de lectoras de todo el mundo.No te pierdas La prometida, la primera entrega de la nueva serie de Kiera Cass.",
    },
    {
      id: 11,
      title: "Como el Hielo",
      price: 50,
      gender: "Libros-Juveniles",
      author: "Jennifer L. Armentrout, 2022",
      imgurl: "/assets/comoElHielo.webp",
      stock: 20,
      reseña: "Nueva novela para fans de Jennifer Armentrout, con mucho romance y dosis del clásico humor irónico de la autora. . Una historia sobre mejores amigos, que siempre se han amado en secreto. . Primera entrega de la bilogía HIELO, una novela new adult, romántica y muy sexy, con toques de comedia, acción y suspense. Para Sydney, estar enamorada de Kyler no es nada nuevo. Han sido mejores amigos desde que él la empujó en el patio del colegio y ella le obligó a comerse un pastel de barro. Y fue poco después cuando empezó a sentir algo por él. Entonces, ¿cuál es el problema? Kyler es el chico más guapo de la facultad. Nunca sale con una chica más de un mes seguido, y ya que es su último año en la universidad, Syd no quiere arriesgar su amistad declarándole su amor. Kyler siempre ha sabido que Syd está totalmente fuera de su alcance. Ella es perfecta. Lo es todo para él. Sin embargo, siempre ha intentado ocultar sus sentimientos por ella. Después de todo, Kyler es el chico impulsivo que toma malas decisiones, y Sid siempre será la única chica que no puede tener. Pero cuando quedan atrapados en una estación de esquí por una tormenta de nieve, no hay nada que impida que sus sentimientos al rojo vivo salgan a la superficie. ¿Podrá su amistad sobrevivir a la atracción? O mejor aún, ¿Podrán sobrevivir ellos? Porque, mientras la nieve cae, alguien está acosándolos, y ese inocente viaje podría cambiar su vida en más de un sentido.",
    },
    {
      id: 12,
      title: "Isis:Inside The Aarmy of Terror",
      price: 46,
      gender: "Terror",
      author: "Michael Weiss, 2016",
      imgurl: "/assets/isis.webp",
      stock: 20,
      reseña: "El sorprendente éxito del Estado Islámico en Irak y Siria (ISIS) al tomar el control de gran parte del norte y oeste de Irak en 2014 ha generado muchas preguntas para los legisladores y el público. ¿Cómo fue este grupo tan efectivo tan rápidamente? ¿De dónde vino y cómo tantos observadores no vieron su ascenso? ¿Qué amenaza representa ISIS para la región y más allá?",
    },
    {
      id: 13,
      title: "Cujo",
      price: 59,
      gender: "Terror",
      author: "King Stephen, 2015",
      imgurl: "/assets/cujo.jpg",
      stock: 20,
      discount: 20,
      reseña:"Uno de los Grandes Clásicos Imprescindibles de Stephen King, Gran Maestro de la Literatura de Terror. Durante Toda Su Vida Cujo Fue un Buen Perro, un San Bernardo Grandote, Pacífico, Juguetón y Amante de los Niños. Realmente Se Trataba de un Perro Bueno y Feliz. Feliz Hasta que Le Sucedió Algo, y el Cerebro de Perro de Cujo Se Cubrió de una de Esas Oscuridades que Se Alimentan de Sangre. Ahora, Se Ha Convertido en un Perro Asesino; Doblemente Cruel por Cuanto la Gente No Conoce Su Mutación y Aún Le Ve en Su Anterior Bondad. Heraldo de un Pequeño Apocalipsis, Cujo Desencadenará Sobre un Pueblo Modélico un Huracán de Pánico y de Muerte.",
    },
    {
      id: 14,
      title: "Justice League VOL 01",
      price: 120,
      gender: "Cómics",
      author: "Geoff Johns, 2013",
      imgurl: "/assets/justiceLeagueVOL1.webp",
      stock: 20,
      reseña:"En un mundo donde los superhéroes sin experiencia operan bajo una nube de sospecha del público, el vigilante solitario Batman se ha topado con un mal oscuro que amenaza con destruir la tierra tal como la conocemos. Ahora, frente a una amenaza mucho más allá de lo que puede manejar por sí mismo, el Caballero Oscuro debe confiar en un extraterrestre, un velocista escarlata, un héroe adolescente accidental, un policía espacial, una princesa amazona y un monarca submarino. ¿Esta combinación de Superman, The Flash, Cyborg, Green Lantern, Wonder Woman y Aquaman podrá dejar de lado sus diferencias y unirse para salvar el mundo? ¿O se destruirán entre ellos primero?",
    },
    {
      id: 15,
      title: "Inuyasha",
      price: 45.3,
      gender: "Mangas",
      author: "Rumiko Takahashi, 2014",
      imgurl: "/assets/inuyasha.webp",
      stock: 20,
      reseña:"Durante el período Sengoku, un medio demonio llamado InuYasha roba la Perla de Shikon. Sin embargo, su plan es frustrado por una sacerdotisa llamada Kikyō quien le dispara una flecha sagrada, clavándolo en un árbol sagrado y dejándolo paralizado y dormido. 500 años más tarde, en el Japón actual, Kagome Higurashi, una adolescente de 15 años, es atacada por un demonio que sale del interior del pozo de un templo rompiendo el sello y transportando a Kagome a la época feudal. Allí descubre que es la reencarnación de la sacerdotisa Kikyo, luego de despertar a InuYasha. En un incidente provocado por un demonio la Perla de Shikon es destruida en miles de fragmentos que se dispersan por toda la región. Debido a esto, InuYasha y Kagome tienen la misión de recuperar dichos fragmentos antes de que otros demonios los empleen para sumir al mundo en el caos.",
    },
    {
      id: 16,
      title: "Vengadores:La Era de Ultrón",
      price: 120,
      gender: "Cómics",
      author: "Brina Michael Bendis, 2015",
      imgurl: "/assets/vengadoresLaEraDeUltron.webp",
      stock: 20,
      reseña:"Durante años, los héroes del Universo Marvel han vivido bajo el temor de que, algún día, la inteligencia artificial conocida como Ultrón evolucionaría hasta disponer del poder necesario para acabar con toda la vida orgánica de la Tierra y así apoderarse del planeta. Ese día ha llegado. Ultrón es ahora el amo de todo, mientras los héroes se ocultan bajo tierra. Hay una medida desesperada que podría cambiar el destino... ¡Y si tiene éxito, el Universo Marvel nunca volverá a ser el mismo! Sólo Brian Michael Bendis, Bryan Hitch, Carlos Pacheco y Brandon Peterson podrían ofrecerte esta historia que lleva años construyéndose.",
    },
    {
      id: 17,
      title: "It (eso)",
      price: 89,
      gender: "Terror",
      author: "King Stephen , 2022",
      imgurl: "/assets/it.webp",
      stock: 20,
      reseña:"¿Quién o qué mutila y mata a los niños de un pequeño pueblo norteamericano? ¿Por qué llega cíclicamente el horror a Derry en forma de un payaso siniestro que va sembrando la destrucción a su paso? Esto es lo que se proponen averiguar los protagonistas de esta novela. Tras veintisiete años de tranquilidad y lejanía una antigua promesa infantil les hace volver al lugar en el que vivieron su infancia y juventud como una terrible pesadilla. Regresan a Derry para enfrentarse con su pasado y enterrar definitivamente la amenaza que los amargó durante su niñez. Saben que pueden morir, pero son conscientes de que no conocerán la paz hasta que aquella cosa sea destruida para siempre. It es una de las novelas más ambiciosas de Stephen King, donde ha logrado perfeccionar de un modo muy personal las claves del género de terror.",
    },
    {
      id: 18,
      title: "Relatos cortos de terror",
      price: 63.8,
      gender: "Terror",
      author: "Martin Mateos Carlos, 2021",
      imgurl: "/assets/relatosCortosDeTerror.jpg",
      stock: 20,
      discount: 15,
      reseña:"El terror. Ese sentimiento que nos acompaña desde el comienzo de la humanidad. Es como una semilla que brota en nuestro interior y evoluciona a medida que crecemos.El terror. Nos atrae y nos repele por igual. Siempre ha estado estrechamente relacionado con el misterio, pues en ambos abundan el desconocimiento, la incomprensión y la duda. Tras sus muchas representaciones e ilustraciones a lo largo de nuestra historia, nos continúa cautivando con la misma fuerza.En este texto, a través de pequeñas historias, represento algunos de los terrores más primigenios y esenciales que se conocen. Pequeñas emociones que quedan para siempre impregnadas en nuestra psique.El terror pervive en nosotros, pues lo cierto es que nunca se fue.El terror siempre nos acechará y más vale convivir con él que eludirlo constantemente.",
    },
    {
      id: 19,
      title: "Miradas Azucaradas",
      price: 68,
      gender:"Libros-Juveniles",
      author: "Zelá Brambillé, 2018",
      imgurl: "/assets/miradasAzucaradas.webp",
      stock: 20,
      reseña:"A lo largo del día pasan muchas cosas en la vida de Natalie: se pelea con esos odiosos trolls a los que llama hermanos, que la molestan porque le gustan los unicornios, se quiebra la cabeza en la clase de matemáticas, hace como si no le importara el divorcio de sus padres y suspira cuando su amor platónico pasa frente a ella ¿Suspira? ¡Mentira!Prácticamente se derrite y se pone temblorosa al ver a Shawn Price, quien no se da cuenta de las dulces miradas indiscretas de cierta chica, ya que está muy ocupado mirando a la perfecta Hannah Carson como para notarla; aunque no es que se quejara, porque sería bastante vergonzoso que la viera babear por él.No, Shawn y Nat jamás hablarán, jamás tendrán una cita, jamás se besarán y jamás le romperá el corazón ¿O sí?«No importa qué tan amarga sea la vida, puedes agregarle azúcar».",
    },
    {
      id: 20,
      title: "Dragon Ball Super, VOL 04",
      price: 98,
      gender: "Mangas",
      author: "Akira Toriyama , 2019",
      imgurl: "/assets/dragonBallSuperVOL04.webp",
      stock: 20,
      reseña: "¡La batalla por el destino del mundo paralelo continúa! Con Vegeta herido y como su fusión con Gokú falló, Gokú debe enfrentarse solo contra el Dios Zamas. Pero este enemigo es implacable y poderoso, y parece ser demasiado fuerte, ¡incluso para Gokú! ¿Podrán Gokú y sus amigos detener a este dios malvado de una vez por todas?",
    },
  ];

  //products.forEach( item =>)
  for (let item of libros) {
    item.index = item.id;
    delete item.id;
    addDoc(librosCollectionRef, item).then((res) =>
      console.log("Documento creado:", res.id)
    );
  }
}
export async function exportDataWithBatch() {
  const librosCollectionRef = collection(db, "products");
  const batch = writeBatch(db);

  const libros = [
    {
      id: 1,
      title: "Dímelo Bajito",
      price: 89,
      gender: "Libros-Juveniles",
      author: "Mercedes Ron, 2020",
      imgurl: "/assets/dimeloBajito.webp",
      stock: 20,
      discount: 15,
      reseña:
        "Kamila Hamilton lo tenía todo bajo control... o eso creía: no entraba en sus planes que los hermanos Di Bianco volviesen de nuevo para poner su mundo al revés. Thiago fue quien le dio su primer beso. Taylor el que siempre la protegió. El regreso de los hermanos hace que la vida aparentemente perfecta de Kami se tambalee. Ella ya no es la niña inocente que conocieron: desde que se fueron, parece que nadie puede acceder realmente a ella... nadie excepto ellos. ¿Podrá resistirse Kami a la simple presencia de Thiago? ¿Qué sucederá cuando Taylor comience a mirarla diferente? ¿Estallará todo en mil pedazos una vez más?",
    },
    {
      id:2,
      title: "Manual del Terror",
      price: 41,
      gender: "Terror",
      author: "Paul Van Loon, 2018",
      imgurl: "/assets/manualDelTerror.webp",
      stock: 20,
      reseña: "¿Cómo saber si alguien es un vampiro? ¿Existen los zombis de verdad... Y las brujas? ¿Cómo se convierte alguien en hombre lobo? ¿Dónde están las casas encantadas más famosas del mundo? Si te gustan las historias de terror y estremecerte de miedo con sus protagonistas, ¡este libro es para ti! En él encontrarás información sobre el origen de las criaturas más espeluznantes, sus hábitos, las formas que adoptan y cómo luchar contra ellas. Con las singulares ilustraciones de Axel Scheffler, en este Manual del terror hallarás también anécdotas o recomendaciones de libros y películas para convertirte en todo un experto del terror.",
    },
    {
      id: 3,
      title: "Aoha Ride",
      price: 52,
      gender: "Mangas",
      author: "Ao Sakisaka, 2015",
      imgurl: "/assets/aohaRide.webp",
      stock: 20,
      reseña: "Ao Haru Ride muestra las vicisitudes de la vida en el instituto: la amistad, la dificultad de entablar relaciones con otros compañeros con personalidades distintas, el primer amor… mediante la emotiva historia que protagonizan Futaba y Kou. En la preparatoria, Futaba decide torcer su imagen de chica tímida y marginada en clase, pero tendrá que superar nuevos obstáculos ante la oportunidad de conquistar a Kou, quien pudo haber sido su romance de secundaria pero no pudo ser.",
    },
    {
      id: 4,
      title: "Crisis Infinita (3er Edición)",
      price: 197,
      gender: "Cómics",
      author: "Geoff Johns , 2021",
      imgurl: "/assets/crisisInfinita.webp",
      stock: 20,
      discount: 10,
      reseña:"Los robots OMAC están arrasándolo todo, la magia muere, los villanos se unen y la guerra causa estragos en todo el espacio. En ese momento crítico, los tres héroes más grandes de la Tierra, Superman, Batman y Wonder Woman, andan divididos. Pero otros héroes del pasado, a los que habíamos perdido de vista hace mucho tiempo, han vuelto para poner las cosas en su sitio... a cualquier precio. Algunos héroes vivirán, otros morirán ¡y el Universo DC nunca volverá a ser el mismo! Tras narrar el regreso de Hal Jordan en la serie limitada Green Lantern: Renacimiento (Green Lantern de Geoff Johns núm. 1), Geoff Johns se embarcó en el desarrollo de Crisis Infinita, secuela de la mítica Crisis en Tierras Infinitas. Todos los personajes del Universo DC, liderados por iconos de la talla de Batman, Superman y Wonder Woman, participan en un evento de proporciones colosales, clave para el desarrollo moderno de nuestros héroes y villanos favoritos. ¡Con el arte de Phil Jiménez e Ivan Reis y la colaboración especial del mismísimo George Pérez, uno de los responsables de la saga original!",
    },
    {
      id: 5,
      title: "Guardianes de la noche 1",
      price: 53,
      gender: "Mangas",
      author: "Koyoharu Gotouge , 2019",
      imgurl: "/assets/guardianesDeLaNoche1.webp",
      stock: 20,
      reseña: "¡Shonen fantástico ambientado en el Japón feudal! Tanjirou Kamado es un chico alegre y trabajador que vive feliz mente junto a su familia, hasta que un fatídico día un demonio llamado Muzan irrumpe en su vida matando a sus padres y maldiciendo a su hermana pequeña convirtiéndola en demonio. Tras el incidente, y con el propósito de vengar a sus padres y devolver a su hermana Nezuko a la normalidad, decide convertirse en un asesino de demonios. Para ello, acude en ayuda de Sakonji Urokodaki, uno de los asesinos de demonios más fuertes del mundo...Entre samuráis, afiladas katanas, demonios y otros seres mitológicos del folklore japonés, este manga es una apuesta segura para los amantes del género.",
    },
    {
      id: 6,
      title: "La química del amor",
      price: 98,
      gender: "Libros-Juveniles",
      author: "Ali Hazelwood , 2022",
      imgurl: "/assets/laQuimicaDelAmor.webp",
      stock: 20,
      reseña:"Una nueva comedia romántica situada en la NASA en la que una científica se ve obligada a trabajar en un proyecto junto a su archienemigo... con resultados explosivos. Bee Königswasser se rige siempre por un código muy sencillo: ¿qué haría Marie Curie? Si la NASA le ofreciera liderar un proyecto de neuroingeniería, un sueño hecho realidad después de pasarse años malviviendo con las migajas del mundo académico, Marie aceptaría sin dudarlo. Obvio. Pero la madre de la física moderna nunca tuvo que codirigir ningún proyecto con Levi Ward. A ver, Levi no está nada mal: es alto, moreno y tiene una mirada de lo más penetrante. Pero Levi dejó muy claros sus sentimientos por Bee en la universidad: es mejor que dos enemigos trabajen cada uno en su propia galaxia muy muy lejana. De pronto, Bee se encuentra con que su material ha desaparecido, el personal pasa de ella y su maltrecha carrera profesional pende de un hilo. Puede que su lóbulo occipital esté jugándole una mala pasada, pero juraría que Levi empieza a convertirse en su aliado, apoyando sus decisiones, secundando sus ideas... devorándola con esa mirada suya. Y las diferentes posibilidades traen a sus neuronas de cabeza. Sin embargo, cuando llega el momento de jugársela y arriesgar el corazón, solo hay una pregunta que importe: ¿Qué hará Bee Königswasser?",
    },
    {
      id: 7,
      title: "Kingdome Come",
      price: 162,
      gender: "Cómics",
      author: "Mark Waid, Alex Ross , 2020",
      imgurl: "/assets/kingdomeCome.webp",
      stock: 20,
      reseña: "Superman se ha retirado y, sin su influencia, el mundo ha aceptado a una nueva generación de héroes, encabezados por un controvertido vigilante llamado Magog, que recurren a la violencia y a la barbarie para impartir su particular visión de la justicia. No obstante, la amenaza de un futuro apocalíptico fuerza el regreso del Hombre de Acero... y el choque con los recién llegados será inevitable."
    },
    {
      id: 8,
      title: "Jocker: Quien rie último",
      price: 59,
      gender: "Cómics",
      author: "Varios autores , 2018",
      imgurl: "/assets/jocker.webp",
      stock: 20,
      discount: 15,
      reseña: "El Joker acaba de recibir malas noticias del médico. Encerrado en la Losa, una cárcel especialmente diseñada para retener a delincuentes con superpoderes, instiga un motín que tan solo es la primera parte de un plan que pasa por preservar a toda costa su legado de terror.",
    },
    {
      id: 9,
      title: "La Guerra Infinito 7",
      price: 45.9,
      gender: "Cómics",
      author: "Varios autores , 2018",
      imgurl: "/assets/laGuerraInfinito7.webp",
      stock: 20,
      discount: 15,
      reseña:"Llega la segunda gran saga dentro del proyecto de Jim Starlin en los años noventa. ¡Adam Warlock ha vuelto, pero el Magus, su lado oscuro personificado, tampoco se ha quedado atrás! Es entonces cuando se desata la lucha por el mayor poder del universo.",
    },
    {
      id: 10,
      title: "Saga La Selección",
      price: 199,
      gender: "Libros-Juveniles",
      author: "Kiera Cass, 2022",
      imgurl: "/assets/sagaLaSeleccion.webp",
      stock: 20,
      reseña:"Las cinco novelas de la maravillosa serie La Selección de Kiera Cass reunidas por primera vez en un maravilloso estuche.Para treinta y cinco chicas, La Selección es una oportunidad que solo se presenta una vez en la vida. La oportunidad de escapar de la vida que les ha tocado por nacer en una determinada familia. La oportunidad de que las trasladen a un mundo de trajes preciosos y joyas que no tienen precio. La oportunidad de vivir en un palacio y de competir por el corazón del guapísimo príncipe Maxon.Sin embargo, para America Singer, ser seleccionada es una pesadilla porque significa alejarse de su amor secreto, Aspen, quien pertenece a una casta inferior a la de ella; y también abandonar su hogar para pelear por una corona que no desea y vivir en un palacio que está bajo la constante amenaza de ataques violentos por parte de los rebeldes.En La heredera y La corona, la Princesa Eadlyn se conviertirá en la primera princesa en encargarse de su propia selección, pero ella no cree que ninguno de los treinta y cinco pretendientes sea capaz de conquistar su corazón.Este maravilloso estuche incluye los cinco libros de la serie best seller mundial que ha conquistado los corazones de más de cinco millones de lectoras de todo el mundo.No te pierdas La prometida, la primera entrega de la nueva serie de Kiera Cass.",
    },
    {
      id: 11,
      title: "Como el Hielo",
      price: 50,
      gender: "Libros-Juveniles",
      author: "Jennifer L. Armentrout, 2022",
      imgurl: "/assets/comoElHielo.webp",
      stock: 20,
      reseña: "Nueva novela para fans de Jennifer Armentrout, con mucho romance y dosis del clásico humor irónico de la autora. . Una historia sobre mejores amigos, que siempre se han amado en secreto. . Primera entrega de la bilogía HIELO, una novela new adult, romántica y muy sexy, con toques de comedia, acción y suspense. Para Sydney, estar enamorada de Kyler no es nada nuevo. Han sido mejores amigos desde que él la empujó en el patio del colegio y ella le obligó a comerse un pastel de barro. Y fue poco después cuando empezó a sentir algo por él. Entonces, ¿cuál es el problema? Kyler es el chico más guapo de la facultad. Nunca sale con una chica más de un mes seguido, y ya que es su último año en la universidad, Syd no quiere arriesgar su amistad declarándole su amor. Kyler siempre ha sabido que Syd está totalmente fuera de su alcance. Ella es perfecta. Lo es todo para él. Sin embargo, siempre ha intentado ocultar sus sentimientos por ella. Después de todo, Kyler es el chico impulsivo que toma malas decisiones, y Sid siempre será la única chica que no puede tener. Pero cuando quedan atrapados en una estación de esquí por una tormenta de nieve, no hay nada que impida que sus sentimientos al rojo vivo salgan a la superficie. ¿Podrá su amistad sobrevivir a la atracción? O mejor aún, ¿Podrán sobrevivir ellos? Porque, mientras la nieve cae, alguien está acosándolos, y ese inocente viaje podría cambiar su vida en más de un sentido.",
    },
    {
      id: 12,
      title: "Isis:Inside The Aarmy of Terror",
      price: 46,
      gender: "Terror",
      author: "Michael Weiss, 2016",
      imgurl: "/assets/isis.webp",
      stock: 20,
      reseña: "El sorprendente éxito del Estado Islámico en Irak y Siria (ISIS) al tomar el control de gran parte del norte y oeste de Irak en 2014 ha generado muchas preguntas para los legisladores y el público. ¿Cómo fue este grupo tan efectivo tan rápidamente? ¿De dónde vino y cómo tantos observadores no vieron su ascenso? ¿Qué amenaza representa ISIS para la región y más allá?",
    },
    {
      id: 13,
      title: "Cujo",
      price: 59,
      gender: "Terror",
      author: "King Stephen, 2015",
      imgurl: "/assets/cujo.jpg",
      stock: 20,
      discount: 20,
      reseña:"Uno de los Grandes Clásicos Imprescindibles de Stephen King, Gran Maestro de la Literatura de Terror. Durante Toda Su Vida Cujo Fue un Buen Perro, un San Bernardo Grandote, Pacífico, Juguetón y Amante de los Niños. Realmente Se Trataba de un Perro Bueno y Feliz. Feliz Hasta que Le Sucedió Algo, y el Cerebro de Perro de Cujo Se Cubrió de una de Esas Oscuridades que Se Alimentan de Sangre. Ahora, Se Ha Convertido en un Perro Asesino; Doblemente Cruel por Cuanto la Gente No Conoce Su Mutación y Aún Le Ve en Su Anterior Bondad. Heraldo de un Pequeño Apocalipsis, Cujo Desencadenará Sobre un Pueblo Modélico un Huracán de Pánico y de Muerte.",
    },
    {
      id: 14,
      title: "Justice League VOL 01",
      price: 120,
      gender: "Cómics",
      author: "Geoff Johns, 2013",
      imgurl: "/assets/justiceLeagueVOL1.webp",
      stock: 20,
      reseña:"En un mundo donde los superhéroes sin experiencia operan bajo una nube de sospecha del público, el vigilante solitario Batman se ha topado con un mal oscuro que amenaza con destruir la tierra tal como la conocemos. Ahora, frente a una amenaza mucho más allá de lo que puede manejar por sí mismo, el Caballero Oscuro debe confiar en un extraterrestre, un velocista escarlata, un héroe adolescente accidental, un policía espacial, una princesa amazona y un monarca submarino. ¿Esta combinación de Superman, The Flash, Cyborg, Green Lantern, Wonder Woman y Aquaman podrá dejar de lado sus diferencias y unirse para salvar el mundo? ¿O se destruirán entre ellos primero?",
    },
    {
      id: 15,
      title: "Inuyasha",
      price: 45.3,
      gender: "Mangas",
      author: "Rumiko Takahashi, 2014",
      imgurl: "/assets/inuyasha.webp",
      stock: 20,
      reseña:"Durante el período Sengoku, un medio demonio llamado InuYasha roba la Perla de Shikon. Sin embargo, su plan es frustrado por una sacerdotisa llamada Kikyō quien le dispara una flecha sagrada, clavándolo en un árbol sagrado y dejándolo paralizado y dormido. 500 años más tarde, en el Japón actual, Kagome Higurashi, una adolescente de 15 años, es atacada por un demonio que sale del interior del pozo de un templo rompiendo el sello y transportando a Kagome a la época feudal. Allí descubre que es la reencarnación de la sacerdotisa Kikyo, luego de despertar a InuYasha. En un incidente provocado por un demonio la Perla de Shikon es destruida en miles de fragmentos que se dispersan por toda la región. Debido a esto, InuYasha y Kagome tienen la misión de recuperar dichos fragmentos antes de que otros demonios los empleen para sumir al mundo en el caos.",
    },
    {
      id: 16,
      title: "Vengadores:La Era de Ultrón",
      price: 120,
      gender: "Cómics",
      author: "Brina Michael Bendis, 2015",
      imgurl: "/assets/vengadoresLaEraDeUltron.webp",
      stock: 20,
      reseña:"Durante años, los héroes del Universo Marvel han vivido bajo el temor de que, algún día, la inteligencia artificial conocida como Ultrón evolucionaría hasta disponer del poder necesario para acabar con toda la vida orgánica de la Tierra y así apoderarse del planeta. Ese día ha llegado. Ultrón es ahora el amo de todo, mientras los héroes se ocultan bajo tierra. Hay una medida desesperada que podría cambiar el destino... ¡Y si tiene éxito, el Universo Marvel nunca volverá a ser el mismo! Sólo Brian Michael Bendis, Bryan Hitch, Carlos Pacheco y Brandon Peterson podrían ofrecerte esta historia que lleva años construyéndose.",
    },
    {
      id: 17,
      title: "It (eso)",
      price: 89,
      gender: "Terror",
      author: "King Stephen , 2022",
      imgurl: "/assets/it.webp",
      stock: 20,
      reseña:"¿Quién o qué mutila y mata a los niños de un pequeño pueblo norteamericano? ¿Por qué llega cíclicamente el horror a Derry en forma de un payaso siniestro que va sembrando la destrucción a su paso? Esto es lo que se proponen averiguar los protagonistas de esta novela. Tras veintisiete años de tranquilidad y lejanía una antigua promesa infantil les hace volver al lugar en el que vivieron su infancia y juventud como una terrible pesadilla. Regresan a Derry para enfrentarse con su pasado y enterrar definitivamente la amenaza que los amargó durante su niñez. Saben que pueden morir, pero son conscientes de que no conocerán la paz hasta que aquella cosa sea destruida para siempre. It es una de las novelas más ambiciosas de Stephen King, donde ha logrado perfeccionar de un modo muy personal las claves del género de terror.",
    },
    {
      id: 18,
      title: "Relatos cortos de terror",
      price: 63.8,
      gender: "Terror",
      author: "Martin Mateos Carlos, 2021",
      imgurl: "/assets/relatosCortosDeTerror.jpg",
      stock: 20,
      discount: 15,
      reseña:"El terror. Ese sentimiento que nos acompaña desde el comienzo de la humanidad. Es como una semilla que brota en nuestro interior y evoluciona a medida que crecemos.El terror. Nos atrae y nos repele por igual. Siempre ha estado estrechamente relacionado con el misterio, pues en ambos abundan el desconocimiento, la incomprensión y la duda. Tras sus muchas representaciones e ilustraciones a lo largo de nuestra historia, nos continúa cautivando con la misma fuerza.En este texto, a través de pequeñas historias, represento algunos de los terrores más primigenios y esenciales que se conocen. Pequeñas emociones que quedan para siempre impregnadas en nuestra psique.El terror pervive en nosotros, pues lo cierto es que nunca se fue.El terror siempre nos acechará y más vale convivir con él que eludirlo constantemente.",
    },
    {
      id: 19,
      title: "Miradas Azucaradas",
      price: 68,
      gender:"Libros-Juveniles",
      author: "Zelá Brambillé, 2018",
      imgurl: "/assets/miradasAzucaradas.webp",
      stock: 20,
      reseña:"A lo largo del día pasan muchas cosas en la vida de Natalie: se pelea con esos odiosos trolls a los que llama hermanos, que la molestan porque le gustan los unicornios, se quiebra la cabeza en la clase de matemáticas, hace como si no le importara el divorcio de sus padres y suspira cuando su amor platónico pasa frente a ella ¿Suspira? ¡Mentira!Prácticamente se derrite y se pone temblorosa al ver a Shawn Price, quien no se da cuenta de las dulces miradas indiscretas de cierta chica, ya que está muy ocupado mirando a la perfecta Hannah Carson como para notarla; aunque no es que se quejara, porque sería bastante vergonzoso que la viera babear por él.No, Shawn y Nat jamás hablarán, jamás tendrán una cita, jamás se besarán y jamás le romperá el corazón ¿O sí?«No importa qué tan amarga sea la vida, puedes agregarle azúcar».",
    },
    {
      id: 20,
      title: "Dragon Ball Super, VOL 04",
      price: 98,
      gender: "Mangas",
      author: "Akira Toriyama , 2019",
      imgurl: "/assets/dragonBallSuperVOL04.webp",
      stock: 20,
      reseña: "¡La batalla por el destino del mundo paralelo continúa! Con Vegeta herido y como su fusión con Gokú falló, Gokú debe enfrentarse solo contra el Dios Zamas. Pero este enemigo es implacable y poderoso, y parece ser demasiado fuerte, ¡incluso para Gokú! ¿Podrán Gokú y sus amigos detener a este dios malvado de una vez por todas?",
    },
  ];

  //products.forEach( item =>)
  for (let item of libros) {
    item.index = item.id;
    delete item.id;

    const newDoc = doc(librosCollectionRef);
    batch.set(newDoc, item);
  }

  const commitDone = await batch.commit();
  console.log("--->", commitDone);
}
export default getItems;

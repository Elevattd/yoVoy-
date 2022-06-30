import { sequelize } from '../src/db';

const organization = [
	{ name: 'La esquina' },
	{ name: 'Baldosas rojas' },
	{ name: 'Voz en off' },
	{ name: 'Vestido de verano' },
	{ name: 'Taller de muñecas' },
	{ name: 'Museo Medea' },
	{ name: 'Porcelana China' },
	{ name: 'Minuto 15' },
	{ name: 'La llamada' },
	{ name: 'LaTyna' },
];

const locations = [
	// San Juan
	{ name: 'Teatro del Bicentenario', address: 'Las Heras Sur 430', latitude: -31.540239738417892 ,longitude: -68.5359782260676 ,  cityId:1},
	{ name: 'Auditorio Juan Victoria', address: '25 de Mayo Oeste 1215', latitude: -31.529590479241733 ,longitude: -68.5433925672192 ,  cityId:1},
	{ name: 'Estadio Aldo Cantoni', address: 'C. San Luis Oeste 1300', latitude: -31.531738484136007 ,longitude: -68.54451878500541 ,  cityId:1},
	{ name: 'Teatro Sarmiento', address: '99 J5400DUA, Avenida Leandro N. Alem Norte 1', latitude: -31.53392923013056,longitude: -68.53162511305565 ,  cityId:1},
	{ name: 'Teatro Municipal de San Juan', address: 'Mitre Antes De Circunvalacion 99', latitude: -31.53788433734873 ,longitude: -68.52499847165866 ,  cityId:1},
	{ name: 'Anfiteatro Centro Cultural Estación San Martín', address: 'Av. José Ignacio de la Roza Oeste 712-774', latitude: -31.537940632640336 ,longitude: -68.5367406799621 ,  cityId:1},
	//Mendoza
	{ name: 'Teatro Mendoza', address: 'San Juan 1427', latitude:-32.88684209139301 ,longitude:-68.83673196183025 ,  cityId:2},
	{ name: 'Teatro Independencia', address: 'Chile 1184, M5500 GRM', latitude:-32.8883770342279 ,longitude:-68.84608980231017 ,  cityId:2},
	{ name: 'TEATRO SELECTRO', address: 'Cap. de Fragata Moyano 102', latitude:-32.90098433620503,longitude:  -68.84323534278975 ,  cityId:2},
	{ name: 'Teatro Enkosala Gladys Ravalle', address: 'Almte. Brown 755', latitude:-32.91630983193671 ,longitude: -68.8479390869672 ,  cityId:2},
	{ name: 'Cine Teatro Plaza', address: 'Colón 27', latitude: -32.924972002483045 ,longitude: -68.84499362559798 ,  cityId:2},
	{ name: 'Teatro Municipal Julio Quintanilla', address: 'Av. Sarmiento, M5500 Ciudad, Mendoza', latitude:-32.888973845747614 ,longitude:-68.84390851300329 ,  cityId:2},
	{ name: 'Teatro el Taller Centro Cultural', address: 'Granaderos 1964', latitude: -32.877188943510504 ,longitude: -68.8548090099366 ,  cityId:2},
	//La Pampa
	{ name: 'Teatro Español', address: 'ASB, Hilario Lagos 44', latitude:-36.61879590784061 ,longitude:-64.2906215811911 ,  cityId:5},
	{ name: 'Teatro TKQ', address: 'Sarmiento 495', latitude:-36.61768385170393 ,longitude: -64.29760997128629 ,  cityId:5},
	{ name: 'Anfiteatro del Centro Cívico', address: 'Padre Buodo, San Pedro &, Santa Rosa, La Pampa', latitude: -36.621421887018904,longitude: -64.2784975759854 ,  cityId:5},
	{ name: 'Teatro Attp', address: 'Bolivia 1286, L6300 GDO', latitude: -36.63111598535499,longitude: -64.29884686354507 ,  cityId:5},
	//La Rioja
	{ name: 'Teatro de la Ciudad', address: 'Direccion de Rentas Municipal, Pje. Calchaquí 1 26', latitude:-29.412720277674723 ,longitude: -66.85128637144672 ,  cityId:7},
	{ name: 'Teatro Provincial Víctor María Cáceres', address: 'F5302 La Rioja', latitude:-29.431085520363048,longitude: -66.85943932598066  ,  cityId:7},
	{ name: 'Teatro La Kanoa De Papel', address: 'Calle Dr. Juan Olsacher 2680', latitude:-29.441067383348155 ,longitude: -66.85488484779415 ,  cityId:7},
	//Entre Rios
	{ name: 'Teatro 3 de Febrero', address: 'FGB, 25 de Junio 54, E3100 Paraná, Entre Ríos', latitude:-31.731023925824836 ,longitude:-60.53041079751662 ,  cityId:20},
	{ name: 'Teatro Multimedia del Circulo', address: 'FFA, Gral. Justo José de Urquiza 1135', latitude:-31.731608786939006 ,longitude:-60.53193034267578 ,  cityId:20},
	{ name: 'Arteatro', address: 'Tucumán 378', latitude:-31.72601094093101 ,longitude:-60.53337208308685 ,  cityId:20},
	//Santiago del Estero
	{ name: 'Teatro los Cabezone', address: 'G4204 Ciudad de Santiago del Estero, Santiago del Estero', latitude:-27.78847476629992,longitude:-64.25795957392262,  cityId:9},
	{ name: 'LA Buenos Aires Espacio Cultural', address: 'Buenos Aires 170, Santiago del Estero', latitude:-27.787544592340243 ,longitude:-64.25710126707747 ,  cityId:9},
	{ name: 'Teatro 25 De Mayo', address: 'Avellaneda 376, Santiago del Estero', latitude:-27.78655508938279 ,longitude:-64.25677119979443 ,  cityId:9},
	// Tierra del Fuego
	{ name: 'Tierra de Teatro', address: 'Dr. Albert Schweitzer 1300-1335, Río Grande, Tierra del Fuego', latitude:-53.788432442402346,longitude:-67.72524428292382 ,  cityId: 10},
	{ name: 'Dionisio Teatro', address: 'El Alambrador 853, Río Grande, Tierra del Fuego', latitude:-53.80516210945429 ,longitude:-67.68009734286923 ,  cityId: 10},
	{ name: 'Casa de la Cultura', address: 'Sebastián Elcano 179, V9420 Río Grande, Tierra del Fuego', latitude:-53.78694323724804 ,longitude:-67.69201806803937 ,  cityId: 10},
	// Chaco
	{ name: 'La Mascara - Espacio cultural y de formación', address: 'av. dr. evaristo ramirez, Nikola Tesla &, Resistencia, Chaco', latitude:-27.46759783397431,longitude:-58.98424333951735 ,  cityId:19},
	{ name: 'Teatro Libertad', address: 'DDC Pasaje, Los Hacheros 2174,', latitude:-27.476501194014624 ,longitude: -58.99710667923666 ,  cityId:19},
	{ name: 'Galatea', address: 'BEL, Mendoza 590, H3500BEL Resistencia, Chaco', latitude:-27.451955588897707,longitude:-58.997749403129596  ,  cityId:19},
	//Catamarca
	{ name: 'Cine Teatro Catamarca', address: 'San Martín 515-591, San Fernando del Valle de Catamarca, Catamarca', latitude:-28.469559098560897 ,longitude: -65.77895881662907,  cityId:18},
	{ name: 'Teatro del Sur', address: 'Florida 600-698, San Fernando del Valle de Catamarca, Catamarca', latitude:-28.47959758725499 ,longitude:-65.77696802770262 ,  cityId:18},
	{ name: 'Complejo Cultural Urbano Girardi', address: ' Av. Enrique Ocampo 58-98, San Fernando del Valle de Catamarca, Catamarca', latitude: -28.47018841800659 ,longitude: -65.78752305648395 ,  cityId:18},
	//San Luis
	{ name: 'Sala Hugo del Carril', address: 'Pasaje de las Artes, Av. del Fundador y, San Luis', latitude:-33.293273738622 ,longitude:-66.30915513787068 ,  cityId:13},
	{ name: 'Espacio cultural - Teatro club social', address: 'Av. Sucre, San Luis', latitude:-33.276037196049174 ,longitude:-66.33599247331941 ,  cityId:13},
	{ name: 'TEA Teatro Estudio Arte', address: 'AJT, 9 de Julio 1431, D5700 D5700AJT, San Luis', latitude:-33.307848687455696 ,longitude:-66.34268664270638 ,  cityId:13},
	//Santa Cruz
	{ name: 'TEATRO SOCIEDAD ESPAÑOLA', address: 'San Martin & Sarmiento, Puerto Santa Cruz, Santa Cruz', latitude:-50.01758179062568 ,longitude:-68.52152396142064 ,  cityId:12},
	{ name: 'Sala LibélulaSur Teatro', address: 'Pje. 115, El Calafate, Santa Cruz', latitude:-50.349020665006336 ,longitude:-72.25838552038572 ,  cityId:12},
	{ name: 'El Portal Rojo', address: 'Valentín Feilberg 359, El Calafate, Santa Cruz', latitude:-50.34307239681722 ,longitude:-72.2681834752031 ,  cityId:12},
	//Chubut
	{ name: 'Teatro Verdi', address: 'San Martín 128, Trelew, Chubut', latitude:-43.25326649865176 ,longitude:-65.3074302585495 ,  cityId:11},
	{ name: 'Teatro Español', address: '25 de Mayo 237, Trelew, Chubut', latitude:-43.25241784144381 ,longitude:-65.30956668847155 ,  cityId:11},
	{ name: 'Centro Cultural El Árbol', address: '798, Ameghino 700, Trelew, Chubut', latitude:-43.259511496502824 ,longitude:-65.31099073965534 ,  cityId:11},
	//Neuquen
	{ name: 'EL ARRIMADERO', address: 'Misiones 234, Neuquén', latitude:-38.95740435629737,longitude:-68.06341573787257 , cityId:21},
	{ name: 'Teatro Desafio', address: 'Padre Brentana José, Neuquén', latitude:-38.95448175382361 ,longitude: -68.07172661174937,  cityId:21},
	{ name: 'Sala Teatral Patagonica Daniel Vitulich', address: 'Gdor. Anaya 299-399, Q8300 Neuquén', latitude:-38.95807967788367 ,longitude:-68.08450330658707 ,  cityId:21},
	//Rio negro
	{ name: 'Teatro Las Grutas', address: 'Peatonal Viedma Shopping Puertas al Sol, R8521 Las Grutas, Río Negro', latitude:-40.81068981205803 ,longitude:-65.08867130214848,  cityId:22},
	{ name: 'Cine teatro', address: 'Av. San Martin, Gral. Conesa, Río Negro', latitude:-40.10415426378109 ,longitude:-64.4551215386104 ,  cityId:22},
	{ name: 'Casa de la Historia y de la Cultura del Bicentenario Presidente Nestor Kirchner', address: 'Las Grutas, Río Negro', latitude:-40.81124825693792 ,longitude:-65.08856220727927 ,  cityId:22},
	//Corrientes
	{ name: 'TU Aroma', address: 'ruta 5km 2.5, W3400 Corrientes', latitude:-27.469131936346756 ,longitude:-58.83054976394837 ,  cityId:15},
	{ name: 'Teatro De La Biblioteca Mariño', address: 'Sta. Fé 847, Corrientes', latitude:-27.46755172765518 ,longitude:-58.83030300073039 ,  cityId:15},
	{ name: 'Sala Skené', address: 'San Martín 830, Corrientes', latitude:-27.469849608971312 ,longitude:-58.83984117866317 ,  cityId:15},
	//Misiones
	{ name: 'Teatro Sala Tempo', address: '3 de Febrero 1916, Posadas, Misiones', latitude:-27.368300374869026 ,longitude:-55.89069214009139 ,  cityId:14},
	{ name: 'Centro Cultural Comunitario "El Galpón" de la Murga de la Estación', address: 'Pedro Mendez 2260, N3300 Posadas, Misiones', latitude:-27.376219281992572 ,longitude:-55.89953367189851 ,  cityId:14},
	{ name: 'Teatro de Los Cajones', address: 'Av. Aconcagua 652, N3328 Jardín America, Misiones', latitude:-27.037784255047153 ,longitude:-55.22874521112201 ,  cityId:14},
	//Tucuman
	{ name: 'Sala Bicentenario', address: 'Laprida 55-99, T4000 San Miguel de Tucumán, Tucumán', latitude:-26.830441850950763 ,longitude:-65.20306114819944 ,  cityId:16},
	{ name: 'Teatro Mercedes Sosa', address: 'Gral. José de San Martín 479, San Miguel de Tucumán, Tucumán', latitude:-26.82952322228536 ,longitude:-65.20401723640188 ,  cityId:16},
	{ name: 'Sala Miguel Ángel Estrella', address: 'Virgen de la Merced 157, San Miguel de Tucumán, Tucumán', latitude:-26.829524206618423 ,longitude:-65.20107875142412 ,  cityId:16},
	//Salta
	{ name: 'Encuentro de Danza-Teatro en el Noa', address: 'Almte. Brown 241 7"C, A4400 Salta', latitude:-24.785984768700978 ,longitude:-65.42186851681228 ,  cityId:23},
	{ name: 'Salón Auditorium Dr. Rafael Villagrán', address: 'Av. Belgrano 1349, A4400 Salta', latitude:-24.786667886522686 ,longitude:-65.42124229399552 ,  cityId:23},
	{ name: 'Teatro Iglesia San Alfonso', address: 'Leguizamón 800-812, Salta', latitude:-24.78339521236342 ,longitude:-65.41354487627437 ,  cityId:23},
	//Santa Fe
	{ name: 'Teatro de la Abadia', address: 'DNK, Estanislao Zeballos, S3004 Santa Fe', latitude:-31.60396440723277 ,longitude:-60.700466038422995 ,  cityId:24},
	{ name: 'Teatro Luz Y Fuerza', address: 'Junín 2957, S3000 Santa Fe', latitude:-31.637960576752437 ,longitude:-60.708907609156,  cityId:24},
	{ name: 'Teatro Musical', address: '25 de Mayo 3041, S3000 Santa Fe', latitude: -31.640611010606133,longitude:-60.70405926227226 ,  cityId:24},
	//Córdoba
	{ name: 'Sala Quinto Deva', address: 'Pje. Agustín Pérez 10, Córdoba', latitude:-31.405457487878763 ,longitude:-64.17767051098895 ,  cityId:3},
	{ name: 'Teatro La Brújula', address: 'Rivadavia 1452, Córdoba', latitude:-31.401679161086154 ,longitude:-64.17616546618952 ,  cityId:3},
	{ name: 'Teatro la Chacarita', address: 'Jacinto Ríos 1449, X5000 Córdoba', latitude:-31.400733764023006,longitude:-64.17087013638705  ,  cityId:3},
	//CABA
	{ name: 'Teatro Gran Rex', address: 'Av. Corrientes 857, CABA', latitude:-34.603377149259636 ,longitude:-58.378862531859696 , cityId:17},
	{ name: 'Luna Park', address: 'Av. Eduardo Madero 470, CABA', latitude:-34.602160622339845,longitude:-58.368415641704345 , cityId:17},
	{ name: 'Centro Costa Salguero', address: 'Av. Costanera Rafael Obligado 1221, CABA', latitude:-34.57057510275868 ,longitude:-58.39641863978152 ,  cityId:17},
	//Bs as
	{ name: 'Estadio Único Diego Armando Maradona', address: 'Av. 25, B1900 La Plata, Provincia de Buenos Aires', latitude:-34.91382042119327 ,longitude:-57.98912717807837 ,  cityId:6},
	{ name: 'Estadio José Amalfitani', address: 'Av. Juan B. Justo 9200, C1408AKU CABA', latitude:-34.635379517410115 ,longitude:-58.52071289325334 ,  cityId:6},
	{ name: 'Teatros Atlas y América', address: 'Micro Centro, Av. Pedro Luro, B7600 Mar del Plata, Provincia de Buenos Aires', latitude:-37.999932350094646 ,longitude:-57.54288642998611 ,  cityId:6},
	//Jujuy
	{ name: 'Estadio 23 de Agosto', address: 'Santa Barbara S/N, Humahuaca esq, San Salvador de Jujuy, Jujuy', latitude:-24.198455238981808,longitude:-65.29086960674667 ,  cityId:8},
	{ name: 'Cine Teatro Municipal SELECT', address: 'Gral. Alvear 665, Y4600 San Salvador de Jujuy, Jujuy', latitude:-24.18398082556901 ,longitude:-65.30230526011998 ,  cityId:8},
	{ name: 'Teatro Mitre', address: 'Gral. Alvear 1009, Y4600 San Salvador de Jujuy, Jujuy', latitude:-24.1841367560645 ,longitude:-65.30706345522228 ,  cityId:8},
	//Formosa
	{ name: 'Teatro de la Ciudad', address: 'España, P3600 Formosa', latitude:-26.183669209225098 ,longitude:-58.175306923293114 ,  cityId:4},
	{ name: 'Gran Cine - Teatro "Italia"', address: 'Av. 25 de Mayo 383, P3600ABX Formosa', latitude:-26.182865861406437 ,longitude:-58.1684894704376 ,  cityId:4},
	{ name: 'LaCasa Vieja', address: 'Jonas Salk 426, Formosa', latitude:-26.17073133626852 ,longitude:-58.1749962368066 ,  cityId:4},
];

let events = [
	{
		name: 'DUKI',
		description:
			'DUKI viene escribiendo una gran historia para el movimiento argentino, con pasos firmes que llenan de orgullo dejando la bandera de la música nacional bien arriba. Pocos artistas argentinos han llegado a este nivel de convocatoria y con esta respuesta tan increíble de su público, no solo en nuestro país sino alrededor del mundo. Vélez ha sido escenario de muchísimos recitales multitudinarios de grandes grupos y artistas locales como Fito, La Renga, Spinetta y tantos otros, y hoy le toca a DUKI marcar un suceso sin precedentes.',
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/duki_ticketek_960-x-400-4.png',
	},
	{
		name: "Fuerza Bruta Wayra",
		description:
			"Es una experiencia de teatro dinámica y de inmersión. Nos propone quebrar el sometimiento intelectual del lenguaje. Utilizar todos los medios disponibles para operar eficazmente sobre la sensibilidad del espectador. Traerlo a otros territorios donde existen otras leyes más poderosas.\nUn espacio donde la velocidad de los estímulos recibidos supera la reacción intelectual y la emoción llega primero. El espectador se entrega, sabiendo que forma parte de un hecho artístico, una realidad paralela, etérea, bella, delirante y absolutamente más verdadera que la cotidiana, sabiendo que está siendo conducido a estrellarse contra su propia sensibilidad. \nUna sensibilidad colectiva, universal, sin traducción, ni anestesia. Brutalmente feliz.",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/fb_960x400_12.png'
	},
	{
		name: "Gran Fiesta de la Ópera",
		description:
			"La Gran Fiesta de la Ópera será un espectáculo para celebrar el tan esperado reencuentro de Juventus Lyrica con el público y la reapertura del Teatro Avenida, con una selección de lo más destacado de la ópera de todos los tiempos, en una sola noche. De Verdi a Mozart, de Puccini a Bizet, de Donizetti a Offenbach y muchos más. ¡Una verdadera maratón de la ópera!\nEsta fiesta musical contará con la presencia de grandes artistas como Monserrat Maldonado, Constanza Díaz Falú, Marcelo Gómez, Carolina Gómez, Darío Sayegh, Pablo Urban, Laura Penchi, Juan Salvador Trupia, Juan Font, Rocío Arbizu, Gabriel Carasso, Ivana Ledesma, Ernesto Bauer y Eugenia Fuente, entre muchos otros. También contará con coro y orquesta en vivo. El espectáculo tendrá dirección musical de Hernán Sánchez Arteaga, la dirección escénica de Ana D’Anna y María Jaunarena, y con Hernán Schvartzman como director musical invitado (director musical de Opera2Day, Holanda).",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/ticketek-gran-gala_960x400.png'
	},
	{
		name: 'Cami',
		description:
			"CAMI, la artista chilena de mayor proyección internacional, anuncia su próximo concierto en Argentina en el teatro Gran Rex de esta capital. La joven cantante y compositora hará su segunda presentación formal en nuestro país, aunque anteriormente participó como invitada en importantes shows multitudinarios como los de  TINI, Morat y Luciano Pereyra.\nCami debutó oficialmente junto a su banda en La Trastienda, en un show que agotó sus localidades rápidamente varios meses antes de su realización. Ahora Cami regresa con nueva y buena música mientras atraviesa un gran momento en su carrera profesional después de su participación en los Latin Grammys, Viña del Mar, entre otros highlights del año pasado.\nEntre las novedades musicales, podremos escuchar en vivo la primera parte de su álbum “Monstruo” (Pt.1), con canciones como “La Despedida”, “Aquí Estoy” y “Vuelvo”, entre otras. Muy pronto será lanzada la segunda parte de este álbum.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/cami_poster_960x400_sin_tktk.png'
	},
	{
		name: 'Peppa Pig',
		description:
			"Comienzan las clases y Peppa con sus amigos se reúnen en la escuela con su querida Señorita Gacela. Es un lugar de encuentro divertido donde aprenderán muchas cosas, incluyo yendo de campamento compartiendo y descubriendo lo mágico de la Naturaleza. Lo que más le gusta a Peppa es aprender en compañía de sus amigos, por eso acompaña a Suzy oveja, Pedro Pony, Gerald Jirafa y su pequeño hermano George. Entre todos nos propondrán una genial tarde de diversión asegurada, con canciones, cuentos y muchísimas sorpresas.\nPEPPA PIG es una serie original desarrollada por Hasbro eOne y se emite todos los días por Discovery Kids.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400-tcktk.png'
	},
	{
		name: 'Mini Beat Power Rockers',
		description:
			"Es una serie original desarrollada por Discovery Kids junto a MundoLoco CGI, el estudio de animación fundado por Juan José Campanella. Cuenta las aventuras de FUZ, WAT, MYO y CARLOS, un grupo de amigos que sueñan con ser la banda de rock más grande de la historia. Cada día, mientras sus padres trabajan, ellos se divierten en la guardería haciendo lo que más les gusta ¡tocar música! pero DOLORES, la joven niñera a cargo del lugar, sólo quiere tranquilidad para poder conectarse a su mundo de las redes sociales. Se emite por Discovery Kids de lunes a viernes a las 11:00 hs.",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400vi.png'
	},
	{
		name: 'Disney Entrelazados LIVE',
		description:
			"Disney Entrelazados Live!, el primer show en vivo de la serie original de Disney+, ¡llega a los escenarios del Teatro Gran Rex!\nCon la participación de Carolina Domenech, José Giménez Zapiola “El Purre”, Kevsho, Manuel Ramos, Manuela Menéndez, Tatiana Glikman y Abril Suliansky, el nuevo espectáculo producido por MP y Ozono Producciones de la mano de Disney se presentará el 9 de Julio en el Gran Rex para poner a cantar y a bailar a todos sus fans.\nDisney Entrelazados Live! presenta un show musical imperdible con los temas musicales que conquistaron a los fans de la serie, incluyendo las canciones originales “Donde voy” y “Convénceme”, covers de los ’90 como “Seguir viviendo sin tu amor”, temas del musical Freaky Friday, y hits del momento que no podrán dejar de cantar y bailar.\nEn el show, el elenco da vida a la música de la serie Disney Entrelazados con canciones que sorprenderán a los seguidores, con una puesta en escena única, inspirada en la historia de Allegra y su intrigante viaje en el tiempo",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/entr960.png'
	},
	{
		name: 'Caminos y Sabores',
		description:
			'Caminos y Sabores del 7 al 10 de julio, festival y mercado argentino de alimentos  ',
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400cys.png'
	},
	{
		name: 'Nando de la Gente',
		description:
			"HERNANDO ENRIQUE GONZALEZ NAVA, mejor conocido en el mundo artístico como Nando de la Gente nació el 16 de Mayo de 1979 en Maracaibo Estado Zulia Venezuela iniciando su carrera como locutor en Enero del 2002 con su programa “A MIL KILOMETROS “en la estación de radio Alegría 98.7FM… y no fue hasta Febrero del 2009 que se catapulto y logro concretar su Proyecto mas éxitoso “EL SHOW DE LOS GUAPOS” el cual se mantuvo al aire durante 9 años en las estaciones de radio RUMBERA NETWORK 98.7FM, METROPOLIS 103.9FM Y URBE 96.3FM convirtiéndose en el programa numero 1 de los oyentes del occidente Venezolano, hecho que llevo a convertirlo en el locutor mas importante de la nueva generación de artistas zulianos.\nA lo largo de los años, aplico y tengo como frase bandera 'hay que soñar y trabajar, así lo hago yo' (y me funciona).\nHe tenido la oportunidad de presentarme en muchos escenarios del mundo. Países como Estados Unidos, Panamá, Argentina, Chile, España, Canadá, Aruba, Perú, Ecuador, México, Colombia, Venezuela y hasta el medio oriente fui a dar. Me presenté pa varios camellos en Bahrein, Abu Dahbi y Dubai.\nSoy papá, esposo, hijo, hermano, primo, amigo, pero por encima de todas las cosas, soy de la gente.",
		organizationId: 3,
    backgroud_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960-x-400_0.jpg'
	},
	{
		name: 'Andreea Vieru',
		description:
			"Una noche dedicada a honrar la tradición y la elegancia de la música ciudadana porteña.\nDirección artística: Lucas di Giorgio\nDirección musical y piano: Alejandro Drago\nContrabajo: Hernán Cuadrado\nBandoneón: Federico Biraben\nViolines: Mayumi Urgino y Maritza Pacheco\nBailan: Mariela Sametband y Diego Amorin\nProducción general: Nicolás Rey / Un Perro Andaluz\nEvento recomendado por la Embajada de Rumania ",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/andrea_vieru_960x400.png'
	},
	{
		name: 'Network',
		description:
			"Basada en la película del mismo nombre y escrita por Paddy Chayefsky, protagonizada por Faye Dunaway y Robert Duvall, que se llevó varios premios Oscar en 1977. En 2017, Lee Hall hizo una adaptación para teatro por encargo del National Theatre, que fue dirigida por Ivo Van Hove e interpretada por Bryan Cranston (Breaking Bad). Tiempo después llegó a Broadway nuevamente con Cranston y se sumaron los talentos de Tony Goldwin, Tatiana Maslany, Ron Canada, entre otros. La obra fue nominada en 6 categorías de los premios Tony de 2019 y Cranston obtuvo el premio a Mejor Actor.\nLa obra muestra a Howard Beale, un presentador de noticias de televisión, que tras 25 años, recibe la fatal noticia de que va a ser despedido. Por lo que en su desesperación anuncia, que en su próxima aparición se suicidara en vivo. Esta jugada sube la audiencia del canal televisivo a un nivel nunca antes visto y hace que los ejecutivos le den otra oportunidad con un nuevo programa. Sin embargo, Beale aprovecha este espacio para criticar incluso a su propio multimedio.",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/net2960.png'
	},
	{
		name: 'Polenta',
		description:
			"Fiesta Polenta comenzó en el año 2019, llenando las salas de reggeaton y pop, con más de 20 ediciones sold out. Durante el 2020 las ediciones continuaron en formato virtual y se llevó a cabo una colaboración con la revista Playground.\nLa Polenta no es cualquier fiesta.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/polenta_960x400.png'
	},
	{
		name: 'Noche de Stand Up',
		description:
			"'Noche de Stand Up' es un ciclo ideado, producido y protagonizado por mujeres y disidencias. Un show que alterna sin pausa entre la risa y la reflexión profunda, haciendo un repaso sobre lo cotidiano, las costumbres y las propias formas de vida. Una propuesta diferente para cortar la semana a pura risa y disfrutar de una amplia propuesta gastronómica, tragos y bebidas.\nEn esta oportunidad contaremos con la presencia de Ana Fainberg, oriunda de Villa La Angostura. Ana es psicoanalista, comediante, productora y feminista. Estudió Stand Up con Pablo Molinari, Ricardo Bisignano y Federico Simonetti.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/t940x400.png'
	},
	{
		name: 'Feria Ciruja',
		description:
			"Llega una nueva edición del evento de coleccionismo más grande del país. Feria Ciruja regresa a C Complejo Art Media con más de 100 stands, entre los que habrá todo tipo de objetos retro coleccionables, videojuegos, muñecos, indumentaria, revistas, vinilos, comics y mucho más.\nVení a pasar un domingo diferente y disfrutar de la mejor gastronomía, bebidas y música, todo en el corazón del barrio de la Chacarita.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_feria.png'
	},
	{
		name: 'Luli Pampin',
		description:
			"Una de las artistas infantiles más reconocidas del mundo llega a Quality Espacio para presentar su show. \nLuli Pampin era una bailarina encerrada en una cajita musical que soñaba con abandonar algún día ese pequeño lugar, cantar y bailar por el mundo entero. Gracias a la radio mágica y a la imaginación de los pequeños logrará cumplir su sueño, viviendo divertidas aventuras junto a sus amigos más extrañables y superando dificultades que intentarán impedir su alegría. El próximo 16 de julio la artista se presentará en Quality Espacio. \nCon millones de visitas en Youtube, cinco discos, un libro y su propio show musical, Luli Pampín hoy cuenta con seguidores para todo el grupo familiar. En 2016 subió su primer video a Youtube y desde entonces no ha dejado de trabajar para conseguir su sueño.\nVení a disfrutar de un sueño hecho realidad. Vení a disfrutar de Luli Pampín!",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/pamp960.png'
	},
	{
		name: 'Fernando Ruiz Diaz',
		description:
			"Fernando Ruiz Diaz presenta por primera vez en CABA, su show íntimo en solitario. Acompañado de diferentes instrumentos, nos invita a un recorrido por las canciones que marcaron su trayectoria en Catupecu Machu y Vanthra en formato electro-acústico.--",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/fernandoruizdiaz960x400.png'
	},
	{
		name: 'Pan Percusión con Señas',
		description:
			"PAN edición Día del Amigo, el próximo 20 de julio en C Complejo Art Media. El dream team musical que utiliza el lenguaje de percusión con señas y una fiesta única para disfrutar con amigos: música, tragos, baile, juegos y mucho más.\nLos destacados músicos que integran PAN desbordan sobradamente el rango sonoro y rítmico de los grupos de percusión tradicionales. Al combinar la potencia de las formaciones de percusión, con la libertad creativa que ofrece el lenguaje de señas creado por Vazquez, PAN alcanza un sonido contundente y refinado, difícil de igualar.\nSus integrantes son Nico Sorín, Mono Fontana, Sergio Verdinelli, Nico Cota, Facundo Guevara, Milo Moya, Caro Cohen, Gonzalo Arévalo. Tiki Cantero y Santi Ablin; dirigidos por Santiago Vázquez.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/pan_ticketek_960x400.png'
	},
	{
		name: 'Ismael Serrano',
		description:
			"Ismael Serrano se presentará los días Viernes 5 y Sabado 6 de Agosto en el Teatro Opera Orbis Seguros.",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960px-x-400px-copia.png'
	},
	{
		name: 'Tocadak',
		description:
			"TocaDak llega a C Complejo Art Media con un line up imperdible: Los Espiritus, Valdes, Isla de Caras, Delfina Campos, Fantasmagoria, Faraonika, Curu y Atalhos. El festival de música indie-urbana y un planazo que contará además con una exposición fotográfica, arte, tatuajes, moda y mucho más.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/festival_940x400.png'
	},
	{
		name: 'Arbolito',
		description:
			"Arbolito festeja sus 25 años de andar, convocando al encuentro de su música con quienes compartieron sus historias en este camino. Una fiesta donde celebraremos estos años de música, lucha y amor.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/banner-960x400_1.png'
	},
	{
		name: 'Bryndis X Siempre',
		description:
			"Avalados por 25 años de carrera musical y un sin fin de éxitos, los hermanos GUADALUPE y JUAN GUEVARA dan vida a BXS Bryndis X Siempre, una agrupación que ha recorrido México, Estados Unidos, Argentina, Bolivia, Paraguay, Chile, Brasil, Perú, Guatemala, España, Suiza e Italia cantándole al amor y conquistando escenarios. Originarios de San Luis Potosí y con el talento en la venas, han hecho de su música un himno para los enamorados, permitiéndoles llegar a lo más profundo de los sentimientos de la gente.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/bxs960.png'
	},
	{
		name: 'Los Tekis',
		description:
			"Los Tekis se presentan en el Teatro Opera Orbis Seguros el 19 de Agosto.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_sin_logo.png'
	},
	{
		name: 'Cesar "Banana" Pueyrredón',
		description:
			"Este artista único, dueño de una voz que ha enamorado a varias generaciones, con sus emblemáticos: “Conociéndote”, “Cuando amas a alguien”, “Mi buen amor”, entre otros muchos éxitos, nos vuelve a convocar esta vez para un concierto que promete ser inolvidable.\nCon sus mejores canciones como estandarte, y acompañado por su banda histórica, César “Banana” Pueyrredón se presenta el SÁBADO 20 DE AGOSTO a las 20:00 hs. en el escenario del prestigioso Teatro Ópera Orbis de esta capital, para hacernos vibrar en una nueva noche romántica… Festejando junto a su incondicional público los 50 años de la edición del simple “Toda una Noche contigo”.\nLejos de lo meloso, de lo frívolo, sus letras hablan del amor, de los sueños, de la esperanza, valores tan necesarios en estos tiempos. Su estilo baladista y su devoción por la melodía se dieron la mano con la energía del rock dando origen a su inconfundible estilo, que lo hace tan particular.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/pieza-banana-ticketek-960-x-400-px.png'
	},
	{
		name: 'El Kuelgue',
		description:
			"El kuelgue se presentará el viernes 26 de agosto en Complejo Art Media",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/mesa_de_trabajo_2.png'
	},
	{
		name: 'Ruggero',
		description:
			"Con un estilo único en el género pop clásico y romántico, sumando su especial carisma y talento, RUGGERO vuelve a pisar fuerte con su segundo trabajo y anunció su esperado reencuentro con el público de Buenos Aires. “Volver a cero Tour” llegará el próximo 1 de septiembre, donde se presentará por primera vez en el Teatro Ópera.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_17.png'
	},
	{
		name: 'Susana Baca',
		description:
			"Su música vuelve a sonar en vivo en Argentina.\nEsta dama de la música peruana, es la heredera, quizás la última de esta leyenda de artistas que cantaron desde el corazón a sus reivindicaciones sociales y desde el alma a sus raíces. Así, Susana Baca, con sus más de quinientos conciertos, sus 3 premios Grammys, sus condecoraciones y las luces de un cargo político como ministra de cultura, es y será siendo la representante del cantar con finura y con sabor...",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400-2_1.png'
	},
	{
		name: 'Jean Carlos',
		description:
			"Jean Carlos se presentará el día viernes 2 de septiembre en el Teatro Gran Rex.",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/jc960.png'
	},
	{
		name: 'Koino Yokan',
		description:
			"El dúo Koino Yokan se presentará en su formato banda el sábado 10 de septiembre en C Complejo Art Media. Por primera vez, recorrerán sus nuevas canciones lanzadas en 2022 y un compilado de temas que fueron publicados en años anteriores.\nEl show contará con una amplia variedad de estilos, que irán desde momentos acústicos hasta rock, pasando por otros estilos como el reggae y el indie.",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/koinoyokan960x400.png'
	},
	{
		name: 'Una semana nada más',
		description:
			"Una semana nada más se presenta a partir del 15 de Septiembre en el Teatro Opera Orbis Seguros.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/2_0.png'
	},
	{
		name: 'Sele Vera y Pampas de Bariloche',
		description:
			"La agrupación barilochense que hace furor en las redes sociales, Sele Vera y Pampas de Bariloche es un grupo de jóvenes artistas del sur del país, con gran repercusión en los últimos tiempos.\En el 2021 llegó el momento de subirse a distintos escenarios, luego de una exitosa gira por ciudades de Argentina y Bolivia, regresan a Salta con un show único e inolvidable apto para todo público.\nEl 25 de octubre de 2021 el fenómeno del Chamamé romántico, subieron por primera vez al imponente y mítico Teatro Provincial Juan Carlos Saravia.\nSele Vera y Pampas de Bariloche es una agrupación musical, oriunda de Bariloche, difícil de definir, pero quizá en esa imposibilidad de encasillamiento radique su éxito, ellos llevan el folclore y las tradiciones camperas bien en alto.\nLograron una mezcla generacional admirable adaptando los temas a todas las edades, lo que les permite llegar a un extenso público.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/sele960.png'
	},
	{
		name: 'Sergio Torres',
		description:
			"Sergio Torres y los Dueños del Swing se estarán presentando con sus clásicos temas y los más exitosos del momento. Referente de la cumbia santafesina, no faltarán sus temas clásicos como Piropo, Mi celosa hermosa, Llorarás, Claro que te amo y muchos más. Será una noche a puro ritmo y alegría.\nSergio Torres, nacido en la Ciudad de Santa Fe, con más de 43 años de trayectoria, comenzó a incursionarse como cantante en la música tropical a los 13 años en el Grupo Tropical Maracaibo, en el cual estuvo un año y medio. El Señor Marcos Camino lo llevó a ser la voz del grupo tropical Los Palmeras. Después formó parte de Grupo Alegría de Santa Fe, en el que permaneció por 8 años.\nEn 1992 decide retomar el canto participando en Los ilusionistas y en 1993 regresa a trabajar con Zanco cuando 'Tropical..' comienza a llamarse Grupo Cali, grabando grandes éxitos como 'La carta', 'Mi amiga', 'Chica sexy', 'La ultima vez', 'Ese soy Yo', 'Chicas malas', 'El campeón de la vida', 'Amor de chat' y más. Sus canciones llegaron a ser conocidas en el exterior como en Panamá y Colombia.\nHoy en día es uno de los máximos exponentes de la cumbia en la provincia de Santa Fe.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/sergio-torres960x400nuevo.png'
	},
	{
		name: 'Cervezar',
		description:
			"Llega el primer congreso internacional integral de ciencia y producción cervecera, contenidos inéditos, una gran feria de provedorxs de la industria, rondas de negocio y nuevas oportunidades.\nCientos de estilos de cervezas de todo el país, fermentados, gastronomía, arte, espectáculos y más.\nCopa Internacional\nCongreso de ciencia y producción\nEncuentro de proveedorxs\nPatio Cervecero\nFeria de productorxs\nDemostraciones\nConciertos",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_27.png'
	},
	{
		name: 'Marisa Monte',
		description:
			"“Portas” –su nuevo trabajo- muestra fácilmente la capacidad de Marisa Monte para entrelazar una mezcla ecléctica de géneros con el estilo y la fluidez de su talento, acumulados a lo largo de su aclamada carrera. El álbum tiene un trasfondo de voces uniformes, llenas de alma, que se alinean con los delicados matices de Marisa y que recorren una variedad de temas. Algunos de sus elementos son acústicos y despojados, y están elegantemente mezclados con temas más vibrantes y con mucha producción. Un álbum que parece desarrollado en capas y construido a la perfección para ofrecer cada uno de los ritmos que esperamos escuchar de ella, sin dejar de romper con los límites y de introducir novedades para el género.",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/monte960.png'
	},
	{
		name: 'Kevin Johansen',
		description:
			"Kevin Johansen presenta su nuevo disco de estudio 'Tú ve', un disco de reversiones propias y ajenas que cuenta con la participación de grandes artistas como Natalia Lafourcade, David Byrne, Jorge Drexler, Rubén Rada y Silvia Pérez Cruz. Con la producción de Juan Campodónico, este disco muestra al artista en su momento de esplendor y madurez artística. Un show distinto con un artista que ya es parte de nuestro ADN musical.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/kev960_0.png'
	},
	{
		name: 'Los de Imaguaré',
		description:
			"A modo de festejo por los 45 años del grupo, Los de Imaguaré vuelven a la calle Corrientes para dar inicio a su gira “Nuestro Tiempo Azul” en el teatro Opera Orbis. El grupo que supo llevar a lo más alto el género litoraleño promete un show con lo mejor de su histórico repertorio y grandes sorpresas.\nLos de Imaguaré poseen una rica historia dentro el chamamé con 18 discos editados. Han compartido escenarios con artistas tales como Ramona Galarza, Horacio Guaraní, Mercedes Sosa y La Sole, entre muchos otros. \nEl grupo Los de Imaguaré (del guaraní ymaguare: antiguo) se formó en Mercedes, a 238 kilómetros de la capital correntina, en el año 1977. Sus fundadores fueron Joaquín Sheridan, quien se desempeñaba en bandoneón-acordeón, y Julio Cáceres, en guitarra, cantante y recitador. Hoy continúa Julio y junto a su hijo, Nicolás, quienes ponen en lo alto al chamamé.",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/imaguare-960x400.png'
	},
	{
		name: 'Expo Karmika',
		description:
			"Primera expo referente en conocimiento holístico de Latinoamérica.\nExposiciones, conferencias y talleres, consultas individuales y grupales, gastronomía consciente, arte y mucho más.\n+ de 60 stands, 30 conferencistas y vos descubriendo! Tarot – Astrología – Reiki – Numerología – Runas – Registros Akáshicos – Mediumnidad – Constelaciones – Limpieza energética – Péndulo Hebreo – Cuencos – Angeología – Tameana – Alimentación ayurvédica – Tattoo handpoke – Experiencia sahumos – Intervenciones artísticas – Medicina alternativa – Herbolaria – Mercado holístico.",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_44.png'
	},
	{
		name: 'Volar es Humano Aterrizar es Divino',
		description:
			"Enrique Piñeyro vuelve por 9no año consecutivo con el aclamado stand up Volar es Humano, Aterrizar es Divino, en el Teatro Coliseo. Con la recreación exacta de una cabina de Boeing 737-200 y un juego de proyecciones que convierten el escenario en un vuelo, la puesta en escena logra una fusión perfecta entre el cine, el teatro y el monólogo de humor. Enrique Piñeyro sorprende con su humor y convierte este original espectáculo en un nuevo género que alterna sin pausa entre la risa y la reflexión profunda, demostrándonos que si copiáramos muchas de las cosas que hacemos en aviación, este sería un lugar más bello e infinitamente más seguro para convivir y más respetuoso de los derechos ajenos. ",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/volar960.png'
	},
	{
		name: 'Somos Bien Argentino',
		description:
			"Con la dirección de Ángel Carabajal y la producción de We! Latinoamérica llega al Teatro Gran Rex “Bien argentino”, un espectáculo que experimenta ideas transformadoras, superándose en expresiones artísticas renovadoras que traen como resultado un show con fuerza, sensibilidad, humor y emoción.\nEste espectáculo multipremiado ha recorrido todo el país y ha llegado a todo el mundo para mostrar nuestro folklore y cómo se representan nuestras más arraigadas costumbres. Fundada en el profesionalismo, la originalidad y el valor por nuestras raíces, “Bien Argentino” llega al Teatro Gran Rex con un elenco de lujo formado por artistas destacados de nuestro país, entre ellos resalta la vuelta al país del gran coreógrafo y cantante Marcelo Iripino.\n“Bien argentino”, el espectáculo de la argentinidad al palo.",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/argent960.png'
	},
	{
		name: 'Experiencia Queen',
		description:
			"Grandes éxitos como BohemianRhapsody, Radio Ga Ga, We Are the Champions, UnderPressure y AnotherOne Bites theDust, forman parte de un setlist para disfrutar y emocionarse en familia.\nUna noche en la que recorrerás la magia de Queen y será muy difícil distinguir entre la vida real y la fantasía.",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400-copia_0.png'
	},
	{
		name: 'Lauren Jauregui',
		description:
			"En 2022, Lauren Jauregui realiza una gira mundial con su espectáculo 'An Evening with Lauren Jauregui', que pasará por EE. UU. y Canadá entre los meses de julio, agosto y septiembre, y llega a Brasil para un espectáculo único el 14 de octubre. . Entre las canciones del setlist, el público podrá contar con éxitos de su primer EP 'Prelude' (2021), como: 'Don’t Wanna Say', 'Falling' y 'Scaterred'.\nY se presenta en Argentina en el teatro Gran Rex, el 16 de octubre de este Año. Para participar de una noche increible.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/lauren960.png'
	},
	{
		name: 'Leonel García',
		description:
			"Desde @we_latinoamerica les comunicamos que por motivos ajenos a la producción, al @teatro_granrex y a @ticketekar y por cuestiones de agenda y logística, queda reprogramada la fecha del recital de @leoellon para el lunes 10 de octubre a las 20:30.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/leo2960.png'
	},
	{
		name: 'Ciro y Los Persas',
		description:
			"¡Ciro y Los Persas vuelven al Estadio de Vélez! Luego de comenzar el año llenando el Polideportivo de Mar del Plata, del Cosquín Rock y de girar por Uruguay, Ciro anuncia el quinto gran estadio de su carrera solista. Será el sábado 22 de octubre en Vélez. \nCiro y Los Persas ya hicieron dos estadios de Ferro en 2014, un Vélez en 2016, un River en 2018, y más de 40 shows en el Luna Park.\n¡¡¡El show del año de Ciro!!!",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/ciro960_0.png'
	},
	{
		name: 'Diego Torres',
		description:
			"Diego Torres se presentará los días 21 y 23 de Octubre en el Teatro Gran Rex.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/dieg960.png'
	},
	{
		name: 'Territorios',
		description:
			"Partir de la geografía es necesario porque ella se cobija en la memoria, nos constituye, y al mismo tiempo no podemos ni debemos desprendernos de ella. Las canciones que los países contienen, los ritmos que recogen, las poesías que lo alcanzan son las fuentes de nuestro andar musical. Han dejado su rastro vivo en las voces colectivas y en la de cada uno de nosotros. Nuestra tarea ha sido volver a ellas, interrogarlas y, si fuera posible, devolverlas una vez más al tiempo que nos es propio. Pero hay un acontecimiento que propone una extensión de nuestros propios territorios y ese acontecimiento es la presencia amistosa de los encuentros. Una obra musical, una propuesta cultural se hace pensando en la amistad que ellos provocan. No es fácil representar un país pero de esa dificultad extraemos nuestra fuerza, una fuerza poética y musical, esa fuerza que alienta nuestros desvelos y nuestros anhelos. De ahí sacamos el más propicio horizonte cultural para pensar cada vez nuestros propios territorios.\nA lo largo del concierto recorren obras fundamentales de compositores tales como Caetano Veloso, Atahualpa Yupanqui, Fernando Cabrera, Federico García Lorca y Leonard Cohen, Milton Nascimento, Fito Páez, entre tantas otras piedras preciosas del repertorio popular.",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/terri960.png'
	},
	{
		name: 'Bada',
		description:
			"La feria que Revolucionó el Mercado Internacional de Arte cumple 10 años y lo celebrará como ya nos tiene acostumbrados con 280 artistas consagrados y emergentes del 25 al 28 de Agosto en el pabellón Verde de La Rural Predio Ferial de Buenos Aires (Av. Sarmiento 2704 – C.A.B.A.). Desde Argentina al mundo, BADA ha sentado las bases de una plataforma comercial para el artista autogestivo, impulsándolo a contactarse con el público sin intermediarios. Durante todos estos años ha demostrado que es posible comprar obras de arte de calidad a precios accesibles. Esto se debe a que los artistas participantes ingresan tras una cuidada selección. Una invitación al disfrute y compra de arte en sus diferentes y variadas disciplinas y estilos; pintura, dibujo, escultura, textiles, fotografía, collage, instalaciones, arte digital, mosaiquismo, muralismo y Street art.",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/bada-960x400.png'
	},
	{
		name: 'Escuela de Nada',
		description:
			"Semper Bichos es el nombre de la nueva gira de Escuela de Nada que visitará más de 70 ciudades alrededor del mundo.\nEl show parte de una premisa cronológica en la que paseamos por la vida de Chris, Leo y Nacho desde el nacimiento, llegando a lo que serían en el 2065 ya en la tercera edad, destacando el hecho de que todos somos iguales desde el momento en el que somos concebidos hasta nuestros días finales sin cambiar nuestra manera de ver la vida. Todo a través de la comedia improvisada que caracteriza al podcast.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/escuela960.png'
	},
	{
		name: 'Genetics',
		description:
			"GENETICS es el grupo de rock argentino que interpreta la música de Genesis, con una exactitud y pasión únicas. Sus shows se caracterizan por la fidelidad a las grabaciones originales y a la puesta en escena recreando los conciertos de la época.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400-ticketek_3.png'
	},
	{
		name: 'Rozalen',
		description:
			"Once canciones que reflejan la mirada interior de una artista que observa la realidad que nos rodea y la transforma desde la más pura emoción. Un álbum con un concepto que nos inspira y nos lleva a la reflexión, que llega en el mejor y más oportuno momento.\nInspirándose en la expresión “los árboles no dejan ver el bosque”, e invirtiéndola, María imagina una sociedad donde la comunidad deja ver a los individuos: con sus problemas, sus emociones y su verdad.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_60.png'
	},
	{
		name: 'Marama',
		description:
			"Luego de un año exitoso, MARAMA regresa a la calle Corrientes Buenos Aires, con un show imperdible el 5 DE NOVIEMBRE en el Teatro GRAN REX.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960-x-400.png'
	},
	{
		name: 'Robleis',
		description:
			"El multifacético artista argentino causa furor con sus primeros shows en Argentina y agota funciones en tiempo récord\nRobleis ha sabido conquistar a la nueva generación con su contenido digital, convirtiéndose en el artista suceso entre jóvenes y adolescentes, gracias a la cercanía que solo él sabe generar con su público, a través de plataformas digitales como Youtube, Twitch, Twitter e Instagram.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/robnew960.png'
	},
	{
		name: 'Piano Bar',
		description:
			"Piano Bar, la banda que interpreta la discografía de Charly García, se presentará el sabado 2 de julio, a las 21 hs, en el Teatro Quality.\nUn viaje por el mundo recorriendo sus mejores obras: Yendo de la cama al living, Fanky, Demoliendo hoteles, Asesiname, No soy un extraño, Chipi Chipi, Cinema Verite, Seminare, Rezo por vos, Cerca de la revolución, entre otros.\nPiano Bar es una banda de Rosario liderada por Tiago Galindez, con un show con una impronta visual y sonora unica.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400-pianobar.png'
	},
	{
		name: 'The Pink Floyd Connection',
		description:
			"El viernes 11 de Noviembre, a las 21 hs., se presentará en el Teatro El Círculo, de Rosario, THE PINK FLOYD CONNECTION con un gran show interpretado por The End y la destacada vocalista de Pink Floyd, Durga McBroom. La banda celebra sus 30 años interpretando las mejores canciones del grupo de rock británico. En noviembre de 2009, The End realizó dos conciertos en el Gran Rex junto a Durga McBroom, vocalista original de Pink Floyd. El éxito de los shows llegó a oídos de Guy Pratt y Jon Carin, bajista y tecladista respectivamente de los Floyd originales y posteriormente formaron parte. Fue así que en su aniversario número 20 fue se llevó a cabo “Pink Floyd Connection II” junto a Durga McBroom y Guy Prattl. Además la banda interpretó una serie de shows sinfónicos, agotando localidades en Rosario, Buenos Aires y Asunción de Paraguay, donde el show fue declarado de interés cultural.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_33.jpg'
	},
	{
		name: 'Zoe Gotusso',
		description:
			"Zoe Gotusso es una cantante y compositora Cordobesa que con su cautivante voz, su magnetismo y sus composiciones se ha consolidado como una de las artistas más resonantes de la nueva generación musical argentina. Mientras cuenta los días para anunciar un tour de más de 60 conciertos por Iberoamerica, en los últimos días, Zoe recibió dos nominaciones para los Latin Grammys, como “Mejor Nuevo Artista” y “Mejor Canción Pop / Rock” (por Ganas). Además, este mismo año ganó el premio Gardel al “Mejor Álbum Pop” (categoría que compartió con Tini y Lali) y fue elegida por Spotify para encabezar la campaña Equal, con una gigantografía en Times Square, Nueva York. ",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/zoe2960.png'
	},
	{
		name: 'Ahyre',
		description:
			"Con una trayectoria de más de 15 años en la música, Juan José Vasconcellos, Sebastián Giménez y Hernando Mónico forman en 2019 'AHYRE', junto a Federico Maldonado. La banda oriunda de Salta (Argentina) cuenta con la colaboración de Guido Bertini, en percusión y batería.\nUna nueva página, con una impronta joven, armoniosa, fresca y actual. AHYRE fusiona la fuerza de la raíz latinoamericana con nuevas texturas, timbres y colores que exponen su mirada universal de la música.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_54.png'
	},
	{
		name: 'This is Michael',
		description:
			"This is Michael se presentará el día viernes 18 de noviembre en el Teatro Gran Rex.",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/this960.png'
	},
	{
		name: 'Kings of Convenience',
		description:
			"'Peace Or Love' que los lleva nuevamente a reunirse tanto en el estudio como en presentaciones en vivo, es el sonido de dos viejos amigos que exploran la última fase de sus vidas juntos y encuentran nuevas formas de capturar esa magia elusiva. El LP suena tan fresco como la primavera: 11 canciones sobre la vida y el amor con la fascinante belleza, pureza y claridad emocional que todo seguidor esperaría de Kings of Convenience.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/kings960.png'
	},
	{
		name: 'Dios Salve a la Reina',
		description:
			"La banda liderada por Pablo Padín, Ezequiel Tibaldo, Dani Marcos y Matías Albornoz que viene conquistado el mundo y desatándo un fenómeno increíble, presenta su nuevo show que recorrerán las mejores canciones de #QUEEN, desde 1973 a 1995, con temas para emocionarse sin pausa.\nEl unico tributo a Queen que triunfa en el mundo! Viví Queen sólo como podes vivirlo con Dios Salve a la Reina!",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/gstq960.png'
	},
	{
		name: 'Leiva',
		description:
			"Leiva se presentará el día Sábado 3 de Diciembre en el Teatro Gran Rex.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/leiva960.png'
	},
	{
			name: 'Nahuel Pennisi',
		description:
			"Nahuel Pennisi, talentoso guitarrista, cantante y compositor que se ha transformado en uno de los intérpretes más importantes de Argentina, secundado por su sólida banda, nos llevará en un recorrido por todas aquellas melodías que todos queremos volver a escuchar.\nEl Sábado 17 de Diciembre en el horario de las 20:00 hs., sobre el prestigioso escenario del Teatro Ópera tenemos entonces una cita imperdible con su particular voz.\nUna invitación a disfrutar de nuestros sentidos desde la emoción…",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/pieza-ticketek-960-x-400-px.png'
	},
	{
		name: 'Estelares',
		description:
			"Estelares se presentará el día sábado 17 de diciembre en el Teatro Gran Rex.",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/est960_0.png'
	},
	{
		name: 'Los Caligaris',
		description:
			"En el marco de su gira mundial con la que celebrarán 25 años de trayectoria, Los Caligaris llegan al Estadio Monumental de Alta Córdoba el sábado 1 de octubre. La banda realizará un show de gala trayendo a Córdoba el espectáculo más importante de su carrera “Veinticirco: Nunca es tarde para ser un niño”, que vendrá acompañado del disco más arriesgado de sus vidas. \nEl primer adelanto de su nuevo álbum fue “Quiero Cumbia” una poderosa cumbia en colaboración con Kódigo que comprueba su versatilidad y dinamismo. El segundo adelanto fue “Con Vos”, una hermosa canción romántica producida por Eduardo Cabra. En pocos días saldrá a la luz el tercer adelanto, producido por Mosca Lorenzo y Mariano Franceschelli, de Los Auténticos Decadentes.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/cali960.png'
	},
	{
		name: 'FMK',
		description:
			"Uno de los artistas de la escena urbana latinoamericana más reconocidos de la argentina llega a Cordoba.\nLuego de liderar todos los rackings digitales y de Radios, FMK recorrerá por primera vez todo el país en una gira donde presentará su primer disco “Desde el espacio”, que incluye temas solistas y colaboraciones con los artistas más destacados del género, FMK se posiciona una vez más dentro de los artistas más escuchados de la escena urbana argentina y da que hablar",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/fmk960.png'
	},
	{
		name: 'Masters of Rock',
		description:
			"Será el viernes 8 de julio 21 hs (Víspera de Feriado Nacional) y esta vez con un line up increíble conformado por Seattle Supersonics Tributo a Nirvana,  el mejor Tributo al icono grunge y su único show del 2022 en Córdoba capital.\nBad Obsession Tributo a Guns n Roses festejando 7 años de vida.\nMotorbreath Tributo a Metallica el emergente Tributo a la banda insignia del metal pesado y su demoledor show.\nUna cita de lujo para los amantes del rock de la década del 90.",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/masters960.png'
	},
	{
		name: 'Sole Macchi',
		description:
			"Sole Macchi, la creadora de la ya instaladísima frase “es viernes señores y mi cuerpo lo sabe’’ vuelve a los escenarios con su nuevo unipersonal…Mentime que me gusta!\nAmores, sexo, cuernos, relaciones tóxicas y mucho pero mucho humor!Vení a divertirte y reír de los mambos de ellas, de ellos y los tuyos!! \nLo vas a pasar genial!",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/sole960.png'
	},
	{
		name: 'Piñón Fijo',
		description:
			"Piñón Fijo vuelve al Quality!\nSe anima a intentar, a creer, a crear y reincidir en lo que mejor sabe hacer: divertir y emocionar a las familias. Con 32 años de trayectoria, se anima a explorar el contacto inicial y genuino con su publico, \nCon los recursos de su música, malabares, pantomimas, saxo cloacal, Kenchu y todos los valores que lo apuntalaron cuando empezó siendo un artista callejero.\nUn show con mucha emoción, diversión e infancias compartidas, la tuya y la de tus hijos. Así sigue pedaleando y cantando bien fuerte: Piñón Fijo… sigue siendo mi nombre, porque Córdoba me responde!",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/pf960.png'
	},
	{
		name: 'Topa',
		description:
			"TOPA, Tu Primer Concierto\nUn mágico recorrido por las nuevas canciones , sus grandes\néxitos y los clásicos de siempre para cantar y bailar a puro ritmo. Un\nevento único, que dejará huella en la memoria de los más chicos en\nsu primer concierto y en el corazón de los más grandes.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/topa-960x400-portado-web-quality-y-ticketek.png'
	},
	{
		name: 'La Barra',
		description:
			"El sábado 9 de julio, la Banda Más Grande vuelve al Quality para un show espectacular entre amigos, bailando a lo largo de toda la noche.\nUna velada teñida de celeste y blanco por el feriado del Día de la Independencia, y encendida con las grandes canciones barrabaleras de hoy y de siempre.\n¡Todos invitados para vivir otra gran noche juntos!",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/barra960.png'
	},
	{
		name: 'La granja de Zenón',
		description:
			"Zenón, sus sobrinos, Bartolito y todos los animales de la granja de Zenón llegan otra vez al teatro para contarnos una historia increíble, con todos sus personajes y canciones. Un show nuevo, imperdible, con grandes sorpresas.\nTito y Bartolito, sueñan llegar al arcoíris, pero ambos se ven decepcionados cuando Zenón y Pinto les dicen que eso es imposible.  Nada detendrá al travieso gallito Bartolito y al curioso Tito, no descansarán hasta lograrlo. Porque ellos saben que nunca hay que dejar de creer, nunca hay que dejar de soñar, siempre hay que imaginar y confiar en lo que nos dice el corazón.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/zen960_1.png'
	},
	{
		name: 'Misty Soul Choir',
		description:
			"Un recorrido por la obra de la artista británica que revitalizó el soul, jazz y rhythm and blues.\nMisty Soul nació en 2014, bajo la dirección de Ángel Vilkelis, con la premisa de recrear los estilos Soul, Funk y R&B. Habitualmente, realizan canciones de artistas icónicos como Aretha Franklin, Stevie Wonder y Michael Jackson, entre otros.\nEn esta ocasión, los clásicos de Amy Winehouse serán interpretados por cantantes solistas de Misty Soul y harán un cierre en formato coral de sus más grandes éxitos.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/misty960.png'
	},
	{
		name: 'Van Gogh El Sueño Inmersivo',
		description:
			"La primera exposición inmersiva que rinde homenaje a Vicent Van Gogh llega al Centro de Convenciones Córdoba del 20 de julio al 21 de agosto. Se trata de una atractiva historia digital creada por uno de los establecimientos italianos con mayor proyección internacional en creación de videos, donde el visitante podrá apreciar 75 obras maestras del artista con multiproyecciones de 360° de imágenes.\nPara completar la experiencia, la muestra está acompañada por una banda sonora especialmente lograda. Además, la exposición cuenta con un espacio educativo y otra sala en la que el espectador puede entrar en los cuadros a través de un fascinante juego de espejos.",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400-vangogh_0.png'
	},
	{
		name: 'Lucho Arrieta',
		description:
			"Lucho Arrieta, músico y cantautor, regresa a Córdoba para compartir un encuentro íntimo con su público y presentar adelantos de su nuevo material discográfico.\nSerá un concierto cargado de historias en las que podremos encontrarnos a nosotros mismos en cada una de ellas, recorriendo el amor, la consciencia y la alegría, desde el punto de la canción y la voz de Lucho. El próximo 22 de Julio tendrá lugar en Córdoba Capital, un concierto único que ofrecerá la oportunidad de revivir todas las canciones de su carrera que lo acompañaron todos estos años y aquellas que también forman parte de su repertorio en los festivales de Argentina.\nEn formato Full Band, Lucho y sus músicos ofrecerán una noche, que sin dudas será inolvidable.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400lr.png'
	},
	{
		name: 'Festival Riend',
		description:
			"Festival Friend\n5 AÑOS DE FIESTA\nFiesta Nacional del Dia del Amigo\nEdición: INVASION EXTRATERRESTRE\n+30 Bandas y Artistas // 5 Escenarios y  Mucho Mas!!",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/friend960.png'
	},
	{
		name: 'Juan Barraza',
		description:
			"JUAN BARRAZA es comediante de Stand Up desde el 2006. Hace casi diez años se presenta en la ciudad de Cordoba. Fue el primer comediante argentino en subir contenido a Spotify, donde tiene 5 shows en vivo y uno más en camino. Trabajó también como guionista y humorista en radio (Radio La Red am910 y RocknPop fm95.9 entre otras emisoras). Sus videos en youtube suman más de 3 millones de vistas. Ha llevado sus monólogos por más de 40 ciudades de la argentina y también por Uruguay, Perú, Colombia, México y España. En esta oportunidad presenta su último espectáculo GARABATO CONTROLADO reciebtemente estrenado y a la vez celebra 15 años en el circuito de Stand Up, donde es referente indiscutido.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/barraza960.png'
	},
	{
		name: 'Mau y Ricky',
		description:
			"Luego de 4 Teatros Gran Rex, 1 Luna Park y 17 shows en el interior del país, todos ellos SOLD OUT, Mau y Ricky vuelven con un espectáculo nunca visto. Un “desgenerado” concepto que da nombre, no sólo a la gira, sino también al nuevo proyecto musical del dúo.\nLas entradas saldrán a la venta por los canales habituales el próximo viernes 6 de mayo.\nNo cabe ninguna duda que Argentina abraza al dúo de hermanos Mau y Ricky y ya le ha demostrado su fidelidad en cada paso que han dado en su carrera.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/mr960.png'
	},
	{
		name: 'Enzo Aguilar',
		description:
			"'Como te digo una cosa…te digo la otra'\nEste primer Unipersonal escrito y dirigido por Enzo Aguilar tiene como objetivo traer a colación todos esos temas que en la cotidianeidad nos sobrepasan. Con el humor como principal herramienta Enzo pone al espectador a analizar y a reírse durante mas de una hora de las desgracias propias y sobre todo ajenas.",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/enzo960.png'
	},
	{
		name: 'La Noventosa',
		description:
			"La Noventosa con la tessio - Invitado Daniel Agostini\nSábado 6 de agosto 23:30hs Quality Espacio",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/90sa960.png'
	},
	{
		name: 'Darío Sztajnszrajber',
		description:
			"El filósofo y escritor llega a Córdoba el próximo miércoles 10 de agosto con “Deconstrucciones”, una nueva propuesta en la que se plantean preguntas tales como ¿Qué es el amor? ¿Qué es el poder? ¿Qué es la muerte?",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/dar960.png'
	},
	{
		name: 'Joyriders',
		description:
			"Joyriders - Tributo a Roxette vuelve a Córdoba, en un show íntimo y exclusivo para la ciudad. Se estará presentando el próximo Viernes 12 de Agosto a partir de las 21.30hs.\nJoyriders nació en la ciudad de Córdoba en el año 2014, y es hoy considerada el mejor tributo a Roxette del mundo por parte de los más fervientes fans del mítico dúo sueco, llenándonos de orgullo a los cordobeses por tener una banda de éste calibre.\nJoyriders ha estado recorriendo escenarios de todo el país y regresa a la ciudad de Córdoba con un show especial para todos los cordobeses.\nLos invitamos a compartir de éste evento íntimo y exclusivo en Quality Teatro.",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/rid960.png'
	},
	{
		name: 'Bambi',
		description:
			"Presentando su nueva gira República de la Nostalgia\nBambi vuelve a Córdoba con un show único donde presentará “República de la Nostalgia” su nuevo álbum, canciones de sus discos anteriores y los clásicos de su banda Tan Biónica.",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/bamb960.png'
	},
	{
		name: 'Jairo',
		description:
			"Luego del exitoso lanzamiento de “50 años de Música”, el álbum celebratorio con el que está recorriendo el país, donde actualiza las más significativas canciones de su repertorio junto a enormes artistas de distintas generaciones y estilos, JAIRO regresa a Córdoba con dos conciertos especiales donde estrenará versiones del volumen #2, próximo a publicarse, para un imperdible cierre de las actuaciones de su 50 aniversario. Con más de 800 canciones compuestas y 48 discos editados, distinguido y premiado internacionalmente por su trayectoria, JAIRO conmemora la música con una obra inigualable y una de las más emblemáticas voces de habla hispana.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/jai960.png'
	},
	{
		name: 'Manuel Wirzt',
		description:
			"Un show donde presentará todos los e´xitos de su carrera, más las canciones de su último álbum de estudio 'TODO'. Incluyendo nuevos temas como 'Desde que te vi' ft. Diego Torres, 'Loca de mi corazón', 'Todo', 'Uno', 'Tanto amor' y clásicos como 'Dondequiera que estés', 'Rescata mi corazón', 'Hoy te necesito', 'Loco por ti', entre otros.\nAdemás, estará acompañado de una nueva formación, con la que viene recorriendo los escenarios de todo el país, más la participación de invitados especiales.",
		organizationId: 3,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/manuel960.png'
	},
	{
		name: 'Miranda!',
		description:
			" El dúo pop más querido de Argentina regresa a Quality Espacio el jueves 1 de septiembre con un espectáculo que será inolvidable.\nDesde el año 2018 la banda ha estado visitando Córdoba, tocando en fiestas y festivales con una gran recepción del público. Ahora, Miranda! llega con un mega show propio, donde realizarán un recorrido por sus éxitos, incluyendo sus clásicos y sus temas más recientes.\nUna fecha imperdible para sus fanáticos y seguidores!",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/miran960.png'
	},
	{
		name: 'Grabriel Rolón',
		description:
			"PALABRA PLENA: Somos humanos en tanto habitamos un mundo de palabras. Un mundo lleno de seres y paisajes que no veremos jamás, y sin embargo nos recorren. Dar la palabra es darse uno mismo, siempre y cuando no se trate de una palabra vacía. No siempre que hablamos decimos algo de nosotros. La única palabra importante es la que lleva nuestra sangre. La que nos modifica una vez pronunciada. Esa es una palabra que nos compromete y nos define. Esa es una palabra plena. El mundo nos incita a hablar por hablar. Sin decir nada. “Palabra plena”, en cambio, nos desafía a pensar, a transitar el laberinto de nuestro propio enigma intentando evitar las trampas de la comodidad. Porque las cosas importantes de la vida son incómodas. Caminamos entre el amor y la pérdida, la felicidad y la angustia, la esperanza y el deseo. Siempre de la mano de la palabra. La palabra es abismo. Es al mismo tiempo herramienta y conflicto. Comunicación y malentendido. Verdad y mentira. Habitamos en la confusión. Y en esa confusión nos jugamos la vida.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/pieza-ticketek-960-x-400-px1.png'
	},
	{
		name: 'Sexpo Erótica',
		description:
			"Se viene los 17años de la SexpoErotica en:\n#QualityTeatro #QualityEstadio #QualityEspacio #QualityVip\nSe viene un GRAN festejo de los 17 años del Festival de Placeres que se hace en la Argentina.\nVamos a CELEBRAR LA DIVERSIDAD y a vivir el sexo de una manera real.\n3 Escenarios, mas de 300 Artistas Nacionales y Internacionales en escena, Teatro Erotico, Boulevard Erotico, Espacio Swinger, Espacio BDSM, Charlas Temáticas, Espacio Citas, Espacio WebCams, Tecnologia, Pintura Erotica, Espacio de Arte, Espacio de Juegos, Gastronomía, Concursos y muchas sorpresas mas!!",
		organizationId: 9,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/ero960.png'
	},
	{
		name: 'Ricardo Montaner',
		description:
			"El artista regresa a Córdoba el próximo 15 de septiembre en el marco de su gira “Montaner Tour 2022”. Ricardo Montaner llega por primera vez a Quality Estadio el próximo jueves 15 de septiembre, en el marco de su gira “MONTANER TOUR 2022”. Un concierto en el que Ricardo hará un recorrido por sus canciones clásicas, además de presentar temas de su más reciente álbum “TANGO”, el álbum más sentido de su carrera que se lanzó el pasado 24 de mayo y representa un homenaje a su infancia en Argentina, y la promesa que el artista le hizo a su padre, a su abuelo y a su público. “TANGO” realiza un viaje a las raíces del artista, en donde el material registrado con el rigor y la fidelidad que el tango requiere fue mezclado y terminado utilizando la mejor tecnología de la actualidad. “Cuartito Azul”, “Nada”, “Nostalgias”, “Uno”, “El Día Que Me Quieras”, “La Última Copa”, son algunas de las canciones inolvidables que se incluyen en el álbum.",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/mont960.png'
	},
	{
		name: 'Luciano Pereyra',
		description:
			"Luciano Pereyra regresa a los escenarios presentando nuevo álbum y nuevo show con su Tour 'De Hoy En Adelante'\nLleva 13 álbumes editados, más de 1 millón de discos vendidos y millones de reproducciones en plataformas digitales.\nCantó junto a grandes artistas internacionales como Alejandro Fernández, Carlos Vives, Alejandro Sanz, David Bisbal, Juan Gabriel, Juanes, Lucero, Luis Fonsi, Lang Lang, entre otros.",
		organizationId: 9,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/luc960.png'
	},
	{
		name: 'Virtual Park',
		description:
			"Tras el éxito de la primera edición, Virtual Park busca ser el parque tecnológico elegido por el público.\nEl próximo 25 de septiembre llega una nueva propuesta del mayor evento gamer del centro del país y tendrá lugar en Quality Espacio a las 15 hs.\nSe trata de una jornada colmada de  novedades en tecnología, juegos, realidad virtual, charlas informativas, y el torneo de e-sports con increíbles premios. Un escenario principal que fusiona shows y competencias, con el atractivo de contar con influencers, cosplayers y youtubers.\nVirtual Park reúne las principales marcas de la industria gamer para exponer y comercializar en una gran feria de Stand. \nFlex Producciones busca que el público viva una experiencia virtual única en este gran parque tecnológico.",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/park960.png'
	},
	{
		name: 'Los Kjarkas',
		description:
			"Sé parte de esta gran fiesta de festejo por los 50 años con el verdadero folclor andino.. El grupo boliviano que sigue marcando un mito en la historia cultural y musical del vecino pais.. Con aceptación  por todo el mundo. /// huaynos, tinkus, sayas, morenadas serán parte de un verdadero show imperdible.\nArtistas invitados 'llokallas'- gran encuentro de caporales y muchas sorpresas más toda la noche!!\nViernes 23 de septiembre, Kjarkas en concierto.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/kjar960.png'
	},
	{
		name: 'Pier',
		description:
			"La banda referente del denominado “Rock barrial” llega a Quality Teatro el viernes 23 de septiembre a las 21 para presentar su último single y video “Mundo en llamas” y realizar un repaso por las canciones más emblemáticas de su discografía. \nPier se formó en 1994 y actualmente está formada por: Ramiro Cerezo (voz), Agustín Cerezo (guitarra), Roy Quiroga (batería), Juan Copes (bajo) y Facundo Olmos (teclados). A lo largo de los años editaron 13 discos, 2 DVD’s y un vinilo, además el grupo cuenta con 20 videos oficiales, de los cuales 3 fueron grabados en vivo.  \nEntre sus canciones más reconocidas se encuentran: 'Sacrificio y Rock and roll', 'La ilusión que me condena' y 'Jaque mate'.",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/pier960.png'
	},
	{
		name: 'Ángela Leiva',
		description:
			"El viernes 15 de Julio, a las 21 hs., se presentará en el Teatro El Círculo, de Rosario, ANGELA LEIVA, una de las voces más destacadas de la música popular de Argentina. Con más de doce años de trayectoria musical, siete discos de estudios editados, y quien actualmente se encuentra realizando una amplia gira por todo el país que lleva por nombre ‘Amor Prohibido Tour’, se ha tomado el tiempo para realizar la presentación oficial de su nuevo single.",
		organizationId: 1,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/angela-leiva.png'
	},
	{
		name: 'Expo Tattoo',
		description:
			"Este evento contará con más de 100 tatuadores a nivel local, nacional e internacional, los cuales competirán en diferentes categorías de Tattoo durante los dos días.\nJunto con las actividades de tatuajes y concursos, contamos con capacitación por medio de talleres workshop y seminarios; por otro lado realizaremos actividades paralelas dentro del predio una de ellas es el Body Painting realizando el segundo torneo nacional, contamos con artistas locales y de diferentes provincias del país,",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400et.png'
	},
	{
		name: 'Vocación',
		description:
			"Vocación - Tributo a Maná\nViernes de 21 Octubre 21 hs\nQuality Teatro",
		organizationId: 7,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400mana_0.png'
	},
	{
		name: 'Ara Malikan',
		description:
			"Ara Malikian World Tour el 23 de Octubre en Quality Estadio.",
		organizationId: 8,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400-copia_1.png'
	},
	{
		name: 'Palito Ortega',
		description:
			"Tras el éxito de su último show en Córdoba, Palito Ortega decidió agregar un nuevo show el próximo 22 de octubre en Quality Estadio. En el marco de su Tour Despedida, el artista repasará su increíble y extensa carrera, con un espectáculo majestuoso y superador. \nEl cantante volverá a pisar los escenarios, para revivir todos sus éxitos, más las canciones de sus últimos tres álbumes, donde homenajeó a grandes autores de la música internacional. La gira despedida que inició en diciembre le permitió a Palito volver a estar cara a cara con varias generaciones de seguidores. ",
		organizationId: 5,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/ort960.png'
	},
	{
		name: 'Sergio Dalma',
		description:
			"Sergio Dalma llega a la Argentina para presentar su nuevo disco,  Alegría, y celebrar sus 30 años de carrera. \n El cantante español celebra sus 30 años de carrera y presenta su nuevo álbum “Alegría”, en vivo.\n Su estilo, tan propio y versátil, ha acompañado a varias generaciones a través de canciones que hoy se han convertido en himnos. Todos esos años de trabajo y dedicación por la buena música se ven hoy resumidos en este espectáculo, que reúne sus grandes éxitos renovados y con un sonido actualizado, además de las nuevas canciones que forman parte de “Alegría”, disco lanzado a fines de 2021.\nUno de los artistas más exitosos del género pop en España, no solo por su icónica voz, también por su cercanía, humildad y transparencia que le ha llevado a permanecer vigente en popularidad y cifras de venta en la industria musical.",
		organizationId: 9,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960-sergiodalma.png'
	},
	{
		name: 'Animals',
		description:
			"Presenta el disco y obra conceptual más grande del historia del Rock: THE WALL \n El disco interpretado de punta a punta con una fidelidad sonora y una puesta en escena de nivel internacional,  más el agregado de grandes hits de la mítica banda británica \nSerá el viernes 28 de octubre 21:30 hs en Quality Espacio",
		organizationId: 2,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/wall960.png'
	},
	{
		name: 'El Cuarteto de Nos',
		description:
			"Un regreso a los shows en vivo que arrancó con todas sus fechas de 2022 SOLD OUT, en cada ciudad y país que visitaron, al que agregan el lanzamiento de su tan esperado NUEVO DISCO para principios del mes de julio.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/cuart960.png'
	},
	{
		name: 'Soy Rada',
		description:
			"Dice Agustín Aristarán  Soy Rada-: ¿Cómo se arma un revuelto? Un revuelto se arma con cosas que ya conocés. Quizá de una receta que te pasó tu vieja y que la hiciste muchas veces. También en un revuelto agregamos cosas del momento: un condimento que te trajo un amigo de algún viaje, alguna cosita que uno decide meter porque está ahí, presente. Y en el revuelto también te la jugás con lo nuevo, un ingrediente que no sabés si va quedar bien o mal, pero que decidís meterlo… asumiendo el riesgo. Y así se arma un revuelto: con cosas que ya conocías, con cosas que estás conociendo y con cosas nuevas que querés probar.",
		organizationId: 10,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/rada960.png'
	},
	{
		name: 'Planeador V',
		description:
			"PLANEADOR V el homenaje más fiel a la obra artística de Soda Stereo y Gustavo Cerati con 16 años de carrera , vuelve a Quality Estadio, será el viernes 12 de noviembre 21:30 hs para presentar el show Gira Animal recreando lo que fuera el tour más ambicioso de la banda Soda Stereo, interpretando todo el disco Canción Animal más una serie de hits especialmente para la ocasión ",
		organizationId: 4,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/960x400_65.png'
	},
	{
		name: 'CAF',
		description:
			"La convención más grande de anime y cultura Pop del interior del país. Kpop; Cosplay; Panel de invitados, nacionales e Internacionales; Shows en vivo, Stands de venta de todo el país. Los esperamos a partir de las 11 horas, este 6 de noviembre en Quality Espacio. Apto para todo público.",
		organizationId: 6,
    background_image: 'https://static6.ticketek.com.ar/cms_static/sites/default/files/images/show-header/cafcor960.png'
	},
];

const eventLocations = [
	{ eventId: 1, locationId: 6 },
	{ eventId: 2, locationId: 10 },
	{ eventId: 3, locationId: 7 },
	{ eventId: 4, locationId: 1 },
	{ eventId: 5, locationId: 14 },
	{ eventId: 6, locationId: 18 },
	{ eventId: 7, locationId: 19 },
	{ eventId: 8, locationId: 11 },
	{ eventId: 9, locationId: 3 },
	{ eventId: 10, locationId: 17 },
	{ eventId: 11, locationId: 13 },
	{ eventId: 12, locationId: 14 },
	{ eventId: 13, locationId: 16 },
	{ eventId: 14, locationId: 8 },
	{ eventId: 15, locationId: 4 },
	{ eventId: 16, locationId: 8 },
	{ eventId: 17, locationId: 10 },
	{ eventId: 18, locationId: 4 },
	{ eventId: 19, locationId: 11 },
	{ eventId: 20, locationId: 15 },
	{ eventId: 21, locationId: 6 },
	{ eventId: 22, locationId: 16 },
	{ eventId: 23, locationId: 9 },
	{ eventId: 24, locationId: 4 },
	{ eventId: 25, locationId: 14 },
	{ eventId: 26, locationId: 6 },
	{ eventId: 27, locationId: 13 },
	{ eventId: 28, locationId: 10 },
	{ eventId: 29, locationId: 16 },
	{ eventId: 30, locationId: 10 },
	{ eventId: 31, locationId: 14 },
	{ eventId: 32, locationId: 5 },
	{ eventId: 33, locationId: 15 },
	{ eventId: 34, locationId: 20 },
	{ eventId: 35, locationId: 8 },
	{ eventId: 36, locationId: 13 },
	{ eventId: 37, locationId: 1 },
	{ eventId: 38, locationId: 2 },
	{ eventId: 39, locationId: 8 },
	{ eventId: 40, locationId: 13 },
	{ eventId: 41, locationId: 18 },
	{ eventId: 42, locationId: 17 },
	{ eventId: 43, locationId: 16 },
	{ eventId: 44, locationId: 20 },
	{ eventId: 45, locationId: 4 },
	{ eventId: 46, locationId: 16 },
	{ eventId: 47, locationId: 15 },
	{ eventId: 48, locationId: 12 },
	{ eventId: 49, locationId: 11 },
	{ eventId: 50, locationId: 9 },
	{ eventId: 51, locationId: 18 },
	{ eventId: 52, locationId: 2 },
	{ eventId: 53, locationId: 11 },
	{ eventId: 54, locationId: 18 },
	{ eventId: 55, locationId: 8 },
	{ eventId: 56, locationId: 10 },
	{ eventId: 57, locationId: 13 },
	{ eventId: 58, locationId: 2 },
	{ eventId: 59, locationId: 1 },
	{ eventId: 60, locationId: 17 },
	{ eventId: 61, locationId: 4 },
	{ eventId: 62, locationId: 19 },
	{ eventId: 63, locationId: 9 },
	{ eventId: 64, locationId: 8 },
	{ eventId: 65, locationId: 18 },
	{ eventId: 66, locationId: 7 },
	{ eventId: 67, locationId: 4 },
	{ eventId: 68, locationId: 6 },
	{ eventId: 69, locationId: 7 },
	{ eventId: 70, locationId: 13 },
	{ eventId: 71, locationId: 7 },
	{ eventId: 72, locationId: 14 },
	{ eventId: 73, locationId: 4 },
	{ eventId: 74, locationId: 15 },
	{ eventId: 75, locationId: 13 },
	{ eventId: 76, locationId: 8 },
	{ eventId: 77, locationId: 1 },
	{ eventId: 78, locationId: 17 },
	{ eventId: 79, locationId: 19 },
	{ eventId: 80, locationId: 20 },
	{ eventId: 81, locationId: 15 },
	{ eventId: 82, locationId: 9 },
	{ eventId: 83, locationId: 18 },
	{ eventId: 84, locationId: 12 },
	{ eventId: 85, locationId: 18 },
	{ eventId: 86, locationId: 14 },
	{ eventId: 87, locationId: 9 },
	{ eventId: 88, locationId: 1 },
	{ eventId: 89, locationId: 14 },
	{ eventId: 90, locationId: 7 },
	{ eventId: 91, locationId: 3 },
	{ eventId: 92, locationId: 20 },
	{ eventId: 93, locationId: 13 },
	{ eventId: 94, locationId: 19 },
	{ eventId: 95, locationId: 3 },
	{ eventId: 96, locationId: 5 },
	{ eventId: 97, locationId: 15 },
	{ eventId: 98, locationId: 3 },
	{ eventId: 99, locationId: 16 },
	{ eventId: 100, locationId: 3 },
	{ eventId: 95, locationId: 9 },
	{ eventId: 73, locationId: 3 },
	{ eventId: 8, locationId: 19 },
	{ eventId: 37, locationId: 19 },
	{ eventId: 98, locationId: 6 },
	{ eventId: 35, locationId: 15 },
	{ eventId: 37, locationId: 15 },
	{ eventId: 89, locationId: 18 },
	{ eventId: 14, locationId: 2 },
	{ eventId: 45, locationId: 5 },
	{ eventId: 58, locationId: 6 },
	{ eventId: 50, locationId: 4 },
	{ eventId: 75, locationId: 20 },
	{ eventId: 44, locationId: 19 },
	{ eventId: 76, locationId: 2 },
	{ eventId: 22, locationId: 5 },
	{ eventId: 14, locationId: 1 },
	{ eventId: 4, locationId: 17 },
	{ eventId: 8, locationId: 10 },
	{ eventId: 74, locationId: 5 },
];

const dates = [
	{ date: '2022-10-16', price: 1957, eventLocationId: 1, total_tickets: 500 },
	{ date: '2022-09-06', price: 752, eventLocationId: 2, total_tickets: 500 },
	{ date: '2022-10-03', price: 1491, eventLocationId: 3, total_tickets: 500 },
	{ date: '2022-06-30', price: 708, eventLocationId: 4, total_tickets: 500 },
	{ date: '2022-07-25', price: 1619, eventLocationId: 5, total_tickets: 500 },
	{ date: '2022-09-15', price: 1428, eventLocationId: 6, total_tickets: 500 },
	{ date: '2022-09-12', price: 1048, eventLocationId: 7, total_tickets: 500 },
	{ date: '2022-07-19', price: 1328, eventLocationId: 8, total_tickets: 500 },
	{ date: '2022-07-24', price: 1551, eventLocationId: 9, total_tickets: 500 },
	{ date: '2022-07-04', price: 549, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-06-31', price: 1553, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-08-08', price: 962, eventLocationId: 12, total_tickets: 500 },
	{ date: '2022-07-07', price: 1028, eventLocationId: 13, total_tickets: 500 },
	{ date: '2022-07-11', price: 1778, eventLocationId: 14, total_tickets: 500 },
	{ date: '2022-08-21', price: 592, eventLocationId: 15, total_tickets: 500 },
	{ date: '2022-09-20', price: 1296, eventLocationId: 16, total_tickets: 500 },
	{ date: '2022-07-20', price: 1876, eventLocationId: 17, total_tickets: 500 },
	{ date: '2022-09-28', price: 1631, eventLocationId: 18, total_tickets: 500 },
	{ date: '2022-08-16', price: 1397, eventLocationId: 19, total_tickets: 500 },
	{ date: '2022-07-06', price: 1212, eventLocationId: 20, total_tickets: 500 },
	{ date: '2022-07-11', price: 1311, eventLocationId: 21, total_tickets: 500 },
	{ date: '2022-07-19', price: 1636, eventLocationId: 22, total_tickets: 500 },
	{ date: '2022-08-22', price: 907, eventLocationId: 23, total_tickets: 500 },
	{ date: '2022-07-27', price: 1758, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-10-28', price: 644, eventLocationId: 25, total_tickets: 500 },
	{ date: '2022-09-24', price: 1101, eventLocationId: 26, total_tickets: 500 },
	{ date: '2022-010-21', price: 1923, eventLocationId: 27, total_tickets: 500 },
	{ date: '2022-09-11', price: 983, eventLocationId: 28, total_tickets: 500 },
	{ date: '2022-10-16', price: 653, eventLocationId: 29, total_tickets: 500 },
	{ date: '2022-09-05', price: 1191, eventLocationId: 30, total_tickets: 500 },
	{ date: '2022-07-12', price: 634, eventLocationId: 31, total_tickets: 500 },
	{ date: '2022-12-01', price: 663, eventLocationId: 32, total_tickets: 500 },
	{ date: '2022-12-25', price: 950, eventLocationId: 33, total_tickets: 500 },
	{ date: '2022-07-02', price: 1958, eventLocationId: 34, total_tickets: 500 },
	{ date: '2022-11-30', price: 1763, eventLocationId: 35, total_tickets: 500 },
	{ date: '2022-11-15', price: 1643, eventLocationId: 36, total_tickets: 500 },
	{ date: '2022-09-24', price: 1764, eventLocationId: 37, total_tickets: 500 },
	{ date: '2022-11-23', price: 761, eventLocationId: 38, total_tickets: 500 },
	{ date: '2022-08-26', price: 1522, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-12-13', price: 1557, eventLocationId: 40, total_tickets: 500 },
	{ date: '2022-08-19', price: 1992, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-09-12', price: 1305, eventLocationId: 42, total_tickets: 500 },
	{ date: '2022-09-10', price: 1274, eventLocationId: 43, total_tickets: 500 },
	{ date: '2022-09-10', price: 1031, eventLocationId: 44, total_tickets: 500 },
	{ date: '2022-07-08', price: 515, eventLocationId: 45, total_tickets: 500 },
	{ date: '2022-12-10', price: 510, eventLocationId: 46, total_tickets: 500 },
	{ date: '2022-06-11', price: 1499, eventLocationId: 47, total_tickets: 500 },
	{ date: '2022-08-13', price: 1465, eventLocationId: 48, total_tickets: 500 },
	{ date: '2022-10-17', price: 1310, eventLocationId: 49, total_tickets: 500 },
	{ date: '2022-09-06', price: 545, eventLocationId: 50, total_tickets: 500 },
	{ date: '2022-09-29', price: 1010, eventLocationId: 51, total_tickets: 500 },
	{ date: '2022-07-26', price: 1440, eventLocationId: 52, total_tickets: 500 },
	{ date: '2022-11-23', price: 737, eventLocationId: 53, total_tickets: 500 },
	{ date: '2022-10-17', price: 974, eventLocationId: 54, total_tickets: 500 },
	{ date: '2022-07-25', price: 1759, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-11-01', price: 1502, eventLocationId: 56, total_tickets: 500 },
	{ date: '2022-11-02', price: 1942, eventLocationId: 57, total_tickets: 500 },
	{ date: '2022-11-01', price: 932, eventLocationId: 58, total_tickets: 500 },
	{ date: '2022-09-12', price: 997, eventLocationId: 59, total_tickets: 500 },
	{ date: '2022-09-18', price: 1191, eventLocationId: 60, total_tickets: 500 },
	{ date: '2022-08-11', price: 1785, eventLocationId: 61, total_tickets: 500 },
	{ date: '2022-07-19', price: 1850, eventLocationId: 62, total_tickets: 500 },
	{ date: '2022-07-15', price: 664, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-07-22', price: 728, eventLocationId: 64, total_tickets: 500 },
	{ date: '2022-07-04', price: 1452, eventLocationId: 65, total_tickets: 500 },
	{ date: '2022-08-19', price: 528, eventLocationId: 66, total_tickets: 500 },
	{ date: '2022-07-30', price: 508, eventLocationId: 67, total_tickets: 500 },
	{ date: '2022-07-23', price: 1017, eventLocationId: 68, total_tickets: 500 },
	{ date: '2022-07-04', price: 1598, eventLocationId: 69, total_tickets: 500 },
	{ date: '2022-10-02', price: 1852, eventLocationId: 70, total_tickets: 500 },
	{ date: '2022-08-30', price: 1300, eventLocationId: 71, total_tickets: 500 },
	{ date: '2022-08-01', price: 958, eventLocationId: 72, total_tickets: 500 },
	{ date: '2022-09-06', price: 1883, eventLocationId: 73, total_tickets: 500 },
	{ date: '2022-10-11', price: 1097, eventLocationId: 74, total_tickets: 500 },
	{ date: '2022-11-20', price: 709, eventLocationId: 75, total_tickets: 500 },
	{ date: '2022-11-03', price: 1271, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-07-06', price: 1587, eventLocationId: 77, total_tickets: 500 },
	{ date: '2022-07-07', price: 990, eventLocationId: 78, total_tickets: 500 },
	{ date: '2022-10-06', price: 1590, eventLocationId: 79, total_tickets: 500 },
	{ date: '2022-08-05', price: 1686, eventLocationId: 80, total_tickets: 500 },
	{ date: '2022-08-16', price: 784, eventLocationId: 81, total_tickets: 500 },
	{ date: '2022-08-28', price: 1070, eventLocationId: 82, total_tickets: 500 },
	{ date: '2022-08-22', price: 963, eventLocationId: 83, total_tickets: 500 },
	{ date: '2022-07-05', price: 1056, eventLocationId: 84, total_tickets: 500 },
	{ date: '2022-08-24', price: 1054, eventLocationId: 85, total_tickets: 500 },
	{ date: '2022-09-01', price: 747, eventLocationId: 86, total_tickets: 500 },
	{ date: '2022-08-17', price: 580, eventLocationId: 87, total_tickets: 500 },
	{ date: '2022-09-29', price: 1620, eventLocationId: 88, total_tickets: 500 },
	{ date: '2022-09-11', price: 1521, eventLocationId: 89, total_tickets: 500 },
	{ date: '2022-07-12', price: 1001, eventLocationId: 90, total_tickets: 500 },
	{ date: '2022-09-31', price: 1429, eventLocationId: 91, total_tickets: 500 },
	{ date: '2022-12-24', price: 728, eventLocationId: 92, total_tickets: 500 },
	{ date: '2022-01-21', price: 1729, eventLocationId: 93, total_tickets: 500 },
	{ date: '2022-07-14', price: 1467, eventLocationId: 94, total_tickets: 500 },
	{ date: '2022-07-08', price: 1761, eventLocationId: 95, total_tickets: 500 },
	{ date: '2022-11-11', price: 1114, eventLocationId: 96, total_tickets: 500 },
	{ date: '2022-09-16', price: 1051, eventLocationId: 97, total_tickets: 500 },
	{ date: '2022-06-27', price: 748, eventLocationId: 98, total_tickets: 500 },
	{ date: '2022-07-17', price: 1900, eventLocationId: 99, total_tickets: 500 },
	{ date: '2022-07-22', price: 1913, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-10-23', price: 1005, eventLocationId: 45, total_tickets: 500 },
	{ date: '2022-09-12', price: 1090, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-08-27', price: 1102, eventLocationId: 28, total_tickets: 500 },
	{ date: '2022-07-08', price: 1413, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-12-28', price: 1068, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-08-12', price: 1515, eventLocationId: 66, total_tickets: 500 },
	{ date: '2022-10-13', price: 582, eventLocationId: 23, total_tickets: 500 },
	{ date: '2022-07-29', price: 584, eventLocationId: 33, total_tickets: 500 },
	{ date: '2022-08-23', price: 1750, eventLocationId: 87, total_tickets: 500 },
	{ date: '2022-10-14', price: 1515, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-07-10', price: 1696, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-08-06', price: 786, eventLocationId: 34, total_tickets: 500 },
	{ date: '2022-10-19', price: 1478, eventLocationId: 50, total_tickets: 500 },
	{ date: '2022-03-13', price: 759, eventLocationId: 76, total_tickets: 500 },
	{ date: '2022-08-01', price: 743, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-10-16', price: 736, eventLocationId: 74, total_tickets: 500 },
	{ date: '2022-08-26', price: 1790, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-07-24', price: 1381, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-08-08', price: 1434, eventLocationId: 49, total_tickets: 500 },
	{ date: '2022-08-30', price: 635, eventLocationId: 25, total_tickets: 500 },
	{ date: '2022-12-06', price: 967, eventLocationId: 63, total_tickets: 500 },
	{ date: '2022-11-19', price: 1217, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-09-01', price: 1053, eventLocationId: 29, total_tickets: 500 },
	{ date: '2022-07-27', price: 1891, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-11-10', price: 618, eventLocationId: 19, total_tickets: 500 },
	{ date: '2022-10-31', price: 1014, eventLocationId: 14, total_tickets: 500 },
	{ date: '2022-08-17', price: 1193, eventLocationId: 46, total_tickets: 500 },
	{ date: '2022-09-27', price: 1040, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-08-19', price: 878, eventLocationId: 35, total_tickets: 500 },
	{ date: '2022-07-26', price: 1114, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-11-05', price: 698, eventLocationId: 40, total_tickets: 500 },
	{ date: '2022-08-22', price: 910, eventLocationId: 91, total_tickets: 500 },
	{ date: '2022-10-08', price: 1313, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-10-12', price: 1369, eventLocationId: 6, total_tickets: 500 },
	{ date: '2022-12-10', price: 1393, eventLocationId: 83, total_tickets: 500 },
	{ date: '2022-09-25', price: 777, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-12-28', price: 690, eventLocationId: 84, total_tickets: 500 },
	{ date: '2022-12-08', price: 1525, eventLocationId: 82, total_tickets: 500 },
	{ date: '2022-12-01', price: 578, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-07-16', price: 1714, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-09-21', price: 1978, eventLocationId: 13, total_tickets: 500 },
	{ date: '2022-10-02', price: 803, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-10-21', price: 1910, eventLocationId: 28, total_tickets: 500 },
	{ date: '2022-12-07', price: 594, eventLocationId: 27, total_tickets: 500 },
	{ date: '2022-12-26', price: 1497, eventLocationId: 75, total_tickets: 500 },
	{ date: '2022-12-23', price: 935, eventLocationId: 40, total_tickets: 500 },
	{ date: '2022-08-01', price: 1608, eventLocationId: 22, total_tickets: 500 },
	{ date: '2022-07-09', price: 1264, eventLocationId: 82, total_tickets: 500 },
	{ date: '2022-08-10', price: 927, eventLocationId: 88, total_tickets: 500 },
	{ date: '2022-08-06', price: 1125, eventLocationId: 24, total_tickets: 500 },
	{ date: '2022-02-03', price: 721, eventLocationId: 57, total_tickets: 500 },
	{ date: '2022-10-29', price: 1407, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-07-26', price: 1404, eventLocationId: 25, total_tickets: 500 },
	{ date: '2022-12-01', price: 1313, eventLocationId: 92, total_tickets: 500 },
	{ date: '2022-12-21', price: 1288, eventLocationId: 46, total_tickets: 500 },
	{ date: '2022-09-07', price: 562, eventLocationId: 20, total_tickets: 500 },
	{ date: '2022-09-07', price: 841, eventLocationId: 38, total_tickets: 500 },
	{ date: '2022-09-14', price: 1851, eventLocationId: 62, total_tickets: 500 },
	{ date: '2022-10-07', price: 1913, eventLocationId: 59, total_tickets: 500 },
	{ date: '2022-10-22', price: 504, eventLocationId: 34, total_tickets: 500 },
	{ date: '2022-10-16', price: 1311, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-10-04', price: 1961, eventLocationId: 56, total_tickets: 500 },
	{ date: '2022-10-08', price: 1095, eventLocationId: 48, total_tickets: 500 },
	{ date: '2022-08-10', price: 1461, eventLocationId: 78, total_tickets: 500 },
	{ date: '2022-08-03', price: 1136, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-12-12', price: 581, eventLocationId: 67, total_tickets: 500 },
	{ date: '2022-12-02', price: 1417, eventLocationId: 68, total_tickets: 500 },
	{ date: '2022-08-09', price: 593, eventLocationId: 79, total_tickets: 500 },
	{ date: '2022-08-12', price: 1321, eventLocationId: 1, total_tickets: 500 },
	{ date: '2022-09-28', price: 1390, eventLocationId: 4, total_tickets: 500 },
	{ date: '2022-09-14', price: 1228, eventLocationId: 14, total_tickets: 500 },
	{ date: '2022-12-18', price: 1430, eventLocationId: 99, total_tickets: 500 },
	{ date: '2022-07-13', price: 946, eventLocationId: 31, total_tickets: 500 },
	{ date: '2022-08-21', price: 723, eventLocationId: 39, total_tickets: 500 },
	{ date: '2022-11-25', price: 514, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-09-08', price: 969, eventLocationId: 10, total_tickets: 500 },
	{ date: '2022-12-27', price: 1222, eventLocationId: 98, total_tickets: 500 },
	{ date: '2022-11-11', price: 1647, eventLocationId: 95, total_tickets: 500 },
	{ date: '2022-11-08', price: 1000, eventLocationId: 47, total_tickets: 500 },
	{ date: '2022-07-18', price: 1579, eventLocationId: 11, total_tickets: 500 },
	{ date: '2022-06-30', price: 941, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-08-23', price: 1861, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-08-07', price: 1469, eventLocationId: 93, total_tickets: 500 },
	{ date: '2022-09-11', price: 871, eventLocationId: 1, total_tickets: 500 },
	{ date: '2022-10-17', price: 1598, eventLocationId: 21, total_tickets: 500 },
	{ date: '2022-12-14', price: 1600, eventLocationId: 59, total_tickets: 500 },
	{ date: '2022-08-26', price: 511, eventLocationId: 87, total_tickets: 500 },
	{ date: '2022-12-05', price: 1931, eventLocationId: 100, total_tickets: 500 },
	{ date: '2022-12-08', price: 1064, eventLocationId: 41, total_tickets: 500 },
	{ date: '2022-12-28', price: 1854, eventLocationId: 17, total_tickets: 500 },
	{ date: '2022-07-29', price: 868, eventLocationId: 54, total_tickets: 500 },
	{ date: '2022-12-26', price: 1064, eventLocationId: 55, total_tickets: 500 },
	{ date: '2022-09-14', price: 862, eventLocationId: 93, total_tickets: 500 },
	{ date: '2022-11-28', price: 753, eventLocationId: 97, total_tickets: 500 },
	{ date: '2022-12-17', price: 1712, eventLocationId: 53, total_tickets: 500 },
	{ date: '2022-11-07', price: 982, eventLocationId: 85, total_tickets: 500 },
	{ date: '2022-11-01', price: 1089, eventLocationId: 13, total_tickets: 500 },
	{ date: '2022-12-28', price: 1830, eventLocationId: 91, total_tickets: 500 },
	{ date: '2022-09-27', price: 693, eventLocationId: 61, total_tickets: 500 },
	{ date: '2022-08-10', price: 578, eventLocationId: 26, total_tickets: 500 },
];

const categories = [
	{ name: 'Infantil' },
	{ name: 'Deportes' },
	{ name: 'Musical' },
	{ name: 'Teatro' },
	{ name: 'Especiales' },
];

const cities = [
	{ name: 'San Juan' },
	{ name: 'Mendoza' },
	{ name: 'Córdoba' },
	{ name: 'Formosa' },
	{ name: 'La Pampa' },
	{ name: 'Buenos Aires' },
	{ name: 'La Rioja' },
	{ name: 'Jujuy' },
	{ name: 'Santiago del Estero' },
	{ name: 'Tierra del Fuego' },
	{ name: 'Chubut' },
	{ name: 'Santa Cruz' },
	{ name: 'San Luis' },
	{ name: 'Misiones' },
	{ name: 'Corrientes' },
	{ name: 'Tucumán' },
	{ name: 'Ciudad Autónoma de Buenos Aires' },
	{ name: 'Catamarca' },
	{ name: 'Chaco' },
	{ name: 'Entre Ríos' },
	{ name: 'Neuquén' },
	{ name: 'Río Negro' },
	{ name: 'Salta' },
	{ name: 'Santa Fe' }
];

const images = [
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/disney-inv-960.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/fb_960x400_12.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cami_poster_960x400_sin_tktk.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ticketek-gran-gala_960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/andrea_vieru_960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/polenta_960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/estgen960.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/topa-960x400-portado-web-quality-y-ticketek.png",
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/tickete01.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ke-personajes.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/ismael.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_sin_logo.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_17.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/mesa_de_trabajo_2.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pieza-banana-ticketek-960-x-400-px.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/jc960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/2_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/sele960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/kev960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/volar960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/imaguare-960x400.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pat89960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/lauren960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ciro960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ciro960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400german.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cordo960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960_5.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pieza-ticketek-960-x-400-px.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/mau960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/maxi960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/piano-gen960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/960x4001.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/masters960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/masters960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/960x400_mbpr.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/noventosa_verano_reprogramado.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/biza960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/dust960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/rid960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/miran960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pieza-ticketek-960-x-400-px1.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/luc960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/pier960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/park960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/angela_960x400.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400-copia_1.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400mana_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400mana_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cafcor960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/dsjgen960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_65.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/sugo960_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/artist/cata440.jpg',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/radagen960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/cuart960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/wall960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/dalma960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ort960.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400-copia_1.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400mana_0.png',
	'https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400et.png',
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/marisa_monte_-_960_x_400_0.jpg",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_27.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x4008.jpg",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/ero960.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/bada-960x400.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400-vangogh_0.png",
	"https://static6.ticketek.com.ar/cms_static/sites/default/files/styles/artists_list_featured/public/images/show-header/960x400_27.png",
];

const users = [
	{
		name: 'Melessa',
		surname: 'Dayborne',
		email: 'mdayborne0@ycombinator.com',
		password: 'GQEKOU',
	},
	{
		name: 'Alvan',
		surname: 'Van Driel',
		email: 'avandriel1@dedecms.com',
		password: 'Zw25NF8',
	},
	{
		name: 'Bradford',
		surname: 'Wressell',
		email: 'bwressell2@discuz.net',
		password: 'w1SpGeoM',
	},
	{
		name: 'Alessandro',
		surname: 'Ide',
		email: 'aide3@irs.gov',
		password: 'koYA1JM9kJ',
	},
	{
		name: 'Penny',
		surname: 'Chalfain',
		email: 'pchalfain4@usatoday.com',
		password: '0vmKNsU7eZMt',
	},
	{
		name: 'Smitty',
		surname: 'Szapiro',
		email: 'sszapiro5@nps.gov',
		password: 'McAwk5dM',
	},
	{
		name: 'Bonnee',
		surname: 'Powles',
		email: 'bpowles6@mit.edu',
		password: 'RjNN0u4uU',
	},
	{
		name: 'Chelsae',
		surname: 'Vanelli',
		email: 'cvanelli7@senate.gov',
		password: '3QDiOVGjujd',
	},
	{
		name: 'Alanna',
		surname: 'Dare',
		email: 'adare8@home.pl',
		password: '8wbkyhN5LT',
	},
	{
		name: 'Percival',
		surname: 'Wilkins',
		email: 'pwilkins9@gravatar.com',
		password: 'WUcnAgpJ',
	},
	{
		name: 'Dorita',
		surname: 'Battle',
		email: 'dbattlea@statcounter.com',
		password: 'MHvMjJz4',
	},
	{
		name: 'Sharyl',
		surname: 'Connelly',
		email: 'sconnellyb@csmonitor.com',
		password: 'Ub8dXaaK',
	},
	{
		name: 'Leif',
		surname: 'Lere',
		email: 'llerec@blogger.com',
		password: '40ueS9GgS1Ae',
	},
	{
		name: 'Shalom',
		surname: 'Fairley',
		email: 'sfairleyd@intel.com',
		password: 'LuxVahs',
	},
	{
		name: 'Sid',
		surname: 'Keogh',
		email: 'skeoghe@mayoclinic.com',
		password: '7EoteZ2bSV',
	},
	{
		name: 'Hiram',
		surname: 'Darwent',
		email: 'hdarwentf@smh.com.au',
		password: 'cCXskozAaEX',
	},
	{
		name: 'Leona',
		surname: 'Dulwich',
		email: 'ldulwichg@about.com',
		password: '2NwgueE13u',
	},
	{
		name: 'Marco',
		surname: 'Scandrick',
		email: 'mscandrickh@mac.com',
		password: 'iOKl2if',
	},
	{
		name: 'Valentijn',
		surname: 'Petrik',
		email: 'vpetriki@springer.com',
		password: '2Vcb69Hkwum',
	},
	{
		name: 'Michaeline',
		surname: 'Cawse',
		email: 'mcawsej@google.com',
		password: 'DozfjQSwXLJU',
	},
	{
		name: 'Mikaela',
		surname: 'Barczynski',
		email: 'mbarczynskik@squarespace.com',
		password: 'Cdcg9nOpxua',
	},
	{
		name: 'Ingmar',
		surname: 'Raun',
		email: 'iraunl@mysql.com',
		password: 'ArD0NLaq',
	},
	{
		name: 'Malanie',
		surname: 'Arran',
		email: 'marranm@tripod.com',
		password: 'aL5qvmfLo',
	},
	{
		name: 'Andreas',
		surname: 'Olyfant',
		email: 'aolyfantn@xing.com',
		password: '0nB60U',
	},
	{
		name: 'Lionello',
		surname: 'Lawford',
		email: 'llawfordo@adobe.com',
		password: 'ByI46CZvl9',
	},
	{
		name: 'George',
		surname: 'Bramhall',
		email: 'gbramhallp@exblog.jp',
		password: 'eviBulYSyN',
	},
	{
		name: 'Gordie',
		surname: 'Kingswood',
		email: 'gkingswoodq@fastcompany.com',
		password: 'bApbcqpyA0',
	},
	{
		name: 'Nelia',
		surname: 'Harrington',
		email: 'nharringtonr@wordpress.org',
		password: 'IVuFxAK',
	},
	{
		name: 'Efren',
		surname: 'Hymer',
		email: 'ehymers@sun.com',
		password: 'b2bpMoG0OhVU',
	},
	{
		name: 'Nolana',
		surname: 'Archbould',
		email: 'narchbouldt@bandcamp.com',
		password: 'Wd9oYB9egg4f',
	},
	{
		name: 'Morly',
		surname: 'Vaudre',
		email: 'mvaudreu@google.co.uk',
		password: 'tmtxAGk',
	},
	{
		name: 'Patten',
		surname: 'Owlner',
		email: 'powlnerv@netvibes.com',
		password: 'mk25bXwRe',
	},
	{
		name: 'Caryl',
		surname: 'Coite',
		email: 'ccoitew@xrea.com',
		password: 'S4hZ5OyQ04i',
	},
	{
		name: 'Moses',
		surname: 'Batchelder',
		email: 'mbatchelderx@ucsd.edu',
		password: '6XGAsSDmJJ',
	},
	{
		name: 'Marie-jeanne',
		surname: 'Ashdown',
		email: 'mashdowny@technorati.com',
		password: '304DvW',
	},
	{
		name: 'Wandie',
		surname: 'Highway',
		email: 'whighwayz@chronoengine.com',
		password: 'mwTEjznWw',
	},
	{
		name: 'Lavinie',
		surname: 'McAree',
		email: 'lmcaree10@arizona.edu',
		password: 'I08IwLh8e',
	},
	{
		name: 'Theresa',
		surname: 'Muino',
		email: 'tmuino11@tmall.com',
		password: 'DtNE2q',
	},
	{
		name: 'Belia',
		surname: 'Marvel',
		email: 'bmarvel12@is.gd',
		password: 'twZkjtT',
	},
	{
		name: 'Marybeth',
		surname: 'Baguley',
		email: 'mbaguley13@oakley.com',
		password: 'WNHuEM7FF0n',
	},
	{
		name: 'Chicky',
		surname: 'Gieves',
		email: 'cgieves14@sohu.com',
		password: 'zZpUzK9tOU6x',
	},
	{
		name: 'Daryle',
		surname: 'Spaduzza',
		email: 'dspaduzza15@facebook.com',
		password: '0hUYcT',
	},
	{
		name: 'Stephannie',
		surname: 'Tolliday',
		email: 'stolliday16@epa.gov',
		password: 'cOp9iqWxA4',
	},
	{
		name: 'Malchy',
		surname: 'Sultana',
		email: 'msultana17@hibu.com',
		password: 'uuQSny',
	},
	{
		name: 'Corbin',
		surname: 'Sloey',
		email: 'csloey18@ed.gov',
		password: 'E75y8VCE',
	},
	{
		name: 'Chuck',
		surname: 'Dingate',
		email: 'cdingate19@yellowbook.com',
		password: 'KVySosfUCcz9',
	},
	{
		name: 'Denys',
		surname: 'Binfield',
		email: 'dbinfield1a@themeforest.net',
		password: 'XiixtrHRT',
	},
	{
		name: 'Lavinie',
		surname: 'Woodyear',
		email: 'lwoodyear1b@rediff.com',
		password: '5nS9fMNsqz',
	},
	{
		name: 'Federico',
		surname: 'Olin',
		email: 'folin1c@cargocollective.com',
		password: 'kZAaMQUY',
	},
	{
		name: 'Inna',
		surname: 'Kiddell',
		email: 'ikiddell1d@house.gov',
		password: 'aSbAi2wdBN',
	},
	{
		name: 'Hurlee',
		surname: 'McGeaney',
		email: 'hmcgeaney1e@google.com.au',
		password: 'gNdkNWxLB',
	},
	{
		name: 'Verile',
		surname: 'Aplin',
		email: 'vaplin1f@apple.com',
		password: 'WVHZM8J06ciG',
	},
	{
		name: 'Morissa',
		surname: 'Benduhn',
		email: 'mbenduhn1g@nymag.com',
		password: 'EuGf6i',
	},
	{
		name: 'Angelica',
		surname: 'Timpany',
		email: 'atimpany1h@ning.com',
		password: 'nIhFuie5pc5d',
	},
	{
		name: 'Kessiah',
		surname: 'Traves',
		email: 'ktraves1i@joomla.org',
		password: 'ABvVX0SGUum',
	},
	{
		name: 'James',
		surname: 'Wearn',
		email: 'jwearn1j@google.cn',
		password: 'rhgXNl9Hx',
	},
	{
		name: 'Ham',
		surname: 'Bentke',
		email: 'hbentke1k@examiner.com',
		password: '4dMuexN6L4',
	},
	{
		name: 'Kirsti',
		surname: 'Pittel',
		email: 'kpittel1l@desdev.cn',
		password: 'FKNUJFvfvb',
	},
	{
		name: 'Addison',
		surname: 'Franey',
		email: 'afraney1m@scribd.com',
		password: '3OOxOOQm',
	},
	{
		name: 'Alanson',
		surname: 'Hukin',
		email: 'ahukin1n@sogou.com',
		password: 'JJEyOc',
	},
	{
		name: 'Jermaine',
		surname: 'Ochterlonie',
		email: 'jochterlonie1o@51.la',
		password: 'zha44bBe',
	},
	{
		name: 'Frederique',
		surname: 'Noore',
		email: 'fnoore1p@printfriendly.com',
		password: 'HdvfpTUD',
	},
	{
		name: 'Colman',
		surname: 'Harly',
		email: 'charly1q@vinaora.com',
		password: '962AKslob',
	},
	{
		name: 'Nerita',
		surname: 'Vinecombe',
		email: 'nvinecombe1r@godaddy.com',
		password: 'RDuNWH4EYW',
	},
	{
		name: 'Dori',
		surname: 'Izzatt',
		email: 'dizzatt1s@nationalgeographic.com',
		password: 'VQBQxnOq',
	},
	{
		name: 'Nanine',
		surname: 'Guidotti',
		email: 'nguidotti1t@ucla.edu',
		password: 'Gvf5bJuH5tL',
	},
	{
		name: 'Sebastien',
		surname: 'Tacker',
		email: 'stacker1u@fema.gov',
		password: 'GaevaNzSz7x',
	},
	{
		name: 'Felicio',
		surname: 'Fairpo',
		email: 'ffairpo1v@noaa.gov',
		password: '3PNNfN5qbd',
	},
	{
		name: 'Harp',
		surname: 'Antonovic',
		email: 'hantonovic1w@soundcloud.com',
		password: 'O44KBsy5W',
	},
	{
		name: 'Grange',
		surname: 'Showering',
		email: 'gshowering1x@biblegateway.com',
		password: 'feY5XE5',
	},
	{
		name: 'Diannne',
		surname: 'Hourihan',
		email: 'dhourihan1y@umn.edu',
		password: 'E2nD7N',
	},
	{
		name: 'Egbert',
		surname: 'Arnall',
		email: 'earnall1z@facebook.com',
		password: 'ZDpQkV9t7',
	},
	{
		name: 'Agneta',
		surname: 'McCaskill',
		email: 'amccaskill20@tinyurl.com',
		password: 'XK6FVAql',
	},
	{
		name: 'Kendre',
		surname: 'Safont',
		email: 'ksafont21@indiatimes.com',
		password: 'UKJtxO',
	},
	{
		name: 'Yvor',
		surname: 'Pottell',
		email: 'ypottell22@bravesites.com',
		password: 'axVe0Puw1Eb',
	},
	{
		name: 'Gale',
		surname: 'Baldini',
		email: 'gbaldini23@theglobeandmail.com',
		password: '39kRwoE0',
	},
	{
		name: 'Dennis',
		surname: 'Riply',
		email: 'driply24@google.com.br',
		password: 'fEMivGN3',
	},
	{
		name: 'Janessa',
		surname: 'Cornford',
		email: 'jcornford25@i2i.jp',
		password: 'HztDV5uj2Y',
	},
	{
		name: 'Griz',
		surname: 'St. Aubyn',
		email: 'gstaubyn26@liveinternet.ru',
		password: 'OmlrygCWuM',
	},
	{
		name: 'Anton',
		surname: 'Darling',
		email: 'adarling27@tripadvisor.com',
		password: 'bC6qxgrv',
	},
	{
		name: 'Mil',
		surname: 'Kingdon',
		email: 'mkingdon28@a8.net',
		password: 'YHi6Hdk',
	},
	{
		name: 'Raimundo',
		surname: 'Warret',
		email: 'rwarret29@loc.gov',
		password: 'DXbIBh',
	},
	{
		name: 'Agustin',
		surname: 'Taw',
		email: 'ataw2a@ox.ac.uk',
		password: '9nqNRu',
	},
	{
		name: 'Charlie',
		surname: 'Hadingham',
		email: 'chadingham2b@instagram.com',
		password: 'hDepNEpZi8x',
	},
	{
		name: 'Fancy',
		surname: 'Philott',
		email: 'fphilott2c@slate.com',
		password: 'AG7ipsc8RL',
	},
	{
		name: 'Shaun',
		surname: 'Asals',
		email: 'sasals2d@smugmug.com',
		password: 'orgMTLeZy',
	},
	{
		name: 'Myra',
		surname: 'Kornacki',
		email: 'mkornacki2e@geocities.com',
		password: 'KbrB5HcK',
	},
	{
		name: 'Andria',
		surname: 'Althrop',
		email: 'aalthrop2f@ucoz.ru',
		password: 'UGajw8VKT',
	},
	{
		name: 'Alberto',
		surname: 'MacDonald',
		email: 'amacdonald2g@hostgator.com',
		password: 'Zi44QIb',
	},
	{
		name: 'Billye',
		surname: 'Cockings',
		email: 'bcockings2h@engadget.com',
		password: 'Vp98m2sf38',
	},
	{
		name: 'Goldi',
		surname: 'Venner',
		email: 'gvenner2i@deliciousdays.com',
		password: 'ocSNmXpazo',
	},
	{
		name: 'Jolyn',
		surname: 'Hair',
		email: 'jhair2j@plala.or.jp',
		password: 'IxWERyY3U',
	},
	{
		name: 'Kanya',
		surname: 'Ketton',
		email: 'kketton2k@multiply.com',
		password: 'AcYCGpHHQ',
	},
	{
		name: 'Anderea',
		surname: 'Lohmeyer',
		email: 'alohmeyer2l@google.ru',
		password: '2lUTLC8sTs',
	},
	{
		name: 'Emanuele',
		surname: 'Belly',
		email: 'ebelly2m@google.fr',
		password: 'lygh93',
	},
	{
		name: 'Tatum',
		surname: 'Lowdiane',
		email: 'tlowdiane2n@storify.com',
		password: 'Vcv4lQT4EL',
	},
	{
		name: 'Alvy',
		surname: 'Wayland',
		email: 'awayland2o@goodreads.com',
		password: 'BCgKZwR',
	},
	{
		name: 'Abbie',
		surname: 'Fearenside',
		email: 'afearenside2p@china.com.cn',
		password: 'GehkZG',
	},
	{
		name: 'Wyn',
		surname: 'Burroughes',
		email: 'wburroughes2q@trellian.com',
		password: 'OzmKiWzdWC',
	},
	{
		name: 'Sydelle',
		surname: 'Flott',
		email: 'sflott2r@prweb.com',
		password: 'fHOcmRaAQq5s',
	},
	{
		name: 'Etta',
		surname: 'Consterdine',
		email: 'econsterdine2s@youku.com',
		password: '1TGXEr',
	},
	{
		name: 'Corilla',
		surname: 'Ruby',
		email: 'cruby2t@t-online.de',
		password: 'XoEBh1ULc8',
	},
	{
		name: 'Tallulah',
		surname: 'Attwell',
		email: 'tattwell2u@howstuffworks.com',
		password: 'nEvp9W7530P',
	},
	{
		name: 'Courtnay',
		surname: 'Headland',
		email: 'cheadland2v@who.int',
		password: 'ErHWlRn5Jguf',
	},
	{
		name: 'Blanca',
		surname: 'Kinsell',
		email: 'bkinsell2w@stanford.edu',
		password: 'dtD2boy1',
	},
	{
		name: 'Claude',
		surname: 'Grumley',
		email: 'cgrumley2x@noaa.gov',
		password: '07GMzE71',
	},
	{
		name: 'Donni',
		surname: 'Skelding',
		email: 'dskelding2y@nymag.com',
		password: '46iAo8yIm5gf',
	},
	{
		name: 'Allsun',
		surname: 'Fosserd',
		email: 'afosserd2z@blogspot.com',
		password: 'FfOLrm',
	},
	{
		name: 'Evanne',
		surname: 'Corbould',
		email: 'ecorbould30@surveymonkey.com',
		password: 'mG3RFAetGSaG',
	},
	{
		name: 'Armand',
		surname: 'Tourville',
		email: 'atourville31@hugedomains.com',
		password: '39Vhuxdp3',
	},
	{
		name: 'Katina',
		surname: 'Botler',
		email: 'kbotler32@google.co.jp',
		password: 'AXOTSfqx',
	},
	{
		name: 'Cole',
		surname: 'Threlfall',
		email: 'cthrelfall33@youtube.com',
		password: 'W5VvS4',
	},
	{
		name: 'Harlie',
		surname: 'Knock',
		email: 'hknock34@phpbb.com',
		password: 'dp3rFDBNvOR',
	},
	{
		name: 'Ashli',
		surname: 'Gomar',
		email: 'agomar35@ask.com',
		password: 'snZDS7rj',
	},
	{
		name: 'Che',
		surname: 'Bachman',
		email: 'cbachman36@uiuc.edu',
		password: 'utfzWP',
	},
	{
		name: 'Eirena',
		surname: 'Tousy',
		email: 'etousy37@wix.com',
		password: 'BfVcLqrr',
	},
	{
		name: 'Friedrick',
		surname: 'Klaaassen',
		email: 'fklaaassen38@wired.com',
		password: 'NXp9dq4',
	},
	{
		name: 'Leonanie',
		surname: 'Jeves',
		email: 'ljeves39@wunderground.com',
		password: 'LDNSTBOJR',
	},
	{
		name: 'Sherwynd',
		surname: 'MacCollom',
		email: 'smaccollom3a@opera.com',
		password: 'ElpmPW7giP',
	},
	{
		name: 'Othilia',
		surname: 'Le Houx',
		email: 'olehoux3b@seesaa.net',
		password: 's98AeFT7',
	},
	{
		name: 'Cal',
		surname: 'Kanter',
		email: 'ckanter3c@dell.com',
		password: 'w0D8f74',
	},
	{
		name: 'Cynthea',
		surname: 'Infantino',
		email: 'cinfantino3d@sitemeter.com',
		password: 'NfWkMhhiXQTZ',
	},
	{
		name: 'Cherianne',
		surname: 'Cleal',
		email: 'ccleal3e@japanpost.jp',
		password: 'myXfnfaD24B',
	},
	{
		name: 'Miguela',
		surname: 'Hearnes',
		email: 'mhearnes3f@webs.com',
		password: '2X1NGKf1ff',
	},
	{
		name: 'Corissa',
		surname: 'Battleson',
		email: 'cbattleson3g@reddit.com',
		password: 'sGPVJ3BR29',
	},
	{
		name: 'Ulla',
		surname: 'Calan',
		email: 'ucalan3h@apple.com',
		password: '4pOilAMeZ',
	},
	{
		name: 'Gerry',
		surname: 'Rembaud',
		email: 'grembaud3i@bbc.co.uk',
		password: 'b9NysadzUfI',
	},
	{
		name: 'Zach',
		surname: 'Kuzma',
		email: 'zkuzma3j@ibm.com',
		password: '4R9tznZq8s',
	},
	{
		name: 'Issy',
		surname: 'Lawley',
		email: 'ilawley3k@sciencedirect.com',
		password: 'kv0XJ9Ct',
	},
	{
		name: 'Sherri',
		surname: 'Tinghill',
		email: 'stinghill3l@jiathis.com',
		password: 'On2AngyIuab',
	},
	{
		name: 'Alon',
		surname: 'Noquet',
		email: 'anoquet3m@opensource.org',
		password: 'DZooHH5',
	},
	{
		name: 'Bancroft',
		surname: 'Ducaen',
		email: 'bducaen3n@disqus.com',
		password: 'pEBWLf9',
	},
	{
		name: 'Garret',
		surname: 'Mursell',
		email: 'gmursell3o@geocities.com',
		password: 'RTNwGzyY',
	},
	{
		name: 'Jourdan',
		surname: 'Semered',
		email: 'jsemered3p@cnn.com',
		password: '8FgByetke1Z',
	},
	{
		name: 'Dotti',
		surname: 'Walduck',
		email: 'dwalduck3q@prlog.org',
		password: 'bilrTaUb',
	},
	{
		name: 'Helyn',
		surname: 'Ackland',
		email: 'hackland3r@surveymonkey.com',
		password: 'dlWihKpNJ',
	},
	{
		name: 'Dallas',
		surname: 'Asals',
		email: 'dasals3s@google.cn',
		password: 'R9BiHA',
	},
	{
		name: 'Blair',
		surname: "O'Neill",
		email: 'boneill3t@berkeley.edu',
		password: 'DmP1x9n1naV3',
	},
	{
		name: 'Gale',
		surname: 'Hyndson',
		email: 'ghyndson3u@posterous.com',
		password: 'hAeEgxpJfS',
	},
	{
		name: 'Sholom',
		surname: 'Wiburn',
		email: 'swiburn3v@fc2.com',
		password: 'hu7B9xjLJOPj',
	},
	{
		name: 'Kaye',
		surname: 'Pretsel',
		email: 'kpretsel3w@hibu.com',
		password: 'HPUPJAaVkCK',
	},
	{
		name: 'Ronnie',
		surname: 'Algy',
		email: 'ralgy3x@google.com.br',
		password: 'VJGHexMa',
	},
	{
		name: 'Fanechka',
		surname: 'Mabley',
		email: 'fmabley3y@sciencedaily.com',
		password: 'bZj6bHFPkxS',
	},
	{
		name: 'Humphrey',
		surname: 'Sheeres',
		email: 'hsheeres3z@creativecommons.org',
		password: '168UvTY5',
	},
	{
		name: 'Janie',
		surname: 'Goneau',
		email: 'jgoneau40@t-online.de',
		password: 'UjagpzV',
	},
	{
		name: 'Reggie',
		surname: 'Comello',
		email: 'rcomello41@joomla.org',
		password: 'IdVix63Yk',
	},
	{
		name: 'Virgie',
		surname: 'Pilkinton',
		email: 'vpilkinton42@drupal.org',
		password: 'MHDRB2o',
	},
	{
		name: 'Nickie',
		surname: 'Critcher',
		email: 'ncritcher43@de.vu',
		password: 's02eS7tSIO1',
	},
	{
		name: 'Laurice',
		surname: 'Beeck',
		email: 'lbeeck44@nih.gov',
		password: 'tuoDwOM',
	},
	{
		name: 'Barton',
		surname: 'Westmorland',
		email: 'bwestmorland45@columbia.edu',
		password: 'NmpoMfsl2',
	},
	{
		name: 'Perrine',
		surname: 'Duerden',
		email: 'pduerden46@google.com.au',
		password: 'pxGLwuLuT7',
	},
	{
		name: 'Con',
		surname: 'Hasel',
		email: 'chasel47@so-net.ne.jp',
		password: 'zCtstt',
	},
	{
		name: 'Meade',
		surname: 'Esmonde',
		email: 'mesmonde48@wordpress.org',
		password: 'cNSexKY5Inw',
	},
	{
		name: 'Perl',
		surname: 'Swadlin',
		email: 'pswadlin49@fda.gov',
		password: 'SKlE03fO',
	},
	{
		name: 'Fran',
		surname: 'Farlamb',
		email: 'ffarlamb4a@gizmodo.com',
		password: 'irMOTusB9T',
	},
	{
		name: 'Dennie',
		surname: 'Howkins',
		email: 'dhowkins4b@tiny.cc',
		password: 'YbFNmKAXkV',
	},
	{
		name: 'Munroe',
		surname: 'Chicchetto',
		email: 'mchicchetto4c@yolasite.com',
		password: 'HGR9jmLrk',
	},
	{
		name: 'Krispin',
		surname: 'Uttridge',
		email: 'kuttridge4d@studiopress.com',
		password: 'nmMSsJbcz',
	},
	{
		name: 'Rycca',
		surname: 'Smickle',
		email: 'rsmickle4e@comsenz.com',
		password: 'ZrNlj5',
	},
	{
		name: 'Leon',
		surname: 'Barr',
		email: 'lbarr4f@tripadvisor.com',
		password: 'Hfzs6Zllm',
	},
	{
		name: 'Amii',
		surname: 'Yurchishin',
		email: 'ayurchishin4g@twitpic.com',
		password: 'i0EIghWc8tIE',
	},
	{
		name: 'Dianemarie',
		surname: 'Kruszelnicki',
		email: 'dkruszelnicki4h@fotki.com',
		password: 'NXyOw0udJ8d',
	},
	{
		name: 'Reinald',
		surname: 'Corry',
		email: 'rcorry4i@meetup.com',
		password: 'zanibFxZU50r',
	},
	{
		name: 'Rickey',
		surname: 'Ornelas',
		email: 'rornelas4j@umn.edu',
		password: 'e7uhXLoj',
	},
	{
		name: 'Valentina',
		surname: "L'oiseau",
		email: 'vloiseau4k@google.it',
		password: '5hrAkosipP',
	},
	{
		name: 'Ardelis',
		surname: 'Lafrentz',
		email: 'alafrentz4l@disqus.com',
		password: 'cd7IQh8qgE',
	},
	{
		name: 'Rollins',
		surname: 'Taylor',
		email: 'rtaylor4m@patch.com',
		password: '8NahNg',
	},
	{
		name: 'Arlyne',
		surname: "O'Loghlen",
		email: 'aologhlen4n@google.nl',
		password: 'mMJk20fTY',
	},
	{
		name: 'Halsey',
		surname: 'Myott',
		email: 'hmyott4o@google.ru',
		password: 'UrA2yRvV',
	},
	{
		name: 'Rinaldo',
		surname: 'Yerborn',
		email: 'ryerborn4p@bloglovin.com',
		password: 'LEVvXWB0q3',
	},
	{
		name: 'Legra',
		surname: 'Simonetto',
		email: 'lsimonetto4q@nyu.edu',
		password: 'I2odjR',
	},
	{
		name: 'Chickie',
		surname: 'Walenta',
		email: 'cwalenta4r@blinklist.com',
		password: 'gGrGiBJK8',
	},
	{
		name: 'Connie',
		surname: 'Farans',
		email: 'cfarans4s@ning.com',
		password: 'XOWy5T',
	},
	{
		name: 'Kriste',
		surname: 'Geal',
		email: 'kgeal4t@skype.com',
		password: 'ikoCN1',
	},
	{
		name: 'Gino',
		surname: 'Grigorio',
		email: 'ggrigorio4u@geocities.jp',
		password: 'F5MYiL',
	},
	{
		name: 'Jordain',
		surname: 'Hedon',
		email: 'jhedon4v@mlb.com',
		password: 'y3xHnPR',
	},
	{
		name: 'Modesty',
		surname: 'Jerratsch',
		email: 'mjerratsch4w@cdbaby.com',
		password: 'tmjBYw7PL',
	},
	{
		name: 'Tommy',
		surname: 'Hursthouse',
		email: 'thursthouse4x@about.com',
		password: 'TWXgi2mf1ki',
	},
	{
		name: 'Clary',
		surname: 'Breadmore',
		email: 'cbreadmore4y@posterous.com',
		password: 'rTKpNkg',
	},
	{
		name: 'Benjie',
		surname: 'Sarton',
		email: 'bsarton4z@noaa.gov',
		password: 'CMsG5D0XBJ',
	},
	{
		name: 'Mead',
		surname: 'Quail',
		email: 'mquail50@trellian.com',
		password: 'vTcL1kkqQtb',
	},
	{
		name: 'Ingrid',
		surname: 'Sherreard',
		email: 'isherreard51@de.vu',
		password: '8nbXll8bRJos',
	},
	{
		name: 'Cherice',
		surname: 'Ead',
		email: 'cead52@elegantthemes.com',
		password: 'XLWbeSkz30d',
	},
	{
		name: 'Helga',
		surname: 'Scruton',
		email: 'hscruton53@xing.com',
		password: 'D8x6q6',
	},
	{
		name: 'Salvidor',
		surname: 'Huggill',
		email: 'shuggill54@princeton.edu',
		password: 'uU7kvb',
	},
	{
		name: 'Benita',
		surname: 'Fabry',
		email: 'bfabry55@elegantthemes.com',
		password: 'bLUyXcK',
	},
	{
		name: 'Giles',
		surname: 'Kelly',
		email: 'gkelly56@cdc.gov',
		password: 'mGyoKhpG',
	},
	{
		name: 'Guinevere',
		surname: 'Attwooll',
		email: 'gattwooll57@devhub.com',
		password: '57eE110Go7',
	},
	{
		name: 'Dinnie',
		surname: 'Thaxton',
		email: 'dthaxton58@arizona.edu',
		password: 'xJqncOEV60',
	},
	{
		name: 'Boigie',
		surname: 'Judron',
		email: 'bjudron59@theatlantic.com',
		password: 'AGs9bTTB',
	},
	{
		name: 'Ruggiero',
		surname: 'Thorby',
		email: 'rthorby5a@washington.edu',
		password: 'eFPXlnnrL',
	},
	{
		name: 'Moritz',
		surname: 'Daysh',
		email: 'mdaysh5b@cargocollective.com',
		password: 'KHyyYEzEHdRb',
	},
	{
		name: 'Hi',
		surname: 'Heaysman',
		email: 'hheaysman5c@hibu.com',
		password: 'ohamRZ',
	},
	{
		name: 'Henryetta',
		surname: 'Rykert',
		email: 'hrykert5d@yellowbook.com',
		password: 'rPWjP3',
	},
	{
		name: 'Griselda',
		surname: 'Wernham',
		email: 'gwernham5e@cnet.com',
		password: 'MM7eZJ9JkZ',
	},
	{
		name: 'Malvina',
		surname: 'Mulcock',
		email: 'mmulcock5f@statcounter.com',
		password: 'ZtneFRo',
	},
	{
		name: 'Milt',
		surname: 'Elsie',
		email: 'melsie5g@home.pl',
		password: 'zeDJuHOkO7Fc',
	},
	{
		name: 'Giraud',
		surname: 'Pettican',
		email: 'gpettican5h@ihg.com',
		password: 'oCNSIccb8E',
	},
	{
		name: 'Fabian',
		surname: 'Broome',
		email: 'fbroome5i@nymag.com',
		password: 'UxXnDVDgED',
	},
	{
		name: 'Cacilie',
		surname: 'Amsden',
		email: 'camsden5j@cocolog-nifty.com',
		password: 'PSfgQvTRy8UA',
	},
];

const userOrganization = [
	{
		name: 'Timoteo',
		surname: 'Bussens',
		email: 'tbussens0@census.gov',
		password: 'o1Wcmy3b5',
		organizationId: 1,
	},
	{
		name: 'Shanie',
		surname: 'Wagner',
		email: 'swagner1@wordpress.com',
		password: 'sg4Ib2Jp',
		organizationId: 2,
	},
	{
		name: 'Madelene',
		surname: 'Snel',
		email: 'msnel2@princeton.edu',
		password: 'yRws8Z1hoy',
		organizationId: 3,
	},
	{
		name: 'Glenna',
		surname: 'Losemann',
		email: 'glosemann3@bloglovin.com',
		password: 'BSbtR67vB4',
		organizationId: 4,
	},
	{
		name: 'Darin',
		surname: 'Krink',
		email: 'dkrink4@meetup.com',
		password: 'OreJahKPGyE6',
		organizationId: 5,
	},
	{
		name: 'Ced',
		surname: 'Asling',
		email: 'casling5@upenn.edu',
		password: 'b7tIU4z4oYee',
		organizationId: 6,
	},
	{
		name: 'Gloriane',
		surname: 'Whelan',
		email: 'gwhelan6@economist.com',
		password: 'xYI5arQmn',
		organizationId: 7,
	},
	{
		name: 'Abelard',
		surname: 'Linacre',
		email: 'alinacre7@uiuc.edu',
		password: 'ofnat1pO',
		organizationId: 8,
	},
	{
		name: 'Traver',
		surname: 'Bourne',
		email: 'tbourne8@oakley.com',
		password: 'vmGvq4Cg3',
		organizationId: 9,
	},
	{
		name: 'Hyacinthia',
		surname: 'Neesham',
		email: 'hneesham9@nymag.com',
		password: 'EdpCqD',
		organizationId: 10,
	},
];

const {
	Event,
	Date,
	Organization,
	EventLocation,
	Ticket,
	User,
	Location,
	Category,
	EventCategory,
	City,
	UserRole,
} = sequelize.models;

export async function MockData() {
	Promise.all([
		Organization.bulkCreate(organization),
		City.bulkCreate(cities),
		Category.bulkCreate(categories),
	]).then(async (result) => {
		await Location.bulkCreate(locations);
		events = events.map((event: any) => {
      if (event.background_image) return event
			return {
				...event,
				background_image:
					images[Math.floor(Math.random() * (images.length - 1) + 1)],
			};
		});
		let eventcreated = await Event.bulkCreate(events);
		await EventLocation.bulkCreate(eventLocations);
		await Date.bulkCreate(dates);

		let userscreated = await User.bulkCreate(users);

		for (let i = 0; i < userscreated.length; i++) {
			await UserRole.create({
				userId: userscreated[i].getDataValue('id'),
				roleId: 1010,
			});
		}

		let userOrganizationcreated = await User.bulkCreate(userOrganization);

		for (let i = 0; i < userOrganizationcreated.length; i++) {
			await UserRole.create({
				userId: userOrganizationcreated[i].getDataValue('id'),
				roleId: 1010,
			});
			await UserRole.create({
				userId: userOrganizationcreated[i].getDataValue('id'),
				roleId: 2020,
			});
		}

		for (let i = 0; i < eventcreated.length; i++) {
			await EventCategory.create({
				eventId: eventcreated[i].getDataValue('id'),
				categoryId: Math.floor(Math.random() * (6 - 1) + 1),
			});
		}
	});
}

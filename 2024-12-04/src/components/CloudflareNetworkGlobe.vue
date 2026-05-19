<script lang="ts" setup>
const markers = [
  // North America
  { location: [35.0844, -106.6506], size: 0.02 }, // Albuquerque, US*
  { location: [61.2181, -149.9003], size: 0.02 }, // Anchorage, US
  { location: [39.0438, -77.4874], size: 0.02 }, // Ashburn, US*
  { location: [33.749, -84.388], size: 0.02 }, // Atlanta, US*
  { location: [30.2672, -97.7431], size: 0.02 }, // Austin, US*
  { location: [44.8014, -68.7778], size: 0.02 }, // Bangor, US*
  { location: [42.3601, -71.0589], size: 0.02 }, // Boston, US*
  { location: [42.8864, -78.8784], size: 0.02 }, // Buffalo, US*
  { location: [51.0486, -114.0708], size: 0.02 }, // Calgary, CA*
  { location: [35.2271, -80.8431], size: 0.02 }, // Charlotte, US*
  { location: [41.8781, -87.6298], size: 0.02 }, // Chicago, US*
  { location: [41.5055, -81.6813], size: 0.02 }, // Cleveland, US*
  { location: [39.9612, -82.9988], size: 0.02 }, // Columbus, US*
  { location: [32.7767, -96.797], size: 0.02 }, // Dallas, US*
  { location: [39.7392, -104.9903], size: 0.02 }, // Denver, US*
  { location: [42.3314, -83.0458], size: 0.02 }, // Détroit, US*
  { location: [44.6488, -63.5752], size: 0.02 }, // Halifax, CA
  { location: [21.3069, -157.8583], size: 0.02 }, // Honolulu, US*
  { location: [29.7604, -95.3698], size: 0.02 }, // Houston, US*
  { location: [39.768, -86.158], size: 0.02 }, // Indianapolis, US*
  { location: [30.3322, -81.6557], size: 0.02 }, // Jacksonville, US*
  { location: [39.0997, -94.5786], size: 0.02 }, // Kansas City, US*
  { location: [36.1699, -115.1398], size: 0.02 }, // Las Vegas, US*
  { location: [34.0522, -118.2437], size: 0.02 }, // Los Angeles, US*
  { location: [26.2034, -98.23], size: 0.02 }, // Mcallen, US*
  { location: [35.1495, -90.049], size: 0.02 }, // Memphis, US*
  { location: [25.7617, -80.1918], size: 0.02 }, // Miami, US*
  { location: [44.9778, -93.265], size: 0.02 }, // Minneapolis, US*
  { location: [32.3792, -86.3077], size: 0.02 }, // Montgomery, US*
  { location: [45.5017, -73.5673], size: 0.02 }, // Montréal, CA*
  { location: [36.1627, -86.7816], size: 0.02 }, // Nashville, US*
  { location: [40.7357, -74.1724], size: 0.02 }, // Newark, US*
  { location: [36.8508, -76.2859], size: 0.02 }, // Norfolk, US*
  { location: [35.4676, -97.5164], size: 0.02 }, // Oklahoma City, US*
  { location: [41.2565, -95.9345], size: 0.02 }, // Omaha, US*
  { location: [45.4215, -75.6972], size: 0.02 }, // Ottawa, CA*
  { location: [39.9526, -75.1652], size: 0.02 }, // Philadelphie, US*
  { location: [33.4484, -112.074], size: 0.02 }, // Phoenix, US*
  { location: [40.4406, -79.9959], size: 0.02 }, // Pittsburgh, US*
  { location: [45.5051, -122.675], size: 0.02 }, // Portland, US*
  { location: [35.7796, -78.6382], size: 0.02 }, // Raleigh, US*
  { location: [37.5407, -77.436], size: 0.02 }, // Richmond, US*
  { location: [38.5816, -121.4944], size: 0.02 }, // Sacramento, US*
  { location: [40.7608, -111.891], size: 0.02 }, // Salt Lake City, US*
  { location: [29.4241, -98.4936], size: 0.02 }, // San Antonio, US*
  { location: [32.7157, -117.1611], size: 0.02 }, // San Diego, US*
  { location: [37.7749, -122.4194], size: 0.02 }, // San Francisco, US*
  { location: [37.3382, -121.8863], size: 0.02 }, // San Jose, US*
  { location: [52.1307, -106.6603], size: 0.02 }, // Saskatoon, CA*
  { location: [47.6062, -122.3321], size: 0.02 }, // Seattle, US*
  { location: [43.5446, -96.7311], size: 0.02 }, // Sioux Falls, US
  { location: [38.627, -90.1994], size: 0.02 }, // St. Louis, US*
  { location: [30.4383, -84.2807], size: 0.02 }, // Tallahassee, US*
  { location: [27.9506, -82.4572], size: 0.02 }, // Tampa, US*
  { location: [43.6511, -79.383], size: 0.02 }, // Toronto, CA*
  { location: [49.2827, -123.1207], size: 0.02 }, // Vancouver, CA*
  { location: [49.8951, -97.1384], size: 0.02 }, // Winnipeg, CA*
  // Latin America & the Caribbean
  { location: [-22.7556, -47.4147], size: 0.02 }, // Americana, BR
  { location: [-21.2089, -50.4261], size: 0.02 }, // Aracatuba, BR
  { location: [-18.4783, -70.3126], size: 0.02 }, // Arica, CL*
  { location: [-25.2637, -57.5759], size: 0.02 }, // Asuncion, PY
  { location: [10.9878, -74.7889], size: 0.02 }, // Barranquilla, CO
  { location: [-19.9167, -43.9345], size: 0.02 }, // Belo Horizonte, BR*
  { location: [-1.4558, -48.503], size: 0.02 }, // Belém, BR*
  { location: [-26.3045, -48.8462], size: 0.02 }, // Blumenau, BR
  { location: [4.7109, -74.0721], size: 0.02 }, // Bogota, CO
  { location: [-15.8267, -47.9218], size: 0.02 }, // Brasília, BR
  { location: [13.0827, -59.611], size: 0.02 }, // Bridgetown, BB*
  { location: [-34.6037, -58.3816], size: 0.02 }, // Buenos Aires, AR*
  { location: [-22.9099, -47.0626], size: 0.02 }, // Campinas, BR
  { location: [-21.2522, -47.2942], size: 0.02 }, // Campos dos Goytacazes, BR
  { location: [-27.5954, -48.548], size: 0.02 }, // Caçador, BR*
  { location: [-27.1006, -52.6157], size: 0.02 }, // Chapeco, BR
  { location: [-23.6509, -70.3975], size: 0.02 }, // Concepción, CL
  { location: [-31.4201, -64.1888], size: 0.02 }, // Cordoba, AR
  { location: [-15.601, -56.0974], size: 0.02 }, // Cuiabá, BR
  { location: [-25.4284, -49.2733], size: 0.02 }, // Curitiba, BR*
  { location: [-27.5954, -48.548], size: 0.02 }, // Florianópolis, BR
  { location: [-3.7172, -38.5433], size: 0.02 }, // Fortaleza, BR*
  { location: [6.8013, -58.1551], size: 0.02 }, // Georgetown, GY*
  { location: [-16.6869, -49.2643], size: 0.02 }, // Goiânia, BR
  { location: [20.6597, -103.3496], size: 0.02 }, // Guadalajara, MX
  { location: [14.6349, -90.5069], size: 0.02 }, // Guatemala City, GT
  { location: [-2.1709, -79.9224], size: 0.02 }, // Guayaquil, EC*
  { location: [-26.9106, -49.0718], size: 0.02 }, // Itajaí, BR
  { location: [-26.3045, -48.8462], size: 0.02 }, // Joinville, BR
  { location: [-7.2135, -39.3153], size: 0.02 }, // Juazeiro do Norte, BR
  { location: [17.9712, -76.792], size: 0.02 }, // Kingston, JM
  { location: [-16.5004, -68.1342], size: 0.02 }, // La Paz, BO*
  { location: [-12.0464, -77.0428], size: 0.02 }, // Lima, PE*
  { location: [-3.1019, -60.025], size: 0.02 }, // Manaus, BR
  { location: [6.2442, -75.5812], size: 0.02 }, // Medellín, CO
  { location: [19.4326, -99.1332], size: 0.02 }, // Mexico City, MX*
  { location: [-38.9516, -68.0591], size: 0.02 }, // Neuquen, AR
  { location: [-10.1753, -48.2982], size: 0.02 }, // Palmas, BR
  { location: [8.9824, -79.5199], size: 0.02 }, // Panama City, PA
  { location: [5.852, -55.2038], size: 0.02 }, // Paramaribo, SR*
  { location: [10.6918, -61.2225], size: 0.02 }, // Port-d'Espagne, TT*
  { location: [-30.0346, -51.2177], size: 0.02 }, // Porto Alegre, BR*
  { location: [20.5881, -100.3899], size: 0.02 }, // Queretaro, MX*
  { location: [-0.1807, -78.4678], size: 0.02 }, // Quito, EC*
  { location: [-8.0476, -34.877], size: 0.02 }, // Recife, BR
  { location: [-21.1767, -47.8209], size: 0.02 }, // Ribeirão Preto, BR
  { location: [-22.9068, -43.1729], size: 0.02 }, // Rio de Janeiro, BR*
  { location: [-12.9714, -38.5014], size: 0.02 }, // Salvador, BR*
  { location: [9.9281, -84.0907], size: 0.02 }, // San José, CR*
  { location: [18.4655, -66.1057], size: 0.02 }, // San Juan, PR
  { location: [-31.5375, -68.5364], size: 0.02 }, // Santiago de los Caballeros, DO
  { location: [-33.4489, -70.6693], size: 0.02 }, // Santiago, CL*
  { location: [18.4861, -69.9312], size: 0.02 }, // Santo Domingo, DO*
  { location: [-23.5505, -46.6333], size: 0.02 }, // São Paulo, BR*
  { location: [14.5995, -87.176], size: 0.02 }, // Tegucigalpa, HN
  { location: [-27.5904, -48.5758], size: 0.02 }, // Timbo, BR
  { location: [-18.9146, -48.2754], size: 0.02 }, // Uberlândia, BR
  { location: [-33.0458, -71.6197], size: 0.02 }, // Valparaíso, CL
  { location: [-20.2976, 57.5437], size: 0.02 }, // Port Louis, MU
  { location: [-20.8789, 55.4481], size: 0.02 }, // Saint-Denis, RE
  { location: [36.8065, 10.1815], size: 0.02 }, // Tunis, TN
  { location: [6.8206, -5.2767], size: 0.02 }, // Yamoussoukro, CI*
  // Europe
  { location: [52.3676, 4.9041], size: 0.02 }, // Amsterdam, NL*
  { location: [37.9838, 23.7275], size: 0.02 }, // Athènes, GR*
  { location: [41.3851, 2.1734], size: 0.02 }, // Barcelone, ES*
  { location: [44.7866, 20.4489], size: 0.02 }, // Belgrade, RS*
  { location: [52.520, 13.405], size: 0.02 }, // Berlin, DE*
  { location: [44.8378, -0.5792], size: 0.02 }, // Bordeaux, FR*
  { location: [48.1486, 17.1077], size: 0.02 }, // Bratislava, SK*
  { location: [50.8503, 4.3517], size: 0.02 }, // Bruxelles, BE*
  { location: [44.4268, 26.1025], size: 0.02 }, // Bucarest, RO*
  { location: [47.4979, 19.0402], size: 0.02 }, // Budapest, HU*
  { location: [55.6761, 12.5683], size: 0.02 }, // Copenhagen, DK*
  { location: [51.8979, -8.4711], size: 0.02 }, // Cork, IE*
  { location: [53.3498, -6.2603], size: 0.02 }, // Dublin, IE*
  { location: [51.2277, 6.7735], size: 0.02 }, // Düsseldorf, DE*
  { location: [56.8391, 60.6083], size: 0.02 }, // Ekaterinburg, RU
  { location: [50.8503, 4.3517], size: 0.02 }, // Francfort, DE*
  { location: [46.2044, 6.1432], size: 0.02 }, // Genève, CH*
  { location: [57.7089, 11.9746], size: 0.02 }, // Göteborg, SE*
  { location: [53.5511, 9.9937], size: 0.02 }, // Hambourg, DE*
  { location: [60.1695, 24.9354], size: 0.02 }, // Helsinki, FI*
  { location: [41.0082, 28.9784], size: 0.02 }, // Istanbul, TR*
  { location: [38.4192, 27.1287], size: 0.02 }, // Izmir, TR
  { location: [48.7071, 44.5169], size: 0.02 }, // Khabarovsk, RU
  { location: [50.4501, 30.5234], size: 0.02 }, // Kiev, UA*
  { location: [56.0097, 92.8526], size: 0.02 }, // Krasnoïarsk, RU
  { location: [38.7223, -9.1393], size: 0.02 }, // Lisbonne, PT*
  { location: [51.5074, -0.1278], size: 0.02 }, // Londres, GB*
  { location: [49.6116, 6.1319], size: 0.02 }, // Luxembourg, LU*
  { location: [45.764, 4.8357], size: 0.02 }, // Lyon, FR*
  { location: [40.4168, -3.7038], size: 0.02 }, // Madrid, ES*
  { location: [53.4808, -2.2426], size: 0.02 }, // Manchester, GB*
  { location: [43.2962, 5.3698], size: 0.02 }, // Marseille, FR*
  { location: [45.4642, 9.190], size: 0.02 }, // Milan, IT*
  { location: [53.9045, 27.5615], size: 0.02 }, // Minsk, BY
  { location: [55.7558, 37.6176], size: 0.02 }, // Moscou, RU
  { location: [48.1351, 11.582], size: 0.02 }, // Munich, DE*
  { location: [35.1856, 33.3823], size: 0.02 }, // Nicosie, CY*
  { location: [59.9139, 10.7522], size: 0.02 }, // Oslo, NO*
  { location: [38.1157, 13.3618], size: 0.02 }, // Palerme, IT*
  { location: [48.8566, 2.3522], size: 0.02 }, // Paris, FR*
  { location: [50.0755, 14.4378], size: 0.02 }, // Prague, CZ*
  { location: [64.1265, -21.8174], size: 0.02 }, // Reykjavík, IS*
  { location: [56.9496, 24.1052], size: 0.02 }, // Riga, LV*
  { location: [41.9028, 12.4964], size: 0.02 }, // Rome, IT*
  { location: [41.9973, 21.428], size: 0.02 }, // Skopje, MK
  { location: [42.6977, 23.3219], size: 0.02 }, // Sofia, BG*
  { location: [59.9343, 30.3351], size: 0.02 }, // St. Petersburg, RU
  { location: [59.3293, 18.0686], size: 0.02 }, // Stockholm, SE*
  { location: [48.7758, 9.1829], size: 0.02 }, // Stuttgart, DE
  { location: [59.437, 24.7536], size: 0.02 }, // Tallinn, EE*
  { location: [40.6401, 22.9444], size: 0.02 }, // Thessaloniki, GR*
  { location: [41.3275, 19.8187], size: 0.02 }, // Tirana, AL
  { location: [56.8519, 60.6122], size: 0.02 }, // Tver, RU
  { location: [52.2297, 21.0122], size: 0.02 }, // Varsovie, PL*
  { location: [48.2082, 16.3738], size: 0.02 }, // Vienne, AT*
  { location: [54.6872, 25.2797], size: 0.02 }, // Vilnius, LT*
  { location: [45.815, 15.9819], size: 0.02 }, // Zagreb, HR*
  { location: [47.3769, 8.5417], size: 0.02 }, // Zurich, CH*
  // Middle East
  { location: [31.9516, 35.9232], size: 0.02 }, // Amman, JO*
  { location: [33.3152, 44.3661], size: 0.02 }, // Baghdad, IQ*
  { location: [30.5101, 47.8356], size: 0.02 }, // Basra, IQ
  { location: [33.8886, 35.4955], size: 0.02 }, // Beyrouth, LB
  { location: [26.3753, 50.1526], size: 0.02 }, // Dammam, SA
  { location: [25.276987, 51.526988], size: 0.02 }, // Doha, QA
  { location: [25.276987, 51.526988], size: 0.02 }, // Dubaï, AE
  { location: [36.1926, 44.0106], size: 0.02 }, // Erbil, IQ
  { location: [32.8156, 34.9892], size: 0.02 }, // Haïfa, IL
  { location: [21.4858, 39.1925], size: 0.02 }, // Jeddah, SA
  { location: [29.3759, 47.9774], size: 0.02 }, // Koweït City, KW
  { location: [26.2185, 50.5988], size: 0.02 }, // Manama, BH
  { location: [23.614, 58.592], size: 0.02 }, // Muscat, OM
  { location: [32.0255, 44.3465], size: 0.02 }, // Najaf, IQ
  { location: [31.9038, 35.2034], size: 0.02 }, // Ramallah
  { location: [24.7136, 46.6753], size: 0.02 }, // Riyadh, SA
  { location: [35.5613, 45.4375], size: 0.02 }, // Souleimaniye, IQ
  { location: [32.0853, 34.7818], size: 0.02 }, // Tel-Aviv, IL*
  // Asia
  { location: [23.0225, 72.5714], size: 0.02 }, // Ahmedabad, IN
  { location: [43.222, 76.8512], size: 0.02 }, // Almaty, KZ
  { location: [38.882, 48.5289], size: 0.02 }, // Astara, AZ
  { location: [40.4093, 49.8671], size: 0.02 }, // Bakou, AZ
  { location: [4.9031, 114.9408], size: 0.02 }, // Bandar Seri Begawan, BN
  { location: [13.7563, 100.5018], size: 0.02 }, // Bangkok, TH*
  { location: [12.9716, 77.5946], size: 0.02 }, // Bengaluru, IN*
  { location: [20.2961, 85.8245], size: 0.02 }, // Bhubaneshwar, IN
  { location: [17.6139, 121.8236], size: 0.02 }, // Cagayan, PH
  { location: [10.3157, 123.8854], size: 0.02 }, // Cebu, PH
  { location: [30.7333, 76.7794], size: 0.02 }, // Chandigarh, IN
  { location: [13.0827, 80.2707], size: 0.02 }, // Chennai, IN*
  { location: [18.7877, 98.9931], size: 0.02 }, // Chiang Mai, TH*
  { location: [22.3569, 91.7832], size: 0.02 }, // Chittagong, BD
  { location: [6.9271, 79.8612], size: 0.02 }, // Colombo, LK*
  { location: [16.0544, 108.2022], size: 0.02 }, // Da Nang, VN
  { location: [-8.6525, 115.2193], size: 0.02 }, // Denpasar, ID*
  { location: [23.8103, 90.4125], size: 0.02 }, // Dhaka,
  { location: [33.5904, 130.4017], size: 0.02 }, // Fukuoka, JP*
  { location: [21.0278, 105.8342], size: 0.02 }, // Hanoï, VN*
  { location: [22.3193, 114.1694], size: 0.02 }, // Hong Kong*
  { location: [17.385, 78.4867], size: 0.02 }, // Hyderabad, IN*
  { location: [10.7629, 106.6809], size: 0.02 }, // Hô Chi Minh-Ville, VN*
  { location: [33.6844, 73.0479], size: 0.02 }, // Islamabad, PK
  { location: [-6.2088, 106.8456], size: 0.02 }, // Jakarta, ID*
  { location: [23.9008, 90.7173], size: 0.02 }, // Jashore, BD
  { location: [1.4927, 103.7414], size: 0.02 }, // Johor Bahru, MY
  { location: [11.8745, 75.3704], size: 0.02 }, // Kannur, IN
  { location: [26.4499, 80.3319], size: 0.02 }, // Kanpur, IN
  { location: [22.6273, 120.3014], size: 0.02 }, // Kaohsiung, TW*
  { location: [24.8615, 67.0099], size: 0.02 }, // Karachi, PK*
  { location: [27.7172, 85.324], size: 0.02 }, // Katmandou, NP*
  { location: [9.9312, 76.2673], size: 0.02 }, // Kochi, IN*
  { location: [22.5726, 88.3639], size: 0.02 }, // Kolkata, IN
  { location: [3.139, 101.6869], size: 0.02 }, // Kuala Lumpur, MY*
  { location: [31.5497, 74.3436], size: 0.02 }, // Lahore, PK
  { location: [22.1987, 113.5439], size: 0.02 }, // Macao
  { location: [4.1755, 73.5093], size: 0.02 }, // Male, MV
  { location: [21.9588, 96.0891], size: 0.02 }, // Mandalay, MM
  { location: [14.5995, 120.9842, 1], size: 0.02 }, // Manille, PH*
  { location: [19.076, 72.8777], size: 0.02 }, // Mumbai, IN*
  { location: [21.2087, 105.8412], size: 0.02 }, // Naha, JP*
  { location: [31.0461, 76.5076], size: 0.02 }, // Nasiriyah, IQ
  { location: [28.6139, 77.209], size: 0.02 }, // New Delhi, IN*
  { location: [34.6937, 135.5023], size: 0.02 }, // Osaka, JP*
  { location: [25.5941, 85.1376], size: 0.02 }, // Patna, IN
  { location: [11.5564, 104.9282], size: 0.02 }, // Phnom Penh, KH
  { location: [1.3521, 103.8198], size: 0.02 }, // Singapour, SG*
  { location: [9.1345, 99.3331], size: 0.02 }, // Surat Thani, TH*
  { location: [37.5665, 126.978], size: 0.02 }, // Séoul, KR*
  { location: [41.2995, 69.2401], size: 0.02 }, // Tachkent, UZ
  { location: [25.032969, 121.565418], size: 0.02 }, // Taipei*
  { location: [15.870, 120.591], size: 0.02 }, // Tarlac, PH
  { location: [41.7151, 44.8271], size: 0.02 }, // Tbilissi, GE
  { location: [27.4728, 89.639], size: 0.02 }, // Thimphu, BT*
  { location: [35.6895, 139.6917], size: 0.02 }, // Tokyo, JP*
  { location: [47.8864, 106.9057], size: 0.02 }, // Ulaanbaatar, MN
  { location: [17.9757, 102.6331], size: 0.02 }, // Vientiane, LA
  { location: [16.8661, 96.1951], size: 0.02 }, // Yangon, MM
  { location: [-7.2575, 112.7521], size: 0.02 }, // Yogyakarta, ID
  // Mainland China
  { location: [21.4814, 109.1201], size: 0.02 }, // Beihai, CN
  { location: [29.0464, 111.6783], size: 0.02 }, // Changde, CN
  { location: [28.2282, 112.9388], size: 0.02 }, // Changsha, CN
  { location: [31.2304, 121.4737], size: 0.02 }, // Changzhou, CN
  { location: [19.2183, 109.5807], size: 0.02 }, // Chengmai, CN
  { location: [29.4316, 106.9123], size: 0.02 }, // Chongqing, CN
  { location: [38.914, 121.6147], size: 0.02 }, // Dalian, CN
  { location: [23.0215, 113.1214], size: 0.02 }, // Foshan, CN
  { location: [26.0745, 119.2965], size: 0.02 }, // Fuzhou, CN
  { location: [23.1291, 113.2644], size: 0.02 }, // Guangzhou, CN
  { location: [26.5833, 106.7167], size: 0.02 }, // Guiyang, CN
  { location: [20.0442, 110.1999], size: 0.02 }, // Haikou, CN
  { location: [37.7322, 115.7011], size: 0.02 }, // Hengshui, CN
  { location: [32.6245, 115.546], size: 0.02 }, // Huainan, CN
  { location: [36.6512, 117.1201], size: 0.02 }, // Jinan, CN
  { location: [25.0389, 102.7183], size: 0.02 }, // Kunming, CN
  { location: [39.5483, 116.6833], size: 0.02 }, // Langfang, CN
  { location: [36.0611, 103.8343], size: 0.02 }, // Lanzhou, CN
  { location: [28.6829, 115.8582], size: 0.02 }, // Nanchang, CN
  { location: [36.0671, 120.3826], size: 0.02 }, // Qingdao, CN
  { location: [31.2304, 121.4737], size: 0.02 }, // Shanghai, CN
  { location: [30.0001, 120.5853], size: 0.02 }, // Shaoxing, CN
  { location: [22.5431, 114.0579], size: 0.02 }, // Shenzhen, CN
  { location: [32.4933, 119.9192], size: 0.02 }, // Taizhou, CN
  { location: [39.3434, 117.3616], size: 0.02 }, // Tianjin, CN
  { location: [31.3375, 118.3731], size: 0.02 }, // Wuhu, CN
  { location: [34.3378, 108.7026], size: 0.02 }, // Xianyang, CN
  { location: [37.8575, 113.5808], size: 0.02 }, // Yangquan, CN
  { location: [34.7466, 113.6253], size: 0.02 }, // Zhengzhou, CN
  { location: [22.5176, 113.3928], size: 0.02 }, // Zhongshan, CN
  { location: [36.8131, 118.0548], size: 0.02 }, // Zibo, CN
  // Oceanie
  { location: [-34.9285, 138.6007], size: 0.02 }, // Adelaide, AU
  { location: [-36.8485, 174.7633], size: 0.02 }, // Auckland, NZ
  { location: [-27.4698, 153.0251], size: 0.02 }, // Brisbane, AU
  { location: [-35.2809, 149.1300], size: 0.02 }, // Canberra, AU
  { location: [-43.5321, 172.6362], size: 0.02 }, // Christchurch, NZ
  { location: [13.4443, 144.7937], size: 0.02 }, // Guam, GU
  { location: [-42.8821, 147.3272], size: 0.02 }, // Hobart, AU
  { location: [-37.8136, 144.9631], size: 0.02 }, // Melbourne, AU
  { location: [-22.2557, 166.4501], size: 0.02 }, // Nouméa, NC
  { location: [-31.9505, 115.8605], size: 0.02 }, // Perth, AU
  { location: [-18.1248, 178.4501], size: 0.02 }, // Suva, FJ
  { location: [-33.8688, 151.2093], size: 0.02 }, // Sydney, AU
  { location: [-17.6797, 149.4068], size: 0.02 }, // Tahiti, PF
  // Africa
  { location: [5.3599517, -4.0082563], size: 0.02 }, // Abidjan, CI
  { location: [5.6037, -0.187], size: 0.02 }, // Accra, GH
  { location: [36.7529, 3.042], size: 0.02 }, // Algiers, DZ
  { location: [36.8984, 7.7619], size: 0.02 }, // Annaba, DZ
  { location: [-18.8792, 47.5079], size: 0.02 }, // Antananarivo, MG
  { location: [30.0444, 31.2357], size: 0.02 }, // Cairo, EG
  { location: [-33.9249, 18.4241], size: 0.02 }, // Cape Town, ZA
  { location: [33.5731, -7.5898], size: 0.02 }, // Casablanca, MA
  { location: [14.7167, -17.4677], size: 0.02 }, // Dakar, SN
  { location: [-6.7924, 39.2083], size: 0.02 }, // Dar Es Salaam, TZ
  { location: [11.6098, 43.1456], size: 0.02 }, // Djibouti, DJ
  { location: [-29.8587, 31.0218], size: 0.02 }, // Durban, ZA
  { location: [0.0422, 32.5293], size: 0.02 }, // Entebbe, UG
  { location: [-24.6282, 25.9231], size: 0.02 }, // Gaborone, BW
  { location: [-17.8252, 31.0335], size: 0.02 }, // Harare, ZW
  { location: [-26.2041, 28.0473], size: 0.02 }, // Johannesburg, ZA
  { location: [-1.9706, 30.1044], size: 0.02 }, // Kigali, RW
  { location: [-4.4419, 15.2663], size: 0.02 }, // Kinshasa, CD
  { location: [6.5244, 3.3792], size: 0.02 }, // Lagos, NG
  { location: [-8.8399, 13.2894], size: 0.02 }, // Luanda, AO
  { location: [-25.8919, 32.6051], size: 0.02 }, // Maputo, MZ
  { location: [-4.0435, 39.6682], size: 0.02 }, // Mombasa, KE
  { location: [-1.286389, 36.817223], size: 0.02 }, // Nairobi, KE
  { location: [35.697, -0.630], size: 0.02 }, // Oran, DZ
  { location: [12.3714, -1.5197], size: 0.02 }, // Ouagadougou, BF
  { location: [-20.1654, 57.4896], size: 0.02 }, // Port Louis, MU
  { location: [-20.8789, 55.4481], size: 0.02 }, // Saint-Denis, RE
  { location: [36.8065, 10.1815], size: 0.02 }, // Tunis, TN
  { location: [6.8206, -5.2767], size: 0.02 }, // Yamoussoukro, CI
] as { location: [number, number], size: number }[]
</script>

<template>
  <Globe :color="[127, 127, 127]" :marker-color="[243, 127, 32]" :speed="0.001" :markers="markers" />
</template>

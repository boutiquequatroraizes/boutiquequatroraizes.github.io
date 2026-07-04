// Catálogo inicial. Isso só é usado na PRIMEIRA vez que o site abre no
// navegador (quando ainda não existe nada salvo em localStorage).
// Depois disso, quem manda são os dados criados/editados pela área /admin.
//
// category deve ser um dos ids definidos em CATEGORIES (ver mais abaixo).

export const CATEGORIES = [
  {
    id: 'raiz-terra',
    label: 'Raiz da Terra',
    subtitle: 'Árvores Nativas',
    description:
      'Espécies brasileiras de porte médio a grande, para quem planeja sombra e paisagem para as próximas décadas.'
  },
  {
    id: 'raiz-sombra',
    label: 'Raiz da Sombra',
    subtitle: 'Ornamentais',
    description:
      'Folhagens que se adaptam a ambientes internos e áreas de pouca luz direta.'
  },
  {
    id: 'raiz-aroma',
    label: 'Raiz do Aroma',
    subtitle: 'Temperos & Ervas',
    description:
      'Plantas aromáticas fáceis de cultivar em vaso, sacada ou horta de quintal.'
  },
  {
    id: 'raiz-pedra',
    label: 'Raiz da Pedra',
    subtitle: 'Suculentas & Cactos',
    description:
      'Para quem tem pouco tempo, sol forte na janela e ainda quer um cantinho verde.'
  }
]

export const seedPlants = [
  {
    id: 'ipe-amarelo',
    name: 'Ipê-Amarelo',
    latinName: 'Handroanthus albus',
    category: 'raiz-terra',
    price: 189.9,
    stock: 12,
    image: null,
    description:
      'Árvore-símbolo do Brasil, com floração amarela intensa ao final do inverno. Boa escolha para arborização urbana e jardins amplos.',
    curiosity:
      'Floresce em massa por poucos dias, cobrindo o chão de pétalas amarelas — antes dos calendários, essa floração ajudava a marcar a chegada da primavera.'
  },
  {
    id: 'pau-brasil',
    name: 'Pau-Brasil',
    latinName: 'Paubrasilia echinata',
    category: 'raiz-terra',
    price: 249.9,
    stock: 6,
    image: null,
    description:
      'A espécie que deu nome ao país. Madeira densa e avermelhada, folhagem pequena e copa fechada.',
    curiosity:
      'Nos séculos XVI e XVII, sua madeira era exportada à Europa como fonte do corante vermelho conhecido como brasilina.'
  },
  {
    id: 'espada-sao-jorge',
    name: 'Espada-de-São-Jorge',
    latinName: 'Sansevieria trifasciata',
    category: 'raiz-sombra',
    price: 79.9,
    stock: 20,
    image: null,
    description:
      'Folhas rígidas e verticais, praticamente indestrutível em ambientes internos com pouca luz.',
    curiosity:
      'É comum encontrá-la perto de portas em casas brasileiras — tradição popular sem comprovação científica, mas presente no folclore.'
  },
  {
    id: 'costela-de-adao',
    name: 'Costela-de-Adão',
    latinName: 'Monstera deliciosa',
    category: 'raiz-sombra',
    price: 129.9,
    stock: 9,
    image: null,
    description:
      'Folhas grandes e recortadas, clássica da decoração tropical. Cresce bem em vasos amplos com suporte.',
    curiosity:
      'Os "furos" nas folhas adultas (fenestrações) ajudam a planta a resistir ao vento e deixar luz passar até as folhas mais baixas.'
  },
  {
    id: 'alecrim',
    name: 'Alecrim',
    latinName: 'Salvia rosmarinus',
    category: 'raiz-aroma',
    price: 34.9,
    stock: 30,
    image: null,
    description:
      'Arbusto aromático de folhas finas, gosta de sol pleno e rega espaçada. Ótimo para temperar carnes e assados.',
    curiosity:
      'Na Grécia Antiga, estudantes usavam coroas de alecrim durante exames, por acreditarem que a planta ajudava a memória.'
  },
  {
    id: 'manjericao',
    name: 'Manjericão',
    latinName: 'Ocimum basilicum',
    category: 'raiz-aroma',
    price: 24.9,
    stock: 25,
    image: null,
    description:
      'Folhas macias e perfumadas, crescimento rápido em vaso ou canteiro. Clássico da cozinha italiana e brasileira.',
    curiosity:
      'Cortar as flores regularmente faz a planta investir energia em mais folhas em vez de produzir semente, prolongando a colheita.'
  },
  {
    id: 'echeveria',
    name: 'Echeveria',
    latinName: 'Echeveria elegans',
    category: 'raiz-pedra',
    price: 39.9,
    stock: 18,
    image: null,
    description:
      'Roseta compacta de folhas suculentas acinzentadas, baixíssima manutenção. Ideal para vasos pequenos.',
    curiosity:
      'A camada esbranquiçada das folhas (pruína) protege do sol forte e retém umidade — evite tocar, pois ela some.'
  },
  {
    id: 'mandacaru',
    name: 'Mandacaru',
    latinName: 'Cereus jamacaru',
    category: 'raiz-pedra',
    price: 99.9,
    stock: 4,
    image: null,
    description:
      'Cacto colunar típico da caatinga, extremamente resistente à seca. Ótimo como destaque vertical em jardins de pedra.',
    curiosity:
      'Suas flores abrem apenas por algumas horas durante a noite e são polinizadas principalmente por morcegos e mariposas.'
  }
]

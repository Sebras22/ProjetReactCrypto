// import { useEffect, useState } from 'react';
// import { Card, CardSection, Flex, Text, Loader, Switch, Button } from '@mantine/core';
// import useApi from '../hooks/useApi';


// const CryptoList = () => {
//   const { data: assets, loading } = useApi<{
//     id: string;
//     name: string;
//     symbol: string;
//     rank: string;
//     priceUsd: string;
//   }>('assets');

//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [showFavorites, setShowFavorites] = useState(false);

//   // Chargement des favoris depuis le localStorage au montage du composant
//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//     setFavorites(storedFavorites);
//   }, []);

//   // Fonction pour ajouter ou retirer une crypto des favoris
//   const toggleFavorite = (id: string) => {
//     const updatedFavorites = favorites.includes(id)
//       ? favorites.filter(fav => fav !== id)
//       : [...favorites, id];
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   // Filtrer les favs en fonction de l'état du switch
//   const filteredAssets = showFavorites
//     ? assets.filter(asset => favorites.includes(asset.id))
//     : assets;

//   return (
//     <div>
//       <Switch
//         label="Afficher uniquement les favoris"
//         checked={showFavorites}
//         onChange={(event) => setShowFavorites(event.currentTarget.checked)}
//         style={{ marginBottom: '20px' }}
//       />
//       <Flex mih={50} bg="blue" gap="lg" justify="center" align="flex-start" direction="row" wrap="wrap">
//         {loading ? (
//           <Loader size="xl" />
//         ) : filteredAssets && filteredAssets.length > 0 ? (
//           filteredAssets.map((el) => (
//             <Card key={el.id} shadow="sm" padding="lg" style={{ margin: '10px' }}>
//               <CardSection>
//                 <Text>Nom: {el.name}</Text>
//                 <Text>Symbole: {el.symbol}</Text>
//                 <Text>Rang: {el.rank}</Text>
//                 <Text>Prix (USD): {parseFloat(el.priceUsd).toFixed(5)}</Text>
//                 <Button onClick={() => toggleFavorite(el.id)}>
//                   {favorites.includes(el.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
//                 </Button>
//               </CardSection>
//             </Card>
//           ))
//         ) : (
//           <Text>Aucune donnée disponible</Text>
//         )}
//       </Flex>
//     </div>
//   );
// };

// export default CryptoList;



import { useEffect, useState } from 'react';
import { Card, CardSection, Flex, Text, Loader, Switch, Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import useApi from '../hooks/useApi';

const CryptoList = () => {
  const { data: assets, loading } = useApi<{
    id: string;
    name: string;
    symbol: string;
    rank: string;
    priceUsd: string;
  }>('assets');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Chargement des favoris depuis le localStorage au montage du composant
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Fonction pour ajouter ou retirer une crypto des favoris
  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Filtrer les favs en fonction de l'état du switch
  const filteredAssets = showFavorites
    ? assets.filter(asset => favorites.includes(asset.id))
    : assets;

  return (
    <div>
      <Switch
        label="Afficher uniquement les favoris"
        checked={showFavorites}
        onChange={(event) => setShowFavorites(event.currentTarget.checked)}
        style={{ marginBottom: '20px' }}
      />
      <Flex mih={50} bg="blue" gap="lg" justify="center" align="flex-start" direction="row" wrap="wrap">
        {loading ? (
          <Loader size="xl" />
        ) : filteredAssets && filteredAssets.length > 0 ? (
          filteredAssets.map((el) => (
            <NavLink key={el.id} to={`/crypto/${el.id}`} style={{ textDecoration: 'none' }}>
              <Card shadow="sm" padding="lg" style={{ margin: '10px' }}>
                <CardSection>
                  <Text>Nom: {el.name}</Text>
                  <Text>Symbole: {el.symbol}</Text>
                  <Text>Rang: {el.rank}</Text>
                  <Text>Prix (USD): {parseFloat(el.priceUsd).toFixed(5)}</Text>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(el.id);
                  }}>
                    {favorites.includes(el.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  </Button>
                </CardSection>
              </Card>
            </NavLink>
          ))
        ) : (
          <Text>Aucune crypto en favori actuellement</Text>
        )}
      </Flex>
    </div>
  );
};

export default CryptoList;

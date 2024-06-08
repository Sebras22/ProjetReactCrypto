// import { useEffect, useState } from 'react';
// import { Card, CardSection, Flex, Text} from '@mantine/core';
// import useApi from '../hooks/UseApi';



// const CryptoList = () => {

//   const {data: assets, loading} = useApi<{
//     id: string;
//     name: string;
//     symbol: string;
//     rank: string;
//     priceUsd: string;
//   }>('assets');

//   return (
//     <Flex 
//       mih={50}
//       bg="blue"
//       gap={'lg'}
//       justify={'center'}
//       align={'flex-start'}
//       direction={'row'}
//       wrap={'wrap'}
//     >
//       {assets && assets.length > 0 ? (
//         assets.map((el) => (
//           <Card key={el.id} shadow="sm" padding="lg" style={{ margin: '10px' }}>
//             <CardSection>
//               <Text>Nom: {el.name}</Text>
//               <Text>Symbole: {el.symbol}</Text>
//               <Text>Rang: {el.rank}</Text>
//               <Text>Prix (USD): {parseFloat(el.priceUsd).toFixed(5)}</Text>
//             </CardSection>
//           </Card>
//         ))
//       ) : (
//         <Text>Chargement des données...</Text>
//       )}
//     </Flex>
//   );
// };

// export default CryptoList;
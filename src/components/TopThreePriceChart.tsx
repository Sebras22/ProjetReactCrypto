// import { useEffect, useState } from "react";
// import { AreaChart } from "@mantine/charts";
// import { Loader } from "@mantine/core";

// const TopThreePriceChart = () => {
//   const [data, setData] = useState<
//     { date: string; Bitcoin: number; Ethereum: number; BNB: number }[]
//   >([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const bitcoinResponse = await fetch(
//           `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1`
//         );
//         const ethereumResponse = await fetch(
//           `https://api.coincap.io/v2/assets/ethereum/history?interval=d1`
//         );
//         const bnbResponse = await fetch(
//           `https://api.coincap.io/v2/assets/binance-coin/history?interval=d1`
//         );

//         if (!bitcoinResponse.ok || !ethereumResponse.ok || !bnbResponse.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const bitcoinData = await bitcoinResponse.json();
//         const ethereumData = await ethereumResponse.json();
//         const bnbData = await bnbResponse.json();

//         // Vérification des données
//         if (!bitcoinData.data || !ethereumData.data || !bnbData.data) {
//           throw new Error("Invalid data format");
//         }

//         const formattedData = bitcoinData.data.map(
//           (btcItem: { time: number; priceUsd: string }, index: number) => ({
//             date: new Date(btcItem.time).toLocaleDateString(),
//             Bitcoin: parseFloat(parseFloat(btcItem.priceUsd).toFixed(5)),
//             Ethereum: parseFloat(
//               parseFloat(ethereumData.data[index].priceUsd).toFixed(5)
//             ),
//             BNB: parseFloat(
//               parseFloat(bnbData.data[index].priceUsd).toFixed(5)
//             ),
//           })
//         );

//         const recentData = formattedData.slice(-5);

//         console.log("Formatted data:", recentData);

//         setData(recentData);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("Data passed to AreaChart:", data);

//   return (
//     <div>
//       {loading ? (
//         <Loader size="xl" />
//       ) : (
//         <AreaChart
//           h={300}
//           data={data}
//           dataKey="date"
//           series={[
//             { name: "Bitcoin", color: "blue.6" },
//             { name: "Ethereum", color: "cyan.6" },
//             { name: "BNB", color: "teal.6" },
//           ]}
//           curveType="linear"
//         />
//       )}
//     </div>
//   );
// };

// export default TopThreePriceChart;


// src/components/TopThreeChartList.tsx
import { useEffect, useState } from 'react';
import { AreaChart } from '@mantine/charts';
import { Loader, Container, Title } from '@mantine/core';

type CryptoData = {
  date: string;
  [key: string]: number | string;
};

const TopThreeChartList = () => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopThreeData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets?limit=3');
        const topThreeResult = await response.json();
        const topThree = topThreeResult.data.map((crypto: { id: string; name: string }) => ({
          id: crypto.id,
          name: crypto.name,
        }));

        const topThreeDataPromises = topThree.map(async (crypto: { id: string; name: string }) => {
          const response = await fetch(`https://api.coincap.io/v2/assets/${crypto.id}/history?interval=d1`);
          const result = await response.json();
          return result.data.map((item: { time: number; priceUsd: string }) => ({
            date: new Date(item.time).toLocaleDateString(),
            [crypto.name]: parseFloat(parseFloat(item.priceUsd).toFixed(5)),
          }));
        });

        const allData = await Promise.all(topThreeDataPromises);

        const mergedData = allData[0].map((item: { date: string }, index: number) => {
          const mergedItem: CryptoData = { date: item.date };
          topThree.forEach((crypto: { name: string }, cryptoIndex: number) => {
            mergedItem[crypto.name] = allData[cryptoIndex][index][crypto.name];
          });
          return mergedItem;
        });

        setData(mergedData.slice(-5));
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopThreeData();
  }, []);

  return (
    <Container>
      <Title my="lg">Top 3 Cryptocurrencies Price History</Title>
      {loading ? (
        <Loader size="xl" />
      ) : (
        <AreaChart
          h={300}
          data={data}
          dataKey="date"
          series={[
            { name: data.length > 0 ? Object.keys(data[0])[1] : 'Crypto 1', color: 'blue.6' },
            { name: data.length > 0 ? Object.keys(data[0])[2] : 'Crypto 2', color: 'cyan.6' },
            { name: data.length > 0 ? Object.keys(data[0])[3] : 'Crypto 3', color: 'teal.6' },
          ]}
          curveType="linear"
        />
      )}
    </Container>
  );
};

export default TopThreeChartList;

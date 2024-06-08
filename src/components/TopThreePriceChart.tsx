import { useEffect, useState } from "react";
import { AreaChart } from "@mantine/charts";
import { Loader } from "@mantine/core";

const TopThreePriceChart = () => {
  const [data, setData] = useState<
    { date: string; Bitcoin: number; Ethereum: number; BNB: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bitcoinResponse = await fetch(
          `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1`
        );
        const ethereumResponse = await fetch(
          `https://api.coincap.io/v2/assets/ethereum/history?interval=d1`
        );
        const bnbResponse = await fetch(
          `https://api.coincap.io/v2/assets/binance-coin/history?interval=d1`
        );

        if (!bitcoinResponse.ok || !ethereumResponse.ok || !bnbResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const bitcoinData = await bitcoinResponse.json();
        const ethereumData = await ethereumResponse.json();
        const bnbData = await bnbResponse.json();

        // Vérification des données
        if (!bitcoinData.data || !ethereumData.data || !bnbData.data) {
          throw new Error("Invalid data format");
        }

        const formattedData = bitcoinData.data.map(
          (btcItem: { time: number; priceUsd: string }, index: number) => ({
            date: new Date(btcItem.time).toLocaleDateString(),
            Bitcoin: parseFloat(parseFloat(btcItem.priceUsd).toFixed(5)),
            Ethereum: parseFloat(
              parseFloat(ethereumData.data[index].priceUsd).toFixed(5)
            ),
            BNB: parseFloat(
              parseFloat(bnbData.data[index].priceUsd).toFixed(5)
            ),
          })
        );

        const recentData = formattedData.slice(-5);

        console.log("Formatted data:", recentData);

        setData(recentData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Data passed to AreaChart:", data);

  return (
    <div>
      {loading ? (
        <Loader size="xl" />
      ) : (
        <AreaChart
          h={300}
          data={data}
          dataKey="date"
          series={[
            { name: "Bitcoin", color: "blue.6" },
            { name: "Ethereum", color: "cyan.6" },
            { name: "BNB", color: "teal.6" },
          ]}
          curveType="linear"
        />
      )}
    </div>
  );
};

export default TopThreePriceChart;

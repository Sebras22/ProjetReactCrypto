import React, { useEffect, useState } from "react";
import { AreaChart } from "@mantine/charts";
import {
    Loader,
    Container,
    Title,
    Checkbox,
    Flex,
    Button,
    Chip,
    Space,
} from "@mantine/core";

type CryptoData = {
    date: string;
    [key: string]: number | string;
};

const ComparativeChart = () => {
    const [data, setData] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);

    useEffect(() => {
        const AddToChart = async () => {
            try {
                const response = await fetch(
                    "https://api.coincap.io/v2/assets"
                );
                const DataResults = await response.json();
                const DataCrypto = DataResults.data.map(
                    (crypto: { id: string; name: string }) => ({
                        id: crypto.id,
                        name: crypto.name,
                    })
                );

                const CryptoPromises = DataCrypto.map(
                    async (crypto: { id: string; name: string }) => {
                        const response = await fetch(
                            `https://api.coincap.io/v2/assets/${crypto.id}/history?interval=d1`
                        );
                        const result = await response.json();
                        return result.data.map(
                            (item: { time: number; priceUsd: string }) => ({
                                date: new Date(item.time).toLocaleDateString(),
                                [crypto.name]: parseFloat(
                                    parseFloat(item.priceUsd).toFixed(5)
                                ),
                            })
                        );
                    }
                );

                const allData = await Promise.all(CryptoPromises);

                const mergedData = allData[0].map(
                    (item: { date: string }, index: number) => {
                        const mergedItem: CryptoData = { date: item.date };
                        DataCrypto.forEach(
                            (crypto: { name: string }, cryptoIndex: number) => {
                                mergedItem[crypto.name] =
                                    allData[cryptoIndex][index][crypto.name];
                            }
                        );
                        return mergedItem;
                    }
                );

                setData(mergedData.slice(-5));
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        AddToChart();
    }, []);

    const test = (cryptoName: string) => {
        if (selectedCryptos.includes(cryptoName)) {
            setSelectedCryptos(
                selectedCryptos.filter((name) => name !== cryptoName)
            );
        } else {
            setSelectedCryptos([...selectedCryptos, cryptoName]);
        }
    };

    const cryptoColors = [
        "blue",
        "cyan",
        "teal",
        "indigo",
        "purple",
        "red",
        "yellow",
        "orange",
        "green",
    ];

    return (
        <Container>
            <Flex direction="column" justify="center" align="center">
                <Title my="lg" c={"#1c7ed6"}>
                    Sélectionnez les CryptoMonnaies à comparer
                </Title>
                {loading ? (
                    <Loader size="xl" />
                ) : (
                    <>
                        <Flex
                            direction={"row"}
                            wrap="wrap"
                            gap={"sm"}
                            miw={1200}
                            justify="center"
                            align="center"
                        >
                            {data.length > 0 &&
                                Object.keys(data[0]).map(
                                    (cryptoName, _index) => (
                                        <Chip
                                            variant="light"
                                            key={cryptoName}
                                            checked={selectedCryptos.includes(
                                                cryptoName
                                            )}
                                            onChange={() => test(cryptoName)}
                                        >
                                            {" "}
                                            {cryptoName}
                                        </Chip>
                                    )
                                )}
                        </Flex>
                        <Space h={"xl"} />
                        <Button
                            onClick={() => {
                                setSelectedCryptos([]);
                            }}
                            color="red"
                            variant="light"
                        >
                            Supprimer tout
                        </Button>
                        <Space h={"xl"} />
                        <AreaChart
                            h={300}
                            data={data}
                            dataKey="date"
                            series={Object.keys(data[0])
                                .filter((cryptoName) =>
                                    selectedCryptos.includes(cryptoName)
                                )
                                .map((cryptoName, index) => ({
                                    name: cryptoName,
                                    color:
                                        cryptoColors[
                                            index % cryptoColors.length
                                        ] + `.${(index % 6) + 1}`,
                                }))}
                            curveType="linear"
                        />
                    </>
                )}
            </Flex>
        </Container>
    );
};

export default ComparativeChart;

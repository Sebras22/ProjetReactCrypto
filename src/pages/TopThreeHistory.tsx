import React, { useEffect } from "react";
import {
    Container,
    Title,
    Flex,
    Badge,
    Tooltip,
    Card,
    CardSection,
    Text,
    Loader,
    Space,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import TopThreePriceChart from "../components/TopThreePriceChart";
import useApi from "../hooks/useApi";

const TopThreeHistory: React.FC = () => {
    const { data: assets, loading } = useApi<{
        id: string;
        name: string;
        symbol: string;
        rank: string;
        priceUsd: string;
        changePercent24Hr: string;
    }>("assets");

    useEffect(() => {
        const fetchTopThreeData = async () => {
            try {
                const response = await fetch(
                    "https://api.coincap.io/v2/assets?limit=3"
                );
                const topThreeResult = await response.json();
                const topThree = topThreeResult.data.map(
                    (crypto: { id: string; name: string; rank: string }) => ({
                        id: crypto.id,
                        name: crypto.name,
                        rank: crypto.rank, // Add rank here if it's available
                    })
                );
            } catch (error) {
                console.error("Error fetching top three data:", error);
            }
        };

        fetchTopThreeData();
    }, []);

    const getBadgeColor = (rank: string) => {
        switch (rank) {
            case "1":
                return "gold";
            case "2":
                return "silver";
            case "3":
                return "#614E1A";
        }
    };

    return (
        <Container>
            <Title ta={"center"} my="lg" c={"#1c7ed6"}>
                Top 3 investissement
            </Title>
            <Flex justify="center" align="flex-start" direction="row">
                {loading ? (
                    <Loader size="xl" />
                ) : (
                    assets &&
                    assets
                        .filter((asset) => ["1", "2", "3"].includes(asset.rank))
                        .map((el) => (
                            <Flex
                                align="flex-middle"
                                justify="flex-start"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                                key={el.id}
                            >
                                <NavLink
                                    to={`/crypto/${el.id}`}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <Badge color={getBadgeColor(el.rank)}>
                                        {el.rank}
                                    </Badge>
                                    <Tooltip label="Cliquez pour en savoir plus">
                                        <Card
                                            shadow="sm"
                                            padding="lg"
                                            radius="md"
                                            miw={"12rem"}
                                            maw="12rem"
                                            style={{ margin: "10px" }}
                                            bg="#313338"
                                        >
                                            <CardSection>
                                                <Flex
                                                    direction="column"
                                                    gap="xs"
                                                >
                                                    <Text c={"white"}>
                                                        Nom: {el.name}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color:
                                                                parseFloat(
                                                                    el.changePercent24Hr
                                                                ) < 0
                                                                    ? "#c1282b"
                                                                    : "#409c56",
                                                        }}
                                                    >
                                                        {parseFloat(
                                                            el.changePercent24Hr
                                                        ).toFixed(5)}{" "}
                                                        %
                                                    </Text>
                                                    <Text c={"white"}>
                                                        Prix (USD):{" "}
                                                        {parseFloat(
                                                            el.priceUsd
                                                        ).toFixed(5)}
                                                        $
                                                    </Text>
                                                </Flex>
                                                <Badge>
                                                    Symbole: {el.symbol}
                                                </Badge>
                                            </CardSection>
                                        </Card>
                                    </Tooltip>
                                </NavLink>
                            </Flex>
                        ))
                )}
            </Flex>
            <Space h="xl" />
            <TopThreePriceChart />
        </Container>
    );
};

export default TopThreeHistory;

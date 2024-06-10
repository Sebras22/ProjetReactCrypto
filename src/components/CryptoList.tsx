import { useEffect, useState } from "react";
import {
    Card,
    CardSection,
    Flex,
    Text,
    Loader,
    Switch,
    Button,
    Tooltip,
    Badge,
    Space,
    Title,
} from "@mantine/core";
import "./CryptoList.css";
import { NavLink } from "react-router-dom";
import useApi from "../hooks/useApi";

const CryptoList = () => {
    const { data: assets, loading } = useApi<{
        id: string;
        name: string;
        symbol: string;
        rank: string;
        priceUsd: string;
        changePercent24Hr: string;
    }>("assets");

    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);

    // Chargement des favoris depuis le localStorage au montage du composant
    useEffect(() => {
        const storedFavorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );
        setFavorites(storedFavorites);
    }, []);

    // Fonction pour ajouter ou retirer une crypto des favoris
    const toggleFavorite = (id: string) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((fav) => fav !== id)
            : [...favorites, id];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    // Filtrer les favs en fonction de l'état du switch
    const filteredAssets = showFavorites
        ? assets.filter((asset) => favorites.includes(asset.id))
        : assets;

    const getBadgeColor = (rank: string) => {
        switch (rank) {
            case "1":
                return "gold";
            case "2":
                return "silver";
            case "3":
                return "#614E1A";
            default:
                return "#228be6";
        }
    };
    return (
        <Flex direction="column" className="PrincipalFlex">
            <Switch
                label="Afficher uniquement les favoris"
                checked={showFavorites}
                onChange={(event) =>
                    setShowFavorites(event.currentTarget.checked)
                }
                style={{
                    marginBottom: "20px",
                    borderRadius: "2rem",
                    padding: "5px",
                    color: "white",
                }}
                bg={"#313338"}
                maw={260}
                color="#228be6"
            />

            <Title
                ta="center"
                fw={900}
                size={"35"}
                style={{ color: "#1c7ed6" }}
            >
                Liste des CryptoMonnaies
            </Title>
            <Space h={"xl"}></Space>
            <Flex
                mih={50}
                gap="lg"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {loading ? (
                    <Loader size="xl" />
                ) : filteredAssets && filteredAssets.length > 0 ? (
                    filteredAssets.map((el) => (
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
                                            <Flex direction="column" gap="xs">
                                                <Text c={"white"}>
                                                    {el.name}
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
                                            <Badge>{el.symbol}</Badge>
                                        </CardSection>
                                    </Card>
                                </Tooltip>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(el.id);
                                    }}
                                    justify="center"
                                    ta="center"
                                    style={{
                                        backgroundColor: favorites.includes(
                                            el.id
                                        )
                                            ? "#c1282b"
                                            : "#228be6",
                                    }}
                                >
                                    {favorites.includes(el.id)
                                        ? "Retirer des favoris"
                                        : "Ajouter aux favoris"}
                                </Button>
                            </NavLink>
                        </Flex>
                    ))
                ) : (
                    <Text>Aucune crypto en favoris actuellement</Text>
                )}
            </Flex>
        </Flex>
    );
};

export default CryptoList;

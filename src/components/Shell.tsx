// src/components/Shell.tsx
import { AppShell, Button, Flex, Box, Space } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";
import { IconList } from "@tabler/icons-react";
import { IconChartLine } from "@tabler/icons-react";
import { IconChartHistogram } from "@tabler/icons-react";

function Shell() {
    return (
        <AppShell
            header={{
                height: 80,
            }}
        >
            <AppShell.Header bg="#313338" withBorder={false}>
                <Flex gap={"xs"} align={"center"} h={"100%"}>
                    <Button component={NavLink} to="/" variant="light">
                        Crypto List
                        <Space w={"sm"} />
                        <IconList stroke={2} />
                    </Button>
                    <Button
                        component={NavLink}
                        to="/top-three-history"
                        variant="light"
                        color="cyan"
                    >
                        Top charts
                        <Space w={"sm"} />
                        <IconChartLine stroke={2} />
                    </Button>
                    <Button
                        component={NavLink}
                        to="/comparative"
                        variant="light"
                        color="orange"
                    >
                        Comparative chart
                        <Space w={"sm"} />
                        <IconChartHistogram stroke={2} />
                    </Button>
                </Flex>
            </AppShell.Header>
            <AppShell.Main bg={"#1f1f1f"}>
                <Box maw={900} w={"95%"} my={"md"} mx={"auto"}>
                    <Outlet />
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}

export default Shell;

// src/components/Shell.tsx
import { AppShell, Button, Flex, Box } from '@mantine/core';
import { NavLink, Outlet } from 'react-router-dom';

function Shell() {
  return (
    <AppShell
      header={{
        height: 80,
      }}
    >
      <AppShell.Header>
        <Flex gap={"xs"} align={"center"} h={"100%"}>
          <Button component={NavLink} to="/" variant="outline">
            Crypto List
          </Button>
          <Button component={NavLink} to="/top-three-history" variant="outline" color="cyan">
            Top charts
          </Button>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        <Box maw={900} w={"95%"} my={"md"} mx={"auto"}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default Shell;

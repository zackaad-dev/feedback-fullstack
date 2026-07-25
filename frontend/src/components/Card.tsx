import { ReactNode } from "react";
import { Container, Box, Stack } from "@mui/material";

interface CardProps {
  children: ReactNode;
}

export const NestCard: React.FC<CardProps> = ({ children }) => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        py: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Stack spacing={3}>{children}</Stack>
      </Box>
    </Container>
  );
};
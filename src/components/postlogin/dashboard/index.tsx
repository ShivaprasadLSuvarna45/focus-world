import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { Box, Container, Typography, useTheme } from "@mui/material";
import UserTable from "../../common/table";
import NavBar from "../../common/navBar";

const Dashboard = ({ handleColorChange } : {handleColorChange: any }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <>
      <NavBar handleColorChange={handleColorChange} />
      <Box
        bgcolor={theme.palette.primary.main}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mt: "2%", fontWeight: "bold" }}
            // item
          >
            <Trans i18nKey="userDetails">
              {t("userDetails")}
            </Trans>
          </Typography>
          <UserTable />
        </Container>
      </Box>
    </>
  );
};
export default Dashboard;
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext, useReducer } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TostContext } from "./SimpleSnackbarContext";
import { todolistContext } from "../Reducer/todosContext";

import TodosReducer from "../Reducer/TodosReducer.js";
export default function Todo({
  element,
  showModeldelet,
  handleClickOpenmodel,
}) {
  const { todosl, despatch } = useContext(todolistContext);
  const { showSnackbar } = useContext(TostContext);

  // const { todosl, setTodos } = useContext(todolistContext);
  function handercheckClick(id) {
    despatch({ type: "check", pyload: element });

    if (element.isComplet) {
      showSnackbar(" تمت الاضافة الى المهام المنجزة");
    } else {
      showSnackbar(" تمت الازالة من المهام المنجزة");
    }
  }

  return (
    <>
      <Card
        className="mycard"
        sx={{
          minWidth: 275,
          bgcolor: "#283593",
          color: "#fff",
          direction: "rtl",
        }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "right",
                  textDecoration: element.isComplet ? "line-through" : "none",
                }}>
                {element.title}{" "}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {element.detail}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center">
              <IconButton
                className="iconButon"
                onClick={(e) => {
                  handercheckClick(element.id);
                }}>
                <CheckOutlinedIcon
                  sx={{
                    color: "#8bc34a",
                    bgcolor: element.isComplet ? "green" : "#fff",
                    border: "solid #8bc34a 3px ",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  showModeldelet(element);
                }}>
                <DeleteOutlineOutlinedIcon
                  className="iconButon"
                  sx={{
                    color: "#b23c17",
                    bgcolor: "#fff",
                    border: "solid red 3px ",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleClickOpenmodel(element);
                }}
                className="iconButon">
                <ModeEditOutlineOutlinedIcon
                  sx={{
                    color: "blue",
                    bgcolor: "#fff",
                    border: "solid blue 3px ",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

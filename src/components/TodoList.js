import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import Todo from "./Todo";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState, useReducer, useContext } from "react";
import TodosReducer from "../Reducer/TodosReducer.js";
import { todolistContext } from "../Reducer/todosContext";
import { TostContext } from "./SimpleSnackbarContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TodoList() {
  // const [todosl, despatch] = useReducer(TodosReducer, []);
  const { todosl, despatch } = useContext(todolistContext);

  const { showSnackbar } = useContext(TostContext);
  const [value, setvalue] = useState("");
  const [openmodel, setOpenmodel] = React.useState(false);
  const [elementUpdate, setelementUpdate] = React.useState({});
  const handleClosemodel = () => {
    setOpenmodel(false);
  };
  function handleClickOpenmodel(todo) {
    setelementUpdate(todo);

    setOpenmodel(true);
  }
  function handelupdate() {
    despatch({
      type: "update",
      pyload: elementUpdate,
    });
    handleClosemodel();
    showSnackbar("تم التغيير بنجاح");
  }
  useEffect(() => {
    despatch({ type: "get" });
  }, []);
  function handleAddTodo() {
    despatch({ type: "add", pyload: { title: value, detail: value } });
    showSnackbar("تمت الاضافة بنجاح");
  }

  const [alignment, setAlignment] = React.useState("all");
  const [elementState, setElementstate] = React.useState(null);
  function handleChange(e) {
    setAlignment(e.target.value);
  }
  const completed = useMemo(() => {
    return todosl.filter((t) => {
      return t.isComplet;
    });
  }, [todosl]);
  const notCompleted = useMemo(() => {
    return todosl.filter((t) => {
      return !t.isComplet;
    });
  }, [todosl]);
  let todosRender = todosl;
  if (alignment === "copmleted") {
    todosRender = completed;
  } else if (alignment === "not-completed") {
    todosRender = notCompleted;
  } else {
    todosRender = todosl;
  }

  function handeldeleted() {
    despatch({ type: "dellet", pyload: { element: elementState } });
    setOpen(false);
    showSnackbar("تم الحذف بنجاح");
  }

  const [open, setOpen] = React.useState(false);
  function closeDialog() {
    setOpen(false);
  }

  function showModeldelet(toid) {
    setElementstate(toid);
    setOpen(true);
  }
  const todos = todosRender.map((t) => {
    return (
      <Todo
        key={t.id}
        element={t}
        showModeldelet={showModeldelet}
        handleClickOpenmodel={handleClickOpenmodel}
      />
    );
  });
  return (
    <React.Fragment>
      <Dialog
        sx={{ direction: "rtl" }}
        open={openmodel}
        onClose={handleClosemodel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"هل انت متأكد ف"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            value={elementUpdate.title}
            autoFocus
            required
            margin="dense"
            id="title"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setelementUpdate({ ...elementUpdate, title: e.target.value });
            }}
          />
          <TextField
            value={elementUpdate.detail}
            autoFocus
            required
            margin="dense"
            id="name"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setelementUpdate({ ...elementUpdate, detail: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosemodel}>الغاء</Button>
          <Button
            onClick={(e) => {
              handelupdate();
            }}
            autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        sx={{ direction: "rtl" }}
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من الحذف"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            حذاري البيانات التي يتم حذفها لا ترد
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>الغاء</Button>
          <Button
            onClick={(e) => {
              handeldeleted();
            }}
            autoFocus>
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card sx={{ maxHeight: "80vh", overflow: "scroll" }}>
          <CardContent>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              sx={{ direction: "ltr" }}
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform">
              <ToggleButton value="copmleted"> منجز</ToggleButton>
              <ToggleButton value="not-completed">غير منجز </ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {todos}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container spacing={2} style={{ alignItems: "center" }}>
              <Grid xs={8}>
                <TextField
                  id="outlined-basic"
                  value={value}
                  label="Outlined"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onChange={(e) => {
                    setvalue(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <Button
                  disabled={value == 0}
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%", height: "100%" }}
                  onClick={(e) => {
                    handleAddTodo();
                    setvalue("");
                  }}>
                  اضافة مهمة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

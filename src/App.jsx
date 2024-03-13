import { Provider } from "react-redux";

/* UI libaries */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";

/* routes */
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import Favourites from "./routes/Favourites";
import Home from "./routes/Home";
import Root from "./routes/Root";
import store from "./store/store";
import Register from "./routes/Register";
import Login from "./routes/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e1ceff",
    },
    secondary: {
      main: "#284b63",
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "countries",
          element: <ProtectedRoute component={<Countries />} />,
        },
        {
          path: "countries/:single",
          element: <ProtectedRoute component={<CountriesSingle />} />,
        },
        {
          path: "favourites",
          element: <ProtectedRoute component={<Favourites />} />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;

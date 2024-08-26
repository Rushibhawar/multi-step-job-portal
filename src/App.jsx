import "@/App.css";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "@/store/setup/configureStore";
import { ButtonLoading } from "@/components/ui/button-loading";
import Routers from "./routers";
import { Toaster } from "./components/ui/common/toast/toaster/toaster";

const store = configureStore();
const persistor = persistStore(store);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={<ButtonLoading />} persistor={persistor}>
          <Toaster richColors/>
          <Routers />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { CurrentPlayerProvider } from "@/components/CurrentPlayerProvider";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import { StDbConnProvider } from "@/components/StDbConnProvider";
import { RoomLayout, RoomsLayout } from "@/pages";
import App from "@/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <DarkModeProvider>
            <StDbConnProvider>
              <CurrentPlayerProvider>
                <App />
              </CurrentPlayerProvider>
            </StDbConnProvider>
          </DarkModeProvider>
        }
      >
        <Route index element={<RoomsLayout />} />

        <Route path="*" element={<RoomLayout />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

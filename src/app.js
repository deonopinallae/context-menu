import "./styles.css";
import { MainPage } from "./components/main-page";
import { ContextMenu } from "./components/menu";
import { GameCrossModule } from "./modules/game.module";

new MainPage('Игры', 'Выберите игру из контекстного меню');
const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new GameCrossModule());
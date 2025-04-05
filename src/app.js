import "./styles.css";
import { ContextMenu } from "../compo";
import { BackgroundModule } from "./modules/background.module";
import { GameCrossModule } from "./modules/game.module";


const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new BackgroundModule());
contextMenu.add(new GameCrossModule());
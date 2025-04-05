import "./styles.css";
import { ContextMenu } from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { GameCrossModule } from "./modules/game.module";
import { Advices } from "./modules/advices.module";


const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new BackgroundModule());
contextMenu.add(new GameCrossModule());
contextMenu.add(new Advices());
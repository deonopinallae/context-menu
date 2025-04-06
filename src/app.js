import "./styles.css";
import { ContextMenu } from "./menu";
import { GameCrossModule } from "./modules/game.module";
import { ClicksModule } from "./modules/clicks.module";
import { Words } from "./modules/words.module";

const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new GameCrossModule());
contextMenu.add(new ClicksModule());
contextMenu.add(new Words());

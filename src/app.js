import "./styles.css";
import { ContextMenu } from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { Words } from "./modules/words.module";

const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new BackgroundModule());
contextMenu.add(new Words());

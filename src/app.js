import "./styles.css";
import { ContextMenu } from "./menu";
import { BackgroundModule } from "./modules/background.module";
import { TimerModule } from "./modules/timer.module";

const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new BackgroundModule());
contextMenu.add(new TimerModule());


import "./styles.css";
import { MainPage } from "./components/main-page";
import { ContextMenu } from "./components/menu";
import { GameCrossModule } from "./modules/game.module";
import { ClicksModule } from "./modules/clicks.module";
import { Words } from "./modules/words.module";
import { Advices } from "./modules/advices.module";
import { TimerModule } from "./modules/timer.module";


new MainPage('Игры', 'Выберите игру из контекстного меню');
const contextMenu = new ContextMenu("#menu");

// Добавляем модули
contextMenu.add(new GameCrossModule());
contextMenu.add(new Words());
contextMenu.add(new Advices());
contextMenu.add(new ClicksModule());
contextMenu.add(new TimerModule());


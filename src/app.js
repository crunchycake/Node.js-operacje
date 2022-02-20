import { NewsServer } from "./js/news-server.js";
const server = new NewsServer(process.env.PORT || 3000);
server.run();
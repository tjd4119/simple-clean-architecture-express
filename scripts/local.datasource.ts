import {createDataSource} from "../src/infrastructure/database/postgres";
import dotenvFlow from "dotenv-flow";
dotenvFlow.config();
const datasource = createDataSource(process.env.PG_DB_PASSWORD || 'password');

export default datasource;

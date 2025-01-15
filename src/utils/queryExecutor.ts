import sql from 'mssql';
import { getFromSecretsManager } from './secretsManager';
import { readFileSync } from 'fs';

const coreInvoiceDBSecret = 'DataGenerator__ConnectionStrings__DataGeneratorDatabase';

/**
 * Executes a SQL query from a .sql file after applying a modification function.
 * @param {string} sqlFilePath The path of the .sql file containing the SQL query.
 * @param {(query: string) => string} [modifyFunction] A function to modify the SQL query.
 * @returns {Promise<any>} A promise that resolves with the result of the query.
 */
export async function executeQueryFromFile(
  sqlFilePath: string,
  modifyFunction?: (query: string) => string,
): Promise<any> {
  try {
    const connectionString = await getFromSecretsManager(coreInvoiceDBSecret);

    if (!connectionString) {
      throw new Error('The connection string was not obtained from Secrets Manager.');
    }

    const sqlConnector = await sql.connect(connectionString);

    let query = readFileSync(sqlFilePath, 'utf8');

    // Apply modification function if provided
    if (modifyFunction) {
      query = modifyFunction(query);
    }

    const result = await sqlConnector.query(query);
    sqlConnector.close();

    return result.recordset;
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

/**
 *
 *
 * @export
 * @param {string} query Query to be changed
 * @param {Array<RegExp>} placeToChange Places in query to be changed
 * @param {Array<string>} valueToApply Values to be inserted in the query
 * @return {*}  {string} Return the modified query
 */
export function modifyStringInQuery(query: string, placeToChange: Array<RegExp>, valueToApply: Array<string>): string {
  let modifiedQuery: string = query;
  for (let i = 0; i < placeToChange.length; i++) {
    modifiedQuery = modifiedQuery.replace(placeToChange[i], valueToApply[i]);
  }
  return modifiedQuery;
}
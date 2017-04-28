import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVars } from '../global-vars';
import { RFMFilter } from '../platform/checkbox-filter/rfm-filter.class';



@Injectable()
export class QueryService {

  private OPTIONS: RequestOptions;
  private ACCESS_TOKEN: String;
  private BEARER_HEADERS: Headers;

  private cubeName = GlobalVars.ELASTICUBE_NAME;
  private riskyTableName = GlobalVars.RISKY_TABLE_NAME;

  constructor(private http: Http) {
    this.ACCESS_TOKEN = localStorage.getItem('sisenseToken');
    this.BEARER_HEADERS = new Headers({
        'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    });
    this.OPTIONS = new RequestOptions({headers: this.BEARER_HEADERS});
  }


  buildSQLQuery(RFMFilters: RFMFilter[], selectedColumns: String[] = ['*'], avgSalesVal = 0, onlyRisky = true ): String  {

    let whereClauseInitiated: Boolean = false;

    let sqlQueryString = `SELECT ${selectedColumns.toString()} FROM ${this.riskyTableName}`;

    RFMFilters.forEach( elem => {
      if (elem.enabled === true) {
        sqlQueryString = `${sqlQueryString} ${whereClauseInitiated ? 'AND ' : 'WHERE '}`;
        sqlQueryString = `${sqlQueryString} ${elem.tableColumnName} in (${elem.selectedValues.toString()})`;

        whereClauseInitiated = true;
      }
    });
    if (onlyRisky) {
      sqlQueryString = `${sqlQueryString} ${whereClauseInitiated ? 'AND ' : 'WHERE '} RiskyFlag in (1)`;
      whereClauseInitiated = true;
    }
    sqlQueryString = `${sqlQueryString} ${whereClauseInitiated ? 'AND ' : 'WHERE '} Avg_Sales > ${avgSalesVal}`;
    console.log(sqlQueryString);
    return sqlQueryString;
  }

  build

  buildEncodedUrl(query) {
    let url = `${GlobalVars.QUERY_API_URL}/${GlobalVars.ELASTICUBE_NAME}`;
    let encodedQuery: String = encodeURIComponent(query);

    let uri = `${url}/sql?query=${encodedQuery}`;
    console.log(uri);
    return uri;
  }

  getResults(RFMFilters: RFMFilter[], selectedColumns: String[] = ['*'], avgSales: number) {
    console.log("(in query.service / getResults) ", avgSales);

    let queryString = this.buildSQLQuery(RFMFilters, selectedColumns, avgSales);
    let encodedQueryString = this.buildEncodedUrl(queryString);

    return this.http.get(encodedQueryString, this.OPTIONS);
  }

}

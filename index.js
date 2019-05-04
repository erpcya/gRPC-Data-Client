/*************************************************************************************
 * Product: ADempiere gRPC Dictionary Client                       		               *
 * Copyright (C) 2012-2018 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Yamel Senih ysenih@erpya.com				  		                         *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                     *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.            *
 ************************************************************************************/
class Data {

  /**
   * Constructor, No authentication required
   * @param {string} host
   * @param {string} sessionUuid
   * @param {string} language Languaje i18n
   */
  constructor(host, sessionUuid, language = 'en_US') {
    this.sessionUuid = sessionUuid;
    this.host = host;
    this.language = language;
  }

  /**
   * Get or request a Object data from tableName and uuid
   * @param {string} tableName Indicate table in db
   * @param {string} uuid Universally Unique IDentifier
   * @return {Object} Object with records.
   */
  requestObject(tableName, uuid) {
    return this.getService().requestObject(this.getRequest(tableName, uuid));
  }

  /**
  * Request Object from Criteria
  */
  requestObjectFromCriteria(criteria) {
    return this.getService().requestObject(this.getRequestFromCriteria(criteria));
  }

  /**
  * Request Object List from Criteria
  */
  requestObjectListFromCriteria(criteria) {
    return this.getService().requestObjectList(this.getRequestFromCriteria(criteria));
  }

  /**
  * Request Process
  */
  requestProcess(processRequest) {
    return this.getService().requestProcess(processRequest);
  }

  /**
   * Load gRPC Connection
   * @return {Object} requestService Return request for get data
   */
  getService() {
    const grpc_promise = require('grpc-promise');
    const {DataServicePromiseClient} = require('./src/grpc/proto/data_grpc_web_pb.js');
    var requestService = new DataServicePromiseClient(this.host);
    grpc_promise.promisifyAll(requestService);
    //  Return request for get data
    return requestService;
  }

  /**
   * Get Client Request
   * @return {Object} Return request for get data
   */
  getRequest(tableName, uuid) {
    const {Criteria, ClientRequest, ValueObjectRequest} = require('./src/grpc/proto/data_pb.js');
    let clientRequest = new ClientRequest();
    clientRequest.setSessionuuid(this.sessionUuid);
    clientRequest.setLanguage(this.language);
    let request = new ValueObjectRequest();
    request.setUuid(uuid);
    request.setClientrequest(clientRequest);
    request.setCriteria(this.getCriteria(tableName));
    //  return
    return request;
  }

  /**
   * Get Client Request
   * @param {string} criteria
   * @return {Object} Return request for get data
   */
  getRequestFromCriteria(criteria) {
    const { ClientRequest, ValueObjectRequest } = require('./src/grpc/proto/data_pb.js');
    let clientRequest = new ClientRequest();
    clientRequest.setSessionuuid(this.sessionUuid);
    clientRequest.setLanguage(this.language);
    let request = new ValueObjectRequest();
    request.setClientrequest(clientRequest);
    request.setCriteria(criteria);
    //  return
    return request;
  }

  // Get Process request from
  getProcessRequest() {
    const { ProcessRequest } = require('./src/grpc/proto/data_pb.js');
    let clientRequest = new ClientRequest();
    clientRequest.setSessionuuid(this.sessionUuid);
    clientRequest.setLanguage(this.language);
    let request = new ProcessRequest();
    request.setClientrequest(clientRequest);
    //  return
    return request;
  }

  /**
   * Get Criteria from Table Name
   * @return {String} criteria
   */
  getCriteria(tableName) {
    const {Criteria} = require('./src/grpc/proto/data_pb.js');
    let criteria = new Criteria();
    criteria.setTablename(tableName);
    //  Return criteria
    return criteria;
  }

}
module.exports = Data;

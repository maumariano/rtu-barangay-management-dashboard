import { AxiosService } from "lib/services";
import { httpErrorHandler } from "lib/handlers";
// import AxiosService from "./api/brgy-cert-api.service"
import { redirectWithDelay } from "lib/helpers";

import Swal from "sweetalert2";

export default class BrgyCertificatesService {
  constructor() {
    this.axiosService = new AxiosService();
    this.apiEndpoint = "/brgy-cert";
  }

  async getAll(query) {
    try {
      let response = await this.axiosService
        .axiosInstance()
        .get(this.apiEndpoint + `/show`);

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }
}

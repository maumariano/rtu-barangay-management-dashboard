import { AxiosService } from "lib/services";
import { httpErrorHandler } from "lib/handlers";
import { redirectWithDelay } from "lib/helpers";

import Swal from "sweetalert2";

export default class ResidentComplaintsService {
  constructor() {
    this.axiosService = new AxiosService();
    this.apiEndpoint = "/complaint-records";
  }

  async getAll(query) {
    try {
      let response = await this.axiosService
        .axiosInstance()
        .get(this.apiEndpoint + `?q=${query}`);

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async createComplaint(payload) {
    try {
      let response = await this.axiosService
        .axiosInstance("file-payload")
        .post(this.apiEndpoint, payload);

      Swal.fire({
        icon: "success",
        title: "Recorded",
        text: "Resident complaint data successfully added to database",
        confirmButtonText: "Okay",
      });
      redirectWithDelay(2, "/resident-complaints");

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }
}

import { AxiosService } from "lib/services";
import { httpErrorHandler } from "lib/handlers";
import { redirectWithDelay } from "lib/helpers";

import Swal from "sweetalert2";

export default class ResidentRecordsService {
  constructor() {
    this.axiosService = new AxiosService();
    this.apiEndpoint = "/resident-records";
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

  async registerResident(payload) {
    try {
      payload.region = "NCR";
      payload.city = "Makati City";
      payload.barangay = "Pitogo";

      let response = await this.axiosService
        .axiosInstance()
        .post(this.apiEndpoint, payload);

      Swal.fire({
        icon: "success",
        title: "Registered",
        text: "Resident record data successfully added to database",
        confirmButtonText: "Okay",
      });

      redirectWithDelay(2, "/resident-records");

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async getResidentRecordById(residentRecordId) {
    try {
      let response = await this.axiosService
        .axiosInstance()
        .get(this.apiEndpoint + `/${residentRecordId}`);

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async updateResidentRecordById(residentRecordId, payload) {
    try {
      let response = await this.axiosService
        .axiosInstance()
        .patch(this.apiEndpoint + `/${residentRecordId}`, payload);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Resident record data successfully updated from database",
        confirmButtonText: "Okay",
      });

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }

  async deleteResidentRecordById(redidentRecordId) {
    try {
      let response = await this.axiosService
        .axiosInstance()
        .delete(this.apiEndpoint + `/${redidentRecordId}`, null, null);

      Swal.fire({
        icon: "warning",
        title: "Deleted",
        text: "Resident record data successfully deleted from database",
        confirmButtonText: "Okay",
      });

      redirectWithDelay(2, "/resident-records");

      return response;
    } catch (err) {
      httpErrorHandler(err);
    }
  }
}

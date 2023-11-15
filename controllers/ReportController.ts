import { IResponse } from "@ts/interface/global";
import reportService from "@services/index";

export default class ReportController {
  async getAllReports(): Promise<IResponse> {
    try {
      const reports = await reportService.reportService().getAllReports();

      if (!reports) {
        return {
          status: 404,
          response: { message: "Reports not found" }
        }
      }

      return {
        status: 200,
        response: reports
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to fetch all reports ${error.message}` }
      }
    }
  }

  async create(body: object): Promise<IResponse> {
    try {
      await reportService.reportService().create(body);

      return {
        status: 201,
        response: { message: "Report was successfully created" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to create report ${error.message}` }
      }
    }
  }

  async deleteReport(id: string): Promise<IResponse> {
    try {
      const report = await reportService.reportService().getReport(id);

      if (!report) {
        return {
          status: 404,
          response: { message: "Report not found" }
        }
      }

      await reportService.reportService().deleteReport(report);

      return {
        status: 200,
        response: { message: "Report was deleted successfully" }
      }
    } catch (error) {
      return {
        status: 500,
        response: { message: `Failed to delete report ${error.message}` }
      }
    }
  }
}

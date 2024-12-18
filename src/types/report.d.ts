export type ResponseReports = {
    code: number;
    message: string;
    data: IReports;
}
export type IReports = IReport[];
export type IReport = {
    _id: string;
    type: number;
    contentVN: string;
    contentEN: string;
} 
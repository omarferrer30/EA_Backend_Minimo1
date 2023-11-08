import mongoose, { Schema, ObjectId, Document } from 'mongoose';
import {mongoosePagination, Pagination} from 'mongoose-paginate-ts';
import User from './User';

export interface IReport {
    issuer: ObjectId;
    description: string;
    criticity: number;

}

export interface IReportModel extends IReport, Document {}


const ReportSchema = new mongoose.Schema({
    issuer: { type: mongoose.Schema.Types.ObjectId, ref: User },
    description: { type: String, required: true },
    criticity: {type: Number}
  },
    {
        versionKey: false
    }
);
ReportSchema.plugin(mongoosePagination);
export default mongoose.model<IReportModel, Pagination<IReportModel>>('Report', ReportSchema);
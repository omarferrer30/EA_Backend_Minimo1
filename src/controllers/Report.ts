import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import {mongoosePagination, PaginationOptions } from 'mongoose-paginate-ts';
import User from '../models/User';
import Report from '../models/Report';


const createReport = async (req: Request, res: Response, next: NextFunction) => {
    const { issuer, description, criticity } = req.body;

    try {
        // Check if the user exist in the database by name
        const userExists = await User.findOne({ username:issuer });
    
        if (!userExists) {
          return res.status(404).json({ message: 'User not found in the database', 
          userExists,
        });
        }
        
    const report = new Report({
        _id: new mongoose.Types.ObjectId(),
        issuer: userExists._id,
        description,
        criticity
    });

    const savedReport = await report.save();
    return res.status(201).json(savedReport);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readReport = (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;

    return Report.findById(reportId)
        .then((report) => (report ? res.status(200).json(report) : res.status(404).json({ message: 'Report no encontrado' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1; 
    const options: PaginationOptions = {
        page,
        limit: 3
    };
    return Report.paginate(options)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json({ error }));
};

const updateReport = (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;

    return Report.findById(reportId)
        .then((report) => {
            if (report) {
                report.set(req.body);

                return report
                    .save()
                    .then((updatedReport) => res.status(200).json(updatedReport))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Report no encontrado' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteReport = (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId;

    return Report.findByIdAndDelete(reportId)
        .then((report) => (report ? res.status(204).json({ message: 'Report eliminado' }) : res.status(404).json({ message: 'Report no encontrado' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createReport, readReport, readAll, updateReport, deleteReport };
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { HttpStatusCode } from '../types/httpTypes';
import { FatalError } from '../../domain/errors/FatalError';
import { CreateSalesInquiryUseCase } from '../../domain/usecases/support/CreateSalesInquiryUseCase';
import { plainToInstance } from 'class-transformer';
import { SalesInquiryDTO } from '../dto/SalesInquiryDTO';
import { InvalidFieldInBodyError } from '../../domain/errors/InvalidFieldInBodyError';

export const createSalesInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      organizationName,
      contactName,
      contactEmail,
      contactPhonenumber,
      data,
    } = req.body;

    const useCase = Container.get(CreateSalesInquiryUseCase);
    const salesInquiry = await useCase.execute(
      organizationName,
      contactName,
      contactEmail,
      contactPhonenumber,
      data
    );
    const salesInquiryDTO = plainToInstance(SalesInquiryDTO, salesInquiry);
    res.status(HttpStatusCode.SuccessCreated).json(salesInquiryDTO);
  } catch (e) {
    if (e instanceof InvalidFieldInBodyError) {
      return next(e);
    }
    return next(new FatalError(e));
  }
};

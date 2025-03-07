import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { HttpStatusCode } from '../types/httpTypes';
import { FatalError } from '../../domain/errors/FatalError';
import { CreateSalesInquiryUseCase } from '../../domain/usecases/support/CreateSalesInquiryUseCase';
import { plainToInstance } from 'class-transformer';
import { CreateSalesInquiryRequestDTO } from '../dto/CreateSalesInquiryRequestDTO';
import { CreateSalesInquiryResponseDTO } from '../dto/CreateSalesInquiryResponseDTO';
import { InvalidFieldsInBodyError } from '../errors/InvalidFieldsInBodyError';
import { MissingFieldsInBodyError } from '../errors/MissingFieldsInBodyError';
import { ZodError } from 'zod';
import {
  SalesInquirySchema,
  SalesInquiryRequest,
} from '../validators/SalesInquiryValidator';
import { parseZodError } from '../../utils/zodErrorParser';

export const createSalesInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const validatedData = SalesInquirySchema.parse(
      req.body
    );
    const requestDTO = plainToInstance(
      CreateSalesInquiryRequestDTO,
      validatedData
    );

    const useCase = Container.get(CreateSalesInquiryUseCase);
    const salesInquiry = await useCase.execute(requestDTO);

    const salesInquiryDTO = plainToInstance(
      CreateSalesInquiryResponseDTO,
      salesInquiry
    );
    res.status(HttpStatusCode.SuccessCreated).json(salesInquiryDTO);
  } catch (e) {
    if (e instanceof ZodError) {
      const { missingFields, invalidFields, details } = parseZodError(e);
      if (missingFields.length > 0) {
        return next(new MissingFieldsInBodyError(missingFields));
      } else {
        return next(new InvalidFieldsInBodyError(invalidFields, details));
      }
    }
    return next(new FatalError(e));
  }
};

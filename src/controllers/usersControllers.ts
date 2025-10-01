import { Request, Response } from 'express';
import * as myController from '../services/usersServices';

export const create = async (req: Request, res: Response) => {
  const data = await myController.create(req.body);
  res.status(201).json(data);
};

export const getAll = async (req: Request, res: Response) => {
  const data = await myController.getAll();
  res.json(data);
};

export const getById = async (req: Request, res: Response) => {
  const data = await myController.getById(parseInt(req.params.id));
  res.json(data);
};

export const update = async (req: Request, res: Response) => {
  const data = await myController.update(parseInt(req.params.id), req.body);
  res.json(data);
};

export const erase = async (req: Request, res: Response) => {
  await myController.erase(parseInt(req.params.id));
  res.status(204).send();
};

export const getPagesAll = async (req: Request, res: Response) => {
  const page = Number(req.params.page) || 1;
  const pageSize = Number(req.params.pagesize) || 20;
  const orderByColumn = req.params.orderByColumn || "name";
  const orderDirection = req.params.orderDirection === "asc" || req.params.orderDirection === "desc"
    ? req.params.orderDirection : "asc";

  const data = await myController.getPagesAll(
    page,
    pageSize,
    orderByColumn,
    orderDirection
  );
  res.json(data);
};

export const activateAccount = async (req: Request, res: Response) => {
  const data = await myController.activateAccount(parseInt(req.params.id), req.body);
  res.json(data);
};

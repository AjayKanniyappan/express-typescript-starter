import { filter } from 'compression';
import type { Request, Response } from 'express';

/**
 * Filter Function for the compression middleware
 * @param req HTTPs Request
 * @param res HTTPs Response
 * @returns Returns false if request header contains x-no-compression
 */
function compressFilter(req: Request, res: Response): boolean {
  if (req.headers['x-no-compression']) {
    return false;
  }

  return filter(req, res);
}

export default compressFilter;

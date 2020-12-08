import { NextApiResponse, NextApiRequest } from 'next';
import connect from '../../utils/db';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  name: string;
  email: string;
}

const badRequest = (
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>,
  error = 'invalid request'
) => {
  res.status(400).json({ error });
  return;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType>
): Promise<void> => {
  //https://nextjs.org/docs/api-routes/introduction
  if (req.method !== 'POST') return badRequest(res);
  else {
    const { name, email } = req.body;
    if (!name || !email) return badRequest(res, 'Invalid parameters');
    const { db } = await connect();
    const dbResponse = await db.collection('users').insertOne({
      name,
      email,
    });
    const response = dbResponse.ops[0];
    res.status(200).json(response);
  }
};

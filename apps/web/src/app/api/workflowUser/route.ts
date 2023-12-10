import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';

interface IWorkflow {
    _id: ObjectId
    shortId: string
    name: string
    flowData: string
    deployed: boolean
    updatedDate: Date
    createdDate: Date
}


interface IWorkflowResponse extends IWorkflow {
    execution: IExecution
    executionCount: number
}


let db: Db;

async function connectToDatabase() {
  if (!db) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  return db;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDatabase();

    const userId = req.query.userId as string; // Assuming you're passing userId as a query parameter

    const workflows: IWorkflowResponse[] = await db.collection('workflow')
      .aggregate([
        {
          $match: {
            userId: userId // Filter workflows by userId
          }
        },
        {
          $lookup: {
            from: 'execution',
            localField: 'shortId',
            foreignField: 'workflowShortId',
            as: 'execution'
          }
        },
        {
          $addFields: {
            executionCount: {
              $size: '$execution'
            }
          }
        }
      ]).toArray();

    res.status(200).json(workflows);
  } catch (error) {
    console.error('Failed to fetch workflows:', error);
    res.status(500).json({ error: 'Failed to fetch workflows' });
  }
}

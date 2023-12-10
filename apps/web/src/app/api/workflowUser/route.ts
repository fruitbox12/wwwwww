import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from './libs/database'; // Import the connectMongoDB function

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectMongoDB(); // Connect to MongoDB using Mongoose

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

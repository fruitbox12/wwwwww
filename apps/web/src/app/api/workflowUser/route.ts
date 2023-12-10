import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from 'libs/database'; // Import the connectMongoDB function
import Workflow, { IWorkflowDocument } from 'models/workflow'; // Import the Workflow model
import { ObjectId } from 'mongodb'

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


export interface IExecution {
    _id: ObjectId
    shortId: string
    workflowShortId: string
    executionData: string
    state: ExecutionState
    createdDate: Date
    stoppedDate?: Date
}

interface IWorkflowResponse extends IWorkflowDocument {
    execution: IExecution[];
    executionCount: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IWorkflowResponse[] | { error: string }>) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectMongoDB(); // Connect to MongoDB using Mongoose

        const userId = req.query.userId as string; // Assuming you're passing userId as a query parameter

        const workflows: IWorkflowResponse[] = await Workflow.aggregate([
            {
                $match: {
                    userId: userId // Filter workflows by userId
                }
            },
            {
                $lookup: {
                    from: 'executions',
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
        ]).exec();

        res.status(200).json(workflows);
    } catch (error) {
        console.error('Failed to fetch workflows:', error);
        res.status(500).json({ error: 'Failed to fetch workflows' });
    }
}


import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from 'libs/database';
import Workflow from 'models/workflow';

export default async function handler(req: NextRequest) {
    await connectMongoDB();

    switch (req.method) {
        case 'GET':
            return handleGet(req);
        case 'POST':
            return handlePost(req);
        default:
            return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
}

async function handleGet(req: NextRequest) {
    const { shortId } = req.query;

    if (shortId) {
        // GET a specific workflow by shortId
        return getSpecificWorkflow(shortId);
    } else {
        // GET all workflows
        return getAllWorkflows();
    }
}

async function getAllWorkflows() {
    const workflows = await Workflow
        .aggregate([
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
        ])
        .toArray();

    return NextResponse.json(workflows);
}

async function getSpecificWorkflow(shortId) {
    const workflows = await Workflow
        .aggregate([
            {
                $match: {
                    shortId
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
        ])
        .toArray();

    if (workflows.length) {
        return NextResponse.json(workflows[0]);
    } else {
        return NextResponse.json({ message: `Workflow ${shortId} not found` }, { status: 404 });
    }
}

async function handlePost(req: NextRequest) {
    try {
        const { userId, ...body } = await req.json();

        const newWorkflow = new Workflow();
        Object.assign(newWorkflow, body, { userId });

        const savedWorkflow = await Workflow.create(newWorkflow);
        await Workflow.save(savedWorkflow);

        return NextResponse.json({ message: 'Workflow created', data: savedWorkflow }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error creating workflow.' }, { status: 500 });
    }
}

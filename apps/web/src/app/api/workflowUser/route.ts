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
    const { shortId, userId } = req.query; // Extract userId from query parameters

    if (shortId) {
        // GET a specific workflow by shortId
        return getSpecificWorkflow(shortId, userId);
    } else {
        // GET all workflows for a specific user
        return getAllWorkflows(userId);
    }
}

async function getAllWorkflows(userId) {
    const query = userId ? { userId } : {}; // Filter by userId if provided
    const workflows = await Workflow
        .find(query) // Adjusted to use find with potential userId filter
        .exec();

    return NextResponse.json(workflows);
}

async function getSpecificWorkflow(shortId, userId) {
    const query = { shortId };
    if (userId) {
        query.userId = userId; // Add userId to query if provided
    }

    const workflow = await Workflow
        .findOne(query) // Adjusted to findOne with potential userId filter
        .exec();

    if (workflow) {
        return NextResponse.json(workflow);
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

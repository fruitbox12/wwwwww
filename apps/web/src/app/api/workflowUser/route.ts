// route.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const API_KEY = '6uEU4gDFxatldVT39NxpbqRxk7eNGUo2z5R18xhBju2iSEzNl6FxPN1TAwHq86N5'; // Replace with your API key
    const API_URL = 'https://us-west-2.aws.data.mongodb-api.com/app/data-iwkwk/endpoint/data/v1/action/aggregate';

    const userId = req.query.userId as string; // Get userId from query parameter

    const payload = {
      dataSource: 'Cluster0',
      database: 'test',
      collection: 'workflow',
      pipeline: [
        {
          $match: {
            userId: userId
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
      ]
    };

    const response = await axios.post(API_URL, payload, {
      headers: {
        'apiKey': API_KEY,
        'Content-Type': 'application/ejson',
        'Accept': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

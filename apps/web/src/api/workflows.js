import client from './client'
import axios from 'axios'
const getAllWorkflows = () => axios.get('https://gist.githubusercontent.com/fruitbox12/822bd6dcbe9096954a7c873e0895ffff/raw/0cf6ab810677f47fbc580acb0d1b44b6e2d94b1d/api.json')

const getSpecificWorkflow = (shortId) => client.get(`/workflows/${shortId}`)

const createNewWorkflow = (body) => client.post(`/workflows`, body) //body: IWorkflow

const updateWorkflow = (shortId, body) => client.put(`/workflows/${shortId}`, body) //body: IWorkflow

const deployWorkflow = (shortId, body) => client.post(`/workflows/deploy/${shortId}`, body || {}) //body: { halt: boolean }

const testWorkflow = (startingNodeId, body) => client.post(`/workflows/test/${startingNodeId}`, body) //body: ITestWorkflowBody

const deleteWorkflow = (shortId) => client.delete(`/workflows/${shortId}`)

export default {
    getAllWorkflows,
    getSpecificWorkflow,
    createNewWorkflow,
    updateWorkflow,
    deployWorkflow,
    deleteWorkflow,
    testWorkflow
}

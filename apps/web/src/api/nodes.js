import client from './client'
import axios from 'axios'

const getAllNodes = () => axios.get('https://gist.githubusercontent.com/fruitbox12/28e956cf163c04d6323c84375438b478/raw/ac9dd1ad1b4f5eeb4b60e252c15b49c659ec7c66/nodes')

const getSpecificNode = (name) => client.get(`/nodes/${name}`)

const testNode = (name, body) => client.post(`/node-test/${name}`, body) //body: ITestNodeBody

const loadMethodNode = (name, nodeData) => client.post(`/node-load-method/${name}`, nodeData) //nodeData: INodeData

const removeTestTriggers = () => client.post(`/remove-test-triggers`)

export default {
    getAllNodes,
    getSpecificNode,
    testNode,
    loadMethodNode,
    removeTestTriggers
}

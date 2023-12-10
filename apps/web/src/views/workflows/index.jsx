'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
// material-ui
import { Grid, Box, Stack, Tooltip, Switch } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
// project imports
import MainCard from 'ui-component/cards/MainCard'
import ItemCard from 'ui-component/cards/ItemCard'
import { gridSpacing } from 'store/constant'
import WorkflowEmptySVG from 'assets/images/workflow_empty.svg'
import { SET_LAYOUT } from 'store/actions'
import { StyledButton } from 'ui-component/StyledButton'
import { useSession } from 'next-auth/react';
import axios from 'axios'; // Import Axios for API requests

// API
import workflowsApi from 'api/workflows'

// Hooks
import useApi from 'hooks/useApi'

// const
import { baseURL } from 'store/constant'
import Image from 'next/image'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-switch-vertical' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='%23fff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M3 8l4 -4l4 4'%3E%3C/path%3E%3Cpath d='M7 4l0 9'%3E%3C/path%3E%3Cpath d='M13 16l4 4l4 -4'%3E%3C/path%3E%3Cpath d='M17 10l0 10'%3E%3C/path%3E%3C/svg%3E")`
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
            }
        }
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-switch-horizontal' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='%23fff' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'%3E%3C/path%3E%3Cpath d='M16 3l4 4l-4 4'%3E%3C/path%3E%3Cpath d='M10 7l10 0'%3E%3C/path%3E%3Cpath d='M8 13l-4 4l4 4'%3E%3C/path%3E%3Cpath d='M4 17l9 0'%3E%3C/path%3E%3C/svg%3E")`
        }
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2
    }
}))

// ==============================|| WORKFLOWS ||============================== //

const Workflows = () => {
    const { data: session, status } = useSession();

    const router = useRouter()
    const theme = useTheme()
    const dispatch = useDispatch()
    const customization = useSelector((state) => state.customization)

    const [isLoading, setLoading] = useState(true)
    const [images, setImages] = useState({})

    const [isHorizontal, setIsHorizontal] = useState(customization.isHorizontal)
    const fetchWorkflows = async () => {
        try {
            const response = await axios.post('https://us-west-2.aws.data.mongodb-api.com/app/data-iwkwk/endpoint/data/v1/action/aggregate', {
                dataSource: "Cluster0",
                database: "test",
                collection: "workflow",
                pipeline: [
                    { "$match": { "userId": "dylanwong007@gmail.com" } },
                    { "$lookup": { "from": "executions", "localField": "shortId", "foreignField": "workflowShortId", "as": "execution" } },
                    { "$addFields": { "executionCount": { "$size": "$execution" } } }
                ]
            }, {
                headers: {
                    apiKey: '6uEU4gDFxatldVT39NxpbqRxk7eNGUo2z5R18xhBju2iSEzNl6FxPN1TAwHq86N5',
                    'Content-Type': 'application/ejson',
                    'Accept': 'application/json'
                }
            });

            setWorkflows(response.data); // Update your state with the response data
        } catch (error) {
            console.error('Error fetching workflows:', error);
            // Handle error appropriately
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const addNew = () => {
        router.push('/canvas')
    }

    const goToCanvas = (selectedWorkflow) => {
        router.push(`/canvas/${selectedWorkflow.shortId}`)
    }

    useEffect(() => {
        if (fetchWorkflows.data) {
            try {
                const workflows = fetchWorkflows.data
                const images = {}

                for (let i = 0; i < workflows.length; i += 1) {
                    const flowDataStr = workflows[i].flowData
                    const flowData = JSON.parse(flowDataStr)
                    const nodes = flowData.nodes || []
                    images[workflows[i].shortId] = []

                    for (let j = 0; j < nodes.length; j += 1) {
                        const imageSrc = `${baseURL}/api/v1/node-icon/${nodes[j].data.name}`
                        if (!images[workflows[i].shortId].includes(imageSrc)) {
                            images[workflows[i].shortId].push(imageSrc)
                        }
                    }
                }
                setImages(images)
            } catch (e) {
                console.error(e)
            }
        }
    }, [fetchWorkflows.data])

    const handleSwapLayout = () => {
        dispatch({ type: SET_LAYOUT, isHorizontal: !isHorizontal })
        setIsHorizontal((isHorizontal) => !isHorizontal)
        localStorage.setItem('isHorizontal', !isHorizontal)
    }

    return (
        <MainCard sx={{ background: customization.isDarkMode ? theme.palette.common.black : '' }}>
            <Stack flexDirection='row'>
                <h1>Workflows</h1>
                <Tooltip placement='right' sx={{ ml: 2, mt: 1.2 }} title='Change workflow flow top to bottom or left to right'>
                    <MaterialUISwitch checked={isHorizontal} onChange={handleSwapLayout} />
                </Tooltip>
                <Grid sx={{ mb: 1.25 }} container direction='row'>
                    <Box sx={{ flexGrow: 1 }} />
                    <Grid item>
                        <StyledButton variant='contained' sx={{ color: 'white ' }} className='z-10' onClick={addNew}>
                            Add New
                        </StyledButton>
                    </Grid>
                </Grid>
            </Stack>
            <Grid container spacing={gridSpacing}>
                {!isLoading &&
                    getAllWorkflowsApi.data &&
                    getAllWorkflowsApi.data.map((data, index) => (
                        <Grid key={index} item lg={4} md={6} sm={6} xs={12}>
                            <ItemCard onClick={() => goToCanvas(data)} data={data} images={images[data.shortId]} />
                        </Grid>
                    ))}
            </Grid>
            {!isLoading && (!getAllWorkflowsApi.data || getAllWorkflowsApi.data.length === 0) && (
                <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                    <Box sx={{ p: 2, height: 'auto' }}>
                        <Image
                            style={{ objectFit: 'cover', height: '30vh', width: 'auto' }}
                            src={WorkflowEmptySVG}
                            alt='WorkflowEmptySVG'
                        />
                    </Box>
                    <div>No Workflows Yet</div>
                </Stack>
            )}
        </MainCard>
    )
}

export default Workflows

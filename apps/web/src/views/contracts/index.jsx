'use client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// material-ui
import { Grid, Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import ItemCard from 'ui-component/cards/ItemCard'
import ContractDialog from './ContractDialog'
import ContractEmptySVG from 'assets/images/contract_empty.svg'
import { TooltipWithParser } from 'ui-component/TooltipWithParser'
import { StyledButton } from 'ui-component/StyledButton'

// const
import { gridSpacing } from 'store/constant'

// API
import contractsApi from 'api/contracts'

// Hooks
import useApi from 'hooks/useApi'
import Image from 'next/image'

// ==============================|| CONTRACTS ||============================== //

const Contracts = () => {
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)

    const [isLoading, setLoading] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogProps, setDialogProps] = useState({})

    const getAllContractsApi = useApi(contractsApi.getAllContracts)

    const addNew = () => {
        const dialogProp = {
            title: 'Add New Contract',
            type: 'ADD',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Add'
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const edit = (id) => {
        const dialogProp = {
            title: 'Edit Contract',
            type: 'EDIT',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Save',
            id
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const onConfirm = () => {
        setShowDialog(false)
        getAllContractsApi.request()
    }

    useEffect(() => {
        getAllContractsApi.request()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(getAllContractsApi.loading)
    }, [getAllContractsApi.loading])

    return (
        <>
            <MainCard sx={{ background: customization.isDarkMode ? theme.palette.common.black : '' }}>
                <Stack flexDirection='row'>
                    <h1 className='text'>Contracts&nbsp;</h1>
                    <TooltipWithParser title='Verified smart contracts can be imported. Events and functions of smart contracts can be monitored and executed. Read <a target="_blank" href=https://docs.outerbridge.io/how-to-use/contracts>more</a>' />
                    <Grid sx={{ mb: 1.25 }} container direction='row'>
                        <Box sx={{ flexGrow: 1 }} />
                        <Grid item>
                            <StyledButton variant='contained' onClick={addNew}>
                                Add New
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Stack>
                <Grid container spacing={gridSpacing}>
                    {!isLoading &&
                        getAllContractsApi.data &&
                        getAllContractsApi.data.map((data, index) => (
                            <Grid key={index} item lg={4} md={6} sm={6} xs={12}>
                                <ItemCard isLoading={isLoading} onClick={() => edit(data._id)} data={data} />
                            </Grid>
                        ))}
                </Grid>
                {!isLoading && (!getAllContractsApi.data || getAllContractsApi.data.length === 0) && (
                    <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                        <Box sx={{ p: 2, height: 'auto' }}>
                            <Image
                                style={{ objectFit: 'cover', height: '30vh', width: 'auto' }}
                                src={ContractEmptySVG}
                                alt='ContractEmptySVG'
                            />
                        </Box>
                        <div>No Contracts Yet</div>
                    </Stack>
                )}
            </MainCard>
            <ContractDialog
                show={showDialog}
                dialogProps={dialogProps}
                onCancel={() => setShowDialog(false)}
                onConfirm={onConfirm}
            ></ContractDialog>
        </>
    )
}

export default Contracts

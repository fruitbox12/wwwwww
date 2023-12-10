/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types'
import { Handle, Position } from 'reactflow'
import { useSelector } from 'react-redux'
// material-ui
import { styled, useTheme } from '@mui/material/styles'
import { Avatar, Box, Typography, Modal, TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import nodesApi from 'api/nodes'
import { useMediaQuery } from '@mui/material'

// project imports
import MainCard from 'ui-component/cards/MainCard'

// icons
import { IconCheck, IconExclamationMark } from '@tabler/icons'

// const
import { baseURL } from 'store/constant'
import AddNodes from './AddNodes'

const CardWrapper = styled(MainCard)(({ theme }) => ({
    background: theme.palette.card.main,
    color: theme.darkTextPrimary,
    border: 'solid 1px',
    width: '200px',
    height: 'auto',
    padding: '10px',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    '&:hover': {
        background: theme.palette.card.hover,
        borderColor: theme.palette.primary.main
    }
}))

const handlerPosition = [[['50%']], [['30%'], ['70%']]]

const AddNodesStyled = styled(AddNodes)(({ theme }) => ({
    position: 'relative',
    top: '0',
    right: '5px', // Changed from -20rem to 5px
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
    marginRight: '5px' // Optional, adds extra spacing if needed
}))

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CanvasNode = ({ data }) => {
    const theme = useTheme();
    const [modalOpen, setModalOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [iconUrl, setIconUrl] = useState(data.iconUrl || `${baseURL}/api/v1/node-icon/${data.name}`);
    const customization = useSelector((state) => state.customization);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleCardClick = () => {
        setClickCount(prevCount => prevCount + 1);
    };
    const handleIconChange = (newUrl) => {
        setIconUrl(newUrl); // Update the state with the new URL
        // Close the modal or other UI elements if necessary
        handleModalClose();

    };
    
    useEffect(() => {
        if (clickCount === 5) {
            setModalOpen(true);
            setClickCount(0);
        }
    }, [clickCount]);

    const handleModalClose = () => {
        setModalOpen(false);
    };

  
    return (
        <>
            <CardWrapper className="wrapper gradient" // Use TurboNode's class for styling
 onClick={handleCardClick}
                onMouseOver={() => setSelectedNode(data)}
                content={false}
                sx={{
                    borderColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary
                }}
                border={false}
            >              <div className="inner"> {/* TurboNode's inner class for styling */}

                {data && data.outputResponses && data.outputResponses.submit && (
                    <Avatar
                        variant='rounded'
                        sx={{
                            ...theme.typography.smallAvatar,
                            borderRadius: '50%',
                            background: theme.palette.success.dark,
                            color: 'white',
                            ml: 2,
                            position: 'absolute',
                            top: -10,
                            right: -10
                        }}
                    >
                        <IconCheck />
                    </Avatar>
                )}

                {data && data.outputResponses && data.outputResponses.needRetest && (
                    <Avatar
                        variant='rounded'
                        sx={{
                            ...theme.typography.smallAvatar,
                            borderRadius: '50%',
                            background: theme.palette.warning.dark,
                            color: 'white',
                            ml: 2,
                            position: 'absolute',
                            top: -10,
                            right: -10
                        }}
                    >
                        <IconExclamationMark />
                    </Avatar>
                )}

                <Box>
                    {data.inputAnchors.map((inputAnchor, index) => (
                        <Handle
                            type='target'
                            position={customization.isVertical ? Position.Top : Position.Left}
                            key={inputAnchor.id}
                            id={inputAnchor.id}
                            style={{
                                height: 15,
                                width: 15,
                                top: customization.isVertical ? -7.5 : null,
                                backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
                                left: customization.isVertical ? handlerPosition[data.inputAnchors.length - 1][index] : null,
                                bottom: !customization.isVertical ? handlerPosition[data.inputAnchors.length - 1][index] : null
                            }}
                        />
                    ))}
                    <div 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                paddingTop: '10px', // or use theme.spacing() if using Material-UI
                                paddingBottom: '10px' // or use theme.spacing() if using Material-UI
                            }}
                        >
                            {' '}
                            <div
                                style={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    borderRadius: '50%',
                                    cursor: 'grab'
                                }}
                            >
                                <img
        style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: customization.isDarkMode ? 'invert(1)' : 'invert(0)'
        }}
        src={iconUrl} // Use the iconUrl state
        alt='Node Icon'
    />
                            </div>
                            <Typography
                                sx={{
                                    fontSize: '.5rem',
                                    fontWeight: 400,
                                    justifyContent: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                {data.label}
                            </Typography>
                        </Box>
                    </div>
                    {data.outputAnchors.map((outputAnchor, index) => (
                        <Handle
                            type='source'
                            position={customization.isVertical ? Position.Bottom : Position.Right}
                            key={outputAnchor.id}
                            id={outputAnchor.id}
                            style={{
                                height: 15,
                                width: 15,
                                bottom: customization.isVertical ? -7.5 : null,
                                backgroundColor: data.selected ? theme.palette.primary.main : theme.palette.text.secondary,
                                left: customization.isVertical ? handlerPosition[data.outputAnchors.length - 1][index] : null,
                                top: !customization.isHorizontal ? handlerPosition[data.outputAnchors.length - 1][index] : null
                            }}
                        />
                    ))}
                </Box>                </div>

            </CardWrapper>    <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        Change Icon URL
                    </Typography>
                    <TextField
                        fullWidth
                        label="Icon URL"
                        value={iconUrl}
                        onChange={(e) => setIconUrl(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleIconChange}>
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

CanvasNode.propTypes = {
    data: PropTypes.object
}

export default CanvasNode

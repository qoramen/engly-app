import { useState } from "react";
import { Reading, Listening, Writing, TestTimer } from '../';
import {
    Box, Button, Typography, Paper, Dialog, DialogContent, DialogActions, useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const TestDetail = ({reading, listening, writing}) => {
    const [section, setSection] = useState(0)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [startConfirm, setStartConfirm] = useState(true)
    const [isTimeOver, setIsTimeOver] = useState(false)
    const [sectionKey, setSectionKey] = useState(0)
    const navigate = useNavigate()
    

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    const handleTimeEnd = () => {
        setIsTimeOver(true)
        if (section < 2) {
            goToNextSection()
        } else {
            setSection(3)
        }
    };

    const handleNext = () => setOpenConfirm(true)
    const goToNextSection = () => {
        setSection(section + 1)
        setSectionKey(prev => prev + 1)
        setIsTimeOver(false)
        setStartConfirm(true)
    };
    const confirmNext = () => {
        setOpenConfirm(false)
        goToNextSection()
    };
    const cancelNext = () => setOpenConfirm(false)

    const renderSection = () => {
        if (section === 0) return <Reading disabled={isTimeOver} reading={reading}/>
        if (section === 1) return <Listening disabled={isTimeOver} listening={listening}/>
        if (section === 2) return <Writing disabled={isTimeOver} writing={writing}/>
        
        return (
            <Paper sx={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 2
            }}>
                <Box>
                    <Typography variant={isSmall ? "h6" : "h4"} color="#333" gutterBottom>
                        Test finished! Thank you for completing all sections.
                    </Typography>
                    <Button
                        fullWidth={isSmall}
                        variant="contained"
                        sx={{
                            backgroundColor: "#b90504",
                            '&:hover': { backgroundColor: '#a00403' },
                            mt: 2
                        }}
                        onClick={() => navigate('/')}
                    >Finish Test</Button>
                </Box>
            </Paper>
        );
    };

    return (
        <Box sx={{ px: isSmall ? 1 : 4, py: 2 }}>
            <Box
                display="flex"
                flexDirection={isSmall ? 'column' : 'row'}
                justifyContent="space-between"
                alignItems={isSmall ? 'flex-start' : 'center'}
                gap={2}
                pb={2}
                borderBottom="2px solid #b90504"
            >
                <Typography variant={isSmall ? "h6" : "h5"} color="#b90504">
                    {section === 0 ? "Reading" : section === 1 ? "Listening" : section === 2 ? "Writing" : "Completed"}
                </Typography>

                {section < 3 && (
                    <TestTimer
                        key={sectionKey}
                        duration={section === 2 ? 0.67 :1}
                        onTimeEnd={handleTimeEnd}
                        isPaused={openConfirm || startConfirm}
                    />
                )}

                {section < 3 && (
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                            backgroundColor: "#b90504",
                            "&:hover": { backgroundColor: "#a00403" },
                            width: isSmall ? '100%' : 'auto'
                        }}
                    >
                        Next Section
                    </Button>
                )}
            </Box>

            {renderSection()}

            {/* Next section confirmation */}
            <Dialog open={openConfirm} onClose={cancelNext} fullWidth>
                <DialogContent>
                    <Typography>If you're sure, let's start the next section</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelNext} color="inherit">No</Button>
                    <Button onClick={confirmNext} autoFocus sx={{ color: '#b90504' }}>Yes</Button>
                </DialogActions>
            </Dialog>

            {/* First-time start confirmation */}
            {section < 3 && (
                <Dialog open={startConfirm} onClose={() => navigate("/tests")} fullWidth>
                    <DialogContent>
                        <Typography>If you are ready, let's start</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => navigate("/tests")} color="inherit">No</Button>
                        <Button onClick={() => setStartConfirm(false)} autoFocus sx={{ color: "#b90504" }}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default TestDetail;

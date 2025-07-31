import { useState } from "react";
import { Reading, Listening, Writing, TestTimer } from '../';
import {
    Box, Button, Typography, Paper, Dialog, DialogContent, DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TestDetail = () => {
    const [section, setSection] = useState(0)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [startConfirm, setStartConfirm] = useState(true)
    const [isTimeOver, setIsTimeOver] = useState(false)
    const [sectionKey, setSectionKey] = useState(0)
    const navigate = useNavigate()

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
        setSection(section + 1)
        setSectionKey(prev => prev + 1)
        setOpenConfirm(false)
        setIsTimeOver(false)
        goToNextSection()
    };

    const cancelNext = () => setOpenConfirm(false)

    const renderSection = () => {
        if (section === 0) return <Reading disabled={isTimeOver} />
        if (section === 1) return <Listening disabled={isTimeOver} />
        if (section === 2) return <Writing disabled={isTimeOver} />
        return (
            <Paper sx={{ height: '70vh' }}>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="h4" color="#333">
                        Test finished! Thank you for completing all sections.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#b90504", '&:hover': { backgroundColor: '#a00403' } }}
                        onClick={() => navigate('/')}
                    >Finish Test</Button>
                </Box>
            </Paper>
        );
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{borderBottom:'2px solid #b90504'}}>
                <Typography variant="h6" color="#b90504">
                    {section === 0 ? "Reading" : section === 1 ? "Listening" : section === 2 ? "Writing" : "Completed"}
                </Typography>

                {section < 3 && (
                    <TestTimer
                        key={sectionKey}
                        duration={60}
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
                        }}
                    >
                        Next Section
                    </Button>
                )}
            </Box>
            {renderSection()}
            <Dialog open={openConfirm} onClose={cancelNext}>
                <DialogContent>
                    <Typography>If you're sure, let's start the next section</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelNext} color="inherit">No</Button>
                    <Button onClick={confirmNext} autoFocus sx={{ color: '#b90504' }}>Yes</Button>
                </DialogActions>
            </Dialog>

            {section < 3 && (
                <Dialog open={startConfirm} onClose={() => navigate("/tests")}>
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

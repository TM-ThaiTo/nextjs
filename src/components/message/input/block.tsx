import { useState } from "react";
import { deleteBlock } from "@/actions/block/actions";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar";

type Props = {
    receiver: any;
    isBlock: boolean;
    setIsBlock: (isBlock: boolean) => void;
}

export default function InputBlock({ isBlock, setIsBlock, receiver }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();

    const [confimOpenBlock, setConfimOpenBlock] = useState<boolean>(false);
    const handleUnBlock = () => setConfimOpenBlock(true);

    const handleDelete = () => {

    }
    const handleConfimBlock = async () => {
        try {
            const { data, error } = await deleteBlock({ idUserBlock: receiver?._id })
            if (data) { setSnackbarMessage({ type: 'success', message: 'Success' }); setOpenSnackbar(true); setIsBlock(false); setConfimOpenBlock(false); }
            if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); }
        } catch (e) { console.error(e) }
    }
    return (
        <>
            <Box sx={{ height: '100%', maxHeight: 135, borderTop: '1px solid #e0e0e0' }}>
                <Box sx={{ height: 70, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 800 }}>You&apos;ve blocked this account</Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{`You can't message or video chat with ${receiver?.fullName}.`}</Typography>
                </Box>
                <Box sx={{ height: 60, display: 'flex', p: 2 }}>
                    <Box sx={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #e0e0e0' }}>
                        <Typography component='div' sx={{ cursor: 'pointer', color: 'black', fontSize: 16, fontWeight: 800 }} onClick={handleUnBlock}>Unblock</Typography>
                    </Box>
                    <Box sx={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography component='div' sx={{ cursor: 'pointer', color: 'red', fontSize: 16, fontWeight: 800 }} onClick={handleDelete}>Delete</Typography>
                    </Box>
                </Box>
            </Box>

            <Modal open={confimOpenBlock} onClose={() => setConfimOpenBlock(false)} aria-labelledby="confirm-close-modal-title" aria-describedby="confirm-close-modal-description">
                <Box sx={{ position: "absolute" as "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 250, bgcolor: "background.paper", border: "1px solid gray", boxShadow: 24, borderRadius: 5, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 150, p: 2 }}>
                            <Typography id="confirm-close-modal-title" style={{ fontSize: 20, fontWeight: 800 }}>{`UnBlock ${receiver?.fullName}`}</Typography>
                            <Typography id="confirm-close-modal-description" style={{ margin: 0, color: 'gray', fontSize: 15, fontWeight: 600, textAlign: 'center' }}>
                                {isBlock
                                    ? <>{`${receiver?.fullName}`} and other accounts they may have or create will now be able to request to follow and message you on Instagram. They won&apos;t be notified that you unblocked them.</>
                                    : <>They won&apos;t be able to find your profile, posts, or story on Alex Social. Alex Social won&apos;t let them know you blocked them.</>
                                }
                            </Typography>
                        </Box>
                        <Box>
                            <Box sx={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', height: 50, display: 'flex', justifyContent: 'center' }}>
                                <ButtonBase onClick={handleConfimBlock} style={{ color: 'red', width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>UnBlock</ButtonBase>
                            </Box>
                            <Box sx={{ height: 50, display: 'flex', justifyContent: 'center' }}>
                                <ButtonBase onClick={() => setConfimOpenBlock(false)} style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>Cancel</ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
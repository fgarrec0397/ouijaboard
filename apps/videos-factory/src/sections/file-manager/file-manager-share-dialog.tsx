import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";

import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";
import { IFileShared } from "@/types/file";

import FileManagerInvitedItem from "./file-manager-invited-item";

// ----------------------------------------------------------------------

type Props = DialogProps & {
    inviteEmail?: string;
    shared?: IFileShared[] | null;
    onCopyLink?: VoidFunction;
    onChangeInvite?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    //
    open: boolean;
    onClose: VoidFunction;
};

export default function FileManagerShareDialog({
    shared,
    inviteEmail,
    onCopyLink,
    onChangeInvite,
    //
    open,
    onClose,
    ...other
}: Props) {
    const hasShared = shared && !!shared.length;

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
            <DialogTitle> Invite </DialogTitle>

            <DialogContent sx={{ overflow: "unset" }}>
                {onChangeInvite && (
                    <TextField
                        fullWidth
                        value={inviteEmail}
                        placeholder="Email"
                        onChange={onChangeInvite}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        color="inherit"
                                        variant="contained"
                                        disabled={!inviteEmail}
                                        sx={{ mr: -0.75 }}
                                    >
                                        Send Invite
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />
                )}

                {hasShared && (
                    <Scrollbar sx={{ maxHeight: 60 * 6 }}>
                        <List disablePadding>
                            {shared.map((person) => (
                                <FileManagerInvitedItem key={person.id} person={person} />
                            ))}
                        </List>
                    </Scrollbar>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between" }}>
                {onCopyLink && (
                    <Button startIcon={<Iconify icon="eva:link-2-fill" />} onClick={onCopyLink}>
                        Copy link
                    </Button>
                )}

                {onClose && (
                    <Button variant="outlined" color="inherit" onClick={onClose}>
                        Close
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

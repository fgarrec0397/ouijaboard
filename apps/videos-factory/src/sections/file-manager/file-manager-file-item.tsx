import Avatar from "@mui/material/Avatar";
import AvatarGroup, { avatarGroupClasses } from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CardProps } from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";

import { ConfirmDialog } from "@/components/custom-dialog";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import FileThumbnail from "@/components/file-thumbnail";
import Iconify from "@/components/iconify";
import { useSnackbar } from "@/components/snackbar";
import TextMaxLine from "@/components/text-max-line";
import { useBoolean } from "@/hooks/use-boolean";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { IFileManager } from "@/types/file";
import { fData } from "@/utils/format-number";
import { fDateTime } from "@/utils/format-time";

import FileManagerFileDetails from "./file-manager-file-details";
import FileManagerShareDialog from "./file-manager-share-dialog";

// ----------------------------------------------------------------------

interface Props extends CardProps {
    file: IFileManager;
    selected?: boolean;
    onSelect?: VoidFunction;
    onDelete: VoidFunction;
}

export default function FileManagerFileItem({
    file,
    selected,
    onSelect,
    onDelete,
    sx,
    ...other
}: Props) {
    const { enqueueSnackbar } = useSnackbar();

    const { copy } = useCopyToClipboard();

    const [inviteEmail, setInviteEmail] = useState("");

    const checkbox = useBoolean();

    const share = useBoolean();

    const confirm = useBoolean();

    const details = useBoolean();

    const favorite = useBoolean(file.isFavorited);

    const popover = usePopover();

    const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInviteEmail(event.target.value);
    }, []);

    const handleCopy = useCallback(() => {
        enqueueSnackbar("Copied!");
        copy(file.url);
    }, [copy, enqueueSnackbar, file.url]);

    const renderIcon =
        (checkbox.value || selected) && onSelect ? (
            <Checkbox
                size="medium"
                checked={selected}
                onClick={onSelect}
                icon={<Iconify icon="eva:radio-button-off-fill" />}
                checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                sx={{ p: 0.75 }}
            />
        ) : (
            <FileThumbnail file={file.type} sx={{ width: 36, height: 36 }} />
        );

    const renderAction = (
        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: "absolute" }}>
            <Checkbox
                color="warning"
                icon={<Iconify icon="eva:star-outline" />}
                checkedIcon={<Iconify icon="eva:star-fill" />}
                checked={favorite.value}
                onChange={favorite.onToggle}
            />

            <IconButton color={popover.open ? "inherit" : "default"} onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
        </Stack>
    );

    const renderText = (
        <>
            <TextMaxLine
                persistent
                variant="subtitle2"
                onClick={details.onTrue}
                sx={{ width: 1, mt: 2, mb: 0.5 }}
            >
                {file.name}
            </TextMaxLine>

            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    maxWidth: 0.99,
                    whiteSpace: "nowrap",
                    typography: "caption",
                    color: "text.disabled",
                }}
            >
                {fData(file.size)}

                <Box
                    component="span"
                    sx={{
                        mx: 0.75,
                        width: 2,
                        height: 2,
                        flexShrink: 0,
                        borderRadius: "50%",
                        bgcolor: "currentColor",
                    }}
                />
                <Typography noWrap component="span" variant="caption">
                    {fDateTime(file.modifiedAt)}
                </Typography>
            </Stack>
        </>
    );

    const renderAvatar = (
        <AvatarGroup
            max={3}
            sx={{
                mt: 1,
                [`& .${avatarGroupClasses.avatar}`]: {
                    width: 24,
                    height: 24,
                    "&:first-of-type": {
                        fontSize: 12,
                    },
                },
            }}
        >
            {file.shared?.map((person) => (
                <Avatar key={person.id} alt={person.name} src={person.avatarUrl} />
            ))}
        </AvatarGroup>
    );

    return (
        <>
            <Stack
                component={Paper}
                variant="outlined"
                alignItems="flex-start"
                sx={{
                    p: 2.5,
                    borderRadius: 2,
                    bgcolor: "unset",
                    cursor: "pointer",
                    position: "relative",
                    ...((checkbox.value || selected) && {
                        bgcolor: "background.paper",
                        boxShadow: (theme) => theme.customShadows.z20,
                    }),
                    ...sx,
                }}
                {...other}
            >
                <Box onMouseEnter={checkbox.onTrue} onMouseLeave={checkbox.onFalse}>
                    {renderIcon}
                </Box>

                {renderText}

                {renderAvatar}

                {renderAction}
            </Stack>

            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 160 }}
            >
                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        handleCopy();
                    }}
                >
                    <Iconify icon="eva:link-2-fill" />
                    Copy Link
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        popover.onClose();
                        share.onTrue();
                    }}
                >
                    <Iconify icon="solar:share-bold" />
                    Share
                </MenuItem>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem
                    onClick={() => {
                        confirm.onTrue();
                        popover.onClose();
                    }}
                    sx={{ color: "error.main" }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>
            </CustomPopover>

            <FileManagerFileDetails
                item={file}
                favorited={favorite.value}
                onFavorite={favorite.onToggle}
                onCopyLink={handleCopy}
                open={details.value}
                onClose={details.onFalse}
                onDelete={() => {
                    details.onFalse();
                    onDelete();
                }}
            />

            <FileManagerShareDialog
                open={share.value}
                shared={file.shared}
                inviteEmail={inviteEmail}
                onChangeInvite={handleChangeInvite}
                onCopyLink={handleCopy}
                onClose={() => {
                    share.onFalse();
                    setInviteEmail("");
                }}
            />

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={onDelete}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}

import Avatar from "@mui/material/Avatar";
import AvatarGroup, { avatarGroupClasses } from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { alpha, useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";

import { ConfirmDialog } from "@/components/custom-dialog";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import FileThumbnail from "@/components/file-thumbnail";
import Iconify from "@/components/iconify";
import { useSnackbar } from "@/components/snackbar";
import { useBoolean } from "@/hooks/use-boolean";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useDoubleClick } from "@/hooks/use-double-click";
import { IFileManager } from "@/types/file";
import { fData } from "@/utils/format-number";
import { fDate, fTime } from "@/utils/format-time";

import FileManagerFileDetails from "./file-manager-file-details";
import FileManagerShareDialog from "./file-manager-share-dialog";

// ----------------------------------------------------------------------

type Props = {
    row: IFileManager;
    selected: boolean;
    onSelectRow: VoidFunction;
    onDeleteRow: VoidFunction;
};

export default function FileManagerTableRow({ row, selected, onSelectRow, onDeleteRow }: Props) {
    const theme = useTheme();

    const { name, size, type, modifiedAt, shared, isFavorited } = row;

    const { enqueueSnackbar } = useSnackbar();

    const { copy } = useCopyToClipboard();

    const [inviteEmail, setInviteEmail] = useState("");

    const favorite = useBoolean(isFavorited);

    const details = useBoolean();

    const share = useBoolean();

    const confirm = useBoolean();

    const popover = usePopover();

    const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInviteEmail(event.target.value);
    }, []);

    const handleClick = useDoubleClick({
        click: () => {
            details.onTrue();
        },
        doubleClick: () => console.info("DOUBLE CLICK"),
    });

    const handleCopy = useCallback(() => {
        enqueueSnackbar("Copied!");
        copy(row.url);
    }, [copy, enqueueSnackbar, row.url]);

    const defaultStyles = {
        borderTop: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        "&:first-of-type": {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            borderLeft: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        },
        "&:last-of-type": {
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        },
    };

    return (
        <>
            <TableRow
                selected={selected}
                sx={{
                    borderRadius: 2,
                    [`&.${tableRowClasses.selected}, &:hover`]: {
                        backgroundColor: "background.paper",
                        boxShadow: theme.customShadows.z20,
                        transition: theme.transitions.create(["background-color", "box-shadow"], {
                            duration: theme.transitions.duration.shortest,
                        }),
                        "&:hover": {
                            backgroundColor: "background.paper",
                            boxShadow: theme.customShadows.z20,
                        },
                    },
                    [`& .${tableCellClasses.root}`]: {
                        ...defaultStyles,
                    },
                    ...(details.value && {
                        [`& .${tableCellClasses.root}`]: {
                            ...defaultStyles,
                        },
                    }),
                }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selected}
                        onDoubleClick={() => console.info("ON DOUBLE CLICK")}
                        onClick={onSelectRow}
                    />
                </TableCell>

                <TableCell onClick={handleClick}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <FileThumbnail file={type} sx={{ width: 36, height: 36 }} />

                        <Typography
                            noWrap
                            variant="inherit"
                            sx={{
                                maxWidth: 360,
                                cursor: "pointer",
                                ...(details.value && { fontWeight: "fontWeightBold" }),
                            }}
                        >
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell onClick={handleClick} sx={{ whiteSpace: "nowrap" }}>
                    {fData(size)}
                </TableCell>

                <TableCell onClick={handleClick} sx={{ whiteSpace: "nowrap" }}>
                    {type}
                </TableCell>

                <TableCell onClick={handleClick} sx={{ whiteSpace: "nowrap" }}>
                    <ListItemText
                        primary={fDate(modifiedAt)}
                        secondary={fTime(modifiedAt)}
                        primaryTypographyProps={{ typography: "body2" }}
                        secondaryTypographyProps={{
                            mt: 0.5,
                            component: "span",
                            typography: "caption",
                        }}
                    />
                </TableCell>

                <TableCell align="right" onClick={handleClick}>
                    <AvatarGroup
                        max={4}
                        sx={{
                            display: "inline-flex",
                            [`& .${avatarGroupClasses.avatar}`]: {
                                width: 24,
                                height: 24,
                                "&:first-of-type": {
                                    fontSize: 12,
                                },
                            },
                        }}
                    >
                        {shared &&
                            shared.map((person) => (
                                <Avatar key={person.id} alt={person.name} src={person.avatarUrl} />
                            ))}
                    </AvatarGroup>
                </TableCell>

                <TableCell
                    align="right"
                    sx={{
                        px: 1,
                        whiteSpace: "nowrap",
                    }}
                >
                    <Checkbox
                        color="warning"
                        icon={<Iconify icon="eva:star-outline" />}
                        checkedIcon={<Iconify icon="eva:star-fill" />}
                        checked={favorite.value}
                        onChange={favorite.onToggle}
                        sx={{ p: 0.75 }}
                    />

                    <IconButton
                        color={popover.open ? "inherit" : "default"}
                        onClick={popover.onOpen}
                    >
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

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
                item={row}
                favorited={favorite.value}
                onFavorite={favorite.onToggle}
                onCopyLink={handleCopy}
                open={details.value}
                onClose={details.onFalse}
                onDelete={onDeleteRow}
            />

            <FileManagerShareDialog
                open={share.value}
                shared={shared}
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
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}

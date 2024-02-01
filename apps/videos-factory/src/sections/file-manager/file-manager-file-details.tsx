import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";

import FileThumbnail, { fileFormat } from "@/components/file-thumbnail";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/scrollbar";
import { useBoolean } from "@/hooks/use-boolean";
import { IFile } from "@/types/file";
import { fData } from "@/utils/format-number";
import { fDateTime } from "@/utils/format-time";

import FileManagerInvitedItem from "./file-manager-invited-item";
import FileManagerShareDialog from "./file-manager-share-dialog";

// ----------------------------------------------------------------------

type Props = DrawerProps & {
    item: IFile;
    favorited?: boolean;
    //
    onFavorite?: VoidFunction;
    onCopyLink: VoidFunction;
    //
    onClose: VoidFunction;
    onDelete: VoidFunction;
};

export default function FileManagerFileDetails({
    item,
    open,
    favorited,
    //
    onFavorite,
    onCopyLink,
    onClose,
    onDelete,
    ...other
}: Props) {
    const { name, size, url, type, shared, modifiedAt } = item;

    const hasShared = shared && !!shared.length;

    const toggleTags = useBoolean(true);

    const share = useBoolean();

    const properties = useBoolean(true);

    const [inviteEmail, setInviteEmail] = useState("");

    const [tags, setTags] = useState(item.tags.slice(0, 3));

    const handleChangeInvite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInviteEmail(event.target.value);
    }, []);

    const handleChangeTags = useCallback((newValue: string[]) => {
        setTags(newValue);
    }, []);

    const renderTags = (
        <Stack spacing={1.5}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ typography: "subtitle2" }}
            >
                Tags
                <IconButton size="small" onClick={toggleTags.onToggle}>
                    <Iconify
                        icon={
                            toggleTags.value
                                ? "eva:arrow-ios-upward-fill"
                                : "eva:arrow-ios-downward-fill"
                        }
                    />
                </IconButton>
            </Stack>

            {toggleTags.value && (
                <Autocomplete
                    multiple
                    freeSolo
                    options={item.tags.map((option) => option)}
                    getOptionLabel={(option) => option}
                    defaultValue={item.tags.slice(0, 3)}
                    value={tags}
                    onChange={(event, newValue) => {
                        handleChangeTags(newValue);
                    }}
                    renderOption={(props, option) => (
                        <li {...props} key={option}>
                            {option}
                        </li>
                    )}
                    renderTags={(selected, getTagProps) =>
                        selected.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                size="small"
                                variant="soft"
                                label={option}
                                key={option}
                            />
                        ))
                    }
                    renderInput={(params) => <TextField {...params} placeholder="#Add a tags" />}
                />
            )}
        </Stack>
    );

    const renderProperties = (
        <Stack spacing={1.5}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ typography: "subtitle2" }}
            >
                Properties
                <IconButton size="small" onClick={properties.onToggle}>
                    <Iconify
                        icon={
                            properties.value
                                ? "eva:arrow-ios-upward-fill"
                                : "eva:arrow-ios-downward-fill"
                        }
                    />
                </IconButton>
            </Stack>

            {properties.value && (
                <>
                    <Stack
                        direction="row"
                        sx={{ typography: "caption", textTransform: "capitalize" }}
                    >
                        <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                            Size
                        </Box>
                        {fData(size)}
                    </Stack>

                    <Stack
                        direction="row"
                        sx={{ typography: "caption", textTransform: "capitalize" }}
                    >
                        <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                            Modified
                        </Box>
                        {fDateTime(modifiedAt)}
                    </Stack>

                    <Stack
                        direction="row"
                        sx={{ typography: "caption", textTransform: "capitalize" }}
                    >
                        <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
                            Type
                        </Box>
                        {fileFormat(type)}
                    </Stack>
                </>
            )}
        </Stack>
    );

    const renderShared = (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ p: 2.5 }}
            >
                <Typography variant="subtitle2"> File Share With </Typography>

                <IconButton
                    size="small"
                    color="primary"
                    onClick={share.onTrue}
                    sx={{
                        width: 24,
                        height: 24,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    }}
                >
                    <Iconify icon="mingcute:add-line" />
                </IconButton>
            </Stack>

            {hasShared && (
                <Box sx={{ pl: 2.5, pr: 1 }}>
                    {shared.map((person) => (
                        <FileManagerInvitedItem key={person.id} person={person} />
                    ))}
                </Box>
            )}
        </>
    );

    return (
        <>
            <Drawer
                open={open}
                onClose={onClose}
                anchor="right"
                slotProps={{
                    backdrop: { invisible: true },
                }}
                PaperProps={{
                    sx: { width: 320 },
                }}
                {...other}
            >
                <Scrollbar sx={{ height: 1 }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ p: 2.5 }}
                    >
                        <Typography variant="h6"> Info </Typography>

                        <Checkbox
                            color="warning"
                            icon={<Iconify icon="eva:star-outline" />}
                            checkedIcon={<Iconify icon="eva:star-fill" />}
                            checked={favorited}
                            onChange={onFavorite}
                        />
                    </Stack>

                    <Stack
                        spacing={2.5}
                        justifyContent="center"
                        sx={{
                            p: 2.5,
                            bgcolor: "background.neutral",
                        }}
                    >
                        <FileThumbnail
                            imageView
                            file={type === "folder" ? type : url}
                            sx={{ width: 64, height: 64 }}
                            imgSx={{ borderRadius: 1 }}
                        />

                        <Typography variant="subtitle1" sx={{ wordBreak: "break-all" }}>
                            {name}
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed" }} />

                        {renderTags}

                        {renderProperties}
                    </Stack>

                    {renderShared}
                </Scrollbar>

                <Box sx={{ p: 2.5 }}>
                    <Button
                        fullWidth
                        variant="soft"
                        color="error"
                        size="large"
                        startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Drawer>

            <FileManagerShareDialog
                open={share.value}
                shared={shared}
                inviteEmail={inviteEmail}
                onChangeInvite={handleChangeInvite}
                onCopyLink={onCopyLink}
                onClose={() => {
                    share.onFalse();
                    setInviteEmail("");
                }}
            />
        </>
    );
}

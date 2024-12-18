'use client';

import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { updateProfile } from "@/actions/user/actions";
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar";
import useThemeColors from "@/utils/hooks/theme/hookTheme";

type Props = {
    user: any;
}

const EditProfile = ({ user }: Props) => {
    const { textColorPrimary, borderColor } = useThemeColors();
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { fullName: user?.fullName || "", bio: user?.bio || "", gender: user?.gender === 0 ? 'male' : user?.gender === 1 ? 'female' : user?.gender === 3 ? 'other' : 'prefer_not_to_say', }, });
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [isPublicProfile, setIsPublicProfile] = useState<boolean>(user?.publicProfile === 0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) setSelectedFile(file); };
    const handleButtonClick = () => { const fileInput = document.getElementById("file-input") as HTMLInputElement; if (fileInput) fileInput.click(); };

    const onSubmit = useCallback(async (data: any) => {
        const { slug, fullName, bio, gender } = data;
        const formData = new FormData();
        formData.append("slug", slug || "");
        formData.append("fullName", fullName || "");
        formData.append("bio", bio || "");

        const numberGender = gender === "male" ? 0 : gender === "female" ? 1 : 2;
        formData.append("gender", numberGender.toString());

        const numberPublicProfile = isPublicProfile ? 0 : 1;
        formData.append("publicProfile", numberPublicProfile.toString());

        if (selectedFile) formData.append("file", selectedFile);

        try {
            const { error } = await updateProfile(formData);
            if (error) { setSnackbarMessage({ type: 'error', message: 'Unexpected error during profile update' }); setOpenSnackbar(true); }
            else { setSnackbarMessage({ type: 'success', message: 'Profile updated successfully' }); setOpenSnackbar(true); }
        } catch (error) { console.error("Unexpected error during profile update:", error); }
    }, [isPublicProfile, selectedFile, setOpenSnackbar, setSnackbarMessage]);

    return (
        <Box sx={{ maxWidth: 610, mx: "auto", mt: 4, p: 3, display: "flex", flexDirection: "column", }}>
            <Typography variant="h6" sx={{ mb: '20px', fontSize: '20px', fontWeight: 800, color: 'black' }}>
                Edit profile
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: '20px', height: 88, borderRadius: '20px', p: 2, justifyContent: 'space-between', backgroundColor: borderColor }}>
                <Box sx={{ width: 'auto', height: 60, display: 'flex', alignItems: 'center' }}>
                    {selectedFile
                        ? <Image src={URL.createObjectURL(selectedFile)} alt="avatar" width={60} height={60} objectFit="cover" style={{ border: `1px solid ${borderColor}`, borderRadius: '50%' }} />
                        : <Avatar src={user?.avatar || '/static/avt_default.png'} alt="avatar" sx={{ width: 60, height: 60, objectFit: 'cover', border: `1px solid ${borderColor}` }} />
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                        <Typography variant="body2" sx={{ color: textColorPrimary, fontSize: 15, fontWeight: 700 }}>{user?.slug}</Typography>
                        <Typography variant="body2" sx={{ color: textColorPrimary }}>{user?.fullName}</Typography>
                    </Box>
                </Box>
                <Button variant="outlined" onClick={handleButtonClick} sx={{ backgroundColor: '#0095f6', color: 'white', borderRadius: '10px' }}>
                    Change photo
                </Button>
                <input id="file-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} fullWidth label="Name" variant="outlined" sx={{ mb: '20px' }} />
                    )}
                />
                <TextField fullWidth
                    label="Website"
                    variant="outlined"
                    placeholder="Website"
                    disabled sx={{ mb: '20px' }}
                    helperText="Editing your links is only available on mobile."
                />
                <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (<TextField {...field} fullWidth label="Bio" variant="outlined" helperText="25 / 150" sx={{ mb: '20px' }} />)}
                />

                <Box sx={{ mb: '20px' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Gender
                    </Typography>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} fullWidth defaultValue="prefer_not_to_say">
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                            </Select>
                        )}
                    />
                    <Typography variant="caption" sx={{ mt: 1, display: "block", color: textColorPrimary }}>
                        This won’t be part of your public profile.
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: "16px", fontWeight: 700, color: textColorPrimary, textTransform: "capitalize" }}>Show account suggestions on profiles</Typography>
                <Box sx={{ mb: '20px', border: '0.5px solid gray', p: 2, borderRadius: '20px' }}>
                    <FormControlLabel
                        control={<Switch checked={isPublicProfile} onChange={() => setIsPublicProfile(!isPublicProfile)} />}
                        labelPlacement="start"
                        sx={{ justifyContent: "space-between", width: "100%", ml: 0 }}
                        label={
                            <Typography sx={{ fontSize: "16px", fontWeight: 700, textTransform: "capitalize", color: textColorPrimary }} >
                                Show account suggestions on profiles
                            </Typography>
                        }
                    />
                    <Typography variant="caption">
                        Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.
                    </Typography>
                </Box>

                <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }} type="submit">
                    Submit
                </Button>
            </form>
            <Box sx={{ height: 200, boder: '1px solid red' }}></Box>
        </Box>
    );
};

export default EditProfile;

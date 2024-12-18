import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';

type Props = {
    onClickBackMain: () => void;
};

const optionMember = [
    'Change the community name & avatar',
    'Pin messages, notes, and polls to the top of a conversation',
    'Create new notes & reminders',
    'Create new polls',
]

const optionsSettingGroup = [
    {
        label: 'Only community owner/admins are able to view full member list.',
        tooltip: 'Restrict member list access to admins.',
        defaultChecked: true,
    },
    {
        label: 'Membership approval',
        tooltip: 'Require approval for new member requests.',
        defaultChecked: false,
    },
    {
        label: 'Highlight messages from owner/admins',
        tooltip: 'Highlight all messages sent by admins.',
        defaultChecked: true,
    },
    {
        label: 'Allow new members to read most recent messages',
        tooltip: 'Enable access to recent messages for new members.',
        defaultChecked: true,
    },
]

export default function SettingGroup({ onClickBackMain }: Props) {
    return (
        <>
            {/* Header */}
            <Box sx={{ height: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray', padding: '0px 10px', }} >
                <IconButton
                    sx={{
                        fontWeight: 600,
                        fontSize: 20,
                        transition: 'background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                        '&:active': { backgroundColor: '#cfcfcf' },
                    }}
                    onClick={onClickBackMain}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 20, color: 'black' }} />
                </IconButton>

                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Group Settings</Typography>
                <div />
            </Box>

            {/* Content */}
            <Box sx={{ padding: 2 }}>
                {/* Administrator Access Message */}
                <Typography sx={{ fontSize: 14, marginBottom: 2, display: 'flex', alignItems: 'center', color: 'gray', }} >
                    🔒 Only Administrators can access these settings
                </Typography>

                {/* Allow Community Members Options */}
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    Allow community members to
                </Typography>
                <Box sx={{ paddingLeft: 2 }}>
                    {optionMember.map((label, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={label}
                            labelPlacement="start" // Checkbox moved to the right
                            sx={{ display: 'flex', justifyContent: 'space-between', margin: 0, marginBottom: 1 }}
                        />
                    ))}
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Send messages"
                        labelPlacement="start" // Checkbox moved to the right
                        sx={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}
                    />
                </Box>

                <Divider sx={{ marginY: 2 }} />

                {/* Toggle Options */}
                {optionsSettingGroup.map(({ label, tooltip, defaultChecked }, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 2,
                        }}
                    >
                        <Tooltip title={tooltip}>
                            <Typography>{label}</Typography>
                        </Tooltip>
                        <Switch defaultChecked={defaultChecked} />
                    </Box>
                ))}
            </Box>
        </>
    );
}

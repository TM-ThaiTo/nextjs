'use client';
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import useThemeColors from '@/utils/hooks/theme/hookTheme';
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { putUpdateHidden } from '@/actions/hidden-word/action';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type Props = {
  data: any;
};

const HiddenWordsSettings = ({ data }: Props) => {
  const { _id: id, hideComments, commentfiltering, hideMessageRequests } = data;
  const { textColorPrimary, borderColor } = useThemeColors();
  const { setOpenSnackbar, setSnackbarMessage } = useSnackbar()
  const [isHideComments, setIsHideComments] = useState<boolean>(hideComments);
  const [isCommentFiltering, setIsCommentFiltering] = useState<boolean>(commentfiltering);
  const [isHideMessageRequests, setIsHideMessageRequests] = useState<boolean>(hideMessageRequests);
  const lang = getLanguage();
  const router = useRouter();

  const handleCustomHiddenWord = () => router.push('/account/hidden-words/custom-hidden-words/');

  const handleHideCommentsToggle = async () => {
    const dataU = { id, type: 1 }
    const { data, error } = await putUpdateHidden(dataU);
    if (error) {
      setSnackbarMessage({ type: 'error', message: error?.message });
      setOpenSnackbar(true);
      return;
    }
    if (data) {
      setSnackbarMessage({ type: 'success', message: data?.message });
      setOpenSnackbar(true);
      setIsHideComments((prev) => !prev);
    }
  };

  const handleCommentFilteringToggle = async () => {
    const dataU = { id, type: 2 }
    const { data, error } = await putUpdateHidden(dataU);
    if (error) {
      setSnackbarMessage({ type: 'error', message: error?.message });
      setOpenSnackbar(true);
      return;
    }
    if (data) {
      setSnackbarMessage({ type: 'success', message: data?.message });
      setOpenSnackbar(true);
      setIsCommentFiltering((prev) => !prev);
    }
  };

  const handleHideMessageRequestsToggle = async () => {
    const dataU = { id, type: 3 }
    const { data, error } = await putUpdateHidden(dataU);
    if (error) {
      setSnackbarMessage({ type: 'error', message: error?.message });
      setOpenSnackbar(true);
      return;
    }
    if (data) {
      setSnackbarMessage({ type: 'success', message: data?.message });
      setOpenSnackbar(true);
      setIsHideMessageRequests((prev) => !prev);
    }
  };

  return (
    <Box sx={{ maxWidth: 610, mx: "auto", mt: 4, p: 3, display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 3, color: textColorPrimary, minHeight: '100vh' }}>
        <Typography variant="h5" gutterBottom sx={{ color: textColorPrimary }}>
          {locales[lang]?.hiddenWord?.header}
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', marginTop: 2 }}>
          {locales[lang]?.hiddenWord?.offensiveWordsAndPhrases}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          {locales[lang]?.hiddenWord?.noteOffensiveWordsAndPhrases}
        </Typography>

        {/* Hide Comments */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="body1">{locales[lang]?.hiddenWord?.hideComments}</Typography>
          <Switch color="primary" checked={isHideComments} onChange={handleHideCommentsToggle} />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3 }}>
          {locales[lang]?.hiddenWord?.nodeHideComment}
        </Typography>

        {/* Advanced Comment Filtering */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="body1">{locales[lang]?.hiddenWord?.advancedCommentFiltering}</Typography>
          <Switch color="primary" checked={isCommentFiltering} onChange={handleCommentFilteringToggle} />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3 }}>
          {locales[lang]?.hiddenWord?.nodeAdvancedCommentFiltering}
        </Typography>

        {/* Hide Pending Messages */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="body1">{locales[lang]?.hiddenWord?.hideMessageRequests}</Typography>
          <Switch color="primary" checked={isHideMessageRequests} onChange={handleHideMessageRequestsToggle} />
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3 }}>
          {locales[lang]?.hiddenWord?.nodeHideMessageRequests}
        </Typography>

        {/* Custom Words */}
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', marginTop: 2 }}>
          {locales[lang]?.hiddenWord?.customWordsAndPhrases}
        </Typography>
        <Button onClick={handleCustomHiddenWord} variant="outlined" sx={{ marginTop: 1, width: '100%', color: textColorPrimary, borderColor: borderColor }} >
          {locales[lang]?.hiddenWord?.manageCustomWordsAndPhrases}
        </Button>
      </Box>
    </Box>
  );
};

export default HiddenWordsSettings;

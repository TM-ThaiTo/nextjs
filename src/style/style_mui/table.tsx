const itemTable = {
    maxWidth: 100,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}

const itemBoxMethod = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e7e7e7',
    width: 'calc(50% - 10px)',
    height: 90,
    boxSizing: 'border-box',
    margin: '5px'
}

const styleModalRole = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '100%',
    maxWidth: 900,
    minWidth: 300,
    maxHeight: '90vh',
    height: '100%',
    minHeight: 300,
    overflow: 'auto',
    borderRadius: 2,
};

const buttonCreateOrEditRole = {
    borderTop: '1px solid #e2e2e2',
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 2,
    position: 'sticky',
    bottom: 0,
    bgcolor: 'background.paper',
    p: 2,
}

const expandRole = {
    fontSize: '20px',
    color: 'black'
}

const styleSelect = {
    bgcolor: 'background.paper',
    borderRadius: '4px',
    '&:hover': {
        bgcolor: 'grey.200',
    },
    '&.Mui-focused': {
        bgcolor: 'white',
    },
}

const justifyContent_space_between = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const styleButtonReset = {
    width: 'auto',
    height: 35,
    color: 'black',
    borderColor: 'black',
    marginRight: 2,
    '&:hover': {
        borderColor: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
}

const boxActionTable = {
    height: 100, border: '1px solid #e7e7e7',
    borderRadius: 2, padding: 2, marginBottom: 2,
    marginTop: 2,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
}

const highReportRow = {
    backgroundColor: "#ffdddd",
}


export {
    itemTable,
    itemBoxMethod,
    styleModalRole, buttonCreateOrEditRole, expandRole,
    styleSelect,
    justifyContent_space_between,
    styleButtonReset,
    boxActionTable,
    highReportRow
}
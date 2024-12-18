import SearchAndFilterCustomerDashboard from '@/components/dashboard/customer/searchAndFilter.customer'
import TopTableCustomer from '@/components/dashboard/customer/top.table.customer'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'


export default function LayoutCustomerDashboard({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
            <SearchAndFilterCustomerDashboard />
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                <TopTableCustomer />
                {children}
            </Paper>
        </Box>
    )
}
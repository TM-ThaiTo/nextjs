import MainLayoutDashBoard from "@/components/layout/dashboard-layout/main";
import { GetInfoUser } from "@/session";
import { getDashboardAction } from "@/actions/role/actions";
import { handleActionDashboard } from "@/helper/handle_action_dashboard";

export default async function LayoutDashboard({ children }: Readonly<{ children: React.ReactNode }>) {
    const myUser = await GetInfoUser();
    const { data, error } = await getDashboardAction();

    var actions: any = null;
    if (data) {
        actions = await handleActionDashboard(data.data);
    }
    return (
        <MainLayoutDashBoard myUser={myUser} endpoint={actions}>
            {children}
        </MainLayoutDashBoard>
    )
}
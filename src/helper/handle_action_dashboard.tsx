import { actionsDashboard } from "@/constants/home_actions";


const handleActionDashboard = async (data: string[]) => {
    // const filteredActions = actionsDashboard.filter(action => data.includes(action.href));
    // return filteredActions;
    const filteredActions = actionsDashboard.map(group => ({
        ...group,
        menuItems: group.menuItems.filter(item =>
            item.children
                ? item.children.some(child => data.includes(child.href))
                : data.includes(item.href)
        )
    })).filter(group => group.menuItems.length > 0);

    return filteredActions;
}

export {
    handleActionDashboard
}
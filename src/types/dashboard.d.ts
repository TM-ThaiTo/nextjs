type RCustomer = {
    code: number;
    message: string;
    data: {
        _query: {
            page: number;
            limit: number;
            total: number;
            total_page: number;
        },
        users: ICustomer[];
    }
}
type RICustomer = {
    code: number;
    message: string;
    data: ICustomer;
}
type ICustomer = {
    _id: string;
    slug: string;
    idAccount: string;
    fullName: string;
    phone: string;
    birthDay: string;
    address: string;
    bio: string;
    follower: number;
    following: number;
    posts: number;
    status: string;
    avatar: string;
    background: string;
    reports: number;
    createdAt: string;
    updatedAt: string;
}


type RIAccount = {
    code: number;
    message: string;
    data: IAccount;
}
type RAccount = {
    code: number;
    message: string;
    data: {
        _query: {
            page: number;
            limit: number;
            total: number;
            total_page: number;
        },
        accounts: IAccount[]
    }
}
type IAccount = {
    _id: string;
    email: string;
    userName: string;
    type: number;
    roles: string[];
    failedLogin: number;
    verifyAccount: boolean;
    createdAt: string;
    updatedAt: string;
}

type RRoleName = {
    code: number;
    message: string;
    data: string[];
}
type RRoleItem = {
    code: number;
    message: string;
    data: IRole;
}
type RRole = {
    code: number;
    message: string;
    data: {
        _query: {
            page: number;
            limit: number;
            total: number;
            total_page: number;
        }
        roles: IRole[];
    }
}
type IRole = {
    _id: string;
    roleName: string;
    active: boolean;
    description: string;
    permission: string[];
    dashboard: string[];
    createdAt: string;
    updatedAt: string;
}

type RPermission = {
    code: number;
    message: string;
    data: IPermissions;
}
type IPermissions = {
    moduleNameList: string[];
    groupedPermissions: {
        [moduleName: string]: IPermission[];
    }
}
type RPermissionNoGroup = {
    code: number;
    message: string;
    data: {
        _query: {
            page: number;
            limit: number;
            total: number;
            total_page: number;
        }
        permissions: IPermission[];
    };
}

type R2M = {
    code: number;
    message: string;
    data: I2M;
}

type I2M = {
    methods: string[];
    modules: string[];
}

type IPermission = {
    _id: string;
    permissionName: string;
    method: string;
    module: string;
    endpoint: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}


type RAction = {
    code: number;
    message: string;
    data: string[];
}
export {
    RCustomer, ICustomer, RICustomer,
    RAccount, IAccount, RIAccount,
    RRoleItem, RRole, IRole, RRoleName,
    RPermission, IPermissions, IPermission, RPermissionNoGroup, I2M, R2M,
    RAction,

}
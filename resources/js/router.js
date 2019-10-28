//IMPORT SECTION
import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import store from './store.js'

//halaman outlets
import IndexOutlet from './pages/outlets/Index.vue'
import DataOutlet from './pages/outlets/Outlet.vue'
import AddOutlet from './pages/outlets/Add.vue'
import EditOutlet from './pages/outlets/Edit.vue'

//halaman couriers
import IndexCourier from './pages/couriers/Index.vue'
import DataCouriers from './pages/couriers/Courier.vue'
import AddCouriers from './pages/couriers/Add.vue'
import EditCouriers from './pages/couriers/Edit.vue'

//halaman Product
import IndexProduct from './pages/products/Index.vue'
import DataProduct from './pages/products/Product.vue'
import AddProduct from './pages/products/Add.vue'
import EditProduct from './pages/products/Edit.vue'

//role
import Setting from './pages/settings/Index.vue'
import SetPermission from './pages/settings/roles/SetPermission.vue'

//Expenses
import IndexExpenses from './pages/expenses/Index.vue'
import DataExpenses from './pages/expenses/Expenses.vue'
import CreateExpenses from './pages/expenses/Add.vue'
import ViewExpenses from './pages/expenses/View.vue'
import EditExpenses from './pages/expenses/Edit.vue'

//customer
import IndexCustomer from './pages/customers/Index.vue'
import DataCustomer from './pages/customers/Customer.vue'
import AddCustomer from './pages/customers/Add.vue'
import EditCustomer from './pages/customers/Edit.vue'

//transaksi
import IndexTransaction from './pages/transaction/Index.vue'
import AddTransaction from './pages/transaction/Add.vue'
Vue.use(Router)

//DEFINE ROUTE
const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/outlets',
            component: IndexOutlet,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: '',
                    name: 'outlets.data',
                    component: DataOutlet,
                    meta: {
                        title: 'Manage Outlets'
                    }
                },
                {
                    path: 'add',
                    name: 'outlets.add',
                    component: AddOutlet,
                    meta: {
                        title: 'Add New Outlet'
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'outlets.edit',
                    component: EditOutlet,
                    meta: {
                        title: 'Edit Outlet'
                    }
                }
            ]
        },
        {
            path: '/couriers',
            component: IndexCourier,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: '',
                    name: 'couriers.data',
                    component: DataCouriers,
                    meta: {
                        title: 'Manage Couriers'
                    }
                },
                {
                    path: 'add',
                    name: 'couriers.add',
                    component: AddCouriers,
                    meta: {
                        title: 'Add New Courier'
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'couriers.edit',
                    component: EditCouriers,
                    meta: {
                        title: 'Edit Courier'
                    }
                },
            ]
        },
        {
            path: '/product',
            component: IndexProduct,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: '',
                    name: 'products.data',
                    component: DataProduct,
                    meta: {
                        title: 'Manage Products'
                    }
                },
                {
                    path: 'add',
                    name: 'products.add',
                    component: AddProduct,
                    meta: {
                        title: 'Add New Product'
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'products.edit',
                    component: EditProduct,
                    meta: {
                        title: 'Edit Product'
                    }
                },
            ]
        },
        {
            path: '/settings',
            component: Setting,
            meta: {
                requiresAuth: true
            },
            children: [{
                path: 'role-permission',
                name: 'role.permissions',
                component: SetPermission,
                meta: {
                    title: 'Set Permissions'
                }
            }, ]
        },
        {
            path: '/expenses',
            component: IndexExpenses,
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: '',
                    name: 'expenses.data',
                    component: DataExpenses,
                    meta: {
                        title: 'Manage Expenses'
                    }
                },
                {
                    path: 'add',
                    name: 'expenses.create',
                    component: CreateExpenses,
                    meta: {
                        title: 'Add New Expenses'
                    }
                },
                {
                    path: 'view/:id',
                    name: 'expenses.view',
                    component: ViewExpenses,
                    meta: {
                        title: 'View Expenses'
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'expenses.edit',
                    component: EditExpenses,
                    meta: {
                        title: 'Edit Expenses'
                    }
                },
            ]
        },
        {
            path: '/customers',
            component: IndexCustomer,
            meta: {
                requiresAuth: true
            },
            children: [{
                path: '',
                name: 'customers.data',
                component: DataCustomer,
                meta: {
                    title: 'Manage Customers'
                }
            }, {
                path: 'add',
                name: 'customers.add',
                component: AddCustomer,
                meta: {
                    title: 'Add New Customers'
                }
            }, {
                path: 'edit/:id',
                name: 'customers.edit',
                component: EditCustomer,
                meta: {
                    title: 'Edit Customer'
                }
            }, ]
        },
        {
            path: '/transactions',
            component: IndexTransaction,
            meta: {
                requiresAuth: true
            },
            children: [{
                path: 'create',
                name: 'transactions.add',
                component: AddTransaction,
                meta: {
                    title: 'Create New Transaction'
                }
            }, ]
        }

    ]
});

//Navigation Guards
router.beforeEach((to, from, next) => {
    store.commit('CLEAR_ERRORS') //clear errors
    store.commit('SET_LOADING', true) //clear errors

    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth = store.getters.isAuth
        if (!auth) {
            setTimeout(() => {
                next({
                    name: 'login'
                })
            }, 100)

        } else {
            setTimeout(() => {
                next();
            }, 100)
        }
    } else {
        setTimeout(() => {
            next();
        }, 100)
    }

})

router.afterEach(() => {
    store.commit('SET_LOADING', false)
});

export default router

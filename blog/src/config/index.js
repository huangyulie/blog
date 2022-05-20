//项目的配置文件
export const BASE_URL = 'http://localhost:3000';

//配置设置权限
export const SETTING = [
    {
        title: '全选',
        key: 'all',
        children: [
            {
                title: '首页',
                key: 'home',
            },
            {
                title: '博客',
                key: 'product',
                children: [
                    {
                        title: '分类管理',
                        key: 'product/category'
                    },
                    {
                        title: '博客管理',
                        key: 'product/product'
                    }
                ]
            },
            {
                title: '用户管理',
                key: 'user'
            },
            {
                title: '角色管理',
                key: 'role'
            },
            {
                title: '图形图表',
                key: 'charts',
                children: [
                    {
                        title: '柱状图',
                        key: 'charts/bar'
                    },
                    {
                        title: '折线图',
                        key: 'charts/line'
                    },
                    {
                        title: '饼图',
                        key: 'charts/pie'
                    },
                ]
            }
        ]
    }
];


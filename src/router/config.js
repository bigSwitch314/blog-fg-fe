/**
 * @flow
 */
import React from 'react'
import loader from './loader'

const config = [
  {
    name: '文章管理',
    path: 'articleManage',
    icon: <i className="iconfont icon-article" />,
    children: [
      {
        path: 'originalArticle',
        name: '原创文章',
        component: loader(() => import('../pages/article/OriginalArticle')),
      },
      {
        path: 'transshipmentArticle',
        name: '转载文章',
        component: loader(() => import('../pages/article/TransshipmentArticle')),
      },
    ],
  },
  {
    name: '分类管理',
    path: 'categoryManage',
    icon: <i className="iconfont icon-category" />,
    component: loader(() => import('../pages/category/CategoryManage')),
    children: [],
  },
]

export default config

# -*- coding: utf-8 -*-
{
    "name": "Web List Number",
    "summary": "列表序号 List Number",
    "version": "17.0.0.1",
    "category": "clearzZ/clearzZ",
    "website": "mailto:1801226631@qq.com",
    "author": "clearzZ",
    "license": "AGPL-3",
    "depends": ["base", "web"],
    "sequence": 4,
    "installable": True,
    "application": True,
    "auto_install": False,
    'data': [
        # 'security/ir.model.access.csv',
        # 'views/views.xml',
        # 'views/templates.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'web_list_number/static/src/views/list/*.*',
        ]
    },
    'images': ['static/img/img2.png'],
}


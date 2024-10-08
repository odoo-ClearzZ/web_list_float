/** @odoo-module **/

import {patch} from "@web/core/utils/patch";
import {ListRenderer} from "@web/views/list/list_renderer";
import {useDebounced} from "@web/core/utils/timing";
import {useEffect, useExternalListener} from "@odoo/owl";


patch(ListRenderer.prototype, {
    setup() {
        super.setup();
        this.numSwitch = this.constructor.name === 'ListRenderer';
        useEffect((tableRef) => {
            this.forceColumnWidths()
        });
        const debouncedResizeCallback = useDebounced(() => {
            this.forceColumnWidths();
        }, 200);
        useExternalListener(window, "resize", debouncedResizeCallback);
    },

    forceColumnWidths() {
        const table = this.tableRef.el;
        const headers = [...table.querySelectorAll("thead th")];
        headers.forEach((th, index) => {
            if (Array.from(th.classList).includes('list-number')) {
                th.style.width = `${String(this.props.list.offset || this.props.list.limit).length * 20}px`;
            }
        });
    },

})
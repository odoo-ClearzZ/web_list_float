/** @odoo-module **/

import {patch} from "@web/core/utils/patch";
import {ListRenderer} from "@web/views/list/list_renderer";

patch(ListRenderer.prototype, {
    setup(){
      super.setup();
      this.numSwitch = this.constructor.name === 'ListRenderer';
    },

    // The following code manipulates the DOM directly to avoid having to wait for a
    // render + patch which would occur on the next frame and cause flickering.
    freezeColumnWidths() {
        if (!this.keepColumnWidths) {
            this.columnWidths = null;
        }

        const table = this.tableRef.el;
        const headers = [...table.querySelectorAll("thead th:not(.o_list_actions_header)")];

        if (!this.columnWidths || !this.columnWidths.length) {
            // no column widths to restore

            table.style.tableLayout = "fixed";
            const allowedWidth = table.parentNode.getBoundingClientRect().width;
            // Set table layout auto and remove inline style to make sure that css
            // rules apply (e.g. fixed width of record selector)
            table.style.tableLayout = "auto";
            headers.forEach((th) => {
                th.style.width = null;
                th.style.maxWidth = null;
            });

            this.setDefaultColumnWidths();

            // Squeeze the table by applying a max-width on largest columns to
            // ensure that it doesn't overflow
            this.columnWidths = this.computeColumnWidthsFromContent(allowedWidth);
            table.style.tableLayout = "fixed";
        }
        headers.forEach((th, index) => {
            if (!th.style.width) {
                th.style.width = `${Math.floor(this.columnWidths[index])}px`;
            }
            if (Array.from(th.classList).includes('list-number')){
                th.style.width = `${String(this.props.list.offset + this.props.list.limit).length * 20}px`;
            }
        });
    }

})
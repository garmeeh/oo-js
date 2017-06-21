import { BaseElement } from './base-element.js';

export class DataTable extends BaseElement {
  constructor(headers, data) {
    super();
    this.headers = headers;
    this.data = data;
  }

  getElementString() {
    let tableHeadTags = '';
    for (const header of this.headers) {
      tableHeadTags += `
         <th class="mdl-data-table__cell--non-numeric">${header}</th>
      `;
    }

    let tableRowTags = '';
    for(const row of this.data) {
      tableRowTags += '<tr>';
      for(const property of this.headers) {
        const field = row[property.toLowerCase()];
        tableRowTags += `
          <td class="mdl-data-table__cell--non-numeric">
            ${field}
          </td>
        `;
      }
      tableRowTags += '</tr>';
    }
    return `
      <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
           ${tableHeadTags}
          </tr>
        </thead>
        <tbody>
          ${tableRowTags}
        </tbody>
      </table>
    `;
  }
}

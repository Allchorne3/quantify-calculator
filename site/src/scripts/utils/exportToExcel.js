const table = document.querySelector('table');

export function exportTableToExcel() {
    // c /* Create worksheet from HTML DOM TABLE */
    var wb = XLSX.utils.table_to_book(table);
    // /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
    console.log("Export")
}
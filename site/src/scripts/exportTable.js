let exportBtn;
let exportHighlightsBtn;

const exportTables = table => {
    exportBtn = document.querySelector('#downloadExcel');
	exportHighlightsBtn = document.querySelector('#downloadExcelRows');
    
    // Export the whole table
    exportBtn.addEventListener('click', () => {
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, 'SheetJSTable.xlsx');
    });

    // Export highlighted rows
    exportHighlightsBtn.addEventListener('click', () => {
        // Clone the original table
        const highlightsTable = table.cloneNode(true);
        
        // Remove non-highlighted rows from the cloned table
        highlightsTable.querySelectorAll('tr:not(.highlighted)').forEach(row => row.remove());

        const wb = XLSX.utils.table_to_book(highlightsTable);
        XLSX.writeFile(wb, 'SheetJSTable.xlsx');
    });
}
    
export default {
    exportTables
}
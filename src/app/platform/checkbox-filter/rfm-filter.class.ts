export class RFMFilter {

    options: {label: String, value: Boolean}[];
    name: String;
    tableColumnName: String;
    selectedValues: String[];

    enabled: Boolean;

    constructor(name, tableColumnName) {
        this.name = name;
        this.tableColumnName = tableColumnName;
        this.options = [
            {label: '1', value: true},
            {label: '2', value: true},
            {label: '3', value: true},
            {label: '4', value: true},
            {label: '5', value: true}
        ];

        this.resetFilter();
    }

    setSelectedValues(vals: String[]): void {
        this.selectedValues = vals;
        if (this.selectedValues.length < this.options.length) {
            this.enabled = true;
        } else {
            this.enabled = false;
        }
    }

    getSelectedValues(): String[] {
        return this.selectedValues;
    }

    resetFilter(): void {
        this.selectedValues = ['1', '2', '3', '4', '5'];
        this.enabled = false;
        this.options.forEach( opt => opt.value = true);
    }
}

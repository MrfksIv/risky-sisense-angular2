export class SliderFilter {

    name: String;
    tableColumnName: String;
    type: String;
    minVal: String;
    maxVal: String;
    initVal: String;
    selectedVal: number;

    enabled: Boolean;


    constructor(name, tableColumnName, type = 'number', minVal= '0', maxVal= '20', initVal= '0') {
        this.name = name;
        this.tableColumnName = tableColumnName;
        this.type = type;
        this.minVal = minVal.toString();
        this.maxVal = maxVal.toString();
        this.initVal = initVal.toString();
        this.selectedVal = 0;
    }

    setSelectedValue(val: string): void {
        console.log("VAL:::", val);
        let valNumber = parseFloat(val) || 0;
        if (valNumber > 0) {
            this.enabled = true;
        } else {
            this.enabled = false;
        }
        this.selectedVal = valNumber;
    }

    getSelectedValue(): number {
        return this.selectedVal;
    }
}
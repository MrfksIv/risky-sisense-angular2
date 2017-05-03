export class Indicator {

    private primaryValue: number;
    private secondaryValue: number;

    private primaryTitle: string;
    private secondaryTitle: string;

    queryInProgress: boolean;

    constructor(primaryTitle, primaryValue, secondaryTitle= undefined, secondaryValue= undefined) {
        this.primaryValue = primaryValue;
        this.primaryTitle = primaryTitle;

        this.secondaryValue = secondaryValue;
        this.secondaryTitle = secondaryTitle;
    }

    setPrimaryValue(val: number): void {
        this.primaryValue = val;
    }

    setSecondaryValue(val: number): void {
        this.secondaryValue = val;
    }

    getPrimaryValue(): number {
        return this.primaryValue;
    }

    getSecondaryValue(): number {
        return this.secondaryValue;
    }

    getQueryStatus(): boolean {
        return this.queryInProgress;
    }

    setQueryStatus(val: boolean): void {
        this.queryInProgress = val;
    }


}
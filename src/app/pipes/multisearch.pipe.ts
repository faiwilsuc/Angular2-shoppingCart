import {Pipe} from "@angular/core";

@Pipe({
    name: "multisearch"
})
export class MultiSearchPipe {
    
    transform(items: any[], fields : string[], values : any[]): any[] {  
        if (!items) return items;
        if (values.length == 0) return items;
        let returnedItens : any[]; 
        let betweenDates = false;
        for (let i in fields)
        {
            if(this.isNumeric(values[i])){
               items = items.filter(it => it[fields[i]] == values[i]);
            } 
            if(this.isDate(values[i]) && !betweenDates){
                betweenDates = true;
                let fromDate = new Date(values[i]);
                let index = parseInt(i, 10);
                index++; 
                let toDate = new Date(values[index]);
                if(values[i] !== "" && values[index] !== "") {
                    items = items.filter(it => it[fields[i]] > fromDate && it[fields[i]] < toDate);
                }
            } 
            else if(!betweenDates && values[i] !== ""){
                items = items.filter(it => it[fields[i]].toLocaleLowerCase().indexOf(values[i].toLowerCase()) != -1);
            }

        }
        return items;
    }

    isDate(value : string) : boolean {
        var myDateStr= new Date(value);
        if( !isNaN ( myDateStr.getMonth() )) {
            return true;
        } else {
            return false;
        }
    }

     isNumeric(value: any) {
         return !isNaN(parseFloat(value)) && isFinite(value);
    }
    
}
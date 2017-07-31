import {Pipe} from "@angular/core";

@Pipe({
    name: "search"
})
export class SearchPipe {
    transform(items: any[], field : string, value : string): any[] {  
        if (!items) return items;
        if (value.length == 0) return items;
        return items.filter(it => it[field].toLocaleLowerCase().indexOf(value.toLowerCase()) != -1);
    }
}
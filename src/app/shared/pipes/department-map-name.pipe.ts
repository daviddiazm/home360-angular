import { Pipe, PipeTransform } from "@angular/core";
import { Department } from "src/app/core/models/department.interface";

@Pipe({
  name: 'mapNameDep'
})
export  class MapNameDepartmentPipe implements PipeTransform {
  transform(department: Department[]): string[] {
    return department.map(d => d.name)
  }
}


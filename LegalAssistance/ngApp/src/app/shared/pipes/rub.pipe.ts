import { Pipe, PipeTransform } from '@angular/core';
import Utils from '../utils';

@Pipe({name: 'rub'})
export default class RubPipe implements PipeTransform {
  transform(value: number): string {
    return Utils.toRub(value);
  }
}
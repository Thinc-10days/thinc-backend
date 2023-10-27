import { Food } from '../schema/food.schema';
import { Point } from '../schema/point.schema';

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly location: string;
  readonly image: string;
  readonly position: Point;
  readonly food: Food[];
}
